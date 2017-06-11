export function commentChange (arg, time) {
  let commentArray = []
  for (let i = 0; i < arg.length; i++) {
    commentArray.push(randomTime(time))
  }
  return commentArray
}

function randomTime (time) {
  let formatTime = Math.random() * time
  formatTime = Math.floor(formatTime)
  const minute = Math.floor(formatTime / 60)
  let second = Math.floor(formatTime % 60)
  let len = second.toString().length
  while (len < 2) {
    second = '0' + second
    len++
  }
  return `${minute}:${second}`
}

export function format (interval) {
  interval = Math.floor(interval)
  const minute = Math.floor(interval / 60)
  const second = _pad(interval % 60)
  return `${minute}:${second}`
}

function _pad (num, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}
