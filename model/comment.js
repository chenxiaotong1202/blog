const mongoose = require('mongoose')

//创建文章评论集合规则
const commentSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
})


//创建评论集合并应用规则
const Comment = mongoose.model('Comment',commentSchema)

//将评论集合作为模块成员导出
module.exports = {
    Comment
}