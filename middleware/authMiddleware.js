const authModel = require('../model/Auth')

const authUser = function(req, res, next) {
  if(req.session.userid) {
    next()
  } else {
    res.redirect('/login')
  }
}

const accountAcces = function(req, res, next) {
  if(req.session.userid !== req.params.account) {
    res.redirect('/')
  }
  next()
}

const adminPageAccess = (role) => {
  return (req, res, next) => {
    if(req.session.userid) {
      authModel.getAccountByEmail(req.con, req.session.userid, (err, result) => {
        if(result.role !== role) {
          res.redirect('/')
        }
      })
    } else {
      authUser()
    }
    next()
  }
}

module.exports = {
  authUser,
  accountAcces,
  adminPageAccess
}