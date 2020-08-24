$(function () {
    // 点击去注册账号
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击去登录
    $('#reg_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 自定义表单验证 form.verify()函数
    let form = layui.form;
    form.verify({
        // 自定义一个名为pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // value获取的是确认密码框的内容
            let pwd = $('.reg-box [name=password]').val();
            if (pwd != value) return '两次密码输入不一致'
        }
    });

    // 监听注册表单的提交事件
    let layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault();
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#reg_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg('登录成功');
                // console.log(res.token);
                // 将登录成功得到的token字符串保存到本地存储
                localStorage.setItem('token', res.token);
                // location.href = '../../index.html'

            }
        });

    });



})