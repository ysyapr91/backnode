exports.error = (req, res, err) => {
    console.log('error : ' + err);
    res.send({code: 9, msg: 'Error'});
}

//common return data
exports.returnData = (res, data, msg, code) => {
    var date = new Date();
    
    console.log('[' + date.toLocaleString() + '] code : [' + code + '] / msg : [' + msg + '] / data : [' + JSON.stringify(data) + ']');
    if(!code) code = 0;
    if(!msg) msg = '';
    
    res.send({code: code, msg: msg, data: data});
}

//build where grammar for mysql
exports.selectWhere = (list) => {
    var conditions = [];
    var values = [];
    var conditionsStr;
    
    list.forEach(function(params){
        //console.log(params['col'] + ' : ' + params['val']);
        
        if (typeof params['val'] == 'undefined') {
            return;
        }
        
        if (params['sign'] === 'LIKE') {
            conditions.push(params['col'] + ' LIKE ?');
            values.push("%" + params['val'] + "%");
        } else {
            conditions.push(params['col'] + ' = ?');
            values.push(params['val']);
        }
    });
    
    return {
        where: conditions.length ? conditions.join(' AND ') : '1',
        values: values
    };
}