module.exports=function(app) {
    require('./main')(app);
    require('./lugares')(app);
    require('./locations')(app);
}