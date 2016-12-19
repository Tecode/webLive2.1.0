/**
 * Created by ASSOON on 2016/12/7.
 */
var icon = ['icon_gift_g', 'icon_ice', 'icon_sweet', 'icon_jewel', 'icon_gift', 'icon_heart'];

var loaded = true;
var sendGood, oderList = true;
var discription = true;
var pageIndex = 1;
var start = 0;
var linkUrl = {
    getAllListUrl: 'json/allList.json',//获取边看边买列表
    getShopCarListUrl: 'json/shoppingCarList.json',//获取购物车商品
    deleteShopCarUrl: 'json/shoppingCarList.json',//删除购物车商品
    toPayUrl: 'json/shoppingCarList.json',//去付款
    getGoodsInfoListUrl: 'json/shoppingCarList.json',//获取付款页面列表
    postadressUrl: 'json/shoppingCarList.json',//保存地址
    payPageListUrl: 'json/paypage.json',//付款页面商品展示
    discriptionUrl: 'json/discription.json',//获取详情
    getGoodsTypeUrl: 'json/type.json',//获取商品类型
    pushValueUrl: '',//保存商品属性
    orderListUrl: 'json/orderlist.json',//获取订单详情
    returGoodsUrl: '',//退款地址
    postCarNumberUrl:''//链接商品的加减
};
var fn = function () {
    //播放直播视频
    this.player = function () {
        var option = {
            "live_url" : "http://r03.wscdn.hls.xiaoka.tv/live/DMYZnv-N4NptE3gr/playlist.m3u8",
            "live_url2" : "http://2000.liveplay.myqcloud.com/live/2000_2a1.flv",
            "width" : $(window).width(),
            "height" : $(window).height()
        };

        var player = new qcVideo.Player("id_video_container", option);
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
                    imgslist += '<div class="img_icon"><img src="' + child + '" width="100%"></div>';
                });
                $('.user').html(imgslist);
            },
            //推送活动
            activeData: function () {
                arguments[0].time = parseInt(new Date().getTime());
                var arr =[];
                arr.push(arguments[0]);

                $('.live .push_info').show();
                $('.userimg').attr('src', arguments[0].activityImg);
                $('.push_info a').attr('href', arguments[0].activityLink);
                $('.dsp').text(arguments[0].activityName);

                var pushList = arr.concat(cloudMail.getCookie('pushList'));
                cloudMail.setCookie('pushList',pushList);
                cloudMail.pushGoodsList(0);
            },
            people: function () {
                //进来的人
                cloudMail.showListInfo(2, '欢迎' + arguments[0].user, arguments.uimg)
            },
            //推送商品
            pushStroe: function () {
                arguments[0].time = parseInt(new Date().getTime());
                var arr =[];
                arr.push(arguments[0]);

                $('.live .push_info').show();
                $('.push_info a').attr('href', arguments[0].goodsLink);
                $('.userimg').attr('src', arguments[0].goodsImg);
                $('.dsp').text(arguments[0].goodsName);

                var pushList = arr.concat(cloudMail.getCookie('pushList'));

                cloudMail.setCookie('pushList',pushList);
                cloudMail.pushGoodsList(1);
            }

        };

        //初始化
        liveim.login(iminfo);

    };
    //数组
    //显示消息
    this.showListInfo = function (type, text, userimg) {
        var maxDisplayMsgCount = 6;
        var opacityStep = 0.2;
        var opacity;
        var colors = ['color_r', 'color_g', 'color_b'];
        var childrenLiList = $("#video_sms_list").children();
        if (childrenLiList.length == maxDisplayMsgCount) {
            $("#video_sms_list").children().first().remove();
            for (var i = 0; i < maxDisplayMsgCount; i++) {
                opacity = opacityStep * (i + 1);
                $('#video_sms_list').children().eq(i).css("opacity", opacity);
            }
        }
        //写入消息
        $('#video_sms_list').append('<li><div class="user_image pull-left"><img src="' + userimg + '" width="100%">' +
            '</div><span class="' + colors[type] + ' pull-left">' + text + '</span></li>');
    };
    //10s以后会再次发送消息
    this.interval = function (time) {
        setTimeout(function () {
            sendGood = true;
        }, time * 1000)
    };
    //点赞动画
    this.clickGood = function () {
        $('.click_good .icon_good').on('touchend', function () {
            if (sendGood) {
                liveim.send('1007');
                sendGood = false;
                cloudMail.interval(10);
            }
            $('.click_good .icon_good').append($('<div class="animated bounceInUp icon good_icon"></div>').addClass(icon[Math.floor(Math.random() * 6)]));
//                    <div class="animated bounceInUp icon icon_heart good_icon"></div>
        })
    };
    //继承ajax方法
    ajax.call(this, '');
    //获取修改以后的商品数量
    this.toltalShopCarCount = function () {
        var sum = 0;
        $('#shoppingCar').find('.shopcar_list input').each(function (index,child) {
            sum += parseInt($(child).val());
        });
        return sum;
    };
    //购物车
    this.shoppingCar = function () {
        var maxCount = 0;
        var clickBox = $(".shopcar .list-container");
        //计算总数
        var toltal = function () {
            var sumCount = 0;
            var sumMoney = 0;
            $('.shopcar .list-container .icon_nochoice').each(function (index, child) {
                if ($(child).hasClass('icon_choice')) {
                    sumMoney += parseFloat($(child).parents('.shopcar_list').find('.price').text()) * parseFloat($(child).parents('.shopcar_list').find('input').val());
                    sumCount += parseInt($(child).parents('.shopcar_list').find('input').val());
                }
            });
            $('.sumTotal').text(sumMoney.toFixed(2));
            $('.sumCount').text(sumCount);
        };
        //选择或者取消商品
        clickBox.on('touchend', '.shopcar .list-container .icon_nochoice', function () {
            $(this).toggleClass('icon_choice');
            toltal();
        });
        //点击删除
        clickBox.on('touchend', '.shopcar .list-container .icon_delet', function () {
            var self = this;
            $.confirm('确定要删除吗?', function () {
                var data = JSON.parse($(self).siblings('.clearfix').find('input').attr('data-value'));
                cloudMail.deleteShopCarList({cid: data.cid, gid: data.gid}, $(self).parents('.shopcar_list'), toltal)
            });
        });
        //减少商品
        clickBox.on('touchend', '.shopcar .list-container .icon_reduce', function () {
            var attrData = JSON.parse($(this).siblings('input').attr('data-value'));
            var value = $(this).siblings('input').val();
            value--;
            // cloudMail.postCarNumber({cid:attrData.cid,gid:attrData.gid,value:value});
            value < 1 ? (function () {
                $.toast("商品数量不能小于1！");
            })() : '';
            value = value < 1 ? 1 : value;
            $(this).siblings('input').val(value);
            //计算数量
            toltal();
            cloudMail.postCarNumber({totalCount:cloudMail.toltalShopCarCount()});

        });
        //键盘输入
        clickBox.on('blur', '.shopcar .list-container input', function () {
            var attrData = JSON.parse($(this).attr('data-value'));
            maxCount = attrData.gstock;
            if ($(this).val() < 1) {
                $(this).val(1);
                $.toast("商品数量不能小于1！");
            } else if ($(this).val() > maxCount) {
                $(this).val(maxCount);
                $.toast("不能大于商品的库存量！");
            }

            cloudMail.postCarNumber({totalCount:cloudMail.toltalShopCarCount()});
        });
        //增加商品
        clickBox.on('touchend', '.shopcar .list-container .icon_add', function () {
            var attrData = JSON.parse($(this).siblings('input').attr('data-value'));
            maxCount = attrData.gstock;
            var value = $(this).siblings('input').val();
            value++;
            // cloudMail.postCarNumber({cid:attrData.cid,gid:attrData.gid,value:value});
            value > maxCount ? (function () {
                $.toast("不能大于商品的库存量！");
            })() : '';
            value = value > maxCount ? maxCount : value;
            $(this).siblings('input').val(value);
            toltal();
            cloudMail.postCarNumber({totalCount:cloudMail.toltalShopCarCount()});
        });
        //全部选择
        $('.nav_footer .choice_btn .icon_nochoice').on('touchend', function () {
            var sumCount = 0;
            var sumMoney = 0;
            $(this).toggleClass('icon_choice');
            if ($(this).hasClass('icon_choice')) {
                $('.shopcar .list-container .icon_nochoice').each(function (index, child) {
                    $(child).addClass('icon_choice');
                    sumMoney += parseFloat($(child).parents('.shopcar_list').find('.price').text()) * parseFloat($(child).parents('.shopcar_list').find('input').val());
                    sumCount += parseInt($(child).parents('.shopcar_list').find('input').val());
                });
                $('.sumTotal').text(sumMoney.toFixed(2));
                $('.sumCount').text(sumCount);
            } else {
                $('.shopcar .list-container .icon_nochoice').each(function (index, child) {
                    $(child).removeClass('icon_choice');
                    $('.sumTotal').text(0);
                    $('.sumCount').text(0);
                });
            }
        });
        //去结算
        $('.nav_footer .topay').on('touchend', function () {
            var pd = [];
            if (clickBox.find('.icon_nochoice').hasClass('icon_choice')) {
                clickBox.find('.icon_choice').each(function (index, child) {
                    var data = JSON.parse($(child).parents('.shopcar_list').find('input').attr('data-value'));
                    pd.push({
                        cid: data.cid,
                        gid: data.gid,
                        count: $(child).parents('.shopcar_list').find('input').val()
                    });
                });
                cloudMail.toPay(JSON.stringify(pd));
            } else {
                $.toast("请选择商品！")
            }
        });
    };
    //商品详细信息
    this.goodsInfo = function () {
        var postdata = {type: 0};
        $('.discription .type').on('touchend', 'span', function () {
            if ($(this).hasClass('valueactive')) {
                $(this).removeClass('valueactive');
            } else {
                $(this).addClass('valueactive')
                    .siblings('span').removeClass('valueactive')
            }

            if ($('.type li').length == $('.type .valueactive').length) {
                var toltalMuch = null;
                var count = [];
                $('.type .valueactive').each(function (index, child) {
                    toltalMuch += parseFloat($(child).attr('data-price'));
                    count.push(parseFloat($(child).attr('data-count')))
                });
                $('.del').text('库存剩余' + Math.min.apply('', count));
                $('.store_much').text(parseFloat(goodsPrice) + toltalMuch);
            } else {
                $('.store_much').text(parseFloat(goodsPrice));
            }
        });
        //立即购买还是加入购物车
        $('.choice_btn a').on('touchend', function () {
            postdata.value = $(this).index();
        });
        //确定属性
        $('.submitbuttom').on('touchend', function () {
            if ($('.type li').length == $('.type .valueactive').length) {
                var ids = '';
                $('.type .valueactive').each(function (index, child) {
                    ids += $(child).attr('data-id') + ',';
                });
                postdata.ids = ids.substring(0, ids.length - 1);
                postdata.goodsId = goodsId;
                cloudMail.pushValue(postdata);
            } else {
                $.toast('还有属性未选择！')
            }
        })
    };
    //填写地址
    this.addAdress = function () {
        $('.addaddress').on('touchend', '.addaddress button', function () {
            var pData = {};
            $.each($('.addressForm').serializeArray(), function (index, child) {
                switch (child.name) {
                    case 'name':
                        child.value == '' ? (function () {
                            errortip('收货人填写错误！');
                        })() : (function () {
                            pData[child.name] = child.value;
                        })();
                        break;
                    case 'phone':
                        !/^1[34578]\d{9}$/.test(child.value) ? (function () {
                            errortip('手机号码格式错误！');
                        })() : (function () {
                            pData[child.name] = child.value;
                        })();
                        break;
                    case 'area':
                        child.value == '' ? (function () {
                            errortip('请选择地区！');
                        })() : (function () {
                            pData[child.name] = child.value;
                        })();
                        break;
                    case 'address':
                        child.value == '' ? (function () {
                            errortip('详细地址需要填写！');
                        })() : (function () {
                            pData[child.name] = child.value;
                        })();
                        break;
                }
            });
            var vilidate = [];
            $.each(pData, function (child) {
                vilidate.push(child)
            });
            if (vilidate.length == $('.addressForm input').length && vilidate.length > 0) {
                cloudMail.postadress(pData);
            }
        });

        function errortip(value) {
            $('.errortips').text(value).show();
            setTimeout(function () {
                $('.errortips').hide().text();
            }, 1800)
        }
    };
    //结算页面
    this.payPage = function () {
        //编辑地址
        $('.payment .icon_edit').on('touchend', function () {
            //编辑地址页面
            $.router.load("#addaddress");
        })
    };
    //查看订单详情
    this.showOrderList = function () {
        //填充数据
        $(".oderlist .list-container").on('touchend', '.detail', function () {
            //json里面不能含空格取不到数据
            var fillData = JSON.parse($(this).attr('data-json'));
            $('#listDetails').html('<div class="order_info"><h4>订单状态：' + (function (state) {
                    switch (state) {
                        case '1':
                            return '<span class="pull-right" style="color:#ff5757">待付款</span>';
                            break;
                        case '2':
                            return '<span class="pull-right" style="color: #ff9446">待发货</span>';
                            break;
                        case '3':
                            return '<span class="pull-right" style="color: #ff9446">待收货</span>';
                            break;
                        case '4':
                            return '<span class="pull-right" style="color: #ff5757">可以申请退款</span>';
                            break;
                        case '5':
                            return '<span class="pull-right" style="color: #ff9446">完成订单</span>';
                            break;
                        default:
                            return ''

                    }
                })(fillData.orderstate) +
                '</h4><h4>订单号：' + fillData.ordernumber + '</h4><h4>下单用户：' + fillData.craateuser + '</h4><h4>下单时间：' + fillData.createtime + '</h4></div><div class="address haveaddress">' +
                '<i class="icon icon_location"></i><div class="box"><h3>收货人：<span class="shouhuo">' + fillData.receivename + '</span>' +
                '<span class="dianhua">1306526541</span></h3><p class="dizhi">' + fillData.receiveaddress + '</p></div></div>' +
                '<section><h3 class="tittle">商品信息</h3><ul class="payment_list">' + (function (storeList) {
                    var html = '';
                    $.each(storeList, function (index, child) {
                        html += '<li><a style="display: block" class="row"><div class="col-33"><img src="' + child.goodsimg + '" width="100%">' +
                            '</div><div class="col-66"><div class="discription">' + child.goodsname + '</div>' +
                            '<div class="info clearfix"><span>' + child.goodstype + '</span><span class="pull-right" style="margin-right: .5rem;color:#505050;">￥' + child.goodsprice + ' X' + child.goodscount + '</span></div></div></a></li>'
                    });
                    return html;
                })(fillData.goods) + '</ul></section>' +
                '<section class="value"><h3 class="tittle"><span>商品信息</span><span class="pull-right">' + fillData.goods.length + '件</span>' +
                '</h3><h3 class="tittle"><span>运费</span><span class="pull-right">' + fillData.transportfee + '</span></h3><h3 class="tittle">' +
                '<span>活动优惠</span><span class="pull-right">-10</span></h3></section>'
            )

        });
        //判断付款
        $('.list-container').on('touchend', '.choice .topay', function () {
            var data = JSON.parse($(this).siblings().attr('data-json'));
            cloudMail.toPay({orderid: data.orderid})
        });
        //判断退货
        $('.list-container').on('touchend', '.choice .returnGoods', function () {
            var self = this;
            $.confirm('确定申请退款吗?', function () {
                var data = JSON.parse($(self).siblings().attr('data-json'));
                cloudMail.returGoods({orderid: data.orderid})
            });
        });
    };
    //推送的商品
    this.pushGoodsList = function () {
        var html = '';
        $.each(cloudMail.getCookie('pushList'), function (index, child) {
            html += '<li class="push_store"><p class="text-center">' + (function () {
                    var m = new Date(new Date().getTime() - child.time).getMinutes();
                    var h = new Date(new Date().getTime() - child.time).getHours();
                    if (h < 1 && m < 1) {
                        return '刚刚';
                    } else if (h > 0) {
                        return (
                            h + '小时' + m + '分钟前'
                        )
                    } else if (h < 0 && m > 0) {
                        return m + '分钟前'
                    }
                })() + '</p><div class="row gutter">' +
                '<div class="col-33"><img src="' + (function () {
                    if(child.goodsImg=='undefined'){
                        return child.activityImg;
                    }else {
                        return child.goodsImg;
                    }
                })() + '"></div><div class="col-66"><div class="discrip">' + (function () {
                    if(child.goodsName=='undefined'){
                        return child.activityName;
                    }else {
                        return child.goodsName;
                    }
                })() + '</div>' +
                '<div class="pull-left"></div><div class="pull-right">' +
                '<a href="' + (function () {
                    if(child.goodsLink=='undefined'){
                        return child.activityLink;
                    }else {
                        return child.goodsLink;
                    }
                })() + '">去看看></a></div></div></div></li>'
        });
        $('#recommendList').find('.list-container').html(html);
    };
    //调用方法请求ajax微信支付
    this.wechatPay = function () {
        $('#payment').find('.nav_footer .btn-red').on('touchend',function () {
            cloudMail.wechatPayAjax();
        })
    };
};
//初始化页面
fn.prototype.initPage = function () {
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
    //  点击弹出购物窗口
    $('.click_good .icon_more').on('touchend', function () {
        $('.live .goods_box').css('bottom', '0');
    });
    //关闭弹出窗
    $('.float_box .close').on('touchend', function (e) {
        $('.live .goods_box').css('bottom', '-20rem')
    });
    var mySwiper3 = new Swiper('#swiper-container3', {
        speed: 500,
        onSlideChangeStart: function () {
            updateNavPosition()
        }
    });
    //点击关闭推送的商品
    $('.push_info').on('touchend', '.push_info .opcityclose', function () {
        $('.push_info').hide();
    });
    //点击发送消息
    $('.float_box #send').on('touchend', function () {
        if ($(this).siblings('#speek').val() == '') {
            $.toast("发送的消息不能为空哦");
        } else {
            liveim.send($(this).siblings('#speek').val());
        }
    });

    function updateNavPosition() {
        $('#swiper-container2 .active').removeClass('active');
        var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).addClass('active');

        if (!activeNav.hasClass('swiper-slide-visible')) {
            if (activeNav.index() > mySwiper2.activeIndex) {
                //清空已加载
                $("#allList").find('.look_buy').remove();
                pageIndex = 1;
                //点击时调用加载全部商品方法
                cloudMail.getAllList({pageIndex: 1});
                var thumbsPerNav = Math.floor(mySwiper2.width / activeNav.width()) - 1;
                mySwiper2.slideTo(activeNav.index() - thumbsPerNav)
            }
            else {
                mySwiper2.slideTo(activeNav.index())
            }
        }
    }
};
//下拉加载数据
fn.prototype.pager = function (listContainer, htmlContent, pageCount, fn, eq) {
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
};
//ajax方法
var ajax = function () {
    this.initAjax = function (url, type, postdata, fn) {
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
    //获取边看边买列表
    this.getAllList = function (pData) {
        this.initAjax(linkUrl.getAllListUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                // 生成新条目的HTML
                var html = '';
                var listData = result.data;
                for (var i = 0; i < listData.length; i++) {
                    html += '<li class="push_store look_buy"><a href="description.html" class="row gutter external"><div class="col-33">' +
                        '<img src="img/loading.gif" data-echo="' + listData[i].goodsImg + '" width="100%"></div><div class="col-66"><div class="discrip">' + listData[i].goodsName +
                        '</div><div class="pull-left"><div class="count">' + listData[i].goodsStock + '</div>' +
                        '<div class="much">￥' + listData[i].goodsPrice + '</div></div><div class="pull-right"><span class="icon-shopcar"></span></div></div></a></li>';
                }
                cloudMail.pager('#allList', html, result.count, function () {
                    cloudMail.getAllList({pageIndex: arguments[0]});
                }, 1);
            }
        })
    };
    //获取购物车列表
    this.getShopCarList = function (pData) {
        this.initAjax(linkUrl.getShopCarListUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                // 生成新条目的HTML
                var html = '';
                var listData = result.cart_list;
                for (var i = 0; i < listData.length; i++) {
                    html += '<li class="shopcar_list"><i class="icon icon_nochoice in_left"></i><div class="row"><div class="col-33">' +
                        '<img src="img/loading.gif" width="100%"></div><div class="col-66"><div class="discrip">' + listData[i].gname +
                        '</div><div class="monney"><span style="font-size: .7rem;padding: .1rem .4rem;background-color: #fafafa;border-radius: 999px">' + listData[i].goodsattrval + '</span><span class="pull-right">￥<span class="price">' + listData[i].gprice + '</span></span></div><div class="operate clearfix">' +
                        '<div class="pull-left clearfix"><i class="calculate pull-left icon icon_reduce"></i><input class="pull-left text-center" value="1" type="number" data-value=' + JSON.stringify(listData[i]) + ' placeholder="" />' +
                        '<i class="calculate pull-left icon icon_add"></i></div><div class="icon pull-right icon_delet"></div></div></div></div></li>';
                }
                $('#shoppingCar').find('.list-container').html(html);
            }
        })
    };
    //删除购物车商品
    this.deleteShopCarList = function (pData, el, fn) {
        this.initAjax(linkUrl.deleteShopCarUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                $.toast("删除成功");
                el.remove();
                fn.call(this, '');
            } else {
                $.toast(result.msg);
            }
        })
    };
    //去付款
    this.toPay = function (pData) {
        this.initAjax(linkUrl.toPayUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                //跳转到付款页面
                var shopcount = cloudMail.getCookie('cartcount');
                cloudMail.setCookie('cartcount',shopcount-1);
                $.router.load("#payment");
            } else {
                $.toast(result.msg);
            }
        })
    };
    //微信支付付款
    this.wechatPayAjax = function (pData) {
        this.initAjax(linkUrl.wechatPayAjaxUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                //请求支付的js
            } else {
                $.toast(result.msg);
            }
        })
    };
    //微信支付接口
    this.wechatPay = function () {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', paydata,
            function (res) {
                //支付成功回调
                if (res.err_msg == "get_brand_wcpay_request：ok") {
                    $.ajax({
                        url: "/VIPuser/WXuser/UserPaystate",
                        type: "post",
                        datatype: "json",
                        data: { out_trade_no: out_trade_no },
                        success: function (result) {
                            if (result.code == 0) {
                                //$('.weui_dialog_alert').show()
                                var data = $(".checked").attr("data-value") || $o_money.val();
                                dialog.showAlert({ title: "提示", content: "充值:" + data + " 元成功.", autoClose: false });
                                window.location.href("/vipuser/wxuser/userindx");
                            }
                        }
                    });
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
        //微信支付判断
        if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }
    };
    //商品信息
    this.getGoodsInfoList = function () {
        this.initAjax(linkUrl.getGoodsInfoListUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                //跳转到付款页面
                $.router.load("#payment", true);
            } else {
                $.toast(result.msg);
            }
        })
    };
    //s收货地址
    this.postadress = function (pData) {
        this.initAjax(linkUrl.postadressUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                $.toast('保存成功');
                $.router.back();//返回上一页
            } else {
                $.toast(result.msg);
            }
        })
    };
    //结算页面
    this.payPageAjax = function (pData) {
        this.initAjax(linkUrl.payPageListUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                // 生成新条目的HTML
                var html = '';
                var listData = result.data.orderlist[0].goods;
                for (var i = 0; i < listData.length; i++) {
                    html += '<li><a style="display: block" class="row"><div class="col-33"><img src="' + listData[i].goodsimg + '" width="100%">' +
                        '</div><div class="col-66"><div class="discription">' + listData[i].goodsname + '</div><div class="info clearfix">' +
                        '<span>' + listData[i].goodstype + '</span><span class="pull-right">￥' + listData[i].goodsprice + ' X' + listData[i].goodscount + '</span></div></div></a></li>';
                }
                $('#payment').find('.payment_list').html(html);
                if (result.data.orderlist[0].receivename == "") {
                    $('.haveaddress').hide();
                    $('.noaddress').show();
                } else {
                    $('.haveaddress').show();
                    $('.noaddress').hide();
                    //填充地址
                    $("input[name='name']").val(result.data.orderlist[0].receivename);
                    $("input[name='phone']").val(result.data.orderlist[0].receivephone);
                    $("input[name='area']").val(result.data.orderlist[0].receivearea);
                    $("input[name='address']").val(result.data.orderlist[0].receiveaddress);
                    //显示地址
                    $('.payment .shouhuo').text(result.data.orderlist[0].receivename);
                    $('.payment .dianhua').text(result.data.orderlist[0].receivephone);
                    $('.payment .dizhi').text(result.data.orderlist[0].receivearea.replace(" ", '') + result.data.orderlist[0].receiveaddress);
                    //实际付款
                    $('#payment').find('.choice_btn .pull-left').text('实付款：￥'+result.data.orderlist[0].totalfee);
                    //订单信息
                    $('.value .tittle .pull-right').eq(0).text(result.data.orderlist[0].goods.length+'件');
                    $('.value .tittle .pull-right').eq(1).text(result.data.orderlist[0].transportfee);
                    $('.value .tittle .pull-right').eq(2).text('0.00')

                }
            }
        })
    };
    //把商品添加到购物车
    this.addToCar = function () {
        this.initAjax(linkUrl.toPayUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                //跳转到付款页面
                $.router.load("#payment");
            } else {
                $.toast(result.msg);
            }
        })
    };
    //商品详情
    this.discription = function (pData) {
        this.initAjax(linkUrl.discriptionUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                goodsId = result.data.goodsId;//定义成了全局变量使用完清除
                goodsPrice = result.data.goodsPrice;//定义成了全局变量使用完清除
                $('.allpage').text(result.data.goodsImgList.length);
                var banner = '';
                $.each(result.data.goodsImgList, function (index, child) {
                    banner += '<div class="swiper-slide"><img src="' + child + '" width="100%" alt=""></div>';
                });
                $('#banner').find('.swiper-wrapper').html(banner);
                //轮播
                var navbanner = new Swiper('#banner', {
                    onSlideChangeEnd: function (swiper) {
                        $('.activepage').text(swiper.activeIndex + 1);
                    }
                });
                //文字描述
                $('.discription_text').html(
                    '<dl class="content-padded"><dd class="color-default" style="font-size: .9rem">' + result.data.goodsName + '</dd>' +
                    '<dd class="color-danger">喜欢就买吧，机会不容错过哦！</dd><dt><span class="big color-danger">￥' + result.data.goodsPrice + '</span><span class="del">库存剩余' + result.data.goodsStock + '</span></dt></dl>'
                );
                //属性文字描述
                $('.discription_text_next').html('<dl class="content-padded"><dd class="color-default" style="font-size: .9rem">' + result.data.goodsName + '</dd>' +
                    '<dt><span class="big color-danger">￥<span class=store_much>' + result.data.goodsPrice + '</span></span><span class="del">库存剩余' + result.data.goodsStock + '</span></dt></dl>'
                );
                //图片描述
                var images = '';
                $.each(result.goods_list, function (index, child) {
                    images += '<img alt="" src="' + child.goodsDecImg + '" width="100%">'
                });
                $('.box-img').html(images);

            } else {
                $.toast(result.msg);
            }
        })
    };
    //获取商品属性
    this.getGoodsType = function (pData) {
        this.initAjax(linkUrl.getGoodsTypeUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                console.info(result.data.catagory);
                var typelist = '';
                //循环商品属性
                $.each(result.data.catagory, function (index, child) {
                    typelist += '<li><div class="heard_tips">' + child.name + '</div><div class="value">' + (function () {
                            var type = '';
                            $.each(child.attributevalue, function (index, el) {
                                type += '<span class=' + (function () {
                                        if (el.count == 0) {
                                            return 'novalue';
                                        } else {
                                            return '';
                                        }
                                    })() + ' style="' + (function () {
                                        if (el.count == 0) {
                                            return 'pointer-events:none';
                                        } else {
                                            return '';
                                        }
                                    })() + '" data-id="' + el.id + '" data-count="' + el.count + '" data-price="' + el.price + '">' + el.name + '</span>'
                            });
                            return type;
                        })() + '</div></li>'
                });
                $('#discription2').find('.type').html(typelist);
            } else {
                $.toast(result.msg);
            }
        })
    };
    //保存添加的属性type=0是加入购物车type=1是立即购买
    this.pushValue = function (pData) {
        this.initAjax(linkUrl.pushValueUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                $.toast('保存成功');
                delete goodsId;
                delete goodsPrice;
                //$.router.back();//返回上一页
            } else {
                $.toast(result.msg);
            }
        })
    };
    //获取订单列表
    this.getOrderList = function (pData) {
        this.initAjax(linkUrl.orderListUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                var html = '';
                $.each(result.data.orderlist, function (index, child) {
                    html += '<li><h3 class="tittle clearfix"><span class="pull-left ordernumber">订单编号：' + child.ordernumber + '</span>' +
                        '<span class="pull-right nopay">'
                        + (function (state) {
                            //付款状态
                            switch (state.orderstate) {
                                case '1':
                                    return '未支付';
                                    break;
                                case '2':
                                    return '<span style="color: #ff9446">待发货</span>';
                                    break;
                                case '3':
                                    return '<span style="color: #ff9446">待收货</span>';
                                    break;
                                case '4':
                                    return '退货';
                                    break;
                                case '5':
                                    return '<span style="color: #ff9446">完成订单</span>';
                                    break;
                                default:
                                    return '';

                            }
                        })(child)
                        + '</span></h3>' + (function (infoList) {
                            //商品信息
                            var html = '';
                            $.each(infoList, function (index, el) {
                                html += '<div class="row"><div class="col-33"><img src="' + el.goodsimg + '" width="100%">' +
                                    '</div><div class="col-66 clearfix"><div class="discrip">' + el.goodsname + '</div>' +
                                    '<div class="pull-left type"><span>' + el.goodstype + '</span></div><div class="pull-right text-right cmuch">' +
                                    '<div class="much">￥' + el.goodsprice + '</div><div class="count">x' + el.goodscount + '</div></div></div></div>'
                            });
                            return html;
                        })(child.goods) + '<p class="introduce text-right">共' + child.goods.length + '件商品 合计：<span style="color: #707070">￥<span class="price">' + child.totalfee + '</span></span>（含运费￥' + child.transportfee + '）</p>' +
                        '<h3 class="text-rigth choice">' +
                        (function (status) {
                            //判断是否支付
                            switch (status.orderstate) {
                                case '1':
                                    return '<span class="pay topay" style="margin-right: .5rem">去支付</span>';
                                case '2':
                                    return '';
                                case '3':
                                    return '';
                                case '4':
                                    return '<span class="returnGoods pay" style="margin-right: .5rem;background-color: #ff9446">申请退款</span>';
                                default:
                                    return '';
                            }
                        })(child) + '<a href="#listDetails" class="detail" data-json=' + JSON.stringify(child) + '>详情</a></h3></li>';
                });
                $('#oderList').find('.list-container').html(html);
            } else {
                $.toast(result.msg);
            }
        })
    };
    //退款
    this.returGoods = function (pData) {
        this.initAjax(linkUrl.returGoodsUrl, 'get', pData, function (result) {
            if (result.code == 0 && result) {
                $.toast(result.msg);
            } else {
                $.toast(result.msg);
            }
        })
    };
    //设置cookies
    this.setCookie = function (name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    };
    //读取cookie
    this.getCookie = function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    };
    //滚动
    this.scorllText = function () {
        if($('.scroll_text').text().length>8){
            scrollText = $('.scroll_text').text();//！！全局变量
            scrollText = scrollText.substring(1);
                $('.scroll_text').text(scrollText+scrollText.substring(0,1));

        }
    };
    //加减商品数量
    this.postCarNumber = function (pData) {
        this.initAjax(linkUrl.postCarNumberUrl, 'post', pData, function (result) {
            if (result.code == 0 && result) {
                cloudMail.setCookie('cartcount',pData.totalCount)
            } else {
                $.toast(result.msg);
            }
        })
    }
};
var cloudMail = new fn;
//清除点赞dom
setInterval(function () {
    $('.click_good .icon_good').children().remove()
}, 20000);

//直播页面
$(document).on("pageInit", "#pageIndex", function (e, id, page) {
    // setInterval(function () {
    //     cloudMail.scorllText();
    //     start ++;
    // },600);
    //获取数量显示在购物车
    // $('#pageIndex').find('.shopping').text("购物车(" + cloudMail.getCookie('cartcount') + ")");
    // cartcount = cloudMail.getCookie('cartcount');
    // cloudMail.pushGoodsList();
    // cloudMail.initPage();
    // cloudMail.clickGood();
    cloudMail.player();
    loaded = true;
});
//购物车
$(document).on("pageInit", '#shoppingCar', function (e, pageId, $page) {
    cloudMail.getShopCarList(null);
    //获取订单ajax方法
    cloudMail.payPageAjax();
    $('.sumTotal').text('0.00');
    $('.sumCount').text(0);
    $('.nav_footer .icon_nochoice').removeClass('icon_choice');
    //避免重复渲染
    if (loaded) {
        cloudMail.shoppingCar();
        //单页面绑定里面的事件
        cloudMail.addAdress();
        //编辑地址
        cloudMail.payPage();
        //城市选择
        $("#city-picker").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">确定</button>\
            <h1 class="title">选择收货地址</h1>\
            </header>'
        });
        loaded = false;
    }
});
$(document).on("pageInit", "#payment", function (e, id, page) {
    cloudMail.wechatPay();
    //重新获取订单ajax方法
    cloudMail.payPageAjax();
    //清空地址
    $("input[name*='name']").val('');
    $("input[name*='phone']").val('');
    $("input[name*='area']").val('');
    $("input[name*='address']").val('');
});
$(document).on("pageInit", "#discription1", function (e, id, page) {
    cloudMail.discription();
    cloudMail.getGoodsType();
    if (discription) {
        cloudMail.goodsInfo();
        discription = false;
    }
});
$(document).on("pageInit", "#oderList", function (e, id, page) {
    cloudMail.getOrderList();
    if (oderList) {
        cloudMail.showOrderList();
        oderList = false;
    }
    //刷新订单是没有数据的要返回点击详情才有
    if (window.location.toString().indexOf('listDetails') >= 0) {
        history.back();
    }
});
$.init();