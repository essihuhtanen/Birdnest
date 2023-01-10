export const setTimer = (timedFunc: () => void) => {
  const intervalCall = setInterval(() => {
    timedFunc()
  }, 2000)
  return () => {
    clearInterval(intervalCall)
  }
}
