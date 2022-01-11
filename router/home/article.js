const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')

//文章详情页路由
module.exports = async(req,res)=>{
    //获取文章id
    const id = req.query.id
    let articles = await Article.findOne({_id:id}).populate('author')
    articles = JSON.stringify(articles)
    articles = JSON.parse(articles)
    
    //查询评论
    let comments = await Comment.find({aid: id}).populate('uid')
    comments = JSON.stringify(comments)
    comments = JSON.parse(comments)

    res.render('home/article',{ 
        articles,
        comments
    })
}