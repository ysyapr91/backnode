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
            try{
                pool.getConnection(callback);
            } catch (e) {
                console.log('db_connect getConnection ERROR : ' + e);
            }
        },
        query: function (sql, callback){
            try{
                pool.getConnection(function(err, con){
                    con.query(sql, function (err, result, fields) {
                        con.release();
                        if (err) return callback(err);
                        callback(null, result);
                    });
                });
            } catch (e) {
                console.log('db_connect query ERROR : ' + e);
            }
        },
        queryParam: function (sql, param, callback){
            try{
                pool.getConnection(function(err, con){
                    con.query(sql, param, function (err, result, fields) {
                        con.release();
                        if (err) return callback(err);
                        callback(null, result);
                    });
                });
            } catch (e) {
                console.log('db_connect queryParam ERROR : ' + e);
            }
            
        },
        end: function(callback){
            pool.end(callback);
        }
    }
}();