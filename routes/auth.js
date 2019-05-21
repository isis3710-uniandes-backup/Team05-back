const jwt = require('../utils/jwt');
let express = require('express');
let router = express.Router();

router.route('/token').get(async function(req, res) {

    var token = jwt.issueToken();
    res.json({
           message: 'authentication done ' ,
           token: token
         });

});

module.exports = router;
