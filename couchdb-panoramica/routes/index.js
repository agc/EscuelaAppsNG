
module.exports=function(app) {

    app.use('/',        require('./general/index'))
    app.use('/posts',   require('./posts/posts'))
    app.use('/articles',require('./articles/articles')("memoria"))
}