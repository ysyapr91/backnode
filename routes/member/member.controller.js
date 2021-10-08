exports.main = (req, res, next) => {
    console.log('main');
    res.send({ title: 'main'});
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
    var memberObj = [req.body.id, req.body.password];
    var sql = "SELECT seq,id FROM member WHERE id=? AND password=?";
    try {
        global.dbPool.queryParam(sql, memberObj, function(err, data){
            if (err) {
                res.send({msg: 'login fail', err: err});
            } else {
                if(data.length > 0){
                    req.session.user = {
                        id: data[0].id,
                        seq: data[0].seq,
                        authorized: true
                    };
                    msg = 'login success';
                } else {
                    msg = 'login fail';
                }
                res.send({data:data[0], msg: msg});
            };
        });
    } catch (e) {
        console.log(req.url + ' : ' + e);
        res.send({ error: 'error'});
    }
}

exports.logout = (req, res, next) => {
    try {
        if (req.session.user) {
            req.session.destroy(function(err){
                if(err) throw err;
                res.send({msg:'logout done'});
            });
        } else {
            res.send({msg:'go login'});
        }
    } catch {
        console.log(req.url + ' err');
        res.json({ error: 'error'});
    }
}

exports.register = (req, res, next) => {
    var memberObj = {
        id : req.body.id,
        password : req.body.password
    };
    var sql = "INSERT INTO member SET seq = (select yoon.nextval('member')), ?";
    try {
        global.dbPool.queryParam(sql, memberObj, function(err, data){
            if (err) console.log(err);
            else res.send({data: data, msg: ''});
        });
    } catch {
        console.log(req.url + ' err');
        res.json({ error: 'error'});
    }
}

exports.list = (req, res, next) => {
    var sql = 'SELECT seq, id FROM member';    
    try {
        global.dbPool.query(sql, function(err, data){
            if (err) console.log(err);
            else res.send(data);
        });
    } catch {
        console.log(req.url + ' err');
        res.json({ error: 'error'});
    }
}