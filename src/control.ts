/** 防抖：n 秒内重复触发则重新计时 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
  { leading = false, trailing = true }: { leading?: boolean; trailing?: boolean } = {},
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let shouldTrail = trailing

  const debounced = (...args: Parameters<T>): void => {
    lastArgs = args
    if (timer !== null) {
      clearTimeout(timer)
      shouldTrail = trailing
    } else if (leading) {
      fn(...args)
      shouldTrail = false
    }
    timer = setTimeout(() => {
      if (shouldTrail && lastArgs) fn(...lastArgs)
      timer = lastArgs = null
      shouldTrail = trailing
    }, delay)
  }

  debounced.cancel = (): void => {
    if (timer) { clearTimeout(timer); timer = lastArgs = null }
    shouldTrail = trailing
  }

  return debounced
};

/** 节流：固定间隔内最多执行一次 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  interval = 300,
  { leading = true, trailing = true }: { leading?: boolean; trailing?: boolean } = {},
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastTime = 0
  let pendingArgs: Parameters<T> | null = null

  const throttled = (...args: Parameters<T>): void => {
    const now = Date.now()
    if (!lastTime && !leading) lastTime = now

    const remaining = interval - (now - lastTime)
    pendingArgs = args

    if (remaining <= 0) {
      if (timer) { clearTimeout(timer); timer = null }
      fn(...args)
      lastTime = now
      pendingArgs = null
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        timer = null
        lastTime = leading ? Date.now() : 0
        if (pendingArgs) fn(...pendingArgs)
        pendingArgs = null
      }, remaining)
    }
  }

  throttled.cancel = (): void => {
    if (timer) { clearTimeout(timer); timer = pendingArgs = null }
  }

  return throttled
};
