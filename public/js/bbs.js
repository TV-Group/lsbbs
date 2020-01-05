"use strict";
$(()=>{
    //******************轮播图片的插入*************************
    $.ajax({
        url:"/slideimg",
        success:function(data){
            var html="";
            for(var i=0;i<data.length;i++){
                html+=`<img src="${data[i].src}"/>`;
            }
            $("#carousel-transparent").html(html).children("img:nth-child(1)").addClass("show");
            carousel();
        },
        error:function(){
            myAlert("网络出现故障");
        }
    });
    function carousel() {
        //*************************轮播图事件************************
        (function () {
            var prev = document.getElementById("prev");
            var next = document.getElementById("next");
            var list = document.getElementById("carousel-slide");
            //********************透明图片轮播的方式********************************
            var img = document.querySelectorAll(".carousel>#carousel-transparent img");

            function getImgI(e) {
                for (var i = 0; i < img.length; i++) {
                    if (e == img[i])return i
                }
            }

            //前进
            function Next() {
                var show = document.querySelector(".carousel>#carousel-transparent img.show");
                clearI(spans);
                show.className = "";
                if (show.nextElementSibling != null) {
                    var i = getImgI(show);
                    show.nextElementSibling.className = "show";
                    spans[i + 1].className = "active";
                } else {
                    img[0].className = "show";
                    spans[0].className = "active";
                }
            }

            //后退
            function Prev() {
                var show = document.querySelector(".carousel>#carousel-transparent img.show");
                clearI(spans);
                show.className = "";
                if (show.previousElementSibling != null) {
                    var i = getImgI(show);
                    show.previousElementSibling.className = "show";
                    spans[i - 1].className = "active";
                } else {
                    img[img.length - 1].className = "show";
                    spans[spans.length - 1].className = "active";
                }
            }

            //*****************图片两侧前进后退按钮*******************************
            prev.onclick = function () {
                Prev();
            };
            next.onclick = function () {
                Next();
            };
            //*********************滑动块轮播图自动轮播******************************
            var timer = setInterval(next.onclick, 3000);
            /////**********当鼠标移入时,清除定时器,移除时恢复
            var carousel = document.getElementsByClassName("carousel")[0];
            carousel.onmouseover = function () {
                clearInterval(timer);
                timer = null;
            };
            carousel.onmouseout = function () {
                timer = setInterval(next.onclick, 3000);
            };
            ///*********************滑动块下方按钮*************************************
            var btns = document.querySelector("#carousel-button");
            var spans = document.querySelectorAll("#carousel-button>span");

            function clearI(elem) {
                for (var i = 0; i < elem.length; i++) {
                    elem[i].className = " ";
                }
            }

            function getI(e) {
                for (var i = 0; i < spans.length; i++) {
                    if (e.target == spans[i]) return i;
                }
            }

            btns.onclick = function (e) {
                if (e.target.nodeName == "SPAN") {
                    clearI(spans);
                    clearI(img);
                    var i = getI(e);
                    img[i].className = "show";
                    e.target.className = "active";
                }
            };
        })();
        //**********************滑动块轮播图结束**********************
    }
    //***排序按钮的点击事件
    $("ul.sort").on("click","li",e=>{
        $(e.target).addClass("active").siblings().removeClass("active");
        pageno(1);
    });
    //***页面数的多少的事件
    $.ajax({
        url:"/pagenum",
        success:function(data){
            var pagenum=Math.ceil((data[0].page)/5);
            var html="";
            html+=`<li class="prev">前一页</li>`;
            for(var i=0;i<pagenum;i++){
                if(i==0){
                    html+=`<li class="page active">${i+1}</li>`;
                }else{
                    html+=`<li class="page">${i+1}</li>`
                }
            }
            html+=`<li class="next">下一页</li>`;
            $("ul.pager").html(html);
        },
        error:function(){
            myAlert("网络出现故障");
        }
    });

    //***加载响应页数的内容
    function pageno(n){
        var sort;
        var sortways=$("ul.sort>li.active").html();
        if(sortways=="默认排序"){
            sort="/getpages";
        }else if(sortways=="按热度"){
            sort="/byhot";
        }else if(sortways=="按发布时间"){
            sort="/bytime";
        }else if(sortways=="按打赏"){
            sort="/bycom";
        }
        $.ajax({
            url:sort,
            data:{pageno:n},
            success:function(data){
                var html="";
                for(var i=0;i<data.length;i++){
                    //再根据文章内容查找用户信息;
                    var art=data[i];
                    $.ajax({
                        url: "/getarticle",
                        data:{uid:art.uid},
                        async:false,
                        success: function (data) {
                            var obj = data[0];
                            $.ajax({
                                url:"/getComCount",
                                async: false,
                                data:{aid:art.aid},
                                success:function(data){
                                    var count=data[0].count;
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
                                    $("ul.user-content-show").html(html);
                                },
                                error:function(){
                                    myAlert("网络连接故障");
                                }
                            });
                        },
                        error: function () {
                            myAlert("网络连接故障");
                        }
                    });
                }
            },
            error:function(){
                myAlert("网络连接故障");
            }
        })
    }
    pageno(1);
    //***页数的点击事件
    $("ul.pager").on("click","li.page",function(){
        var $this=$(this);
        var n=$this.html();
        if(!$this.hasClass("active")){
            $this.addClass("active").siblings().removeClass("active");
            pageno(n);
        }
    }).on("click","li.prev",function(){
        //***往前一页的点击事件
        var $this=$(this).siblings("li.active");
        if($this.html()!=1){
            $this.removeClass("active").prev().click();
        }
    }).on("click","li.next",function(){
        //***往后一页
        var $this=$(this).siblings("li.active");
        if($this.next().html()!="下一页"){
            $this.removeClass("active").next().click();
        }
    });
});