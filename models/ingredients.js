'use strict';

module.exports = function() {

  const db = require('../server/db.js');
  const sequelize = db.connection;

  function _create(data, err, success) {
    let payload = {
      listId: data.listId,
      name: data.name
    };
    db.ingredients.create(payload)
    .then(success)
    .catch(err)
  }

  function _find(data, err, success) {
    let payload = data;
    db.ingredients.findAll({
      where: {
        listId: payload.listId,
        ingredientId: payload.ingredientId
      }
    })
    .then(success)
    .catch(err)
  }

  function _findAll(err, success) {
    db.ingredients.findAll()
    .then(success)
    .catch(err)
  }

  function _update(data, err, success) {
    let payload = data;
    db.ingredients.find({
      where: {
        listId: payload.listId,
        ingredientId: payload.ingredientId
      }
    })
    .then((matchedIngredient) => {
      matchedIngredient.updateAttributes(payload)
      .then(success)
      .catch(err)
    })
    .catch(err)
  }

  function _destroy(data, err, success) {
    let payload = data;
    db.ingredients.destroy({
      where: {
        listId: payload.listId,
        ingredientId: payload.ingredientId
      }
    })
    .then(success)
    .catch(err)
  }

  return {
    create: _create,
    update: _update,
    find: _find,
    findAll: _findAll,
    destroy: _destroy
  }

}();
