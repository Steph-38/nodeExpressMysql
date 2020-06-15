module.exports = (req, res, next) => {

  req.flash = (path, message) => {
    req.session.error = message
    res.redirect(path)
  }

  res.locals.error = req.session.error
  req.session.error = undefined
  // if (req.session.error) {
  // }
  next()
}