var Todo=require('./model_todo')



function list(req, res) {
    Todo.find(function(err, todos) {
        if(err) {
            res.send(err);
        }
        res.json(todos);
    });
}

// después de crear uno recupera todos para mostrarlos
function create(req, res) {

    Todo.create({text : req.body.text, done : false},
        function(err, todo) {
        if (err) res.send(err);
        Todo.find(function(err, todos) {
            if (err) res.send(err)
            res.json(todos);
        });
    });

}


function borrar(req, res) {
    Todo.remove({_id : req.params.todo_id },
        function(err, todo) {
        if (err) res.send(err);

        Todo.find(function(err, todos) {
            if (err) res.send(err)

            res.json(todos);
        });
    });
}

exports.list        = list
exports.create      = create
exports.delete      = borrar




