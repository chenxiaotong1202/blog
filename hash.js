//导入 bcrypt
const bcrypt = require('bcrypt')

async function run(){
//生成随机字符串,数值越大,难度系数越大
const salt = await bcrypt.genSalt(10);
//密码比对
const result = await bcrypt.hash('123111',salt);

console.log(salt);
console.log(result);
}

run()