var  events                = require('./lib_events');
     router                = require("express").Router()




    router.get(     '/api',                 events.list)
    router.get(     '/api/:id',             events.eventById)
    router.delete(  '/api/:id',             events.destroyEvent)
    router.post(    '/api',                 events.saveEvent)
    router.post(    '/vote/sms',            events.voteSMS);
    router.get(     '/:shortname',          events.event);




module.exports=router;





