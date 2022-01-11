//引入模块
const mongoose = require('mongoose')
const config = require('config')

//连接数据库
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}/${config.get('db.name')}`,{useNewUrlParser:true})
    .then(()=> console.log('数据库连接成功'))
    .catch((err)=>console.log(err,'数据库连接失败'))