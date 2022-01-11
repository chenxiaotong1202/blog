//引入模块
const mongoose = require('mongoose')

//创建文章集合规则
const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        maxlength:100,
        minlength:1,
        required:[true,'请填写文章标题']
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:[true,'请传递作者']
    },
    publicDate:{
        type: Date,
        default: Date.now
    },
    cover:{
        type: String,
        default: null,
    },
    content:{
        type: String
    }
})

//创建集合并应用规则
const Article = mongoose.model('Article',articleSchema)


// 将文章集合作为模块成员导出
module.exports = {
    Article
}