const _swap = (a: number, b: number): [number, number] => a > b ? [b, a] : [a, b]

/** 限制在 [min, max] 闭区间内 */
export const clamp = (value: number, min: number, max: number): number => {
  [min, max] = _swap(min, max)
  return Math.min(Math.max(value, min), max)
}

/** 生成 [min, max] 闭区间内的随机整数 */
export const randomInt = (min: number, max: number): number => {
  [min, max] = _swap(min, max)
  const lower = Math.ceil(min)
  const upper = Math.floor(max)
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
}

/** 生成 [min, max) 区间内的随机浮点数 */
export const randomFloat = (min: number, max: number): number => {
  [min, max] = _swap(min, max)
  return Math.random() * (max - min) + min
}

/** 四舍五入到指定小数位 */
export const round = (value: number, decimals: number = 0): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/** 数组求和 */
export const sum = (arr: number[]): number => arr.reduce((acc, val) => acc + val, 0)

/** 数组平均值 */
export const average = (arr: number[]): number => arr.length === 0 ? NaN : sum(arr) / arr.length

/** 判断数值是否在 [min, max] 闭区间内 */
export const inRange = (value: number, min: number, max: number): boolean => {
  [min, max] = _swap(min, max)
  return value >= min && value <= max
}

/** 线性插值 */
export const lerp = (start: number, end: number, t: number): number => start + (end - start) * t
