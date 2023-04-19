'use strict';

module.exports = {
  getCategory: function(con, callback) {
    con.db('myblog').collection('d_category').find({}).sort({ _id: -1 }).toArray(callback);
  }
}