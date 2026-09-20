/** 判断是否为数组 */
export const isArray = Array.isArray as (value: any) => value is any[]

/** 判断是否为对象（但不含数组） */
export const isObject = (value: any): boolean => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

/** 通用类型判断（内部工具） */
export const is = (val: unknown, type: string): boolean => {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
};

/** 判断是否为函数 */
export const isFunction = (val: any): val is Function => {
  return is(val, "Function") || !!(val && val.constructor && val.call && val.apply);
};

/** 判断是否为 Date 对象 */
export const isDate = (val: any): val is Date => {
  return is(val, "Date") || (!!val && val.constructor === Date);
};

/** 判断是否为数字（NaN/Infinity 也视为数字） */
export const isNumber = (val: any): val is number => {
  return Number(val) === val;
};

/** 判断是否为整数 */
export const isInt = (val: any): val is number => {
  return isNumber(val) && Number.isFinite(val) && val % 1 === 0;
};

/** 判断是否为浮点数 */
export const isFloat = (val: any): val is number => {
  return isNumber(val) && Number.isFinite(val) && val % 1 !== 0;
};

/** 判断是否为异步函数 */
export const isAsyncFunction = (val: unknown): val is (...args: any[]) => Promise<any> => {
  return is(val, "AsyncFunction");
};

/** 判断是否为 Promise */
export const isPromise = (value: any): value is Promise<any> => {
  return !!value && isFunction((value as any).then);
};

/** 判断是否为字符串 */
export const isString = (val: unknown): val is string => {
  return is(val, "String") || typeof val === "string" || val instanceof String;
};

/** 判断是否为布尔值 */
export const isBoolean = (val: unknown): val is boolean => {
  return typeof val === "boolean" || is(val, "Boolean");
};

/** 判断是否为浏览器环境 */
export const isPC = (): boolean => typeof window !== "undefined";

/** 判断是否为 window 对象 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

/** 判断是否为 DOM 元素 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!(val as Element).tagName;
};

/** 判断是否为 null */
export const isNull = (val: unknown): val is null => val === null;

/** 判断是否为十六进制颜色 */
export const isHexColor = (str: string): boolean => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};

/** 判断设备是否为 iOS */
export const isIOS = (): boolean => /iPad|iPhone|iPod/.test(navigator.userAgent);

/** 判断是否为有效邮箱 */
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email);
};

/** 判断是否不是 undefined */
export const isDef = <T>(val: T | undefined): val is T => typeof val !== "undefined";

/** 判断是否为 undefined */
export const isUnDef = <T>(val: T | undefined): val is undefined => typeof val === "undefined";

/** 判断是否为 null 或 undefined */
export const isNullOrUnDef = <T>(val: T | null | undefined): val is null | undefined => {
  return isUnDef(val) || isNull(val);
};

/** 判断是否为 symbol */
export const isSymbol = (value: any): value is symbol => {
  return !!value && value.constructor === Symbol;
};

/** 判断是否为原始类型 */
export const isPrimitive = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value !== "object" && typeof value !== "function")
  );
};

/** 判断是否为基础类型 */
export const isBasicType = (val: any): val is string | number | boolean | symbol | bigint | null | undefined => {
  return !val || Object(val) !== val
};

/** 判断是否为空（完备版） */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (isDate(value)) return isNaN(value.getTime());
  if (isFunction(value) || isSymbol(value)) return false;
  if (isNumber(value)) return false;
  const length = (value as any).length;
  if (isNumber(length)) return length === 0;
  const size = (value as any).size;
  if (isNumber(size)) return size === 0;
  const keys = Object.keys(value).length;
  return keys === 0;
};

/** 判断是否为空（简化版） */
export function isEmptySv(value: string | object | null | undefined): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" || Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (ArrayBuffer.isView(value)) return value.byteLength === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/** 深度相等比较 */
export const isEqual = <T>(x: T, y: T): boolean => {
  if (Object.is(x, y)) return true;
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime();
  }
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString();
  }
  if (typeof x !== "object" || x === null || typeof y !== "object" || y === null) {
    return false;
  }
  const keysX = Reflect.ownKeys(x as unknown as object) as (keyof typeof x)[];
  const keysY = Reflect.ownKeys(y as unknown as object);
  if (keysX.length !== keysY.length) return false;
  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y as unknown as object, keysX[i])) return false;
    if (!isEqual(x[keysX[i]], y[keysX[i]])) return false;
  }
  return true;
};
