



var Modelo= require('./model_mongoose_posts')

function all(req, res) {

    Modelo.find(function (err, resultados) {
            if (!err) {
                res.jsonp(resultados);
            } else {
                console.log(err);
            }
        }
    );

}

function post(req, res) {

    var modelo = new Modelo(req.body);

    modelo.save(function (err) {
        if (!err) {
            res.jsonp(modelo);
        } else {
            console.log(err);
        }


    })
}

function get (req, res) {
    return Modelo.findById(req.params.id, function (err, post) {


        if (!err) {
            res.jsonp(post);
        } else {
            console.log(err);
        }

    });


}

function del(req, res){

    return Modelo.findById(req.params.id, function (err, post) {

        return  post.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }

        })})
}

function put(req, res) {
    return Modelo.findById(req.params.id, function (err, post) {
        post.url = req.body.url;
        post.title = req.body.title;
        post.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            res.jsonp(post);
        });
    });
}



exports.all=all
exports.post=post
exports.get=get
exports.delete=del
exports.put=put

