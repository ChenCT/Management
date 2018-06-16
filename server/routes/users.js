var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
	let param = {
		userId: req.body.userId,
		userPwd: req.body.userPwd
	}
	let sql = 'SELECT * FROM users WHERE Id ="'+param.userId+'" AND password ="'+param.userPwd+'"' 

	req.getConnection(function(err, conn) {
		if(err) {
			return next(err);
		} else {
			conn.query(sql, [], function(err, result) {
				if(err) {
					return next(err);
				} else {
					if(result[0]) {
						res.cookie('userName', result[0].name, { path:'/', maxAge: 24*60*60 })
						res.cookie('authority', result[0].authority, { path:'/', maxAge: 24*60*60 })
						res.cookie('laboratory', result[0].laboratory, { path:'/', maxAge: 24*60*60 })

						res.json({
	        		status:'0',
	        		msg: '',
	        		result: {
	        			userName: result[0].name,
	        			graduation: result[0].graduation,
	        			authority: result[0].authority,
	        			laboratory: result[0].laboratory
	        		}
	        	});
					} else {
						res.json({
	        		status:'1',
	        		msg: '用户名或密码错误',
	        		result: ''
	        	});
					}		
				}
			})
		}
	})
});

router.post('/logout',function(req,res,next){
	res.clearCookie("userName",{ path:'/' });
	res.clearCookie("authority",{ path:'/' });
	res.clearCookie("laboratory",{ path:'/' });
	res.json({
		status:"0",
		msg:'用户已退出',
		result:''
	});
});

router.get('/checkLogin',function(req,res,next){
  if( req.cookies.userName ){
    res.json({
      status:'0',
      msg:'',
      result:{
        userName: req.cookies.userName,
        laboratory: req.cookies.laboratory,
        authority: req.cookies.authority}
    });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});

router.get('/viewp',function(req,res,next){
  let laboratory = req.query.laboratory;
  let name = req.query.name;
  let sql = 'SELECT * FROM users';
  if(laboratory) {
  	 sql = 'SELECT * FROM users WHERE laboratory="'+laboratory+'"';
  }
	if (name) {
		sql = 'SELECT * FROM users WHERE laboratory="'+laboratory+'" AND name="'+name+'"';
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

router.post('/newp', function(req, res, next) {
	let param = {	
    Id:         req.body.Id,
    name:       req.body.name,
    password:   req.body.password,
    authority:  req.body.authority,
    enrollment: req.body.enrollment,
    graduation: req.body.graduation,
    laboratory: req.body.laboratory
	}

	var sql = 'INSERT INTO users VALUES ("'+param.Id+'","'+param.name+'","'+param.password+'","'+param.authority+'","'+param.enrollment+'","'+param.graduation+'","'+param.laboratory+'");' 
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
						msg: '新建user成功',
						result: ''
					});
				}
			});
		}
	});
});

router.post('/delete', function(req, res, next) {
	let param = {	
    Id: req.body.Id
	}

	let sql = 'DELETE FROM users where Id="'+param.Id+'";'
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
						msg: '删除user成功',
						result: ''
					});
				}
			});
		}
	});
});
module.exports = router;
