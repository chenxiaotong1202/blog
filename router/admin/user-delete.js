const { User } = require('../../model/user')

module.exports = async(req,res) =>{
    //地址栏中获取到要删除的用户ID
    let id = req.query.id
    //根据id查询数据库 并且删除
    await User.findOneAndDelete({_id:id})
    res.redirect('/admin/user')

}