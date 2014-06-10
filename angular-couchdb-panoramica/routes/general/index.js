var router=require('express').Router()

var index = function(req, res){
    res.render('index', { title: 'Express, Angular JS y Couchdb' });
};

router.get('/',index)

module.exports= router