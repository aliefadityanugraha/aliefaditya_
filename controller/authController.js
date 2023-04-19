'use strict';

const crypto = require('crypto')
const authModel = require('../model/Auth')
require("dotenv").config()

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

module.exports = {

  register: function(req, res) {
    res.render('auth/register', {
      message: 'Please register to your Account',
      layout: 'layouts/auth-layouts',
    })
  },

  login: function(req, res) {
    res.render('auth/login', {
      message: 'Please login to your Account',
      layout: 'layouts/auth-layouts'
    })
  },

  store: function(req, res) {

    const valueReq = {
      email: req.body.email,
      username: req.body.username,
      password: getHashedPassword(req.body.password),
      data: {
        article_data: "no data"
      },
      profile: 'https://via.placeholder.com/150',
      created_at: new Date(),
      updated_at: new Date()
    }

    if(req.body.password === req.body.confirmPassword) {
      authModel.getAccountByEmail(req.con, req.body.email, (err, result) => {
          if(result === null) {
            authModel.insertAccount(req.con, valueReq, (err, rows) => {
              if(err) throw err
              res.render('auth/login', {
                message: 'Registration Complete. Please login to continue.',
                layout:'layouts/auth-layouts' 
              })
            })
          } else {
            return res.render('auth/register', {
              message: 'User already registered.',
              layout:'layouts/auth-layouts' 
            })
          }
      })
    } else {
      return res.render('auth/register', {
        message: 'Password dont match',
        layout:'layouts/auth-layouts' 
      })
    }
    
  },

  authentication: function(req, res) {

    const hashedPass = getHashedPassword(req.body.password)

    authModel.getAccountByEmail(req.con, req.body.email, (err, result) => {
      if(result === null) {
        return res.render('auth/login', {
          message: 'User not Registered, please register',
          layout:'layouts/auth-layouts' 
        })
      } else {
        if(hashedPass === result.password) {
          const session = req.session
          session.userid = req.body.email
          res.redirect('/')
        } else {
          return res.render('auth/login', {
            message: 'Password wrong',
            layout:'layouts/auth-layouts' 
          })
        }
      }
    })
  },

  logout: function(req, res) {
    req.session.destroy()
    res.redirect('/')
  }
  
}