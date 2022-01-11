const { Article } = require('../../model/article')
const formidable = require('formidable')
const path = require('path')

//文章修改路由
module.exports = (req,res)=>{
    //获取要修改的文章id
    const { id } = req.query

    //获取用户在表单中输入的内容
    const form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname,'../','../','public','uploads')
    form.keepExtensions = true
    form.parse(req,async(err,fields,files)=>{
        //fields 存储普通的请求参数
        //files 存储上传的文件信息
        //由于上传的文件不带后缀名 所以下面2行代码做了处理 使其变成 ‘文件名.后缀名’的格式
        // var fileName = files.cover.filepath.split('public')[1]
        // var extName = files.cover.originalFilename.split('.')[1]
        // var newPath = fileName + '.' + extName

        // res.send(fields)
        await Article.updateOne({
            title: fields.title,
            publicDtae: fields.publicDtae,
            content: fields.content,
            cover: files.cover.path.split('public')[1],
        })
        res.redirect('/admin/article')
    })


}