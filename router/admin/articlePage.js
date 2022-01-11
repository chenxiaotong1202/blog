const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')

//文章列表路由
module.exports = async(req,res)=>{
    //标识 将当前访问的链接开放到公共数据中,用于侧边栏选中标示
    req.app.locals.currentLink = 'article'
    //接受客户端传递过来的分页页码
    let currentPage = req.query.page || 1

    //查询数据库的所有文章(.populate关联查询)
    //page :代表当前页 / size :每页显示的条数 / display :表示客户端一次性显示的页码数量 exec :表示向服务器发送请求
    // let articles = await Article.find().populate('author').lean() 加入mongoose-sex-page之后会报错
    let articles = await pagination(Article).page(currentPage).size(5).display(3).find().populate('author').exec()
    articles = JSON.stringify(articles)
    articles = JSON.parse(articles)
    // res.send(articles)
    
    res.render('admin/article',{
        articles: articles
    })
}