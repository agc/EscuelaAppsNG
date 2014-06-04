
module.exports=function(app) {

    app.use('/', require('./routes/index'))
    app.use('/posts',require('./routes/posts/posts'))
}