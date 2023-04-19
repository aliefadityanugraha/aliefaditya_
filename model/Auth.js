module.exports = {
  getAccountByEmail: function(con, email, callback) {
    con.db('myblog').collection('d_users').findOne({
      email:email
    }, callback)
  },
  insertAccount: function(con, data, callback) {
    con.db('myblog').collection('d_users').insertOne(data, callback)
  }
}