'use strict';

module.exports = function(express) {

  const router = express.Router();
  const async = require('async');
  const db = require('../server/db.js');

  let users = require('../models/users.js');
  let intolerances = require('../models/intolerances.js');

  router.route('/')

  .put((req, res) => {
    let data = req.body;

    async.waterfall([
      (callback) => {
        users.find(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (foundUser) => {
          callback(null, foundUser);
        });
      },
      (foundUser, callback) => {
        intolerances.create(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (createdIntolerance) => {
          callback(null, createdIntolerance);
        });
      }
    ],
    (err, createdIntolerance) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ createdIntolerance });
    });
  })

  .delete((req, res) => {
    let data = req.body;

    async.waterfall([
      (callback) => {
        intolerances.destroy(data,
        (err) => {
          res.status(500).json({ error: err });
        },
        (deletedIntolerance) => {
          callback(null, deletedIntolerance);
        });
      }
    ],
    (err, deletedIntolerance) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ deletedIntolerance });
    });
  });

  router.route('/:userId')

  .get((req, res) => {
    let userId = req.params.userId;

    async.waterfall([
      (callback) => {
        intolerances.findAll(
        (err) => {
          res.status(500).json({ error: err });
        },
        (allIntolerances) => {
          let userIntolerances = [];
          for(let i = 0; i < allIntolerances.length; i++) {
            if(allIntolerances[i].userId === userId) {
              userIntolerances.push(allIntolerances[i]);
            }
          }
          callback(null, userIntolerances);
        });
      }
    ],
    (err, userIntolerances) => {
      if(err) {
        res.status(500).json({ error: err });
      }
      res.status(200).json({ userIntolerances });
    });
  });

  return router;

};
