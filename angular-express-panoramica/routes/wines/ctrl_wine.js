var Wine=require('./model_wine').Wine


// GET /wine
module.exports.list=function(req,res,next){
    Wine.findAll().success(function(wines) { res.json(wines)}).error(next)
}

//GET /wine/:id

module.exports.get= function(req,res,next) {
    Wine.find(Number(req.params.id)).success(function(wine) {res.json(wine)}).error(next)
}

//POST wine
module.exports.new=function(req,res,next) {
    Wine.build(req.body).save().success(function (wine) {res.json(wine)}).error(next)
}

//PUT

module.exports.update=function(req,res,next) {
    Wine.update(req.body,{id:req.params.id}).success(function(wine) {res.json(wine)}).error(next)
}

//DELETE

module.exports.delete=function(req,res,next) {

    Wine.find(Number(req.params.id))
        .success(function (wine) {
            if (wine === null){
                var err = new Error('Registro no encontrado');
                err.status = 404;
                next(err);
            }
            else {
                wine.destroy()
                    .success(function () {
                        res.send(200)
                    })
                    .error(next)
            }
        })
        .error(next)

}



