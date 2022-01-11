//引入模块
const formidable = require('formidable') //下文用的是旧版1.2.2
const path = require('path')
const { Article } = require('../../model/article')

//新增文章路由
module.exports = (req,res)=>{
    //创建表单解析对象
    const form = new formidable.IncomingForm()
    //设置文件上传路径
    form.uploadDir = path.join(__dirname,'../','../','public','uploads')
    //是否保留文件扩展名,默认是false
    form.keepExtensions = true
    //对表单进行解析
    form.parse(req,async(err,fields,files)=>{
        //fields 存储普通的请求参数
        //files 存储上传的文件信息
        //由于上传的文件不带后缀名 所以下面2行代码做了处理 使其变成 ‘文件名.后缀名’的格式
        // var fileName = files.cover.filepath.split('public')[1]
        // var extName = files.cover.originalFilename.split('.')[1]
        // var newPath = fileName + '.' + extName
        await Article.create({
            title: fields.title,
            author: fields.author,
            publicDate: fields.publicDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })
        res.redirect('/admin/article')
    })
}