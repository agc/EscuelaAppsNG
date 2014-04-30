var fs= require('fs'),datos;
fs.readFile('./datos_json1.json', procesardatos);

function procesardatos(error,data) {
    if (error) throw error;
    datos=JSON.parse(data);
    //console.log(datos);
    datos.forEach(function(elemento) {
        console.log(elemento);
    });
}

// Con este código se leen los datos de fichero y se introducirán en la base de datos

