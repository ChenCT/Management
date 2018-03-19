var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	let name = req.query.name;
	let sql = 'SELECT * FROM chemical ';
	if (name) {
		let namesql = 'WHERE name REGEXP '+'"'+name+'"';
		sql = 'SELECT * FROM chemical '+ namesql;
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
    room:            req.body.room,
    locationId:      req.body.locationId,
    location:        req.body.location,
    responsible:     req.body.responsible,
    dangerous:       req.body.dangerous,
    vacant:          req.body.vacant,
    quantity:        req.body.quantity,
    price:           req.body.price,
    formula:         req.body.formula,
    molecularWeight: req.body.molecularWeight,
    number:          req.body.number,
    traits:          req.body.traits,
    store:           req.body.store,
    use:             req.body.use
	}

	let sql = "INSERT INTO chemical VALUES (null,'"+param.name+"','"+param.room+"','"+param.locationId+"','"+param.location+"','"+param.responsible+"','"+param.dangerous+"','"+param.vacant+"','"+param.quantity+"','"+param.price+"','"+param.formula+"','"+param.molecularWeight+"','"+param.number+"','"+param.traits+"','"+param.store+"','"+param.use+"')";
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
						msg: '新建chemical成功',
						result: ''
					});
				}
			});
		}
	});
});

module.exports = router;