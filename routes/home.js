'use strict';
module.exports = function (express) {

  const router = express.Router();

  router.get('/', function(req,res){
    res.send('Homepage');
  });

  return router;
};
