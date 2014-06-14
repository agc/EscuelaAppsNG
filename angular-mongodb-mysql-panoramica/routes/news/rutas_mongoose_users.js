var express     = require('express');
var router      = express.Router();

var User       = require('./model_mongoose_user')

router.get('/',function(req, res) {

    User.find(function (err, resultados) {
            if (!err) {
                res.jsonp(resultados);
            } else {
                console.log(err);
            }
        }
    );

})


module.exports=router