var Sequelize            = require('sequelize'),
    configuracion        = require('./database'),
    db                   = new Sequelize(configuracion.database, configuracion.user, configuracion.password);


var self = module.exports = {
    'db': db,

    User: db.define('User',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull:false
            },
            firstName: Sequelize.STRING(45),
            lastName: Sequelize.STRING(45),

        }

        , {
            tableName: 'users',
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


