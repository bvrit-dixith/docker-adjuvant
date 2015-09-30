var Users = require('../models/users');
var rmdir = require('rimraf');
var xlsxj = require('xlsx-to-json');
var xlsx = require('xlsx');
var root = require('root-path');

module.exports.createUsers = function(req, res) {
	    Users.remove({}, function(err) {
	        if(err) return console.error(err);
	    });

	    var excelFilePath = root(req.file.path);
	    var resourcePath = root('admin', 'resources');
	    var workbook = xlsx.readFile(excelFilePath);

        workbook.SheetNames.forEach(function(sheetName, index) {
            xlsxj({
                    input: excelFilePath,
                    output: null,
                    sheet: sheetName
                  }, function(err, result) {
                    if(err) {
                      console.error(err);
                    }
                    Users.collection.insert(result, function(err, data) {
                        if(err) return console.error(err);
                    });

                  });
        });

        rmdir(root('uploads'), function(err) {
            if(err) return console.error(err);
        });

        res.redirect('/#/manageUsers');

	};

	module.exports.getAllUsers = function(req, res) {
	    Users.find().exec(function(err, users) {
            if(err) {
                console.log("Error in reading users");
                return;
            }
            res.send(users == null ? 404 : users);
        });
	};

	module.exports.getUserByEmpId =  function(req, res) {
        Users.findOne({empId: req.params.empId}).exec(function (err, user) {
            res.send(user == null ? 404 : user);
        });
    };

    module.exports.getUserByInternalNumber = function(req, res) {
        Users.findOne({internalNumber: req.params.internalNumber}).exec(function (err, user) {
            res.send(user == null ? 404 : user);
        });
    };

	module.exports.deleteUser = function(req, res) {
        Users.findOneAndRemove({empId: req.params.empId}).exec(function (err, user) {
            res.send(user == null ? 404 : "success");
        });
    };

    module.exports.addUser = function(req, res) {
        var user = new Users(req.body)

        user.save(function(err) {
            if(err)
                res.send(err);
        });
        res.json(user);
    };

    module.exports.updateUser = function(req, res) {

  		Users.findOneAndUpdate({empId: req.params.empId}, req.body).exec(function(err, user) {
  			if(err) {
  				console.log("Error in updating user", err);
  				return;
  			}
            res.send(user == null ? 404 : user);
  		});
  	};