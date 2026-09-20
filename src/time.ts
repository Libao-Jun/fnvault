/** 获取当前时间戳（毫秒） */
export const timestamp = () => Date.now()

/** 判断日期是否为今天 */
export const isToday = (date: string | number | Date): boolean => {
  const d1 = new Date(date)
  const d2 = new Date()
  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
}

/** 获取指定年月的第一天 */
export const firstDay = (y: number, m: number): Date => new Date(y, m - 1, 1)

/** 获取指定年月的最后一天 */
export const lastDay = (y: number, m: number): Date => new Date(y, m, 0)
