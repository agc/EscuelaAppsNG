
var ContactModel=require('./def_model_contact.js');

ContactModel.find({id:1},function (error,datos) {
    if(error) console.log("Ha ocurrido un error");
    if (!datos) console.log("No hay registros");

});

exports.index = function (req, res){
    return ContactModel.find(function (err, contacts) {
        if (!err) {
            res.jsonp(contacts);
        } else {
            console.log(err);
        }
    });
}

exports.findById = function (req, res) {
    return ContactModel.findById(req.params.id, function (err, contact) {
        if (!err) {
            res.jsonp(contact);
        } else {
            console.log(err);
        }
    });
}

exports.addContact = function (req, res) {
    var contact;
    contact = new ContactModel({
        name: req.body.name,
        phone: req.body.phone,
    });
    contact.save(function (err) {
        if (!err) {
            console.log("created");
        } else {
            console.log(err);
        }
    });

    return res.send(contact);
}

exports.updateContact = function (req, res) {
    return ContactModel.findById(req.params.id, function (err, contact) {
        contact.name = req.body.name;
        contact.phone = req.body.phone;
        contact.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            res.send(contact);
        });
    });
}

exports.deleteContact = function (req, res){
    return ContactModel.findById(req.params.id, function (err, contact) {
        return contact.remove(function (err) {
            if (!err) {
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
}