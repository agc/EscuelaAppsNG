var express = require('express');
var router = express.Router();


var mysql = require('mysql');







/** Initiate Mysql Connection */
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'usuariointraweb',
    database :'todo_demo',
    password : '19601706'
});

connection.connect();


router.get('/',function(req,res){
    res.send('<h1>Todo Service</h1>');
});


router.get('/todo',function(req,res){
    var results;
    connection.query('SELECT * from todos where is_done = \'0\'', function(err, rows, fields) {
        if (err) throw err;

        results = rows;
        res.type('application/json');
        res.send(results);
    });
});


router.post('/todo',function(req,res){
    connection.query('INSERT INTO todos (title,added_on) VALUES(\''+ req.body.title +'\',NOW())', function(err,result) {
        if (err) throw err;

        if(result)
            res.type('application/json');
        res.send([{"added":1}]);
    });
});


router.put('/todo/:id',function(req,res){
    connection.query('UPDATE todos SET is_done = 1, ended_on = NOW() where id = '+req.params.id, function(err,result) {
        if (err) throw err;

        if(result)
            res.type('application/json');
        res.send([{"updated":1}]);
    });
});


router.delete('/todo/:id',function(req,res){
    connection.query('DELETE from todos where id = '+req.params.id, function(err,result) {
        if (err) throw err;

        if(result)
            res.type('application/json');
        res.send([{"deleted":1}]);
    });
});



module.exports = router;