var express = require('express');
var router = express.Router();

router.post('/borrow', function(req, res, next) {
	let param = {
		materialId:   req.body.Id,
		materialName: req.body.name,
		specification:req.body.specification,
		borrower:     req.body.borrower,
		responsible:  req.body.responsible,
		amount:       req.body.amount,
		date:         req.body.date,
		instructions: req.body.instructions,
		category:     req.body.category,
		dangerous:     req.body.dangerous
	}
    
	let tag=1;
	if(param.dangerous==='是'){
		tag=0;
	}
	let sql = " INSERT INTO borrowrecords VALUES (null,'"+param.materialId+"','"+param.materialName+"','"+param.specification+"','"+param.borrower+"','"+param.responsible+"','"+param.amount+"','"+param.date+"','"+param.instructions+"','"+tag+"','"+param.category+"','"+param.dangerous+"');"
	
  let category='';
	if(param.category=='药品试剂原料'){
		category='chemical';
	}else if(param.category=='玻璃塑料仪器'){
		category='instrument';
	}else if(param.category=='设备仪器'){
		category='equipment';
	}else if(param.category=='小工具'){
		category='tool';
	}
  
  let sql2=" UPDATE "+category+" SET updatetime='"+param.date+"' WHERE Id='"+param.materialId+"'; "
	console.log(sql)
	console.log(sql2)

	req.getConnection(function(err, conn) {
		if (err) {
			res.json({
				status: '1',
				msg: err,
				result: ''
			});
			return next(err);
		} else {
			conn.query(sql, [], function(err,result) {
				if(err) {
					return next(err);
				} else {
					conn.query(sql2, [], function(err,result) {
						if(err) {
							return next(err);
						} else {		
							res.json({
								status: '0',
								msg: '提交申请成功',
								result: ''
							});
						}
					})
				}
			})
		}
	})
});

router.get('/application', function(req, res, next) {
	let borrower = req.query.name
	if(!borrower){
		borrower = req.cookies.userName
	}
	let sql = "SELECT * FROM borrowrecords WHERE borrower = '"+borrower+"' ORDER BY date DESC;"
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

router.get('/approval', function(req, res, next) {
	let responsible = req.query.name
	if(!responsible){
		responsible = req.cookies.userName
	}
	let sql = "SELECT * FROM borrowrecords WHERE responsible = '"+responsible+"' and status='0';"
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

router.post('/accept', function(req, res, next) {
	let param = {
		recordId:   req.body.Id,
	}

	var sql = " UPDATE borrowrecords SET status='1' WHERE recordId='"+param.recordId+"';"
	console.log(sql)

	req.getConnection(function(err, conn) {
		if (err) {
			res.json({
				status: '1',
				msg: err,
				result: ''
			});
			return next(err);
		} else {
			conn.query(sql, [], function(err,result) {
				if(err) {
					return next(err);
				} else {
					res.json({
						status: '0',
						msg: '通过申请',
						result: ''
					});
				}
			})
		}
	})
});

router.post('/refuse', function(req, res, next) {
	let param = {
		recordId:   req.body.Id,
	}

	var sql = " UPDATE borrowrecords SET status='3' WHERE recordId='"+param.recordId+"';"
	console.log(sql)

	req.getConnection(function(err, conn) {
		if (err) {
			res.json({
				status: '1',
				msg: err,
				result: ''
			});
			return next(err);
		} else {
			conn.query(sql, [], function(err,result) {
				if(err) {
					return next(err);
				} else {
					res.json({
						status: '0',
						msg: '拒绝申请',
						result: ''
					});
				}
			})
		}
	})
});

router.post('/return', function(req, res, next) {
	let param = {
		recordId:   req.body.Id,
	}

	var sql = " UPDATE borrowrecords SET status='2' WHERE recordId='"+param.recordId+"';"
	console.log(sql)

	req.getConnection(function(err, conn) {
		if (err) {
			res.json({
				status: '1',
				msg: err,
				result: ''
			});
			return next(err);
		} else {
			conn.query(sql, [], function(err,result) {
				if(err) {
					return next(err);
				} else {
					res.json({
						status: '0',
						msg: '归还成功',
						result: ''
					});
				}
			})
		}
	})
});
router.get('/record', function(req, res, next) {
	// let borrower = req.query.name
	let sql = "SELECT * FROM borrowrecords;"
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

module.exports = router;