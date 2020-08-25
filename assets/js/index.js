$(function () {
    // 调用函数获取用户信息
    getUserInfo();

    // 绑定退出事件
    $('#btnLogout').on('click', function () {
        let layer = layui.layer;
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1、清空本地存储
            localStorage.removeItem('token');
            // 2、跳转到登录页面
            location.href = '../../login.html';
            // 官方自带关闭询问框
            layer.close(index);
        });
    })


});


// 获取用户信息函数
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (response) {
            if (response.status !== 0) return layui.layer.msg(response.message)
            // console.log(response);
            // 渲染用户头像
            getAvatar(response.data);
        },
        // 无论成功还是失败都会调用complete函数 全局使用
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败') {
        //         // 1、强制清空token
        //         localStorage.removeItem('token')
        //         // 2、强制跳转页面
        //         location.href = '../../login.html'
        //     }
        // }

    });


}

// 渲染用户头像的函数
function getAvatar(user) {
    // 1、获取用户名称
    let name = user.nickname || user.username;
    // 2、设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3、按需渲染用户头像
    // 获取的数据中有图片
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user_pic).show();
        $('.user-avatar').hide();
    }
    // 获取的数据中没有图片
    $('.layui-nav-img').hide();
    //找到用户名的第一个字 转大写
    let first = name[0].toUpperCase();
    $('.user-avatar').html(first).show()
}