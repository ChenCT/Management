var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
	let name = req.query.name;
	let sql = 'SELECT * FROM instrument ';
	if (name) {
		let namesql = 'WHERE name REGEXP '+'"'+name+'"';
		sql = 'SELECT * FROM instrument '+ namesql;
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
						status:'0',
						msg: '',
						result: result
					});
				}
			});
		}
	});
});

router.post('/add', function(req,res,next){
	let param = {
		name:          req.body.name,
		specification: req.body.specification,
		quantity:      req.body.quantity,
		price:         req.body.price,
		locationId:    req.body.locationId,
		location:      req.body.location,
		category:      req.body.category,
		room:          req.body.room,
		vacant:        req.body.vacant,
		responsible:   req.body.responsible,
	}

	let sql = "INSERT INTO instrument VALUES (null,'"+param.name+"','"+param.specification+"','"+param.quantity+"','"+param.price+"','"+param.locationId+"','"+param.location+"','"+param.category+"','"+param.room+"','"+param.vacant+"','"+param.responsible+"')";
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
						msg: '新建instrument成功',
						result: ''
					});
				}
			});
		}
	});
});

module.exports = router;