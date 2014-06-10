app.post('/createdb', function(req, res){
    nano.db.create(req.body.dbname,function(err) {
        // create a new database
        if (err) {
            res.send("Error creating Database "+req.body.dbname);
            return;
        }
        res.send("Database "+req.body.dbname+" was created sucessfully");
    });

});
app.post('/new_contact', function(req, res){
    var name=req.body.name;
    var phone=req.body.phone;
    /*The second parameter phone is the id we are explicitly specifying*/
    db.insert({name:name,phone:phone, crazy: true },phone,function(err, body, header) {
        if (err) {
            res.send("Error creating contacts or contacts already exists");
            return;
        }
        res.send("Contacts was created sucessfully");
    });

});
app.post('/view_contact', function(req, res){
    var alldoc="Following are the Docment <br/><br/>";
    db.get(req.body.phone, { revs_info: true }, function(err, body) {
        if (!err)
            console.log(body);
        if(body){
            alldoc+="Name:"+body.name +"<br/> Phone :"+body.phone;
        }else{
            alldoc="No Record exist with that key";
        }
        res.send(alldoc);
    });
});
app.post('/delete_contact', function(req, res){
    db.get(req.body.phone, { revs_info: true }, function(err, body) {
        if (!err){
            db.destroy(req.body.phone,body._rev , function(err, body) {
                if (!err){
                    res.send("Error in deleting");
                }else{

                }
            });
            res.send("Document deleted sucessfully");
        }
    });
});