var User=require('./model_user').User


// GET /wine
module.exports.list=function(req,res,next){
    User.findAll().success(function(users) { res.json(users)}).error(next)
}

//GET /wine/:id

module.exports.get= function(req,res,next) {
    User.find(Number(req.params.id)).success(function(user) {res.json(user)}).error(next)
}

//POST wine
module.exports.new=function(req,res,next) {
    User.build(req.body).save().success(function (user) {res.json(user)}).error(next)
}

//PUT

module.exports.update=function(req,res,next) {
    User.update(req.body,{id:req.params.id}).success(function(user) {res.json(user)}).error(next)
}

//DELETE

module.exports.delete=function(req,res,next) {

    User.find(Number(req.params.id))
        .success(function (user) {
            if (user === null){
                var err = new Error('Registro no encontrado');
                err.status = 404;
                next(err);
            }
            else {
                user.destroy()
                    .success(function () {
                        res.send(200)
                    })
                    .error(next)
            }
        })
        .error(next)

}
