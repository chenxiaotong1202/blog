const { Article } = require('../../model/article')


//文章编辑路由
module.exports = async(req,res)=>{
    //标识 将当前访问的链接开放到公共数据中,用于侧边栏选中标示
    req.app.locals.currentLink = 'article'
    
    const { id } = req.query
    if(id){
        //修改文章操作
        let article = await Article.findOne({_id:id.trim()})
        res.render('admin/article-edit',{
            article: article,
            link:'/admin/article-modify?id='+id,
            button:'修改',  
        })
    }else{
        //新增文章操作
        res.render('admin/article-edit',{
            link:'/admin/article-add',
            button:'添加'
        })
    }
}