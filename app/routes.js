var orderHandler = require('./handlers/order');
var beverageHandler = require("./handlers/beverage");
var userHandler = require("./handlers/users");
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var moment = require('moment');

module.exports = function(app) {

	app.post('/api/beverages/', beverageHandler.create);
	app.put('/api/beverages/:id', beverageHandler.update);
	app.get('/api/beverages/', beverageHandler.findAll);
	app.get('/api/beverages/:id', beverageHandler.findById);
	app.delete('/api/beverages/:id', beverageHandler.delete);
	app.post('/api/beverages/updateWithUpsert', beverageHandler.updateWithUpsert)

	app.post('/api/createUsers', upload.single('users'), userHandler.createUsers);
	app.get('/api/users/', userHandler.getAllUsers);
	app.get('/api/users/empId/:empId', userHandler.getUserByEmpId);
    app.get('/api/users/internalNumber/:internalNumber', userHandler.getUserByInternalNumber);
	app.delete('/api/users/:empId/', userHandler.deleteUser);
    app.post('/api/users/', userHandler.addUser);
    app.put('/api/users/:empId/', userHandler.updateUser);

	app.post('/api/orders', orderHandler.create);
	app.get('/api/orders', orderHandler.allOrders);
    app.get('/api/orders/:date/', orderHandler.ordersForSingleDay);
	app.get('/api/orders/:startDate/:endDate', orderHandler.ordersForSelectPeriod);
};

