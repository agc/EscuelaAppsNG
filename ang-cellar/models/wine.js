var Sequelize            = require('sequelize'),
    configuracion        = require('../config/database'),
    db                   = new Sequelize(configuracion.database, configuracion.user, configuracion.password);


var self = module.exports = {
    'db': db,

    Wine: db.define('Wine',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull:false
            },
            name: Sequelize.STRING(45),
            year: Sequelize.STRING(45),
            grapes: Sequelize.STRING(45),
            country: Sequelize.STRING(45),
            region: Sequelize.STRING(45),
            description: Sequelize.BLOB,
            picture: Sequelize.STRING
        }

        , {
            tableName: 'wine',
            timestamps: false
        }
    )
}

self.db
    .sync({ force: false }) // si se pone a true borra la tabla
    .complete(function(err) {
        if (!!err) {
            console.log('An error occurred while creating the table:', err)
        } else {
            console.log('It worked!')
        }
    })


