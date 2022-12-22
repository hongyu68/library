export function hasClass(el, className) {
  return new RegExp(`(^|\\s)${className}($|\\s)`).test(el.className)
}
