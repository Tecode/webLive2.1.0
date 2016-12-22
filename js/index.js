/**
 * Created by ASSOON on 2016/12/21.
 */
var url = {
    getAllListUrl: 'json/allList.json',//获取边看边买列表
    getAnchorPushUrl:'json/getAnchorPush.json'
};
var icon =['swimmingUpRight','swimmingUpLeft'];
var cloudMail = {
    tips: function (time) {
        setTimeout(function () {
            $('.send_infobox input').val('');
        }, time)
    },
//im内容显示
    player: function () {
        function getParams(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        }

        var rtmp = getParams('rtmp'),
            flv = getParams('flv'),
            m3u8 = getParams('m3u8'),
            mp4 = getParams('mp4'),
            live = (getParams('live') == 'true' ? true : false),
            coverpic = getParams('coverpic'),
            width = getParams('width'),
            height = getParams('height'),
            autoplay = (getParams('autoplay') == 'true' ? true : false);
        /**
         * 视频类型播放优先级
         * mobile ：m3u8>mp4
         * PC ：RTMP>flv>m3u8>mp4
         * x5-video-player-type="h5" x5-video-player-fullscreen="true"
         */
        var options = {
            rtmp: rtmp,
            flv: flv,
            m3u8: m3u8 || 'http://alcdn.hls.xiaoka.tv/20161216/1fc/bbb/1nIODMR2-Oydc5i_/index.m3u8',
            mp4: mp4 || '',
            coverpic: 'img/video.jpg',//封面
            autoplay: true,
            live: true,
            width: $(window).width(),
            height: 'auto',
            wording: {
                2032: '请求视频失败，请检查网络',
                2048: '请求m3u8文件失败，可能是网络错误或者跨域问题'
            },
            listener: function (msg) {
                //console.log(msg.type);
            }
        };
        var player = new TcPlayer('video-container', options);
        document.getElementsByTagName('video')[0].setAttribute('x5-video-player-type', 'h5');
        document.getElementsByTagName('video')[0].setAttribute('x5-video-player-fullscreen', 'true');
        document.getElementsByTagName('video')[0].setAttribute('width', '100%');
        $('video').css({'margin-left': '-1.1%', 'margin-right': '-1.1%'});

//            swiper
        var mySwiper2 = new Swiper('#swiper-container2', {
            slidesPerView: 2,
            onTap: function () {
                mySwiper3.slideTo(mySwiper2.clickedIndex);
            }
        });
        $('.swiper-no-swiping').on('touchend', function () {
            mySwiper3.slideTo($(this).index());
            $('.swiper-no-swiping').removeClass('active');
            $(this).addClass('active');
        });
        var mySwiper3 = new Swiper('#swiper-container3', {
            onSlideChangeStart: function () {
                updateNavPosition()
            }
        });

        function updateNavPosition() {
            $('#swiper-container2 .active').removeClass('active');
            var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).addClass('active');

            if (!activeNav.hasClass('swiper-slide-visible')) {
                if (activeNav.index() > mySwiper2.activeIndex) {
                    var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1;
                    mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
                }
                else {
                    mySwiper2.slideTo(activeNav.index())
                }
            }
        }

        //消息
        var iminfo = {
            logininfo: {
                sdkAppID: '1400018727',//用户标识接入SDK的应用ID，必填
                appIDAt3rd: '1400018727',//和sdkAppID一样
                accountType: '8664',//账号类型，必填
                identifier: '70', //用户帐号，选填600034
                identifierNick: '小冉', //用户昵称，选填
                userSig: 'eJxljlFPgzAYRd-5FYRXjbbdKsXEBzeXSTKyqIMleyFlfLCOFZrSDYbxv*twiSTe13Nu7v20bNt2VouPO77dVsfSxOaswLEfbQc5t39QKZHG3MQjnf6D0CqhIeaZAd1DTCklCA0dkUJpRCauhjtkdVrE-cBvefzTxMwl7lAReQ*DWTj136bdJkyW8jRnmx0UDdm9g9eduxd*BMLVvA0mryEWNJppnvv5c4MT35OL4qGUN8m9gryFg6zWxdLzgv1B15HcNxHLJuv8aTBphITrIYa8MaGMDegJdC2qshcIwhSTEbrEsb6sbymkXWI_' //鉴权Token，identifier不为空时，userSig必填 eJxljktPg0AURvf8iglrowMMD01cINIWaG2ibaluyMgMePsYEKbYYvzvIjaRxLs9J-c7nwpCSF1Mny5pmhYHIRN5KrmKbpCK1Ys-WJbAEioTo2L-ID*WUPGEZpJXPdRM09QxHjrAuJCQwdmwOmqQAa-ZNulHfh*Qjmum4VwPFch7OPOXXnCfP4-Wwh7H84O2ivx2HaXpZrajD9virQhcKmoiiP2y8OSjC7575Z2c0WQHNnttaBjPo7gNp*3kGKwsPVze5c14k70Tf5*Rj9vBpIQ9PwfZFnZsYgyDGl7VUIhe0LtcTTfwz6nKl-INsopctg__
            },
            groupid: '205',
            //type1000
            onlineData: function () {
                //在线人数
                $('.audienceCount').text(arguments[0].audienceCount);
                //点赞人数
                $('.live .good_item').text(arguments[0].likeCount);
                //观看人的头像
                var imgslist = '';
                $.each(arguments[0].imageList, function (index, child) {
                    if (index > 4) return;
                    imgslist += '<li><a href="javascript:void(0)"><img src='+child+'></a></li>';
                });
                $('.audience_list').html(imgslist);
            },
            //推送活动
            activeData: function () {
                if($('.push_box .push_storebox').children().length==2){
                    $('.push_box .push_storebox').children().first().remove();
                }
                $('.push_box .push_storebox').append('<li><a style="display: block" href="'+arguments[0].activityLink+'"><figure class="pull-left"><img src='+arguments[0].activityImg+' width="100%">'
                    +'</figure><div class="discrip pull-left">'+arguments[0].activityName+'</div><div style="clear: both"></div>'
                    +'<i class="close_button icon_close"></i></a></li>');

                $('.push_box .push_storebox').children().last().css('left','0');
            },
            people: function () {
                //进来的人
                cloudMail.showListInfo(arguments[0].type,arguments[0].user, arguments.uimg)
            },
            //推送商品
            pushStroe: function () {
                if($('.push_box .push_storebox').children().length==2){
                    $('.push_box .push_storebox').children().first().remove();
                }
                $('.push_box .push_storebox').append('<li><a style="display: block" href="'+arguments[0].goodsLink+'"><figure class="pull-left"><img src='+arguments[0].goodsImg+' width="100%">'
                    +'</figure><div class="discrip pull-left">'+arguments[0].goodsName+'</div><div style="clear: both"></div>'
                    +'<i class="close_button icon_close"></i></a></li>');

                $('.push_box .push_storebox').children().last().css('left','0');
            }

        };
        //初始化
        liveim.login(iminfo);

    },
    eventInit: function () {
//          初始化更多功能滑动菜单
        var mySwiper = new Swiper ('#more_fn', {
            pagination : '.swiper-pagination'
        });
//          点击屏幕
        $('.vcp-bigplay').on('touchend', function () {
            hiddenSendbox();
            hiddenFn();
        });
//           隐藏聊天框
        function hiddenSendbox() {
            if ($('.goods_box').hasClass('showInUp')) {
                $('.goods_box').addClass('showOutDown');
            }
            $('.send_infobox').hide();
        }
//            隐藏功能区
        function hiddenFn() {
            if($('.more_fn').hasClass('swipIn')){
                $('.more_fn').addClass('swipOut')
            }
        }
//            点击购物车
        $('.shopping').parents('footer').on('click', function () {
            alert(100)
        });
//                点击聊天区域
//            隐藏主播推送的物品
        $('.live_box .left').on('touchend', function () {
            $('.send_infobox').show();
        });
//                发送聊天信息
        $('.send').on('touchend', function () {
            if ($(this).siblings('.input').children('input').val().length == 0) {
                $(this).siblings('.input').children('input').val('发送内容不能为空!');
                cloudMail.tips(1000);
            } else if ($(this).siblings('.input').children('input').val() == '发送内容不能为空!') {
                return false;
            } else {
                $('.send_infobox').hide();
                $(this).siblings('.input').children('input').val('');
            }
        });
//        关闭推送的活动或者商品
        $('.push_storebox').on('touchend','.push_box .close_button',function () {
            var self = this;
            $(this).parents('li').css('left','-300px');
            setTimeout(function () {
                $(self).parents('li').remove();
            },400)
        });
//                点击商店图标
        $('.right .icon_store').on('touchend', function () {
            var goodsBox = $('.goods_box');
            if (goodsBox.hasClass('showOutDown')) {
                goodsBox.removeClass('showOutDown');
            } else {
                goodsBox.addClass('showInUp')
            }
        });
//            点击更多图标 icon_plus
        $('.right .icon_plus').on('touchend',function () {
            if ($('.more_fn').hasClass('swipOut')) {
                $('.more_fn').removeClass('swipOut');
            } else {
                $('.more_fn').addClass('swipIn');
            }
        });
//            点赞图标
        $('.right .icon_like').on('touchend',function () {
            if($('.like_box').length>20){
                $('.like_box').first().remove();
            }
            //style="-webkit-animation-duration: 2.4s;animation-duration: 2.4s;"
            $('footer .right').append($('<div class="like_box icon'+Math.floor(Math.random() * 8)+' animate_swimming '+(function () {
                    return(icon[Math.floor(Math.random() * 2)])
                })()+'"></div>').css({"animation-duration":(function (value) {
                if(value<1){
                    return 2.4;
                }else {
                    return value;
                }
            })(Math.random() * 6)+'s',"-webkit-animation-duration":(function (value) {
                if(value<1){
                    return 2.4;
                }else {
                    return value;
                }
            })(Math.random() * 6)+'s'}))



        });
    },
    //显示即时消息
    showListInfo: function (type, userName, userimg, text) {
        var content ='';
        var maxDisplayMsgCount = 20;
        var childrenLiList = $(".content_box .content_list li");
        if (childrenLiList.length == maxDisplayMsgCount) {
            $(".content_box .content_list").children().first().remove();
        }
//            type 0、用户进来 1、游客进来 2、用户发送消息 3、用户送出礼品 4、点赞
        switch (type){
            case 0:
                content = '<li><div class="content"><figure style="background-image: url('+userimg+')">'
                    +'<i class="iconLv icon_lv6"></i></figure><dl class="content_info">'
                    +'<dd style="white-space: normal;line-height: 1.4rem"><span class="user_type" style="background-color: #00c4b9;">用户</span><span'
                    +'style="padding: 0 .3rem">'+userName+'</span>进入直播房间</dd></dl></div></li>';
                break;
            case 1:
                content = '<li><div class="welcome_info"><span class="user_type" style="background-color: #ffd855;">游客</span>'
                +'<span style="padding: 0 .3rem">'+userName+'</span>进入直播房间</div></li>';
                break;
            case 2:
                content = '<li><div class="content"><figure style="background-image: url('+userimg+')"></figure>'
                +'<dl class="content_info"><dd><span class="user_type" style="background-color: #f9743a;">用户</span>'+userName+'</dd>'
                +'<dt>'+text+'</dt></dl></div></li>';
                break;
            case 3:
                content = '<li><div class="content"><figure style="background-image: url('+userimg+')"></figure>'
                    +'<dl class="content_info"><dd><span class="user_type" style="background-color: #f9743a;">用户</span>'+userName+'</dd>'
                    +'<dt>'+text+'</dt></dl></div></li>';
                break;
            case 4:
                content = '<li><div class="content"><figure style="background-image: url('+userimg+')"></figure>'
                    +'<dl class="content_info"><dd><span class="user_type" style="background-color: #f9743a;">用户</span>'+userName+'</dd>'
                    +'<dt>给主播赞了一个！</dt></dl></div></li>';
                break;
        }
        //写入消息
        $(".content_box").find('.content_list').append(content);
    },
    pager: function (listContainer, htmlContent, pageCount, fn, eq) {
        //图片延时加载（插件修改过）
        echo.init({
            container: $(listContainer)[0],
            offset: 10,
            throttle: 150,
            unload: false,
            callback: function (element, op) {
                console.log(element, 'has been', op + 'ed')
            }
        });
        // 加载flag
        var loading = false;
        // 最多可加载的条目
        function addItems() {
            // 添加新条目
            $(listContainer).find('.list-container').append(htmlContent);
        }

        //首次加载
        addItems();
        // 注册'infinite'事件处理函数
        $(document).on('infinite', listContainer, function () {
            // 如果正在加载，则退出
            if (loading) return;
            // 设置flag
            loading = true;

            setTimeout(function () {
                // 重置加载flag
                loading = false;
                if (pageIndex >= pageCount) {
                    // 删除加载提示符
                    $('.infinite-scroll-preloader').remove();
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($('.infinite-scroll').eq(eq));
                    return;
                } else {
                    // 添加新条目
                    pageIndex++;
                    fn.call('this', pageIndex);
                }
                //容器发生改变,如果是js滚动，需要刷新滚动
                $.refreshScroller();
            }, 100)

        });
    },
//      ajax请求所有商品的列表
    //  获取边看边买列表
    getAllList: function (pData) {
        window.liveim.initAjax(url.getAllListUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                // 生成新条目的HTML
                var html = '';
                var listData = result.data;
                for (var i = 0; i < listData.length; i++) {
                    html += '<li class="push_store"><div class="gutter"><figure><img src="img/bb8b43bdd565e5a06cf7a84d837fdb6f.jpg" alt="pic" data-echo="img/push_image.jpg" width="100%">'
                        + '</figure><section><div class="discrip">' + listData[i].goodsName + '</div><div class="store_info"><div class="pull-left">'
                        + '<small>商品数量：' + listData[i].goodsStock + '</small><div class="much">￥21.00</div></div><div class="pull-right">'
                        + '<div class="icon-shopcar"></div></div></div></section></div></li>';
                }
                cloudMail.pager('#allList', html, result.count, function () {
                    cloudMail.getAllList({pageIndex: arguments[0]});
                }, 1);
            }
        })
    },
    //  获取主播推荐的商品列表
    getAnchorPush:function (pData) {
        window.liveim.initAjax(url.getAnchorPushUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                // 生成新条目的HTML
                var html = '';
                var listData = result.data;
                for (var i = 0; i < listData.length; i++) {
                    html += '<li class="push_store"><p class="text-center time_tip"><span class="time_m">3分钟前</span></p>'
                        +'<div class="gutter"><figure><img src="'+listData[i].goodsImg+'" alt="pic" data-echo="'+listData[i].goodsImg+'" width="100%">'
                        +'</figure><section><div class="discrip">'+listData[i].goodsName+'</div><div class="discrip_info">'
                        +'<div class="pull-left"><div class="much">￥<span style="font-size: 1.4rem">'+listData[i].goodsPrice+'</span></div>'
                        +'</div><div class="pull-right too_look"><a href="javascript:void (0);">查看商品</a></div></div></section></div></li>';
                }
                $('#recommendList').find('.list-container').html(html);
            }
        })
    }
};
$(function () {
    cloudMail.player();
    cloudMail.eventInit();
    cloudMail.getAllList();
//        获取主播推荐的商品
    cloudMail.getAnchorPush();
});