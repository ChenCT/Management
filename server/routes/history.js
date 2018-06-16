var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	let name = req.query.name;
	let sql = 'SELECT * FROM history ';
	if (name) {
		let namesql = 'WHERE name REGEXP '+'"'+name+'"';
		sql = 'SELECT * FROM history '+ namesql;
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

module.exports = router;