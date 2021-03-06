const path = require('path');
const appRoot = require('app-root-path');
const common = require(appRoot + '/routes/common/common.controller');
const dbconnect = require(appRoot + '/config/db_connect');

exports.main = (req, res, next) => {
    res.send({ title: 'mindmap main'});
}

exports.search = (req, res, next) => {
    var mapList = [
        {col: 'mem_seq', val: req.query.mem_seq},
        {col: 'map_seq', val: req.query.map_seq},
        {col: 'pmap_seq', val: req.query.pmap_seq},
        {col: 'title', val: req.query.title, sign: 'LIKE'},
        {col: 'value', val: req.query.value, sign: 'LIKE'}
    ];
    
    var conditions = common.selectWhere(mapList);
    
    var sql = 'SELECT map_seq, mem_seq, pmap_seq, title, value FROM mindmap WHERE ' + conditions.where; 
    dbconnect.queryParam(sql, conditions.values, function(err, data){
        if (err) common.error(req, res, err);
        else common.returnData(res, data);
    });
}

exports.list = (req, res, next) => {
    var mapList = [
        {col: 'mem_seq', val: req.body.mem_seq},
        {col: 'map_seq', val: req.body.map_seq},
        {col: 'pmap_seq', val: req.body.pmap_seq},
        {col: 'title', val: req.body.title, sign: 'LIKE'},
        {col: 'value', val: req.body.value, sign: 'LIKE'}
    ];
    
    var conditions = common.selectWhere(mapList);
    
    var sql = 'SELECT map_seq, mem_seq, pmap_seq, title, value FROM mindmap WHERE ' + conditions.where; 
    dbconnect.queryParam(sql, conditions.values, function(err, data){
        if (err) common.error(req, res, err);
        else common.returnData(res, data);
    });
}

exports.register = (req, res, next) => {
    var mapObj = {
        title : req.body.title,
        value : req.body.value,
        mem_seq : req.body.mem_seq,
        pmap_seq : req.body.pmap_seq
    };
    
    var sql = "INSERT INTO mindmap SET map_seq = (select yoon.nextval('mindmap')), ?";
    dbconnect.queryParam(sql, mapObj, function(err, data){
        if (err) common.error(req, res, err);
        else common.returnData(res, data, 'regist success');
    });
}
