$(function () {
    let form = layui.form;

    // 重置密码校验
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name = oldPwd]').val()) return '新密码不能与原密码一样'
        },
        rePwd: function (value) {
            if (value !== $('[name = newPwd]').val()) return '两次密码输入不一致'
        }
    });

    // 发起重置密码请求
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message);
                layui.layer.msg('更新密码成功！');
                // 重置表单
                $('.layui-form')[0].reset()
            }
        });
    })
})