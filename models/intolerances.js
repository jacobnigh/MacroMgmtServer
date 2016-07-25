'use strict';

module.exports = function() {

  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = data;
    db.intolerances.create(payload)
    .then(success)
    .catch(err)
  }

  function _find(data, err, success) {
    let payload = data;
    db.intolerances.findAll({where: {intoleranceId: payload.intoleranceId}})
    .then(success)
    .catch(err);
  }

  function _findAll(err, success) {
    db.intolerances.findAll()
    .then(success)
    .catch(err);
  }

  function _update(data, err, success) {
    let payload = data;
    db.intolerances.find({where: {userId: payload.intoleranceId}})
    .then(function(matchedIntolerance) {
      matchedIntolerance.updateAttributes(payload)
      .then(success)
      .catch(err)
    })
    .catch(err)
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.intolerances.destroy({where: {intoleranceId: payload.intoleranceId}})
    .then(success)
    .catch(err);
  }

  function _findOrCreate(data, err, success) {
    let payload = data;
    db.users.findOrCreate({
      where: {
        intoleranceId: payload.intoleranceId
      },
      defaults: {
        intoleranceId: payload.intoleranceId,
        name: payload.name
      }
    })
    .then(success)
    .catch(err);
  }

  return {
    create: _create,
    update: _update,
    find: _find,
    findAll: _findAll,
    destroy: _destroy
  }

}();
