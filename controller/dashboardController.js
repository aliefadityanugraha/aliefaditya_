'use strict';

const Dashboard = require('../model/Dashboard');

module.exports = {
  dashboard: (req, res) => {
    Dashboard.readCollectionByUser(req.con, req.session.userid, (err, result) => {
      res.render('main/dashboard/dashboard', {
        title: 'Data Artikel',
        layout: 'layouts/dash-layouts',
        data: result,
        authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
        user: req.session.userid,
      })
    })
  },
  postingan: (req, res) => {
    Dashboard.readCollectionByUser(req.con, req.session.userid, (err, result) => {
      res.render('main/dashboard/postingan', {
        title: 'Data Artikel',
        layout: 'layouts/dash-layouts',
        data: result,
        authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
        user: req.session.userid,
      })
    })
  },
  createView: (req, res) => {
    res.render('main/dashboard/insertArtikel', {
      title: 'Create Artikel',
      layout: 'layouts/formdash-layouts',
      user: req.session.userid,
    })
  },
  insertArticle: (req, res) => {
    Dashboard.insertOneCollection(req.con, req.body, (err, result) => {
      res.redirect('/dashboard/'+ req.session.userid)
    })
  },
  updateView: (req, res) => {
    Dashboard.readOneCollection(req.con, req.params.slug, (err, result) => {
      res.render('main/dashboard/updateArtikel', {
        title: 'Update Artikel',
        layout: 'layouts/formdash-layouts',
        data: result,
        authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
        user: req.session.userid,
      })
    })
  },
  updateArticle: (req, res) => {
    Dashboard.updateCollection(req.con, req.body, req.params.slug, (err, result) => {
      res.redirect('/dashboard/'+ req.session.userid)
    })
  },
  deleteArticle: (req, res) => {
    Dashboard.deleteCollection(req.con, req.params.slug, (err, result) => {
      res.redirect('/dashboard/'+ req.session.userid)
    })
  },
}