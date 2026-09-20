/** 生成指定长度的随机字符串 */
export const randomString = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () => chars.charAt(Math.random() * chars.length | 0)).join('')
}

/** 生成 UUID v4 */
export const uuid = (): string => {
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return template.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

/** 转义 HTML 特殊字符 */
export const escapeHtml = (str: string): string => {
  const m: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return str.replace(/[&<>"']/g, (c) => m[c])
}

/** 反转义 HTML 实体 */
export const unescapeHtml = (str: string): string => {
  const m: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, (e) => m[e])
}

/** 去除 HTML 标签 */
export const stripHtml = (str: string): string => str.replace(/<[^>]*>/g, '')

/** 确保以指定前缀开头 */
export const ensurePrefix = (str: string, prefix: string): string => str.startsWith(prefix) ? str : prefix + str

/** 确保以指定后缀结尾 */
export const ensureSuffix = (str: string, suffix: string): string => str.endsWith(suffix) ? str : str + suffix

/** 移除前缀 */
export const removePrefix = (str: string, prefix: string): string => {
  return !prefix || !str.startsWith(prefix) ? str : str.slice(prefix.length)
}

/** 移除后缀 */
export const removeSuffix = (str: string, suffix: string): string => {
  return !suffix || !str.endsWith(suffix) ? str : str.slice(0, -suffix.length)
}

/** UTF-8 字节长度 */
export const byteSize = (str: string): number => new TextEncoder().encode(str).length

/** 姓名脱敏 */
export const maskName = (name: unknown): string => {
  const str = String(name ?? '')
  if (!str.trim()) return ''
  const chars = [...str]
  return chars.length === 1 ? str : chars[0] + '*'.repeat(chars.length - 1)
}
