var url = window.location.href;
var signatureUrl = url.split("#")[0];
var URL = encodeURIComponent(signatureUrl);
$.get("/weixin?url=" + URL, function(result) {
	// if (result.code == 0) {
	// 	wx.config({
	// 		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	// 		appId: result.result.appId, // 必填，公众号的唯一标识
	// 		timestamp: result.result.timestamp, // 必填，生成签名的时间戳
	// 		nonceStr: result.result.nonceStr, // 必填，生成签名的随机串
	// 		signature: result.result.signature, // 必填，签名，见附录1
	// 		jsApiList: ["onMenuShareAppMessage", "onMenuShareTimeline", "chooseImage", "scanQRCode", "getLocation", "openLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	// 	});
	// };
});


function SHARE(title, desc, shareUrl, logo) {        
    wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        //分享
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: logo, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
                // 用户确认分享后执行的回调函数
                //alert("分享成功！");
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            },
            fail: function(err) {
                alert("分享失败");
            }
        });
    });
    wx.error(function(res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        //alert("Error");
    });
}       

var title = "this is title";
var desc = "【亦蓁家】送你300元购物大礼包，亦蓁家邀你体验高品质母婴服务";
var shareUrl = window.location.href;
var logo = "http://yizhenjia.com/dist/newImg/logo.png";
//SHARE(title, desc, shareUrl, logo); 



