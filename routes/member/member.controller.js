const path = require('path');
const appRoot = require('app-root-path');
const common = require(appRoot + '/routes/common/common.controller');
const dbconnect = require(appRoot + '/config/db_connect');

exports.main = (req, res, next) => {
    res.send({ title: 'member/main'});
}

exports.register = (req, res, next) => {
    var memberObj = {
        id : req.body.id,
        password : req.body.password
    };
    var sql = "INSERT INTO member SET seq = (select yoon.nextval('member')), ?";
    dbconnect.queryParam(sql, memberObj, function(err, data){
        if (err) common.error(req, res, err);
        else common.returnData(res, data);
    });
}

exports.check = (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user) {
        next();
    } else {
        common.returnData(res, {}, 'need login');
    } 
}

exports.login = (req, res, next) => {
    var memberObj = [req.body.id, req.body.password];
    var sql = "SELECT seq,id FROM member WHERE id=? AND password=?";
    dbconnect.queryParam(sql, memberObj, function(err, data){
        if (err) {
            common.error(req, res, err);
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
            common.returnData(res, data[0], msg);
        };
    });
}

exports.logout = (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user) {
        req.session.destroy(function(err){
            if(err) throw err;
            common.returnData(res, {}, 'logout done');
        });
    } else {
        common.returnData(res, {}, 'not login');
    }
}

exports.myInfo = (req, res, next) => {
    console.log(req.session.user);
}

exports.list = (req, res, next) => {
    var sql = 'SELECT seq, id FROM member';
    dbconnect.query(sql, function(err, data){
        if (err) common.error(req, res, err);
        else common.returnData(res, data);
    });
}