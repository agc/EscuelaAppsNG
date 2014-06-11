
var Modelo=require('./modelo_tutorial')


function index(req, res) {
    res.render('./tutorial/index.jade', { title: 'Posts con COUCHDB' });
}

function createdb(req, res){

    Modelo.creardb(req.body.dbname,

        function (err) {

        if (err) {
            res.send("Error al crear la base de datos " + req.body.dbname);
            return;
        }
        res.send("Base de datos " + req.body.dbname + " fué creado con éxito");
    })



}

function new_contact(req, res){

    var phone=req.body.phone;
    var documento={name:req.body.name,phone:phone, crazy: true }

    Modelo.insertar(documento,phone, function(err, body, header) {
        if (err) {
            res.send("Error al crear un contacto o quizas existía previamente");
            return;
        }
        res.send("El contacto fue creado con exito");
    })


}

function update_contact(req, res){

    var phone=req.body.phone;
    var documento={name:req.body.name,phone:phone, crazy: true }

    Modelo.actualizar(documento,phone, function(err, body, header) {
        if (err) {
            res.send("Error al actualizar el contacto");
            return;
        }
        res.send("El contacto fue actualizado correctamente ");
    })


}


function view_contact(req, res){
    var alldoc="Following are the Docment <br/><br/>";
    Modelo.obtener(req.body.phone, function(err, body) {
        if (!err)
            console.log(body);
        if(body){
            alldoc+="Nombre:"+body.name +"<br/> Telefono :"+body.phone;
        }else{
            alldoc="No existe registro con esa clave";
        }
        res.send(alldoc); // en una aplicacion se debe mandar a una vista
    })

}

function delete_contact(req, res){

    Modelo.eliminar(req.body.phone,
      function(err, body) {


                if (err){
                    res.send("Erroral borrar");
                }else{
                    res.send("Documento borrado con éxito");
                }})
}






exports.index           =index
exports.createdb        = createdb
exports.new_contact     =new_contact
exports.view_contact    =view_contact
exports.delete_contact  =delete_contact
exports.update_contact= update_contact


