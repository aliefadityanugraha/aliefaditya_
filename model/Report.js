var options = { weekday: 'long',day: 'numeric', year: 'numeric', month: 'long' }
var today  = new Date().toLocaleDateString("id-US", options)

module.exports = {
  store: function(con, data, callback) {
    const data_ = {username: data.username, email: data.email, description:data.description, created_at: today}
    con.query('INSERT INTO report SET ?', data_, callback)
  },
}