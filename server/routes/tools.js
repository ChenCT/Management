var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	let name = req.query.name;
	let sql = 'SELECT * FROM tool ';
	if (name) {
		let namesql = 'WHERE name REGEXP '+'"'+name+'"';
		sql = 'SELECT * FROM tool '+ namesql;
	}

	console.log(sql)	 

	req.getConnection(function(err, conn){
		if(err) {
			return next(err);
		} else {
			conn.query(sql, [], function(err,result){
				if (err) {
					return next(err);
				} else {
					res.json({
						status:'1',
						result:result
					});
				}
			});
		}
	});
});

router.post('/add', function(req,res,next){
	let param = {
		name:            req.body.name,
    specification:   req.body.specification,
    quantity:        req.body.quantity,
    price:           req.body.price,
    locationDes:     req.body.locationDes,
    locationId:      req.body.locationId,
    location:        req.body.location,
    category:        req.body.category,
    room:            req.body.room,
    vacant:          req.body.vacant,
    responsible:     req.body.responsible,
    inDate:          req.body.inDate,
    laboratory:      req.body.laboratory
	}

	let sql = "INSERT INTO tool VALUES (null,'"+param.name+"','"+param.specification+"','"+param.quantity+"','"+param.price+"','"+param.locationDes+"','"+param.locationId+"','"+param.location+"','"+param.category+"','"+param.room+"','"+param.vacant+"','"+param.responsible+"','"+param.inDate+"','"+param.laboratory+"','"+param.inDate+"')";
	let sql2 = "INSERT INTO history VALUES (null,'"+param.name+"','"+param.specification+"','"+param.quantity+"','"+param.inDate+"','小工具','"+param.price+"','"+param.laboratory+"','"+param.category+"');"
	console.log(sql)	 

	req.getConnection(function(err, conn){
		if(err) {
			return next(err);
		} else {
			conn.query(sql, [], function(err,result){
				if (err) {
					return next(err);
				} else {
					conn.query(sql2, [], function(err,result){
						if (err) {
							return next(err);
						} else {		
							res.json({
								status:'0',
								msg: '新建tool成功',
								result: ''
							});
						}
					});
				}
			});
		}
	});
});

router.post('/delete', function(req,res,next){
	let param = {
		Id: req.body.Id
	}

	let sql = 'DELETE FROM tool where Id="'+param.Id+'";'
	console.log(sql)

	req.getConnection(function(err, conn){
		if(err) {
			return next(err);
		} else {
			conn.query(sql, [], function(err,result){
				if (err) {
					return next(err);
				} else {
					res.json({
						status:'0',
						msg: '删除tool成功',
						result: ''
					});
				}
			});
		}
	});
});


module.exports = router;