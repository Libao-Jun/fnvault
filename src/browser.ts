/** 获取 URL 参数对象 */
export const getUrlParams = (url?: string): Record<string, string> => {
  const params: Record<string, string> = {};
  new URL(url || window.location.href).searchParams.forEach((val, key) => {
    params[key] = val;
  });
  return params;
};

/** 获取单个 URL 参数 */
export const getUrlParam = (key: string, url?: string): string | null => {
  return new URL(url || window.location.href).searchParams.get(key);
};

/** 对象转 URL 参数字符串 */
export const toQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
};

/** 复制文本到剪贴板 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (navigator.clipboard) {
    try { await navigator.clipboard.writeText(text); return true } catch { return false }
  }
  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.style.cssText = "position:fixed;opacity:0"
  document.body.appendChild(textarea)
  textarea.select()
  const result = document.execCommand("copy")
  document.body.removeChild(textarea)
  return result
};

/** 下载文件（Blob） */
export const downloadFile = (
  content: string | BlobPart,
  filename: string,
  mimeType = "text/plain",
): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

/** 导出 JSON 为文件 */
export const exportJSON = (data: any, filename = "data.json"): void => {
  downloadFile(JSON.stringify(data, null, 2), filename, "application/json");
};

/** 滚动到顶部（默认平滑） */
export const scrollToTop = (behavior: ScrollBehavior = "smooth"): void => {
  window.scrollTo({ top: 0, behavior });
};

/** 滚动到底部（默认平滑） */
export const scrollToBottom = (behavior: ScrollBehavior = "smooth"): void => {
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
};

/** 监听页面滚动（rAF 节流），返回清理函数 */
export const onScroll = (callback: (scrollY: number) => void): () => void => {
  let ticking = false;
  const handler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        callback(window.scrollY);
        ticking = false;
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", handler);
  return () => window.removeEventListener("scroll", handler);
};

/** 监听元素进入/离开可视区域，返回清理函数 */
export const observeIntersection = (
  target: Element,
  onEnter: (entry: IntersectionObserverEntry) => void,
  onLeave?: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit,
): () => void => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onEnter(entry);
      } else if (onLeave) {
        onLeave(entry);
      }
    });
  }, options);
  observer.observe(target);
  return () => observer.disconnect();
};
