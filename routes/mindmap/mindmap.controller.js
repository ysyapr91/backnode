exports.main = (req, res, next) => {
    res.send({ title: 'Express'});
}

exports.list = (req, res, next) => {
    var sql = 'SELECT * FROM mindmap';    
    global.dbPool.query(sql, function(err, data){
        if (err) console.log(err);
        else res.send(data);
    });
}