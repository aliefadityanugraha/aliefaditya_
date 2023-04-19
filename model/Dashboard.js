var options = { weekday: 'long',day: 'numeric', year: 'numeric', month: 'long' }
var today  = new Date().toLocaleDateString("id-US", options)

module.exports = {
  readCollectionByUser: function(con, user, callback) {
    con.db('myblog').collection('d_artikel').find({author:user}).sort({ _id: -1 }).toArray(callback);
  },
  readOneCollection : function(con, slug, callback) {
    con.db('myblog').collection('d_artikel').findOne({slug:slug}, callback);
  },
  insertOneCollection: function(con, data, callback) {
    const data_ = {
      judul: data.judul,
      thumbnail_url:data.thumbnail_url,
      slug:data.slug,
      rubrik:data.rubrik,
      prev_text:data.prev_text,
      content:data.content,
      author:data.author,
      created_at:today,
      updated_at:today,
    }
    con.db('myblog').collection('d_artikel').insertOne(data_, callback);
  },
  updateCollection: function(con, data, slug, callback) {
    con.db('myblog').collection('d_artikel').updateOne({
      slug: slug
    }, {
      $set: {
        judul: data.judul,
        thumbnail_url:data.thumbnail_url,
        slug:data.slug,
        rubrik:data.rubrik,
        prev_text:data.prev_text,
        content:data.content,
        author:data.author,
        updated_at:today,
      }
    }, callback);
  },
  deleteCollection: function(con, slug, callback) {
    con.db('myblog').collection('d_artikel').deleteOne({
      slug: slug
    }, callback);
  },
}