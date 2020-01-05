/**
 * Created by Administrator on 2017/8/27.
 */
$(()=>{
    window.onload=function() {
        //***使用h5新属性  ws 来进行数据传输
        var ss = sessionStorage;
        if (ss["uname"]!=null) {
            $.ajax({
                url: "/getPic",
                data: {uid: ss["uid"]},
                success: function (data) {
                    $("ul.header-right>li.login").remove();
                    $("ul.header-right>li.sign").html(
                        `<img src="${data.pic}"/>
                    <ul class="usercenter-box">
                        <li class="usercenter"><a href="usercenter.html">用户中心</a></li>
                        <li class="login-out"><a href="javascript:;">退出登录</a></li>
                    </ul>`
                    ).hover(function () {
                    //***登录后的界面弹出功能
                            $(this).children("ul.usercenter-box").css({height: "120px", opacity: "0.9"});
                        }, function () {
                            $(this).children("ul.usercenter-box").css({height: "0", opacity: "0"});
                        }).on("click", "li.login-out", (e)=> {
                            //***退出登录点击事件
                            myConfirm('确认要退出登录吗?',function(){
                                ss.clear();
                                location.href = "index.html";
                            });
                    });
                },
                error: function () {
                    myAlert("网络出现错误");
                }
            })
        }
        //********************搜索框点击事件************************
        $("input.search").focus(e=> {
            $("form.search-group").addClass("active");
        }).blur(e=> {
            $("form.search-group").removeClass("active");
            //$("ul.search-prev").removeClass("active").html("");
        }).keyup(e=> {
            var val = $(e.target).val();
            if (val != "") {
                $.ajax({
                    url: "/search",
                    data: {title: val},
                    success: function (data) {
                        var html = "";
                        for (var i = 0; i < data.length; i++) {
                            html += `<li name="${data[i].aid}" class='search-list'>${data[i].title}</li>`;
                        }
                        $("ul.search-prev").addClass("active").html(html);

                    },
                    error: function () {
                        myAlert("网络连接出错");
                    }
                });
            } else {
                $("ul.search-prev").html("");
            }
        });

        //***搜索框内容的点击跳转事件
        $("ul.search-prev").on("click","li",function(e){
            ss["aid"]=$(this).attr("name");
            location.href="details.html";
        });

        //***写文章点击按钮***
        $("ul.header-right").on("click", "li.write>a", ()=> {
            if (ss["uid"]!=null) {
                location.href = "public.html";
            } else {
                myConfirm('发表文章必须先登录,要登录吗?',function(){
                    location.href = "login.html";
                });
            }
        });
        //****文章内容详情标题点击之后跳转事件******
        $("ul.user-content-show").on("click", "a.title", function (e) {
            e.preventDefault();
            var aid = $(this).attr("name");
            ss["aid"] = aid;
            $.ajax({
                url: "/addView",
                data: {aid: aid},
                success: function (data) {
                    location.href = "details.html";
                },
                error: function () {
                    myAlert("网络连接出现故障");
                }
            })
        });
        $("button.side-button").click(function(){
            $("div.header-center").toggleClass("active");
            $("ul.header-right").toggleClass("active");
            $("section.section").click(function(e){
                e.preventDefault();
                $("div.header-center").removeClass("active");
                $("ul.header-right").removeClass("active");
            })
        });
    };
});
function myAlert(msg){
    $("div.myAlert").addClass("active").find("p").html(msg);
    $("div.fix-buttons").on('click',"button",function(){
        $("div.myAlert").removeClass("active");
    });
}
function myConfirm(msg,yes){
    $("div.myConfirm").addClass("active").find("p").html(msg);
    $("div.fix-buttons").on('click',"button",function(e){
        $("div.myConfirm").removeClass("active");
        var $tar=$(e.target);
        if($tar.hasClass("button-yes")){
            yes();
        }
    });
}