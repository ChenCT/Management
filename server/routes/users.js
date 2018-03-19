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

	var sql = 'SELECT * FROM users WHERE Id ="'+param.userId+'" AND password ="'+param.userPwd+'"' 
	console.log(sql)

	req.getConnection(function(err, conn) {
		if(err) {
			res.json({
				status: '1',
				msg: err,
				result: '' 
			});
			return next(err);
		} else {
			conn.query(sql, [], function(err, result) {
				if(err) {
					return next(err);
				} else {
					if(result[0]) {
						res.cookie('userName', result[0].name, { path:'/', maxAge: 24*60*60 })

						res.json({
	        		status:'0',
	        		msg: '',
	        		result: {
	        			userName: result[0].name,
	        			graduation: result[0].graduation
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
        userName: req.cookies.userName}
    });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});

module.exports = router;
