//登陆拦截
const guard = (req,res,next)=>{
    //判断用户是否访问登陆页 判断用户是否已经登陆
    if(req.url != '/login' && !req.session.username){
        //未登录,拦截请求,重定向回登陆页
        res.redirect('/admin/login')
    }else{
        //已登陆,是普通用户,不允许访问后台
        if(req.session.role == 'normal'){
            return res.redirect('/home/')
        }
        //已登陆,是管理员---请求放行
        next()
    }
}

module.exports = guard