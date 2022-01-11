const Joi = require('joi')

const schema = {
    username: Joi.string().min(2).max(10).error(new Error('用户名验证不通过~'))
    birth: Joi.string().required().min(1900).max(2021).error(new Error('生日验证不通过~'))
}



async function run(){
    //验证
    try{
        await Joi.validate({username:'a',birth:1902},schema)
    }catch(ex){
        console.log(ex.message);
        return;
    }
    console.log('验证通过');
}

run()


