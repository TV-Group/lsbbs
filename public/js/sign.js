/**
 * Created by Administrator on 2017/8/14.
 */
$(()=>{
    //****logo点击跳转事件
    $("img.logo").click(function(){
        location.href='index.html';
    });
    //****输入框的提示事件*****
    $("#user-input").on("focus","input",e=>{
        var $tar=$(e.target);
        $tar.next().addClass("active");
    }).on("blur","input",e=>{
        var $tar=$(e.target);
        $tar.next().removeClass("active");
    });
    //***注册事件*******************************
    //***进行用户名的验证
    var reg1=/^[a-z0-9_\u4e00-\u9fa5]{4,16}$/i;
    var reg2=/^[a-z0-9_]{6,16}$/i;
    var valiUser=false;
    //***密码验证函数
    function valiPwd() {
        var $upwd = $("input.upwd").val();
        if (reg2.test($upwd)) {return true;}
        else {return false;}
    }
    //***用户名验证函数
    function valiUname(){
        var $uname=$("input.uname").val();
        if (reg1.test($uname)) {
            //***查找数据库中有没有已经存在的用户名
            $.ajax({
                url: "/user-check",
                type:"post",
                data: {uname: $uname},
                success: function (data) {
                    if(data.code>0) {
                        valiUser=true;
                        $("#user-input>div:nth-child(1)>div").html(`
                            <b style="color:green;">${data.msg}</b>
                        `);
                    }else{
                        $("#user-input>div:nth-child(1)>div").html(`
                            <b style="color:red;">${data.msg}</b>
                        `);
                    }
                },
                error: function () {
                    myAlert("网络出现故障!");
                }
            });
        }
        else {
            //用户名验证失败值后的操作
            $("#user-input>div:nth-child(1)>div").html(`
                <b style="color:red;">用户名格式错误(3-16位)</b>
            `);
        }
    }
    //***用户名验证事件***
    $("input.uname").blur(()=>{
        valiUname()
    });
    //***密码验证事件*****
    $("input.upwd").blur(()=>{
        if(valiPwd()){
            //密码输入完成之后的弹出消息
            $("#user-input>div:nth-child(2)>div").html(`
                <b style="color:green;">密码格式正确</b>
            `);
        }else if(!valiPwd()){
            //密码输入完成之后的弹出消息
            $("#user-input>div:nth-child(2)>div").html(`
                <b style="color:red;">密码格式错误(6-16位)</b>
            `);
        }
    });

    //***进行表单的提交***
    $("input.submit").click(()=> {
        if(valiPwd()&&valiUser&&cvali()) {
            //****用户名验证后的信息
            var $upwd = $("input.upwd").val();
            var $uname=$("input.uname").val();
            $.ajax({
                url: "/sign",
                type:"post",
                data: {uname: $uname, upwd: $upwd},
                success: function (data) {
                    if(data.code>0) {
                        $("ul.sign-login-sel>li.info").html(`
                            <b style="color:green;">${data.msg}</b>
                        `);
                        window.location.href="login.html";
                    }else{
                        $("ul.sign-login-sel>li.info").html(`
                            <b style="color:red">${data.msg}</b>
                        `)
                    }
                },
                error: function () {
                    myAlert("网络出现故障");
                }
            });
        }
    });

    //***验证码canvas绘图开始
    function rVali() {
        const W = 120;
        const H = 30;
        canvas.width = W;
        canvas.height = H;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = rc(150, 230);
        ctx.fillRect(0, 0, W, H);
        //循环绘制四个随机字符
        ctx.textBaseline = "top";
        var pool = "ABCDEFGHJKLMNPQRSTUVWXY3456789";
        var str="";
        for (var i = 0; i < 4; i++) {
            //随机字符
            var n = pool[rn(0, pool.length - 1)];
            str+=n;
            //字体大小
            var fs = rn(10, 40);
            ctx.font = fs + "px SimHei";
            //字体颜色
            var fc = rn(50, 150);
            ctx.strokeStyle = fc;
            var deg = rn(-45, 45);
            var x = -fs / 2;
            var y = -fs / 2;

            //开始进行绘图
            ctx.save();
            ctx.translate(30 * i + 15, 15);
            ctx.rotate(deg * Math.PI / 180);
            ctx.strokeText(n, x, y);
            ctx.restore();
        }
        //添加干扰线
        for (var i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(rn(0, W), rn(0, H));
            ctx.lineTo(rn(0, W), rn(0, H));
            ctx.strokeStyle = rc(0, 255);
            ctx.stroke();
        }
        //绘制50个干扰点
        for (var i = 0; i < 50; i++) {
            ctx.beginPath();
            ctx.arc(rn(0, W), rn(0, H), 0.5, 0, 2 * Math.PI);
            ctx.fillStyle = rc(0, 255);
            ctx.fill();
        }

        //随机颜色函数
        function rc(min, max) {
            var r = Math.floor(Math.random() * (max - min + 1) + min);
            var g = Math.floor(Math.random() * (max - min + 1) + min);
            var b = Math.floor(Math.random() * (max - min + 1) + min);
            return `rgb(${r},${g},${b})`;
        }

        //随机字符函数
        function rn(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        return str;
    }
    var result=rVali().toLowerCase();
    //***验证码canvas绘图结束
    //***看不清楚的点击事件
    $("span.rechange").click(()=>{
        result=rVali().toLowerCase();
    });
    //***验证码的验证事件***
    $("div.vali>input").blur(e=>{
        if(cvali()){
            $("#result").html("验证通过");
            $(e.target).prop("readonly","readonly");
            $("span.rechange").html("");
        }
        else if(!cvali()){
            $("#result").html("验证失败");
        }
    });
    //***验证码的验证函数***
    function cvali(){
        var val=$("div.vali>input").val().toLowerCase();
        if(val==result){return true}
        else {return false}
    }
});