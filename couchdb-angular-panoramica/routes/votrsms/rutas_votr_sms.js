var  events                = require('./events');
     router                = require("express").Router()



    router.get('/:shortname',        events.event);
    router.post('/vote/sms',         events.voteSMS);



module.exports=router;





