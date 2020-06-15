module.exports = (req, res, next) => {

  const call = 'Appel myMiddle'
  req.callMyMiddle = call

  let now = new Date()
  let day = now.getDate()
  let month = now.getMonth() + 1
  let year = now.getFullYear()
  let hour = now.getHours()
  let min = now.getMinutes()

  let date = `${day}/${month}/${year} - ${hour}:${min}`
  req.requestTime = date
  next()
}