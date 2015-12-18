var mongoUrl = process.env.MONGODB_PORT_27017_TCP_ADDR ? 'mongodb://' + process.env.MONGODB_PORT_27017_TCP_ADDR +  ':' + process.env.MONGODB_PORT_27017_TCP_PORT +  '/adjuvant' : 'mongodb://localhost/adjuvant';
module.exports = {

	url : mongoUrl,
	testUrl : 'mongodb://localhost/testAdjuvant'
}