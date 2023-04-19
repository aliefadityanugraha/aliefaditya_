module.exports = {
  readCollection: function(con, callback) {
    con.db('myblog').collection('d_artikel').find({}).sort({ _id: -1 }).toArray(callback);
  },
  readCollectionWithLimitDocumment: function(con, limit, skip, callback) {
    con.db('myblog').collection('d_artikel').find({}).sort({ _id: -1 }).limit(limit).skip(skip).toArray(callback);
  },
  readOneDocument: function(con, slug, callback) {
    con.db('myblog').collection('d_artikel').findOne({
      slug: slug
    }, callback);
  },
}