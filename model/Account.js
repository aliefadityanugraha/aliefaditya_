module.exports = {
  getAccountByEmail: function(con, email, callback) {
    con.db('myblog').collection('d_users').findOne({
      email:email
    }, callback)
  },
  updateAccountPassword: function(con, password, email, callback) {
    con.db('myblog').collection('d_users').updateOne({
      email:email
    }, {
      $set: {
        password: password
      }
    }, callback)
  },
  deleteAccount: function(con, email, callback) {
    con.db('myblog').collection('d_users').deleteOne({
      email:email
    }, callback)
  },
  saveAccountData: function(con, data_, email, callback) {
    con.db('myblog').collection('d_users').updateOne({
      email:email
    }, {
      $set: {
        data: {
          name:data_.name,
          birth:data_.birth,
          description:data_.description,
        }
      }
    }, callback)
  },
  saveProfilePicture: function(con, profile, email, callback) {
    con.db('myblog').collection('d_users').updateOne({
      email:email
    }, {
      $set: {
        profile:profile,
      }
    }, callback)
  }
}