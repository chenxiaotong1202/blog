const Joi = require('joi')

const schema = {
    username: Joi.string().min(2).max(10)
}



async function run(){
    //验证
    try{
        await Joi.validate({username:'a'},schema)
    }catch(ex){
        console.log(ex);
        return;
    }
    console.log('验证通过');
}

run()