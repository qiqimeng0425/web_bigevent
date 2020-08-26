$(function () {
    let form = layui.form;
    let layer = layui.layer;

    // 表单验证
    form.verify({
        nickname: function (value) {
            if (value.length > 6) return '昵称长度必须在1~6个字符之间'
        }
    });

    initUserInfo();
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                // console.log(res);
                // form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        });
    };

    // 表单重置
    $('#btnReset').on('click', function (e) {
        // 阻止默认重置行为
        e.preventDefault;
        // 恢复至默认
        initUserInfo();
    });

    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $('.layui-form').serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('更新用户信息成功');
                // 在子页面中调用父页面的方法
                window.parent.getUserInfo();
            }
        });
    })



})