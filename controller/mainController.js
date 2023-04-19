/** @format */

"use strict";

const Main = require("../model/Main");
const Auth = require("../model/Auth");
const Category = require("../model/Category");

module.exports = {
  home: (req, res) => {
    Main.readCollection(req.con, (err, result) => {
      const jumlahDataPerHalaman = 5;
      const jumlahdataArtikel = result.length;
      const jumlahHalaman = Math.ceil(jumlahdataArtikel / jumlahDataPerHalaman);

      const halamanActive =
        typeof req.params.page === "undefined" ? 1 : req.params.page;

      const dataAwal =
        jumlahDataPerHalaman * halamanActive - jumlahDataPerHalaman;

      Main.readCollectionWithLimitDocumment(
        req.con,
        jumlahDataPerHalaman,
        dataAwal,
        (err, result) => {
          res.render("main/home", {
            result,
            layout: "layouts/main-layouts",
            jumlahHalaman: jumlahHalaman,
            halamanActive: halamanActive,
            jumlahdataArtikel: jumlahdataArtikel,
            authentication:
              req.session.userid === "undefined" ? false : req.session.userid,
          });
        }
      );
    });
  },
  read: function (req, res) {
    Main.readOneDocument(req.con, req.params.slug, (err, result) => {
      res.render("main/read", {
        data: result,
        layout: "layouts/main-layouts",
        authentication:
          req.session.userid === "undefined" ? false : req.session.userid,
      });
    });
  },
  account: function (req, res) {
    Auth.getAccountByEmail(req.con, req.session.userid, (err, result) => {
      res.render("main/account", {
        data: result,
        dataUser: result.data,
        layout: "layouts/main-layouts",
        authentication:
          req.session.userid === "undefined" ? false : req.session.userid,
      });
    });
  },
  about: function (req, res) {
    res.render("main/about", {
      layout: "layouts/main-layouts",
      authentication:
        req.session.userid === "undefined" ? false : req.session.userid,
    });
  },
  report: function (req, res) {
    res.render("main/report", {
      layout: "layouts/main-layouts",
      authentication:
        req.session.userid === "undefined" ? false : req.session.userid,
    });
  },
  category: function (req, res) {
    Category.getCategory(req.con, (err, result) => {
      res.render("main/category", {
        data: result,
        layout: "layouts/main-layouts",
        authentication:
          req.session.userid === "undefined" ? false : req.session.userid,
      });
    });
  },
};
