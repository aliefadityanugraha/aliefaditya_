'use strict';

const ReportModel = require('../model/Report');

module.exports = {
    report: function (req, res) {
        res.render('main/report', {
          title: 'Report',
          layout: 'layouts/main-layouts',
          message: 'noMessage',
          authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
          url_app: process.env.URL_ROOT
        })
    },
    storeReport: function (req, res) {
      ReportModel.store(req.con, req.body, (err, result) => {
        res.render('main/report', {
          title: 'Report',
          layout: 'layouts/main-layouts',
          message: 'Thanks you for your report',
          authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
          url_app: process.env.URL_ROOT
        })
      })
    }
}