var  router                  = require("express").Router()
    , sesiones               = require('./lib_sesiones')


router.get('/admin', function(req, res) {
    sesiones.admin(req, res);

});

router.post ('/api/login', sesiones.login);
// app.delete('/api/sessions', routes.logout);



module.exports=router



