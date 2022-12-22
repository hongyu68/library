export function scrollTo(pos, time) {
  let index = document.documentElement.scrollTop || document.body.scrollTop
  const timer = setInterval(() => {
    index +=
      Math.abs((pos - index) / 10) > 1
        ? (pos - index) / 10
        : index > pos
        ? -1
        : 1
    document.documentElement.scrollTop = index
    document.body.scrollTop = index
    if (Math.abs(index - pos) <= 1) {
      document.documentElement.scrollTop = pos
      document.body.scrollTop = pos
      clearInterval(timer)
    }
  }, time)
}
