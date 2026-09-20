/** 校验身份证号码 */
export const checkCardNo = (value: string): boolean => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}([\dX])$)/i
  return reg.test(value)
}

/** 校验是否为邮箱地址 */
export const isEmail = (value: string): boolean => {
  return /^[\w-]+@[\w-]+(\.[\w-]+)+$/.test(value)
}

/** 校验是否为国内手机号 */
export const isTel = (value: string | number): boolean => {
  return /^1[3-9,]\d{9}$/.test(value.toString())
}
