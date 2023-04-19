'use strict'

const cloudinary = require("../config/cloudinary"); 
const crypto = require('crypto')
const AccountModel = require('../model/Account')

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

module.exports = {

  updatePassword: function(req, res) {

    const oldPasswordHashed = getHashedPassword(req.body.oldPassword)
    const newPasswordHashed = getHashedPassword(req.body.newPassword)

    AccountModel.getAccountByEmail(req.con, req.params.account, (err, rows) => {
      if(err) throw err
      if(oldPasswordHashed === rows.password) {
        AccountModel.updateAccountPassword(req.con, newPasswordHashed, req.params.account, (err, rows) => {
          if(err) throw err
          res.redirect(`/account/${req.params.account}`)
        })
      } else {
        res.redirect(`/account/${req.params.account}`)
      }
    })
  },

  deleteAccount: function(req, res) {
    AccountModel.deleteAccount(req.con, req.params.account, (err, rows) => {
      if(err) throw err
      req.session.destroy()
      res.redirect('/')
    })
  },

  saveDataUser: function(req, res) {
    AccountModel.saveAccountData(req.con, req.body, req.params.account, (err, result) => {
      if(err) throw err
      res.redirect(`/account/${req.params.account}`)
    })
  },

  profilePicture: async function(req, res) {
    try {

      const result =  await cloudinary.uploader.upload(req.file.path, {
        width:500,
        height:500,
        crop: 'limit',
        quality: 'auto'
      })

      await AccountModel.saveProfilePicture(req.con, result.url, req.params.account, (err, result) => {
        if(err) throw err
        res.redirect(`/account/${req.params.account}`)
      })

    } catch(err) {

      console.log(err)

    }
  }
}