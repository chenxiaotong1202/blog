const { Article } = require('../../model/article')
//引入分页模块
const pagination = require('mongoose-sex-page')

//blog首页路由
module.exports = async(req,res)=>{
    //接受客户端传来的页码
    let currentPage = req.query.page
    //查询文章
    let result = await pagination(Article).page(currentPage).size(4).display(5).find().populate('author').exec()
    result = JSON.stringify(result)
    result = JSON.parse(result)

    res.render('home/default',{
        result: result
    })
}