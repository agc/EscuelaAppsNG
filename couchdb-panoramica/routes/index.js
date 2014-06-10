
module.exports=function(app) {

    app.use('/',        require('./general/index'))
    app.use('/posts',   require('./posts/posts'))
    // no pueden coexistir los dos, el primero que se carga es la instancia usada
    //app.use('/articles',require('./articles/articles')("memoria"))
    app.use('/articulos',require('./articles/articles')("couchdb"))
    app.use('/tutorial',   require('./tutorialnano/tutorial'))
}