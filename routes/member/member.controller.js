exports.users = (req, res, next) => {
    exports.check(req, res, next);
}

exports.check = (req, res, next) => {
    console.log('checking : ' + req.url);
    next();
}

exports.list = (req, res, next) => {
    var sql = 'select * from member';    
        global.dbPool.select(sql, function(err, data){
            if (err) console.log(err);
            else res.send(data);
        });
        /*
        global.dbPool.getConnection(function(err, con){
            con.query(sql, function (err, result, fields) {
                con.release();
                if (err) return callback(err);
                res.send(result);
            });
        });
        */
}

exports.login = (req, res, next) => {
    try {
        console.log('login : ' + req.url);
    } catch {
        console.log(req.url + ' err');
        res.json({ error: 'error'});
    }
}