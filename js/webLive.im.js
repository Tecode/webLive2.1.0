(function() {
    var options = {};

    //把消息转换成Html
    function convertMsgtoHtml(msg) {
        var html = "", elems, elem, type, content;
        elems = msg.getElems();//获取消息包含的元素数组
        for (var i in elems) {
            elem = elems[i];
            type = elem.getType();//获取元素类型
            content = elem.getContent();//获取元素对象
            switch (type) {
                case webim.MSG_ELEMENT_TYPE.TEXT:
                    html += convertTextMsgToHtml(content);
                    break;
                case webim.MSG_ELEMENT_TYPE.FACE:
                    html += convertFaceMsgToHtml(content);
                    break;
                case webim.MSG_ELEMENT_TYPE.IMAGE:
                    html += convertImageMsgToHtml(content);
                    break;
                case webim.MSG_ELEMENT_TYPE.SOUND:
                    html += convertSoundMsgToHtml(content);
                    break;
                case webim.MSG_ELEMENT_TYPE.FILE:
                    html += convertFileMsgToHtml(content);
                    break;
                case webim.MSG_ELEMENT_TYPE.LOCATION://暂不支持地理位置
                    //html += convertLocationMsgToHtml(content);
                    break;
                case webim.MSG_ELEMENT_TYPE.CUSTOM:
                    convertCustomMsg(msg,content);
                    //html += convertCustomMsgToHtml(content);
                    break;
                case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
                    html += convertGroupTipMsgToHtml(content);
                    break;
                default:
                    webim.Log.error('未知消息元素类型: elemType=' + type);
                    break;
            }
        }
        return html;
    }

    //解析文本消息元素
    function convertTextMsgToHtml(content) {
        return content.getText();
    }
    //解析表情消息元素
    function convertFaceMsgToHtml(content) {
        var index = content.getIndex();
        var data = content.getData();
        var faceUrl = null;
        var emotion = webim.Emotions[index];
        if (emotion && emotion[1]) {
            faceUrl = emotion[1];
        }
        if (faceUrl) {
            return	"<img src='" + faceUrl + "'/>";
        } else {
            return data;
        }
    }

    //处理自定义消息
    function convertCustomMsg(msg,content){
        var data = eval('('+ content.data +')');
        if(data){
            switch(data.type){
                case '1000':
                    options.onlineData(data.content);
                    break;
                case '1001':
                    options.people(data.content);
                    break;
                case '1004':
                    options.pushStroe(data.content);
                    break;
                case '1005':
                    options.activeData(data.content);
                    break;
                case '1007':
                    //聊天信息
                    break;
                case '1008':
                    options.giftsData(data.content);
                    break;
            }
        }
    }

    var showMsg = function(msg){
        console.log(msg);

        var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
        fromAccount = msg.getFromAccount();
        if (!fromAccount) {
            fromAccount = '';
        }
        fromAccountNick = msg.getFromAccountNick();
        if (!fromAccountNick) {
            fromAccountNick = '未知用户';
        }
        //解析消息
        //获取会话类型，目前只支持群聊
        //webim.SESSION_TYPE.GROUP-群聊，
        //webim.SESSION_TYPE.C2C-私聊，
        sessType = msg.getSession().type();
        //获取消息子类型
        //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
        //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
        subType = msg.getSubType();
        isSelfSend = msg.getIsSend();//消息是否为自己发的

        switch (subType) {
            case webim.GROUP_MSG_SUB_TYPE.COMMON://群普通消息
                options.showTextMsg(convertMsgtoHtml(msg),msg);
                break;
            case webim.GROUP_MSG_SUB_TYPE.REDPACKET://群红包消息
                //contentSpan.innerHTML = "[群红包消息]" + convertMsgtoHtml(msg);
                break;
            case webim.GROUP_MSG_SUB_TYPE.LOVEMSG://群点赞消息
                //业务自己可以增加逻辑，比如展示点赞动画效果
                //contentSpan.innerHTML = "[群点赞消息]" + convertMsgtoHtml(msg);
                //展示点赞动画
                // showLoveMsgAnimation();
                break;
            case webim.GROUP_MSG_SUB_TYPE.TIP://群提示消息
                //contentSpan.innerHTML = "[群提示消息]" + convertMsgtoHtml(msg);
                break;
        }
    };



    //用于监听用户连接状态变化的函数
    var onConnNotify = function(resp) {
        //console.log(resp);
    };
    //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填
    var jsonpCallback = function(resp) {

    };
    //监听新的群（普通和提示）消息函数
    var onBigGroupMsgNotify = function(msgList) {
        for (var i = msgList.length - 1; i >= 0; i--) {//遍历消息，按照时间从后往前
            var msg = msgList[i];
            console.log('receive a new group msg: ' + msg.getFromAccountNick());
            //显示收到的消息
            showMsg(msg);
        }
    };
    //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件
    var onMsgNotify = function(resp) {
        console.log(resp);
    };
    //监听（多终端同步）群系统消息事件
    var onGroupSystemNotifys = function(resp) {
        console.log(resp);
    };
    //监听群资料变化事件
    var onGroupInfoChangeNotify = function(resp) {

    };

    var listeners = {
        "onConnNotify": onConnNotify, //选填
        "jsonpCallback": jsonpCallback, //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
        "onBigGroupMsgNotify": onBigGroupMsgNotify, //监听新消息(大群)事件，必填
        "onMsgNotify": onMsgNotify, //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
        "onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
        "onGroupInfoChangeNotify": onGroupInfoChangeNotify //监听群资料变化事件，选填
    };


    var liveim = {};

    liveim.login = function(iminfo) {
        options = iminfo;

        var logininfo = options.logininfo;
        webim.login(logininfo, listeners, {
            isAccessFormalEnv:false,
            isLogOn:false
        }, function(result) {
            console.log(result);
            if (result.ErrorCode == 0) {
                console.log("登录成功");
                //加群
                webim.applyJoinBigGroup({
                    GroupId:options.groupid
                }, function(result) {
                    console.log(result);
                }, function(err) {
                    console.log(err);
                });
            }
        }, function(err) {
            console.log(err);
        })
    };

    liveim.joinbiggroup = function(){

    };
    liveim.logout = function(){
        //退出
        webim.quitBigGroup({
            GroupId: '600032'
        }, function() {}, function() {})
    };

    liveim.send = function(text){
        var msgtosend = text,selToID=options.groupid;
        var msgLen = webim.Tool.getStrBytes(msgtosend);

        if (msgtosend.length < 1) {
            //alert("发送的消息不能为空!");
            return;
        }

        var maxLen, errInfo,selSess,selSessHeadUrl,selType = webim.SESSION_TYPE.GROUP;
        if (selType == webim.SESSION_TYPE.GROUP) {
            maxLen = webim.MSG_MAX_LENGTH.GROUP;
            errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
        } else {
            maxLen = webim.MSG_MAX_LENGTH.C2C;
            errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
        }
        if (msgLen > maxLen) {
            $.toast(errInfo);
            return;
        }

        if (!selSess) {
            selSess = new webim.Session(selType, selToID, selToID, selSessHeadUrl, Math.round(new Date().getTime() / 1000));
        }
        var isSend = true;//是否为自己发送
        var seq = -1;//消息序列，-1表示sdk自动生成，用于去重
        var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
        var subType;//消息子类型
        if (selType == webim.SESSION_TYPE.GROUP) {
            //群消息子类型如下：
            //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
            //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
            //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
            //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
            subType = webim.GROUP_MSG_SUB_TYPE.COMMON;

        } else {
            //C2C消息子类型如下：
            //webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
            subType = webim.C2C_MSG_SUB_TYPE.COMMON;
        }
        var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, options.logininfo.identifier, subType, options.logininfo.identifierNick);
        //解析文本和表情
        var expr = /\[[^[\]]{1,3}\]/mg;
        var emotions = msgtosend.match(expr);
        var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
        if (!emotions || emotions.length < 1) {
            text_obj = new webim.Msg.Elem.Text(msgtosend);
            msg.addText(text_obj);
            //text_obj = new webim.Msg.Elem.Custom('{"type":"1001","content":{"user":"'+ msgtosend +'"}}',"描述","扩展字段");
            //msg.addCustom(text_obj);
        } else {//有表情

            for (var i = 0; i < emotions.length; i++) {
                tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
                if (tmsg) {
                    text_obj = new webim.Msg.Elem.Text(tmsg);
                    msg.addText(text_obj);
                }
                emotionIndex = webim.EmotionDataIndexs[emotions[i]];
                emotion = webim.Emotions[emotionIndex];
                if (emotion) {
                    face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                    msg.addFace(face_obj);
                } else {
                    text_obj = new webim.Msg.Elem.Text(emotions[i]);
                    msg.addText(text_obj);
                }
                restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
                msgtosend = msgtosend.substring(restMsgIndex);
            }
            if (msgtosend) {
                text_obj = new webim.Msg.Elem.Text(msgtosend);
                msg.addText(text_obj);
            }
        }


        webim.sendMsg(msg, function (resp) {
            console.log(resp);
        },function(resp){
            console.log(resp);
        })
    };
    //加载提示符
    liveim.loading = function () {
        var $load = $('<div class="loading_box"><div class="loading"><div class="img"></div></div></div>').appendTo(document.body);
        setTimeout(function () {
            $load.css('opacity',1);
        },100)
    };
    liveim.unloading = function () {
        $('.loading_box').css('opacity',0);
        setTimeout(function () {
            $('.loading_box').remove();
        },100)
    };
    //ajax方法
    liveim.initAjax = function (url, type, postdata, fn) {
        $.ajax({
            type: type,
            url: url,
            data: postdata,
            dataType: 'json',
            success: function (result) {
                fn.call(this, result);
            },
            error: function (result) {
                fn.call(this, result);
            }
        })

    };
    //初始化表情
    liveim.emotionul = function(){
        var ul = '<ul id="emotionUL">';
        for (var index in webim.Emotions) {
            var li = '<li><img text="'+ webim.Emotions[index][0] +'" src="'+ webim.Emotions[index][1] +'" style="cursor:pointer;" /></li>'
            ul += li;
        }
        ul += '</ul>';
        return ul;
    };

    window.liveim = liveim;

})();
