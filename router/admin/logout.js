//实现退出登录功能
module.exports = (req,res)=>{
    //删除session
    req.session.destroy(function(){
        //删除cookie
        res.clearCookie('connect.sid')
        //重定向回用户登陆页面
        res.redirect('/admin/login')
        //清除模板中的用户信息
        req.app.locals.userInfo = null
    })
}