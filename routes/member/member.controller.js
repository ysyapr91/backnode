exports.main = (req, res, next) => {
    exports.check(req, res, next);
}

exports.check = (req, res, next) => {
    console.log('checking : ' + req.url);
    next();
}

exports.login = (req, res, next) => {
    try {
        console.log('login : ' + req.url);
    } catch {
        console.log(req.url + ' err');
        res.json({ error: 'error'});
    }
}

exports.register = (req, res, next) => {
    var memberObj = {
        id : req.query.id,
        password : req.query.password
    };
    var sql = "INSERT INTO member SET seq = (select nextval('member')), ?";
    global.dbPool.queryParam(sql, memberObj, function(err, data){
        if (err) console.log(err);
        else res.send(data);
    });
}

exports.list = (req, res, next) => {
    var sql = 'SELECT * FROM member';    
    global.dbPool.query(sql, function(err, data){
        if (err) console.log(err);
        else res.send(data);
    });
}
