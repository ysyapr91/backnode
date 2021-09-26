exports.users = (req, res, next) => {
    res.send('respond with a resource');
}

exports.list = (req, res, next) => {
    var sql = 'select * from yoon.member';    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail....\n' + err);
        else res.render('list.ejs', {list : rows});
        console.log(rows);
    });
}