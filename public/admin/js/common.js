//封装一个将用户输入表单数据转化为对象的函数
function serializeToJson(form){
    var result = {}
    // serializeArray() 输出的是数组[{name: 'email', value: '用户输入的值'},{name: 'password', value: '123123'}]
    var f = form.serializeArray()
    //我们希望是对象 {email: '用户输入的值', password: '用户输入的值'}
    f.forEach(function(item){
        //result.eamil = '用户输入的值'
        result[item.name]= item.value
    })
    return result
}