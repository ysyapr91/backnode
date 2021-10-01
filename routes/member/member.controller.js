exports.main = (req, res, next) => {
    console.log('main');
}

exports.error = (req, res, next) => {
    try {
        console.log('error : ' + req.url);
        exports.check(req, res, next);
    } catch {
        console.log(req.url + ' err');
        res.json({ error: 'error'});
    }
}

exports.check = (req, res, next) => {
    console.log('checking : ' + req.url);

    if (req.session.user) {
        next();
    } else {
        res.send({msg:'need login'});
    } 
}

exports.login = (req, res, next) => {
    var memberObj = [req.query.id, req.query.password];
    var sql = "SELECT seq,id FROM member WHERE id=? AND password=?";
    global.dbPool.queryParam(sql, memberObj, function(err, data){
        if (err) {
            console.log(err);
            res.send({msg:'login fail'});
        } else {
            if(data.length > 0){
                req.session.user = {
                    id: data[0].id,
                    seq: data[0].seq,
                    authorized: true
                };
            } else {
               res.send({msg:'login fail'});
            }
            res.send(data);
        };
    });
}

exports.logout = (req, res, next) => {
    if (req.session.user) {
        req.session.destroy(function(err){
            if(err) throw err;
            res.send({msg:'logout done'});
        });
    } else {
        res.send({msg:'go login'});
    }
}

exports.register = (req, res, next) => {
    var memberObj = {
        id : req.query.id,
        password : req.query.password
    };
    var sql = "INSERT INTO member SET seq = (select yoon.nextval('member')), ?";
    global.dbPool.queryParam(sql, memberObj, function(err, data){
        if (err) console.log(err);
        else res.send(data);
    });
}

exports.list = (req, res, next) => {
    var sql = 'SELECT seq, id FROM member';    
    global.dbPool.query(sql, function(err, data){
        if (err) console.log(err);
        else res.send(data);
    });
}