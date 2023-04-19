module.exports = {
    search: function(con, search, callback) {
        con.db('myblog').collection('d_artikel').find({judul: {$regex: search, $options: "i"}}).toArray(callback);
    }
}