//引入模块
const express = require('express')


//创建路由对象
const home = express.Router()


//blog首页路由
home.get('/',require('./home/index'))
//文章详情页路由
home.get('/article',require('./home/article'))
//评论路由
home.post('/comment',require('./home/comment'))



//暴露路由对象
module.exports = home