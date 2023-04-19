'use strict';

module.exports = {
  error404: function(req, res) {
    res.render('err/404', {
      layout: 'layouts/err-layouts',
      message: '404 - Page not found',
      error: {
        status: 404
      }
    })
  }
}