var express     = require('express');
var router      = express.Router();


var Sequelize   = require('sequelize')

    , sequelize = new Sequelize('mantenimientomayo', 'usuariointraweb', '19601706', {
        dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
        port:    3306    // or 5432 (for postgres)
    })

sequelize
    .authenticate()
    .complete(function(err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
        }
    })

var User    = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
})

var Todo    = sequelize.define('todo', {
   title: Sequelize.STRING

})

var Averia= sequelize.define('Averia', {
    asunto: Sequelize.STRING},
    {
        tableName:'averia',
        timestamps: false
    }

)

sequelize
    .sync({ force: false })
    .complete(function(err) {
        if (!!err) {
            console.log('An error occurred while creating the table:', err)
        } else {
            console.log('It worked!')
        }
    })


router.get('/', function(req, res) {
    res.send('Prueba de sequelize');
})

module.exports=router

