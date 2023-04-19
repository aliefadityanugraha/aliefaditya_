'use strict';

const adminModel = require('../model/Admin');

module.exports = {
  dashboard: (req, res) => {
    adminModel.lengthCollection(req.con, (err, result) => {
      res.render('admin/dashboard', {
        title: 'Dashboard',
        layout: 'layouts/admin-layouts',
        data: result,
        authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
        authUserAdmin: req.session.userid,
      })
    })
  },
  dataArtikel: (req, res) => {
    adminModel.readCollection(req.con, (err, result) => {
      res.render('admin/data-artikel', {
        title: 'Data Artikel',
        user: req.session.user,
        layout: 'layouts/admin-layouts',
        data: result,
        authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
        authUserAdmin: req.session.userid,
      })
    })
  },
  createView: (req, res) => {
    res.render('admin/create', {
      title: 'Create Artikel',
      layout: 'layouts/form-layouts',
      user: req.session.userid
    })
  },
  insertArticle: (req, res) => {
    adminModel.insertCollection(req.con, req.body, (err, result) => {
      res.redirect('/data-artikel')
    })
  },
  updateView: (req, res) => {
    adminModel.readOneCollection(req.con, req.params.slug, (err, result) => {
      res.render('admin/edit', {
        title: 'Update Artikel',
        layout: 'layouts/form-layouts',
        data: result,
      })
    })
  },
  updateArticle: (req, res) => {
    adminModel.updateCollection(req.con, req.body, req.params.slug, (err, result) => {
      res.redirect('/data-artikel')
    })
  },
  deleteArticle: (req, res) => {
    adminModel.deleteCollection(req.con, req.params.slug, (err, result) => {
      res.redirect('/data-artikel')
    })
  },
  dataUser: (req, res) => {
    adminModel.readCollection(req.con, (err, result) => {
      res.render('admin/data-user', {
        title: 'Data User',
        user: req.session.user,
        layout: 'layouts/admin-layouts',
        data: result,
        authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
        authUserAdmin: req.session.userid,
      })
    })
  },
}