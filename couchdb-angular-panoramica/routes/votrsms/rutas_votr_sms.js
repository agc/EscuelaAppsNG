var  events                = require('./events');
     router                = require("express").Router()



    router.get('/:shortname',        events.event);
    router.post('/vote/sms',         events.voteSMS);
    router.get('/api/list',          events.list)



module.exports=router;





