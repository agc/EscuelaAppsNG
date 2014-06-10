var contacts=require('./models/model_contact');

module.exports=function(app){

    app.get("/", contacts.index);
    app.get('/contacts', contacts.index);
    app.get('/contacts/:id', contacts.findById);
    app.post('/contacts', contacts.addContact);
    app.put('/contacts/:id', contacts.updateContact);
    app.delete('/contacts/:id', contacts.deleteContact);
};