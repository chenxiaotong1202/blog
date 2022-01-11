//引入模块
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session')
const morgan = require('morgan')

//接收暴露的路由对象
const home = require('./router/home')
const admin = require('./router/admin');

//导入格式化时间模块 
//  (由于我们的模版引擎用的express-art-template ,但也是依赖于art-template,所以要导入art-template模块)
const template = require('art-template')
const moment = require('moment')
// //向模版中导入变量
template.defaults.imports.moment = moment;


//创建网站服务器
const app = express()

//连接数据库
require('./model/connect')
// require('./model/user')  //创建初始用户数据

//配置body-parser模块
app.use(bodyParser.urlencoded({extended:false}))

//配置session
app.use(session({
    resave: false, //添加 resave 选项 (加入之后终端就不会有警告)
    saveUninitialized: false, //未登陆时,不要在浏览器保存cookie
    secret:'secret key',
    cookie:{
        maxAge: 24*60*60*1000 //一天后cookie失效
    }
    })
)

//访问静态文件路径
app.use(express.static(path.join(__dirname,'public')))

//使用express-art-template模板引擎 渲染页面
//---设置.art模版 存放的路径
app.set('views',path.join(__dirname,'views'))
//---设置渲染模版时,默认拼接文件的后缀
app.set('view engine','art')
//渲染.art文件时,使用的是哪个插件
app.engine('art',require('express-art-template'))


//拦截请求,判断登陆状态
app.use('/admin',require('./middleWare/loginGuard'))


//配置路由对象
app.use('/home',home);
app.use('/admin',admin);



//错误处理中间件
app.use((err,req,res,next)=>{
    // res.redirect(`/admin/user-edit?message=${ex.message}`)    // res.redirect(`/admin/user-edit?message=邮箱地址已存在`)
    const result = JSON.parse(err)
    //由于问号?后面要传递的参数个数是不确定的,所以此处开启循环(对象/数组)进行传递参数的拼接

    //定义一个空数组,用于存放拼接传递过来的参数
    let params = [];
    for(let attr in result){
        if(attr != 'path'){
            //传递的参数不止是path一个时,将参数存放在数组中
            params.push(attr + '=' + result[attr])
        }
    }
    // res.redirect(`${result.path}?message=${result.message}`)
    //使用 & 拼接数组中的所有参数
    res.redirect(`${result.path}?${params.join('&')}`)
})

//区分开发环境 与 生产环境
if(process.env.NODE_ENV == 'development'){
    //当前是开发环境
    console.log('当前是开发环境');
    //在开发环境下,将客户端向服务器发送的请求信息打印到控制台
    app.use(morgan('dev'))
}else{
    //当前是生产环境
    console.log('当前是生产环境');
}

//监听端口
app.listen(80,()=>{
    console.log('网站服务器启动成功,请访问localhost');
})