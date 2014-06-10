var express = require('express');
var router = express.Router();

//vistas el directorio donde se encuentran las vistas, dentro de public

module.exports=function(vistas ) {

    var index = function (req, res) {
        res.sendfile(vistas+'index.html');
    }

    router.get('/', index);
    return router;
}
