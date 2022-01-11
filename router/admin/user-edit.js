const { User } = require('../../model/user')


//新增用户路由
module.exports = async(req,res)=>{
    //标识 将当前访问的链接开放到公共数据中,用于侧边栏选中标示
    req.app.locals.currentLink = 'user'

    const { message , id } = req.query

    //如果查询到地址栏中有id,则说明是修改用户信息操作
    if(id){
        //修改操作
        let user = await User.findOne({_id:id})
        res.render('admin/user-edit',{
            message: message,
            user:user,
            link:'/admin/user-modify?id=' + id,
            button:'修改'
        })
    }else{
        //新增
        res.render('admin/user-edit',{
            message: message,
            link:'/admin/user-edit',
            button:'添加'
        })
    }

}
