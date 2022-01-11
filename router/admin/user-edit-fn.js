
//引入用户集合构造函数
const { User , validateUser } = require('../../model/user')
const bcrypt = require('bcrypt')

// 新增用户信息提交路由
module.exports = async(req,res,next)=>{
    try{
        //开始验证用户提交的信息
        await validateUser(req.body)
    }catch(ex){
        //验证失败
        //重定向回新增用户列表页面
        //此处如果不加return的话就会报错Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 
        //百度显示:node中express的，res.send() 或res.json()这类客户端返回的方法仅返回一次，如果多次返回就会出现这个错误！
        //因为redirect执行完之后,默认会调用res.end();所以要使用return,阻止代码向下执行
        // return res.redirect(`/admin/user-edit?message=${ex.message}`)
        //由于next只能接受一个参数,所以使用JOSN.stringify 把用户输入的 对象转成字符串类型
        // return next(JSON.stringify({path: '/admin/user-edit',message: ex.message}))
        return next(JSON.stringify({ path: '/admin/user-edit', message: ex.message }));
    }
    //验证通过
    //判断用户输入的邮箱是否在数据库中存在
    const user = await User.findOne({email:req.body.email})

    //邮箱地址已存在
    if(user){
        //重定向回用户新增页面
        // res.redirect(`/admin/user-edit?message=邮箱地址已存在`)
        return next(JSON.stringify({path:'/admin/user-edit',message: '邮箱地址已存在!'}))
    }
    //是新的邮箱地址,对密码加密
    //定义加密规则
    let salt = await bcrypt.genSalt(10)
    //对密码加密
    const result = await bcrypt.hash(req.body.password,salt)
    //将加密后的密码 与 用户输入的进行替换 
    req.body.password = result
    //插入数据库
    await User.create(req.body)
    //重定向回用户列表页
    res.redirect('/admin/user')
}