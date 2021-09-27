exports.users = (req, res, next) => {
    //res.send('respond with a resource');
    exports.check(req, res, next);
}

exports.check = (req, res, next) => {
    console.log('checking' + req.url);
    next();
}

exports.list = (req, res, next) => {
    var sql = 'select * from yoon.member';
    try {
        conn.query(sql, function (err, rows, fields) {
            if(err) console.log('query is not excuted. select fail....\n' + err);
            else res.render('list.ejs', {list : rows});
            console.log(rows);
        });
    } catch {
        console.log(req.url + ' err');
        res.json({ error: 'error'});
    }
}

exports.login = (req, res, next) => {
    var sql = 'select * from yoon.member';    
    try {
        conn.query(sql, function (err, rows, fields) {
            if(err) console.log('query is not excuted. select fail....\n' + err);
            else res.render('list.ejs', {list : rows});
            console.log(rows);
        });
    } catch {
        console.log(req.url + ' err');
        res.json({ error: 'error'});
    }
}