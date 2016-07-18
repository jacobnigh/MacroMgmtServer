'use strict';
module.exports = function(express) {
  const router = express.Router();
  const async = require('async');
  let inventory = require('../models/users.js');
  const db = require('../db.js');

  router.route('/users')

  //Get request to access all users records in database.
  .get(function(req, res) {
    users.findAll(function(err) {
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  })

  //Put request to create a record in database.
  .put(function(req, res) {
    let data = req.body;

    var savedData = {};

    async.waterfall([
      function(callback) {
        // Create a user passing through the user data
        users.create(data, function(e) {
          res.status(500).json({error: e});
        }, function(userInfo) {
          callback(null, userInfo.dataValues);
        });
      },
      function(userInfo, callback) {
        // Find the newly created user passing through the created user from the previous fn()
        users.find(userInfo, function(e) {
          res.status(500).json({error: e});
        }, function(foundUserInfo) {
          // Construct the response
          savedData = foundUserInfo;
          // pass the object to the final fn() handling the error / response
          callback(null, savedData);
        });
      }
    ],
    function(err, savedData) {
      // Display the error if there is one, otherwise, show the response data from the db
      if(err) {
        res.status(500).json({error: err});
      } else{
        res.status(200).json(savedData);
      }
    });
  });

  router.route('/:userId')

  //Put request to update a record in the database.
  .put(function(req, res) {
    req.body.userId = req.params.userId;
    users.update(req.body, function(err) {
      //Encoutered an error.
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  })

  //Get request to read one record from the database.
  .get(function(req, res) {
    req.body.userId = req.params.userId;
    users.find(req.body, function(err) {
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json(data);
    });
  })

  //Delete reuqest to remove one record from database.
  .delete(function(req, res) {
    req.body.userId = req.params.userId;
    users.destroy(req.body, function(err) {
      res.status(500).json(err);
    }, function(data) {
      res.status(200).json({success: data});
    })
  })

  return router;
}
