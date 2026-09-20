/** 递归深拷贝（支持 Date/RegExp/Map/Set/循环引用） */
export function deepClone<T>(obj: T, hash = new WeakMap<any, any>()): T {
  if (obj === null || typeof obj !== "object") return obj
  if (hash.has(obj)) return hash.get(obj)

  if (obj instanceof Date) return new Date(obj.getTime()) as any
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as any

  if (obj instanceof Map) {
    const clone = new Map()
    hash.set(obj, clone)
    obj.forEach((value, key) => clone.set(key, deepClone(value, hash)))
    return clone as any
  }

  if (obj instanceof Set) {
    const clone = new Set()
    hash.set(obj, clone)
    obj.forEach((value) => clone.add(deepClone(value, hash)))
    return clone as any
  }

  if (Array.isArray(obj)) {
    const clone: any[] = []
    hash.set(obj, clone)
    obj.forEach((item, index) => { clone[index] = deepClone(item, hash) })
    return clone as any
  }

  const clone: Record<string, any> = {}
  hash.set(obj, clone)
  Object.keys(obj).forEach((key) => { clone[key] = deepClone((obj as any)[key], hash) })
  return clone as any
}

/** JSON 深拷贝（仅 JSON 安全类型） */
export const deepCloneWithJSON = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))

/** structuredClone 深拷贝（不支持函数/Symbol） */
export const structClone = <T>(obj: T, options?: StructuredSerializeOptions): T => structuredClone(obj, options)

/** 浅拷贝（仅第一层） */
export const shallowClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj
  return (Array.isArray(obj) ? [...obj] : { ...obj }) as any
}
