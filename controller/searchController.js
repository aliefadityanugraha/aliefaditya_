'use strict';

const searchModel = require('../model/Search');

module.exports = {
  search: function(req, res) {
    searchModel.search(req.con, req.query.s, (err, result) => {
      if (err) throw err
      res.send(result)
    })
  }
}