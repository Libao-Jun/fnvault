/** 完整日期时间（斜杠分隔） */
export const formatFull = (date: Date): string => {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).format(date)
};

/** 完整日期时间（短横线分隔） */
export const formatFullReplace = (date: Date): string => formatFull(date).replace(/\//g, "-")

/** 中文年月日 */
export const formatYMD = (date: Date): string => {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric", month: "long", day: "numeric",
  }).format(date)
};

/** 星期几 */
export const formatWeek = (date: Date): string => {
  return new Intl.DateTimeFormat("zh-CN", { weekday: "long" }).format(date)
};

/** 货币格式化 */
export const formatRmb = (
  value: number,
  options: { type: "zh-CN"; currency: "CNY" },
): string => {
  return new Intl.NumberFormat(options.type, {
    style: "currency", currency: options.currency,
  }).format(value)
};

/** 千位分隔符 */
export const formatNum = (value: number): string => new Intl.NumberFormat("zh-CN").format(value)

/** 百分比格式化 */
export const percentCN = (value: number, digit: number = 0): string => {
  return new Intl.NumberFormat("zh-CN", {
    style: "percent", minimumFractionDigits: digit,
  }).format(value)
};

/** 大数简化（英文缩写） */
export const compactEN = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact", compactDisplay: "short",
  }).format(value)
};

/** 大数简化（中文缩写） */
export const compactCN = (value: number): string => {
  return new Intl.NumberFormat("zh-CN", {
    notation: "compact", compactDisplay: "short",
  }).format(value)
};

/** 带正负号显示 */
export const signed = (value: number, digit = 0): string => {
  return new Intl.NumberFormat("en-US", {
    signDisplay: "always", minimumFractionDigits: digit,
  }).format(value)
};

/** 手机号脱敏（隐藏中间 4 位） */
export const maskPhone = (phone: string): string => phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")

/** 手机号空格分隔 */
export const spacePhone = (phone: string): string => phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3")

/** 每个单词首字母大写 */
export const capitalize = (str: string): string => str.replace(/\b\w/g, (char) => char.toUpperCase())

/** 短横线转小驼峰 */
export const kebabToCamel = (str: string): string => str.replace(/-([a-z])/g, (_, l) => l.toUpperCase())

/** 驼峰转短横线 */
export const camelToKebab = (str: string): string => str.replace(/([A-Z])/g, "-$1").toLowerCase()

/** 超长文本截断 */
export const truncate = (str: string, maxLength: number, suffix = "..."): string => {
  return str.length <= maxLength ? str : str.substring(0, maxLength - suffix.length) + suffix
};

/** 按字数截断（中文友好） */
export const truncateByWords = (str: string, maxWords: number, suffix = "..."): string => {
  const chars = [...str]
  return chars.length <= maxWords ? str : chars.slice(0, maxWords).join("") + suffix
};

/** 去除所有空格 */
export const trimAll = (str: string): string => str.replace(/\s+/g, "")

/** 下划线转驼峰 */
export const toCamel = (str: string): string => str.replace(/_([a-z])/g, (_, l) => l.toUpperCase())

/** 首字母大写 */
export const firstUpper = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

/** 首字母小写 */
export const firstLower = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1)

/** 反转字符串 */
export const reverse = (str: string): string => [...str].reverse().join("")
