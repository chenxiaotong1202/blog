//引入模块
const mongoose = require('mongoose')
//导入 bcrypt
const bcrypt = require('bcrypt')
//引入验证模块joi
const Joi = require('joi')

//创建用户集合规则
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    email:{
        type: String,
        //保证邮箱地址插入数据的唯一性
        unique:true,
        required:true
    },
    password:{
        type: String,
        required:true   
    },
    role:{
        type: String,
        required:true
    },
    state:{
        //0 启用 1 禁用
        type:Number,
        default:0
    }

})

//创建集合并应用规则
const User = mongoose.model('User',userSchema);

//定义验证新增用户输入信息的规则
const validateUser = (user)=>{
    //验证规则
    const schema = {
        username: Joi.string().required().min(2).max(10).error(new Error('用户名不符合验证规则')),
        email: Joi.string().required().email().error(new Error('邮箱不符合验证规则')),
        password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码不符合验证规则')),
        role:Joi.string().valid('normal','admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0,1).required().error(new Error('状态值非法')),
    }
    //返回一个对象
    return Joi.validate(user,schema)
}


//(第一次使用) 创建初始账户
async function createUser(){
    //密码加密
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash('123456',salt)
    const user = await User.create({
        username:'tong',
        email:'1160805148@qq.com',
        password:pass,
        role:'admin',
        state:1
    })
}
// createUser()



// 将集合作为模块成员导出
module.exports = {
    User,
    validateUser
}