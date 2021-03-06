SET NAMES UTF8;
CREATE DATABASE ls CHARSET=UTF8;
USE ls;


#用户资料库
CREATE TABLE user(
    uid         INT PRIMARY KEY AUTO_INCREMENT,
    uname       VARCHAR(100) NOT NULL DEFAULT '',
    upwd        VARCHAR(20) NOT NULL DEFAULT '',
    pic         VARCHAR(100) NOT NULL DEFAULT '',
    focusc      INT NOT NULL DEFAULT 0,
    fansc       INT NOT NULL DEFAULT 0,
    likec       INT NOT NULL DEFAULT 0
);
INSERT INTO user VALUES(null,'lele','123456','img/13-394c31a9cb492fcb39c27422ca7d2815.jpg',0,0,0);

#创建轮播图图片表
CREATE TABLE slideimg(
    src         VARCHAR(300)
);
INSERT INTO slideimg VALUES('img/01.jpg');
INSERT INTO slideimg VALUES('img/02.jpg');
INSERT INTO slideimg VALUES('img/03.jpg');
INSERT INTO slideimg VALUES('img/04.jpg');

#文章的预览内容库
CREATE TABLE article(
    aid         INT PRIMARY KEY AUTO_INCREMENT,
    uid         INT NOT NULL DEFAULT 0,
    title       VARCHAR(100) NOT NULL DEFAULT '',
    content     VARCHAR(200) NOT NULL DEFAULT '',
    viewcount   INT NOT NULL DEFAULT 0,
    fav         INT NOT NULL DEFAULT 0,
    paycount    INT NOT NULL DEFAULT 0,
    time        DATETIME NOT NULL DEFAULT 0,
    details     VARCHAR(3000) NOT NULL DEFAULT '',
    pic         VARCHAR(100) NOT NULL DEFAULT ''
);

#文章的评论的库
CREATE TABLE comment(
    cid         INT PRIMARY KEY AUTO_INCREMENT,
    aid         INT NOT NULL DEFAULT 0,
    uid         INT NOT NULL DEFAULT 0,
    fav         INT NOT NULL DEFAULT 0,
    con         VARCHAR(300) NOT NULL DEFAULT "",
    time        DATETIME NOT NULL DEFAULT 0
);



INSERT INTO article VALUES (
    null,
    1,
    '好的爱情,是三观一致有话聊',
    '大家好，我是小丸子，之前很多人给我留言，希望我给大家推荐一些化妆品。恰好我的工作就是和美妆相关，所以对美妆和化妆品这一块算是比较了解，自己日常关注和使用的化妆品也比较多。 这...',
    10,60,42,now(),
    '一、 你看过清晨四点的 * * 么？最近朋友圈里总有人每天凌晨四五点在刷着这句话。﻿﻿﻿﻿琪琪就是其中一个。她加入了一个早起团，团里的朋友每天都在比着早起，你五点，我四点半，比你更早。她很痛苦，“每天早上五点钟起床打卡怎么这么难啊？好困，一整天的精神都不好，吃的还特别的多，无论如何，我要坚持下去，成为一个自律的人。”﻿ 我摇摇头，现在五点起床已经变成一种时尚了。',
    'show-01.jpg'
);
INSERT INTO article VALUES (
    null,
    1,
    '普通生活,慢反应:"十二宫"',
    '你会发现身边总会存在这样的人：上学看起来不努力却总能拿高分，玩的不比你少的朋友却总是在很多方面成就要比同侪大的多。甚至一些国外的年轻人，连业余玩的东西也都搞的很牛逼。你会奇...',
    134,453,453,now(),
    '在简书写作近三年，我的第一本实体书终于面世了，说不激动是假的，从而去年12月份，和简书签约以来，这本书整整历时近10个月，才得以面世，在这里，我首先感谢简书总编刘淼老师。本书的起源正是我和刘淼老师的一次谈话，当时我向他推荐说，我正在写一部长篇小说, 可否给他看一下。结果这部小说初稿发给他之后，他亲自撰写选题报告，帮忙推荐给了北京联合出版社，选题顺利通过。这是我第一次写长篇小说，就能顺利获得出版，的确给我的写作自信方面带来的极大的提升。',
    'show-02.jpg'
);
INSERT INTO article VALUES (
    null,
    1,
    '每个读书人心里,都开着一家诚品书店',
    '文/丧心病狂码字的黄家公子 来源/简书 ——愿你听见我的名字时眉开眼笑，愿你见到我时不管不顾给我一个拥抱。 见字如面。昨晚翻看微信的收藏，里面有一条你发给我的微信： “没谈...',
    546,63,4536,now(),
    '这几天有人很“阴谋论”地说，因为黑豹9月要开演唱会了，所以黑豹成员赵明义的“保温杯”才会这么火，是的，这头已经没有窦唯的“黑豹”乐队（据称是窦唯和其他成员的音乐理念不合，我相信这世上能和窦唯理念相合的人，已经不多了），靠什么来吸引大众的眼球呢？横是不能让这几个加起来都快一千岁了的老汉们，去参加“中国有嘻哈”，和“GAI爷只认钱”PK吧？最后天从人愿，突围而出，“营销成功”的竟然是鼓手赵明义那斑驳的头发，鼓起的肚子，手中的保温杯（亮点），还有那典型“中危男”的气质与形貌。于是乎，一杯子激起千层浪，大家想，这形象怎么是昔日那放浪不羁摇滚至死的“黑豹”，这分明是头温驯平凡看家护院的“苏牧”嘛。其实同样的反差曾经也发生在唐朝乐队的丁武身上。看过当年唐朝鼎盛时期的视频，主唱丁武那长发披肩的样子，着实令人惊艳，而且，“惊也不是这惊法，艳也不是这艳法”，是诸神都要起震动的那种惊心动魄的好看（当年人称处女收割机），可是，等后来丁武在电视上再次出现时，已经是一个剪短了头发失去光辉的平凡的中年男子，满满的，是与你擦肩而过时你也不会回头多看一眼的黯然神伤。',
    'show-03.jpg'
);
INSERT INTO article VALUES (
    null,
    1,
    '互联网时代“掉队”的日本人',
    '很多电影都像个器皿，导演像科学家，给这个器皿设置环境和规则，喷点毒药放点毒气，然后放进几只苍蝇，研究它们在各种情况下的反应，看它们怎么扑腾怎么挣扎。这种电影就像人性试验装置，...',
    89,96,365,now(),
    '我曾给新世相的读者推荐过一篇文章，叫《市井雄心》。它讲的是：伟大的城市吸引有抱负的人，你应该在配得上你野心的地方生活。在中国，配得上野心的地方似乎就是北上广深。所有人都在不厌其烦地审视这几个城市，以至于围绕是否“假装”，就能大张旗鼓地讨论三天。但是，那些小地方的日子呢？以总人口来说，那里才生活着中国的大部分人。他们的孤独、焦虑和满足却是相对模糊的。',
    'show-04.jpg'
);
INSERT INTO article VALUES (
    null,
    1,
    '32岁，一个人，一条狗，90372元存款，即将进入婚姻',
    '一个信息爆炸的时代，人人皆是帮凶。即使我们本身无意，却还是会在无形中侵入别人的生活——依靠微信。如今打开微信，很难再用“朋友圈”的字面含义来定义它；在列表中会出现五花八门的微...',
    453,213,786,now(),
    '某夜，从市中心回学校的路上，在离学校不远的一个公交站点下车，当我站在站牌附近，看见马路对面，笼罩着一层朦胧的，温煦的，饱满的，金黄色的光芒的老式水泥建筑，不由得被它的沉静，沧桑，暗哑，萧条，庄严，与寂寞的姿态打动。﻿对这种为岁月所侵蚀的，斑驳的，爬满藤蔓的建筑，我总是情不自禁报之以无限的恋慕。也许来源于心性里，对哥特的眷顾，来源于幼时自己住过的房子，那恬淡，躁动，抑郁，却平静，美好，难忘的记忆，又或者，来源于多少个夜里，挥之不去的梦境。许多个梦里，我总回到一座空空荡荡，寥落寂寞的房屋，损毁的窗，幽邃曲折，盘旋不知往何处的楼梯，苍青色的水泥墙。',
    'show-01.jpg'
);
INSERT INTO article VALUES (
    null,
    1,
    '写作，是一场孤独的旅行（首次直播分享）',
    '写在前面 据台湾中时电子报消息，诚品书店创办人、董事长吴清友先生，7月18日晚间在位于台湾省台北市的办公室突然昏厥，经员工报案，救护员赶往现场，发现他已无呼吸心跳，现场施以心...',
    36,456,32,now(),
    '那是一个月黑风高，晴空万里的晌午，我一如既往的吃完午饭，坐在办公桌前稍作休息。纠结了一个上午的我直到此刻都还在犹豫到底要不要去报雅思，2000大洋啊，那可是他妈的2000大洋啊！但是当我看到这句话时，我还是选择义无反顾，头也不回的走下去。这碗鸡汤就算有毒，老子也一口闷了，谁让仗剑走天涯是需要付出一定代价的呢？说时迟，那时快，就在我笃定了自己的想法之后，抱着先报名，实在不行到时候再取消报名不就好了的想法，一路从打开雅思官网，到注册信息，填写内容，绑定银行卡，支付，行云流水，一气呵成……犹记得当时我关闭Chrome窗口的时候，有一种战士收刀入鞘的感觉。然后我就滚去睡午觉了，那一觉我睡的特别的香，可能这就是人之将死其觉也香的来源吧。好了，完成了报名第一步，下面就是最最重要的复习计划了，实不相瞒，我最近的一次考试，也就是去年那场记错考试日期的六级，至此，估计再没有提笔写过字，入场考过试。所以这样看来，制定合理的复习规划是很有必要的，我相信已经工作了的你，也一定一定会面临工作时间忙，下班精力不够的困扰，所以还是那句话，网上无论多少教程，复习计划，也一定要按照自己的实际情况因地制宜，因材施教。大概上网了解了一下雅思，其实和四六级差不多，分为听说读写，口语考试一般在笔试的前一周或者后一周之内，反正不会差太多，我是先考的口语，过了4天才考的笔试。还有，雅思考试有换题季，换题季内有机经，这个东西对于中国考生来说确实是棒棒的，朋友聊天说起来，貌似只有中国地区有这种机经，口语题库，其他国家的烤鸭们都没听过这玩意儿，因为有了这种机经，题库，只要在换题季内，口语基本上出不了这个范围，剩下的就是花时间和精力去复习就好了。雅思的换题季是每年的1、5、9月，也就是说只有这三个月份会换题，其他日期内就按照当季的题库去复习你的speaking就好了。当然，话说回来，这些东西都是为那些刷高分求offer的人而言的，讲真，因为当你开始复习他的口语机经和题库的时候，你会发现，妈的老子要是把这些都整明白了，就不用去考雅思了，题库千千万，何时到尽头，我们这里不讨论有充足时间准备的，就来说说我的亲身经历吧。',
    'show-02.jpg'
);
INSERT INTO article VALUES (
    null,
    1,
    '读书越多的人，越难相处？',
    '日本的守规矩讲秩序，让他们在几十年前就成为发达国家，很快走出了二战废墟，引领了工业时代文明的潮流。 日本制造，曾几何时，摆在家里，代表着什么，八零后及之前生人的各位大家想必都...',
    32,32,42,now(),
    '成长过程中，你遭遇过家人的体罚或语言暴力吗？而你，是否对你的孩子使用过体罚或语言暴力呢？想必，每个人都曾经怒到想要打人，想要用暴力来宣誓主权。我们都不是完美的，况且有时候为了让对方意识到我们的不满，知道事情的严重性，我们也必须有所表示，不能一切都一笑置之。当了父母后，我们有了绝对的权力，也有绝对的责任，照顾并培养好这个小生命。为了他以后能做一个有原则、有担当、有自律的成人，我们需要管教。但为了管教，下手要多重？尤其当他不听你的话时，要表示得多么强烈？想起民间那句话：“打是疼，骂是爱。” 我始终不喜欢这句话。做为教育原则，这其实在合理暴力行为。实际上，这往往是父母亲下手过重后，说来安慰自己的借口。但天下父母心，求好心切也必然引起焦虑。父母认为这是为孩子好，现在不去管教，以后就会管不动的，是不是？体罚和语言暴力，到底有没有效？当然有效。但它是最有效吗？短期看来，似乎是。但人生就那么短吗？孩子打到乖了，你的阶段性任务就完成了吗？',
    'show-03.jpg'
);
INSERT INTO article VALUES (
    null,
    1,
    '从学渣到韩语同传——十年韩语发烧友告诉你学习韩语的四条捷径','文/ 小婷半清 今天，被别山举水老师邀请到他的分享群，在简书直播间进行了我第一次的分享，现在整理一下发出文字版的。 大家好，我是小婷半清，很高兴在这个美好的夜晚和大家聚在一起...',
    452,78,78,now(),
    '郑州这几天开始下雨，淅淅沥沥的下了好几天。雨停过后就是阴天，刮风，温度一下子下降到了深秋时的温度。人们开始披上了外套，穿上了秋装。偶尔几个调皮的孩子，还是短袖在大雨里奔跑，像极了我的小时候，喜欢下雨，喜欢玩水。那是我的青春，跨越了一个世纪的青春。轰轰烈烈的跨过，安安静静的告别，没有歇斯底里，没有欢呼雀跃。今天，早上像雾又像霾的气体弥漫整个郑州，露水下了一地。我又披上了我的外套，开始做公交去上班。坐在公交车上，看着外面的人流来来走走。就像一部电影的慢镜头，随着红绿灯的变换而变换。突然有一个大胆的想法，如果我辞职了，去穷游西藏，我的结果会怎样。每天朝九晚五的工作，我还没有去习惯就开始厌倦。每天都会做着同样的工作，开始渐渐疲倦。我开始想他们下班后的生活是什么样子？有人喜欢跑步，有人喜欢逛街。每个人下班后的生活都充实，我想来想去我竟然除了看书，写作，就没有什么爱好了。',
    'show-04.jpg'
);