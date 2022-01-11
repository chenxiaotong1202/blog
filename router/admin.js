//引入模块
const express = require('express')
//创建路由对象
const admin = express.Router()


//登陆路由
admin.get('/login',require('./admin/login'))
//实现登陆功能
admin.post('/login',require('./admin/loginPage'))
//用户列表路由
admin.get('/user',require('./admin/userPage'))
//实现退出登录功能
admin.get('/logout',require('./admin/logout'))

//新增用户路由
admin.get('/user-edit',require('./admin/user-edit'))
//新增用户信息提交路由
admin.post('/user-edit',require('./admin/user-edit-fn'))
//用户信息修改路由
admin.post('/user-modify',require('./admin/user-modify'))
//删除用户信息路由
admin.get('/user-delete',require('./admin/user-delete'))

//文章列表路由
admin.get('/article',require('./admin/articlePage'))
//文章编辑路由
admin.get('/article-edit',require('./admin/article-edit'))
//新增文章路由
admin.post('/article-add',require('./admin/article-add'))
//文章修改路由
admin.post('/article-modify',require('./admin/article-modify'))
//文章删除路由
admin.get('/article-delete',require('./admin/article-delete'))




//暴露路由对象
module.exports = admin