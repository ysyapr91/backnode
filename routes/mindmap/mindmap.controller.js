const path = require('path');
const appRoot = require('app-root-path');
const memberCtr = require(appRoot + '/routes/member/member.controller');

exports.main = (req, res, next) => {
    res.send({ title: 'mindmap main'});
}

exports.login = (req, res, next) => {
    memberCtr.login(req, res, next);
}

exports.memberlist = (req, res, next) => {
    memberCtr.list(req, res, next);
}

exports.list = (req, res, next) => {
    var sql = 'SELECT map_seq, mem_seq, p_map, title, value FROM mindmap';    
    global.dbPool.query(sql, function(err, data){
        if (err) console.log(err);
        else res.send(data);
    });
}

exports.register = (req, res, next) => {
    var mindmapObj = {
        title : req.query.title,
        value : req.query.value,
        p_map : req.query.p_map
    };
    
    if (req.session.user) mindmapObj.mem_seq = req.session.user.seq;
    
    var sql = "INSERT INTO mindmap SET map_seq = (select yoon.nextval('mindmap')), ?";
    global.dbPool.queryParam(sql, mindmapObj, function(err, data){
        if (err) console.log(err);
        else res.send(data);
    });
}

exports.delete = (req, res, next) => {
    
}