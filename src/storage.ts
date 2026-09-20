/** 获取 localStorage（自动 JSON 解析） */
export const localGet = <T = any>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (value === null) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return value as any;
  }
};

/** 设置 localStorage（自动 JSON 序列化） */
export const localSet = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/** 移除指定 localStorage */
export const localRm = (key: string): void => {
  localStorage.removeItem(key);
};

/** 清除所有 localStorage */
export const localClear = (): void => {
  localStorage.clear();
};
