//引入模块
const { User } = require('../../model/user')




//用户列表页路由
module.exports = async(req,res)=>{
    //标识 将当前访问的链接开放到公共数据中,用于侧边栏选中标示
    req.app.locals.currentLink = 'user'
    
    //接受客户端传来的当前页码 (如果客户端没有传值时,默认是第一页)
    let page = req.query.page || 1;
    //设置每一页显示的条数
    let pageSize = 10
    //查询用户数据的总数
    let count = await User.countDocuments({})
    //展示出来的总页数
    let total = Math.ceil( count / pageSize)


    //limit(2) :表示限制查询数量,传入每页要显示的数据条数
    //skip(2) :表示跳过多少条数据 传入显示数据的开始位置

    //页码对应的数据查询开始位置 = (当前页码 - 1) * 每页显示的条数
    let start = (page - 1) * pageSize
    const users = await User.find({}).limit(pageSize).skip(start)
    res.render('admin/user',{
        users: users,
        total:total,
        page:page,
        count:count
    })
}