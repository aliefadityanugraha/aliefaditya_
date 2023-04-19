'use strict';

module.exports = {
  insertGenerateValue: function(con, data, callback) {
    con.db('myblog').collection('d_resetpass').insertOne(data, callback)
  },
  getGenerateValue: function(con, email, callback) {
    con.db('myblog').collection('d_resetpass').findOne({
      email: email
    }, callback)
  },
  getAccountByEmail: function(con, email, callback) {
    con.db('myblog').collection('d_users').findOne({
      email:email
    }, callback)
  },
  getAccoutnByKeyValue: function(con, key, callback) {
    con.db('myblog').collection('d_resetpass').findOne({
      randomValue: key
    }, callback)
  },
  updateAccountByKeyValue: function(con, key, send, callback) {
    con.db('myblog').collection('d_resetpass').updateOne({
      randomValue: key
    }, {
      $set: {
        send: send
      }
    }, callback)
  }
}