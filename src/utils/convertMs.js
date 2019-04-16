/**
 * Convert ms to 'mm:ss:10ms'
 */
export function convertMs(ms) {
  let tenMilliseconds = ("0" + (Math.round(ms/10) % 100)).slice(-2);
  let seconds = ("0" + (Math.round(ms/1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.round(ms/60000) % 60)).slice(-2);

  return(
    `${minutes}:${seconds}:${tenMilliseconds}`
  )
}