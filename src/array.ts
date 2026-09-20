/** Set 去重 */
export const unique = <T>(arr: T[]): T[] => [...new Set(arr)]

/** 对象数组按 key 去重 */
export const uniqueByKey = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
): T[] => [...new Map(arr.map((item) => [item[key], item])).values()]

/** 数值升序 */
export const sortNumAsc = (arr: number[]): number[] => [...arr].sort((a, b) => a - b)

/** 数值降序 */
export const sortNumDesc = (arr: number[]): number[] => [...arr].sort((a, b) => b - a)

/** 按对象属性排序 */
export const sortByKey = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] => [...arr].sort((a, b) => order === "asc" ? a[key] - b[key] : b[key] - a[key])

/** 类数组转数组 */
export const toArray = <T>(arrayLike: ArrayLike<T>): T[] => Array.from(arrayLike)

/** 合并多个数组 */
export const mergeArrays = <T>(...arrays: T[][]): T[] => arrays.flat()

/** 多维数组扁平化到指定层级 */
export const flatten = <T>(arr: any[], depth: number = 1): T[] => arr.flat(depth)

/** 对象数组中按 key-value 查找第一个匹配项 */
export const arrFind = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
  value: T[keyof T],
): T | undefined => arr.find((item) => item[key] === value)

/** 将对象数组按指定属性分组 */
export const groupBy = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T,
): Record<string, T[]> => {
  return arr.reduce(
    (acc, item) => {
      const groupKey = String(item[key]);
      (acc[groupKey] ??= []).push(item)
      return acc;
    },
    {} as Record<string, T[]>,
  );
};

/** 移除对象中值为空（null / undefined / 空字符串）的属性 */
export const filterEmptyValues = <T extends Record<string, any>>(
  obj: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== ""),
  ) as Partial<T>;
};

/** 根据长度和映射函数快速生成数组 */
export const createRange = <T = number>(
  length: number,
  mapFn?: (index: number) => T,
): T[] => Array.from({ length }, (_, i) => mapFn ? mapFn(i) : i as unknown as T)
