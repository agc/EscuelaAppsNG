var Wine=require('../models/wine').Wine

module.exports.list=function(req,res,next){
    Wine.findAll().success(function(wines) { res.json(wines)}).error(next)
}