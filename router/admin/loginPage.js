//引入User模块成员
const { User } = require('../../model/user.js') 
//导入 bcrypt
const bcrypt = require('bcrypt')


// 实现登陆功能
module.exports = async(req,res)=>{
    const {email,password} = req.body;
    //(服务器端判断)--如果用户没有输入邮箱/没有输入密码
    if(email.trim().length == 0 || password.trim().length == 0){
        return res.status(400).render('admin/error',{msg:'邮箱地址错误或密码错误'})
    }

    let user =  await User.findOne({email})
    //查询到了邮箱
    if(user){
        //明文密码与hash密码比对
        const isValid = await bcrypt.compare(password,user.password)
        if(isValid){
            //登陆成功(存储有用信息到session中,登陆时的判断要使用)
            req.session.username = user.username
            req.session.role = user.role
            //将登陆的用户信息开放到所有模版中(作为公共资源开放)
            req.app.locals.userInfo = user
            //判断登陆的角色是管理员或者是普通用户
            if(user.role == 'normal'){
                //普通用户-跳转到首页
                res.redirect('/home/')
            }else{
                //管理员-跳转到后台
                res.redirect('/admin/user')
            }

        }else{
            //登陆失败--密码错误
            res.status(400).render('admin/error',{msg:'邮箱地址错误或密码错误'})
        }
    }else{
        //没查询到邮箱
        res.status(400).render('admin/error',{msg:'该邮箱未注册!'})
    }
}