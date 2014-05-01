path = require('path');

module.exports = {
  mongo: {
    dbUrl: 'https://api.mongolab.com/api/1',            // The base url of the MongoLab DB server
    apiKey: 'fb-Atws4dYvWozCc__a92-1_y3ItQmFw'                 // Our MongoLab API key
  },
  security: {
    dbName: 'ascrum',                                   // The name of database that contains the security information
    usersCollection: 'users'                            // The name of the collection contains user information
  },
  server: {
    listenPort: 3000,                                   // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
    securePort: 8433,                                   // The HTTPS port on which the server is to listen (means that the app is at https://localhost:8433 for instance)
    distFolder: path.resolve(__dirname, '../cliente'),  // La carpeta que contiene los archivos de la aplicacion
    staticUrl: '/static',                               // En las rutas figura este prefijo y se asocia al directorio
                                                        // precedente
    cookieSecret: 'angular-app'                         // The secret for encrypting the cookie
  }
};