const Mongodb = require('mongodb');
/** Mongodb connection */
exports.Mongodb = new Mongodb.Db('autumn', new Mongodb.Server('localhost', 27017), {
  safe: true
});
