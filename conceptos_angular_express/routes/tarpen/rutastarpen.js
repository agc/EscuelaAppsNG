


var mongoose = require( 'mongoose' );
var Tarpen     = mongoose.model( 'Tarpen' );

exports.create = function ( req, res ){
    new Tarpen({
        content    : req.body.content,
        updated_at : Date.now()
    }).save( function( err, todo, count ){
            res.redirect( '/' );
        });
};


exports.index = function ( req, res ){
   /*
     Version sencilla, sin ordenacion
    Tarpen.find( function ( err, todos, count ){

        res.render( './tarpen/index', {
            title : 'Express Lista de tareas',
            todos : todos
        });
    });

*/


    Tarpen.find().sort('-updated_at').exec
    ( function ( err, todos, count ){
        res.render( './tarpen/index', {
            title : 'Express Lista de tareas',
            todos : todos
        });
    });
    };

exports.nueva= function(req,res ) {
    res.render('./tarpen/nueva', { title: 'Nueva tarea' });
};


exports.destroy = function ( req, res ){
    Tarpen.findById( req.params.id, function ( err, todo ){
        todo.remove( function ( err, todo ){
            res.redirect( '/' );
        });
    });
};

exports.edit = function ( req, res ){

    /* version inicial desordenada

    Tarpen.find( function ( err, todos ){
        res.render( './tarpen/edit', {
            title   : 'Express Todo Example',
            todos   : todos,
            current : req.params.id
        });
    });
  */



    Tarpen.find().sort('-updated_at').exec(
        function ( err, todos ){
        res.render( './tarpen/edit', {
            title   : 'Express Todo Example',
            todos   : todos,
            current : req.params.id
        });
    });
};


// redirect to index when finish
exports.update = function ( req, res ){
    Tarpen.findById( req.params.id, function ( err, todo ){
        todo.content    = req.body.content;
        todo.updated_at = Date.now();
        todo.save( function ( err, todo, count ){
            res.redirect( '/' );
        });
    });
};