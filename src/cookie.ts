/** 设置 Cookie */
export const setCookie = (name: string, value: string, days = 0): void => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
};

/** 获取 Cookie */
export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(
    new RegExp("(^| )" + encodeURIComponent(name) + "=([^;]+)"),
  );
  return match ? decodeURIComponent(match[2]) : null;
};

/** 删除 Cookie */
export const delCookie = (name: string): void => {
  setCookie(name, "", -1);
};
