const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (db) {
                _db = db.db("myDB");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    },
};