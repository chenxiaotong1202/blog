const { Comment } = require('../../model/comment') 



//评论路由
module.exports = async(req,res) =>{
    //接受客户端传递过来的参数
    const { aid , uid , content } = req.body

    //将数据存储到数据库的comment集合中
    await Comment.create({
        aid: aid,
        uid: uid,
        content: content,
        time: new Date()
    })
    res.redirect('/home/article?id='+ aid)
}