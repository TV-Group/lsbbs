/**
 * Created by Administrator on 2017/8/26.
 */
$(()=>{
    var ss=sessionStorage;
    $.ajax({
        url:"/getPic",
        data:{uid:ss["uid"]},
        success:function(data){
            var user=data;
            $.ajax({
                url:"/artc",
                data:{uid:user.uid},
                success:function(data){
                    $("div.user-info").html(`
                        <img src="${user.pic}" alt=""/>
                        <div>
                            <h1>${user.uname}</h1>
                            <div>
                                <ul>
                                    <li class="count focus-c">${user.focusc}</li>
                                    <li>关注 &gt; </li>
                                </ul>
                                <ul>
                                    <li class="count fans-c">${user.fansc}</li>
                                    <li>粉丝 &gt; </li>
                                </ul>
                                <ul>
                                    <li class="count art-c">${data[0].artc}</li>
                                    <li>文章 &gt; </li>
                                </ul>
                                <ul>
                                    <li class="count like-c">${user.likec}</li>
                                    <li>收获喜欢 &gt; </li>
                                </ul>
                            </div>
                        </div>
                        <div class="user-change" data-uid="${user.uid}">
                            <button class="change-pic">更换头像</button>
                            <button class="change-pwd">更换密码</button>
                        </div>
                    `);
                    $("ul.user-details-choose>li.active").click();
                },
                error:function(){
                    myAlert("网络连接出错!");
                }
            });
        },
        error:function(){
            myAlert("网络出现错误");
        }
    });

    //*****查看内容的点击按钮
    $("ul.user-details-choose").on("click","li",function(){
        $(this).addClass("active").siblings().removeClass("active");
        if($(this).hasClass("art")){
            $("ul.user-content-show").empty();
            userArticle(0);
        }else if($(this).hasClass("moment")){
            $("ul.user-content-show").html("");
        }else if($(this).hasClass("comment")){
            $("ul.user-content-show").html("");
        }else if($(this).hasClass("hot")){
            $("ul.user-content-show").html("");
        }
    });

    //***加载用户所写文章的内容
    function userArticle() {
        $.ajax({
            url: "/userpages",
            data: {uid:ss["uid"]},
            success: function (data) {
                if(data.length>0) {
                    var html = "";
                    var n = 5;

                    //加载更多的按钮的点击事件
                    $("button.load-more").click(function () {
                        if (n + 5 >= (data.length - 1)) {
                            $(this).remove();
                        }
                        load(n);
                        n+=5;
                    });
                    load(0);
                    function load(n) {
                        var max;
                        if(n+5>data.length){
                            max=data.length;
                        }else{
                            max=n+5;
                        }
                        for (var i = n; i < max; i++) {
                            //再根据文章内容查找用户信息;
                            var art = data[i];
                            $.ajax({
                                url: "/getarticle",
                                data: {uid: art.uid},
                                async: false,
                                success: function (data) {
                                    var obj = data[0];
                                    $.ajax({
                                        url: "/getComCount",
                                        async: false,
                                        data: {aid: art.aid},
                                        success: function (data) {
                                            var count = data[0].count;
                                            html += `
                                <li class="content-box">
                                    <div class="content">
                                        <!--发布者-->
                                        <div class="author">
                                            <a href="javascript:;" class="user-img" target="_blank">
                                                <img src="${obj.pic}" alt=""/>
                                            </a>
                                            <div class="name">
                                                <a href="javascript:;" class="name-link" target="_blank">${obj.uname}</a>
                                                <span class="time" >${new Date(art.time).toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <!--发布内容的标题-->
                                        <a href="javascript:;" class="title" target="_blank" name="${art.aid}">
                                            ${art.title}
                                        </a>
                                        <!--发布内容的内容简介-->
                                        <p class="abstract">
                                            ${art.content}
                                        </p>
                                        <div class="meta">
                                            <a href="javascript:;" class="collection-tag" target="_blank">买买买购物指南</a>
                                            <a href="javascript:;">
                                                <i class="fa fa-eye"></i>
                                                ${art.viewcount}
                                            </a>
                                            <a href="javascript:;">
                                                <i class="fa fa-commenting"></i>
                                                ${count}
                                            </a>
                                            <span>
                                                <i class="fa fa-heart"></i>
                                                ${art.fav}
                                            </span>
                                            <span>
                                                <i class="fa fa-cny"></i>
                                                ${art.paycount}
                                            </span>
                                        </div>
                                    </div>
                                    <a href="javascript:;" class="avator">
                                        <img src="img/${art.pic}" alt=""/>
                                    </a>
                                </li>
                                <li class="block"></li>
                            `;
                                            $("ul.user-content-show").append(html);
                                            html = "";
                                        },
                                        error: function () {
                                            myAlert("网络连接故障");
                                        }
                                    });
                                },
                                error: function () {
                                    myAlert("网络连接故障");
                                }
                            });
                        }
                    }
                }else{
                    $("button.load-more").remove();
                }
            },
            error: function () {
                myAlert("网络连接故障");
            }
        });
    }
    //更换头像点击事件
    $("div.user-info").on("click","button.change-pic",function(){
        $("div.mask").addClass("active").children("div.user-img-change").addClass("active");

    })
    //更换密码点击事件
    .on("click","button.change-pwd",function(){
        $("div.mask").addClass("active").children("div.user-pwd-change").addClass("active");
    });
    //***模态框关闭事件
    $("div.mask").on("click","i.close",function(){
        $("div.mask").removeClass("active").children("div").removeClass("active");
    }).on("click","input.change-pwd",function(){
        var $this=$(this);
        var newVal=$this.siblings("input.new-pwd").val();
        if(valiNewPwd(newVal)){
            var oldVal=$this.siblings("input.old-pwd").val();
            $.ajax({
                url:'/changePwd',
                type:'post',
                data:{oldPwd:oldVal,newPwd:newVal,uid:ss['uid']},
                success:function(data){
                    myAlert(data.msg);
                    if(data.code>0){
                        ss.clear();
                        location.href="login.html";
                    }
                },
                error:function(){
                    myAlert("网络连接出现故障");
                }
            })
        }else{
            myAlert('密码必须是6-16位数字和数字');
        }
    });

    //***新密码验证函数
    function valiNewPwd(val){
        var reg=/[0-9a-zA-Z]{6,16}/i;
        if(reg.test(val)){
            return true
        }else{
            return false
        }
    }
    var filepath;
    //***更换头像
    $(function(){
        $("#myForm").ajaxForm({
            //定义返回JSON数据，还包括xml和script格式
            dataType:'json',
            beforeSend: function() {
                //表单提交前做表单验证
                var $this=$("input.upload-img");
                filepath = $this.siblings('input.file').val();
                var extStart = filepath.lastIndexOf(".");
                var ext = filepath.substring(extStart, filepath.length).toUpperCase();
                if (ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
                    myAlert("图片限于bmp,png,gif,jpeg,jpg格式");
                    return false;
                }else{
                    var fileObj=$this.siblings('input.file')[0];
                    var file_size =fileObj.files[0].size;
                    var size = file_size / 1024;
                    if (size > 10240) {
                        myAlert("上传的图片大小不能超过10M！");
                    } else {
                        return true;
                    }
                }

            },
            success: function() {
                //提交成功后调用
                //进行头像图片路径的替换
                var index=filepath.lastIndexOf("\\");
                var pic=filepath.slice(index+1);
                $.ajax({
                    url:'/userImageChange',
                    type:'post',
                    data:{uid:ss['uid'],pic:'uploads/'+pic},
                    success:function(data){
                        if(data.code>0){
                            myAlert(data.msg);
                            location.href="usercenter.html";
                        }
                    },
                    error:function(){
                        myAlert('网络连接故障');
                    }
                })
            }
        });
    });
});