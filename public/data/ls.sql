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
    wordc       INT NOT NULL DEFAULT 0,
    likec       INT NOT NULL DEFAULT 0
);
INSERT INTO user VALUES(null,'lele','123456','img/13-394c31a9cb492fcb39c27422ca7d2815.jpg',0,0,0,0);


#文章的预览内容库
CREATE TABLE article(
    aid         INT PRIMARY KEY AUTO_INCREMENT,
    uid         INT NOT NULL DEFAULT 0,
    title       VARCHAR(100) NOT NULL DEFAULT '',
    content     VARCHAR(200) NOT NULL DEFAULT '',
    viewcount   INT NOT NULL DEFAULT 0,
    comment     INT NOT NULL DEFAULT 0,
    fav         INT NOT NULL DEFAULT 0,
    paycount    INT NOT NULL DEFAULT 0,
    time        DATETIME NOT NULL DEFAULT 0,
    details     VARCHAR(3000) NOT NULL DEFAULT '',
    pic         VARCHAR(100) NOT NULL DEFAULT ''
);


