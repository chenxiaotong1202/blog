const { User } = require('../../model/user')
const bcrypt = require('bcrypt')

module.exports = async(req,res,next)=>{
    //获取客户端用户在表单中输入的信息
    let {username , email , password , role , state} = req.body
    //获取地址栏中传递过来的用户id
    let id = req.query.id
    
    //密码比对
    let user = await User.findOne({_id:id})
    let isvalid = await bcrypt.compare(password,user.password)

    if(isvalid){
        //密码比对成功
        await User.updateOne({
            username:username,
            email:email,
            role:role,
            state:state
        })
        res.redirect('/admin/user')
    }else{
        //密码比对失败
        return next(JSON.stringify({path:'/admin/user-edit',message:'密码比对失败,不允许用户修改操作',id:id}))
    }
}