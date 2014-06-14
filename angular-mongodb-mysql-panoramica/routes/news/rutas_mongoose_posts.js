var express     = require('express');
var router      = express.Router();

var post       = require('./ctrl_mongoose_posts')

router.route('/').get(  post.all).post(         post.post)
router.route('/:id').delete(post.delete).put(post.put)


module.exports=router