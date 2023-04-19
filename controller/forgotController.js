'use strict';

const nodeMailer = require('nodemailer');
const { generateRandomVal } = require('../handler/generateRandomValue');
const Forget = require('../model/Forget');
const Account = require('../model/Account');
const crypto = require('crypto');

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

module.exports = {
  forgotPass: (req, res) => {
    res.render('auth/forgotpass', {
      title: 'Forgot Password',
      authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
      layout: 'layouts/auth-layouts',
      message: false
    });
  },
  sendEmail: async function (req, res) {

    await Forget.getAccountByEmail(req.con, req.body.email, (err, result) => {

      if(result == null) {

        return res.render('auth/forgotpass', {
          message: 'User not Registered, please register',
          layout: 'layouts/auth-layouts',
        });

      } else {

        const randomVal = generateRandomVal(30);
        const shareLink = `${req.protocol}://${req.get('host')}/auth/reset/${randomVal}`;
        Forget.insertGenerateValue(req.con, {
          email: req.body.email,
          randomValue: randomVal,
          shareLink: shareLink,
          send: true,
          createdAt: new Date()
        }, (err, result) => {

          const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD
            }
          });

          const mailOptions = {
            from: 'TechtoLove | Reset Password <aliefaditya2005@gmail.com>',
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            html: `
            <!doctype html>
            <html lang="en-US">
            <head>
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
              <title>Reset Password Email Template</title>
              <meta name="description" content="Reset Password Email Template.">
              <style type="text/css">
                a:hover {text-decoration: underline !important;}
              </style>
            </head>
            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
              <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);font-family: 'Open Sans', sans-serif;">
                <tr>
                  <td>
                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="height:80px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="text-align:center;">
                          <a href="https://rakeshmandal.com" title="logo" target="_blank">
                            <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td>
                          <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                              <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                              <td style="padding:0 35px;">
                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have requested to reset your password</h1>
                                <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                We cannot simply send you your old password. A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions.
                                </p>
                                <p>
                                  If you did not make this request then please ignore this email.
                                </p>
                                <a href="${shareLink}" style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                ResetPassword
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td style="height:40px;">&nbsp;</td>
                            </tr>
                          </table>
                        </td>
                      <tr>
                          <td style="height:20px;">&nbsp;</td>
                      </tr>
                      <tr>
                          <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.techtolove.com</strong></p>
                          </td>
                      </tr>
                      <tr>
                          <td style="height:80px;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            `
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          if(err) {
            console.error(err);
          }

        });
        res.render('auth/forgotpass', {
          layout: 'layouts/auth-layouts',
          message: 'Email sent successfully',
        })
      }
    });

  },

  resetPass: (req, res) => {
    Forget.getAccoutnByKeyValue(req.con, req.params.key, (err, result) => {
      if(result.send == false) {
        return res.render('auth/expiredLink', {
          layout: 'layouts/auth-layouts',
          message: 'Link has been expired',
        })
      } else {
        return res.render('auth/resetpass', {
          layout: 'layouts/auth-layouts',
          key: req.params.key,
          message: false
        });
      }
    })
  },

  updatePassword: function(req, res) {

    if(req.body.password === req.body.confirmPassword) {
      Forget.getAccoutnByKeyValue(req.con, req.params.key, (err, result) => {
        Account.updateAccountPassword(req.con, getHashedPassword(req.body.password), result.email, (err, result) => {
          Forget.updateAccountByKeyValue(req.con, req.params.key, false, (err, result) => {
            return res.redirect('/login');
          });
        });
      });
    } else {
      res.render('auth/forgotpass', {
        message: 'Password dont match',
        layout:'layouts/auth-layouts' 
      })
    }

  }

}