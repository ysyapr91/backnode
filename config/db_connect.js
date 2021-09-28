var mysql = require('mysql');
 
module.exports = function () {
    var config = require('./db_config');
    var pool = mysql.createPool({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        connectionLimit: config.connectionLimit
    });

    return {
        getConnection: function (callback) {
            pool.getConnection(callback);
        },
        query: function (sql, callback){
            pool.getConnection(function(err, con){
                con.query(sql, function (err, result, fields) {
                    con.release();
                    if (err) return callback(err);
                    callback(null, result);
                });
             });
        },
        queryParam: function (sql, param, callback){
            pool.getConnection(function(err, con){
                con.query(sql, param, function (err, result, fields) {
                    con.release();
                    if (err) return callback(err);
                    callback(null, result);
                });
             });
        },
        end: function(callback){
            pool.end(callback);
        }
    }
}();