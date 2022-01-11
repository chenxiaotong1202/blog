const { Article } = require('../../model/article')


//文章删除路由
module.exports = async(req,res)=>{
    //获取要删除的文章id
    const id = req.query.id
    await Article.findOneAndDelete({_id:id})
    res.redirect('/admin/article')
}