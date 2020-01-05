/**
 * Created by Administrator on 2017/8/13.
 */
//****左侧按钮栏点击事件
$(()=>{
    $("aside.left>ul").on("click","li",e=>{
        var $tar=$(e.target);
        $tar.addClass("active").siblings().removeClass("active");
    });
    //****点击添加文章标题事件
    var a=0;
    $("div.new-write>a").click(e=>{
        a++;
        var html=`
            <li name="${a}">
                <div class="title">
                    <i class="fa fa-file"></i>
                    <h1>无标题文章</h1>
                </div>
                <i class="fa fa-close close"></i>
            </li>
        `;
        $("ul.new-title").append(html);
    });
    //***文章标题的点击事件***
    $("ul.new-title").on("click","li",function(e){
        if(!$(e.target).is("i.close")) {
            var i=$(this).attr("name");
            var formi=$(`div.content>form[name="${i}"]`);
            $(this).addClass("active").siblings().removeClass("active");
            if(formi.length>0){
                formi.addClass("active").siblings().removeClass("active");
            }else{
                $("div.content").append(`
                    <form action="#" class="note active" name="${i}">
                        <input type="text" value="无标题文章" class="note-title" maxlength="50"/>
                        <input type="button" value="发布文章" class="note-public"/>
                        <textarea name="note"  rows="20"></textarea>
                        <div class="pic">
                            <img src="img/show-01.jpg" alt=""/>
                            <img src="img/show-02.jpg" alt=""/>
                            <img src="img/show-03.jpg" alt=""/>
                            <img src="img/show-04.jpg" alt=""/>
                            <span>请选择发布文章所用的配图~</span>
                        </div>
                    </form>
                `);
                formi.addClass("active").siblings().removeClass("active");
                //*****文章配图的点击事件
                $(".note>div.pic").on("click","img",function(){
                    $(this).addClass("active").siblings().removeClass("active");
                });
            }
        }
    }).on("click","i.close",function(){
        var $this=$(this);
        //***创建变量定义是否已经发布,若已发布则直接删除,无需判断
        if(!ordered) {
            //***绑定删除按钮事件
            myConfirm('确定要删除吗?',function(){
                delArt();
            });
        }else{
            delArt();
        }
        function delArt(){
            var $li = $this.parent();
            var i = $li.attr("name");
            var formi = $(`div.content>form[name="${i}"]`);
            if ($li.next().html() != undefined) {
                $li.next().addClass("active");
                $li.remove();
                formi.remove().next().addClass("active").siblings().removeClass("active");
            } else if ($li.next().html() == undefined) {
                if ($li.prev().html() != undefined) {
                    $li.prev().addClass("active");
                    $li.remove();
                    formi.remove().prev().addClass("active").siblings().removeClass("active");
                } else {
                    $li.remove();
                    $("div.content").empty();
                }
            }
        }

    });
    //*****发布文章的按钮的点击事件*****
    var ordered=false;
    //*****先预先设置好UID 后期使用 cookie 进行传递
    var ss=sessionStorage;
    var uid=ss["uid"];
    //*************************************
    $("div.content").on("click","input.note-public",function(){
        var form=$(this).parent();
        var title=form.children("input.note-title").val();
        var details=form.children("textarea").val();
        var content=details.slice(0,30);
        var img=$("div.pic>img.active");
        var id=$(this).parent().attr("name");
        if((title!="")&&(details!="")) {
            if(img.length>0){
                var pic = img.attr("src").slice(4);
                myConfirm('确认要发布吗?',function(){
                    $.ajax({
                        url: "/public",
                        type: "post",
                        data: {title: title, content: content+"...", uid: uid , details: details , pic: pic},
                        success: function (data) {
                            if(data.code>0){
                                myAlert(data.msg);
                                ordered=true;
                                $(`ul.new-title>li[name='${id}']>i.close`).click();
                            }
                        },
                        error: function () {
                            myAlert("网络出错");
                        }
                    })
                });
            }else{
                myAlert("请选择文章配图~");
            }
        }else{
            myAlert("内容或者标题不能为空");
        }
    }).on("keyup","input.note-title",(function(e){
        var val=$(this).val();
        var name=$(this).parent().attr("name");
        $(`ul.new-title>li[name="${name}"] h1`).html(val);
    }));
    function myAlert(msg){
        console.log(2);
        $("div.myAlert").addClass("active").find("p").html(msg);
        $("div.fix-buttons").on('click',"button",function(){
            $("div.myAlert").removeClass("active");
        });
    }
    function myConfirm(msg,yes){
        console.log(1);
        $("div.myConfirm").addClass("active").find("p").html(msg);
        $("div.fix-buttons").on('click',"button",function(e){
            $("div.myConfirm").removeClass("active");
            var $tar=$(e.target);
            if($tar.hasClass("button-yes")){
                $("div.myConfirm").removeClass("active");
                yes();
            }
        });
    }
});