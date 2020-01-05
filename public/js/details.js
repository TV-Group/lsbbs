$(()=>{
    var ss=sessionStorage;
    $.ajax({
        url: "/getArtInfo",
        data: {aid: ss["aid"]},
        success: function (data) {
            var art = data[0];
            $.ajax({
                url: "/getPic",
                data: {uid: art.uid},
                success: function (data) {
                    var user = data;
                    var html = "";
                    html += `
                        <h1>${art.title}</h1>
                        <div class="author">
                            <img src="${user.pic}" alt=""/>
                            <ul>
                                <li>
                                    <span class="author-tag">作者</span>
                                    <span class="author-name">${user.uname}</span>
                                    <span class="author-focus"><i class="fa fa-plus"></i> 关注</span>
                                </li>
                                <li>
                                    <span>${new Date(art.time).toLocaleString()}</span>
                                    <span>字数 ${art.details.length}</span>
                                    <span>阅读 ${art.viewcount}</span>
                                    <span>喜欢 ${art.fav}</span>
                                    <span>赞赏 ${art.paycount}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="author-content">
                            <p>${art.details}</p>
                            <img src="img/${art.pic}" alt=""/>
                        </div>
                        <div class="section-footer">
                            <div class="fav">
                                <span><i class="fa fa-heart-o"></i> 喜欢 </span>
                                <span class="line"></span>
                                <span class="count">${art.fav}</span>
                            </div>
                            <div class="share">
                                <a href="javascript:;" class="fa fa-weixin" style="color:#00BB29;">
                                    <div>分享到微信</div>
                                </a>
                                <a href="javascript:;" class="fa fa-weibo" style="color:#E05244;">
                                    <div>分享到微博</div>
                                </a>
                                <a href="javascript:;" class="fa fa-picture-o">
                                    <div>下载长微博图片</div>
                                </a>
                                <a href="javascript:;">更多分享</a>
                            </div>
                        </div>
                    `;
                    $("section.section").html(html);

                    //*******************文章喜欢的点击事件
                    $("div.fav").one("click", function(){
                        if(ss['uid']!=undefined) {
                            var $this = $(this);
                            $.ajax({
                                url: "/addFav",
                                data: {aid: ss["aid"]},
                                success: function (data) {
                                    if (data.code > 0) {
                                        var count = $("div.fav>span.count");
                                        var c = count.html();
                                        count.html(++c);
                                        $this.addClass("active");
                                    }
                                },
                                error: function () {
                                    myAlert("网络出现故障");
                                }
                            })
                        }else{
                            myAlert("您还没有登录,登录后点赞");
                        }
                    });
                },
                error: function () {
                    myAlert("网络连接出现故障");
                }
            })
        },
        error: function () {
            myAlert("网络连接出现故障");
        }
    });
    //*******点击关注事件***
    $("section.section").on('click',"span.author-focus",function(){
        if(ss['uid']!=undefined){
            myAlert('关注成功');
            $(this).html('已关注');
        }else{
            myAlert('你尚未登录,请前往登录界面登录')
        }
    });



    var usercom;
    //*****进行评论事件
    if(ss["uid"]!=undefined) {
        $.ajax({
            url: "/getPic",
            data: {uid: ss["uid"]},
            success: function (data) {

                usercom=data;
                var html = `<img src="${usercom.pic}" alt=""/>
        <div class="comment-box">
            <textarea placeholder="写下你的评论..." ></textarea>
        </div>
        <div class="comment-post">
            <button class="post">发送</button>
        </div>
        `;
                $("div.comment").html(html);
            },
            error: function () {
                myAlert("网络连接故障");
            }
        });
    }else{
        var html=`<p>您还未登录,请先 <a href="login.html" style="color:#0A65F4">登录</a> 在进行评论</p>`;
        $("div.comment").html(html);
    }

    //*****评论展示事件
    $.ajax({
        url:"/getCom",
        data:{aid:ss["aid"]},
        success:function(data){
            var n=data.length;
            $("p.comment-header").html(n+"条评论");
            var html="";
            var floor=1;
            for(var i=0;i<data.length;i++){
                var com=data[i];
                $.ajax({
                    url:"/getPic",
                    async:false,
                    data:{uid:com.uid},
                    success:function(data){
                        var user=data;
                        html+=`<li class="com-con-box">
                <div class="block"></div>
                <div class="com-con-hea">
                    <img src="${user.pic}"/>
                    <div>
                        <span>${user.uname}</span>
                        <div>
                            <span>${floor}楼</span>
                            <span>${new Date(com.time).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div class="com-con-con">
                    <p>${com.con}</p>
                </div>
                <div class="com-con-foo">
                    <p name="${com.cid}" class="unclick"><i class="fa fa-thumbs-o-up"></i><span class="count">${com.fav}</span>人赞</p>
                </div>
            </li>`;
                        floor++;
                    },
                    error:function(){
                        myAlert("网络连接出现故障");
                    }
                });
            }
            //***发布评论事件***
            $("div.comment").on("click","button.post",function(){
                var com=$("div.comment-box>textarea");
                var val=com.val();
                if(val==""){
                    myAlert("评论内容不能为空");
                }else{
                    $.ajax({
                        url:"/sendCom",
                        type:"post",
                        data:{
                            aid:ss["aid"],
                            uid:ss["uid"],
                            con:val
                        },
                        success:function(data){
                            com.val("");
                            var preCom=
                                `
                                <li class="com-con-box">
                                    <div class="block"></div>
                                    <div class="com-con-hea">
                                        <img src="${usercom.pic}"/>
                                        <div>
                                            <span>${usercom.uname}</span>
                                            <div>
                                                <span>${floor}楼</span>
                                                <span>${new Date().toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="com-con-con">
                                        <p>${val}</p>
                                    </div>
                                    <div class="com-con-foo">
                                        <p name="${data.insertId}" class="unclick"><i class="fa fa-thumbs-o-up"></i><span                                         class="count">0</span>人赞</p>
                                    </div>
                                </li>
                                `;

                            var $ul=$("ul.comment-content");
                            if($("ul.comment-content>li").length>0){
                                $ul.prepend(preCom);
                            }else{
                                $ul.append(preCom);
                            }
                            floor++;
                            $("p.comment-header").html((++n)+"条评论");
                        },
                        error:function(){
                            myAlert("网络连接故障");
                        }
                    })
                }
            });
            //****点赞事件
            $("ul.comment-content").html(html).on("click","div.com-con-foo>p.unclick",function(){
                var $this=$(this);
                $this.removeClass("unclick");
                var cid=$this.attr("name");
                $.ajax({
                    url:"/addComFav",
                    data:{cid:cid},
                    success:function(data){
                        $this.children("span.count").html(parseInt($this.children("span.count").html())+1);
                    },
                    error:function(){
                        myAlert("网络连接失败");
                    }
                })
            })
        },
        error:function(){
            myAlert("网络连接出现故障");
        }
    });





});