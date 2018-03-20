var express = require('express');
var router = express.Router();
var indexjs = require("../app/indexTest.js").indexTest
var callBack = require("../app/indexTest.js").callBack
const authMiddleware = require("../app/middlewares/auth.middleware");

/* GET home page. */
router.get('/',function(req, res, next) {
	//let callBack = callBack()
	//let result=["abc","abc","bcd","bcd"]
	let result = callBack();
	//res.sendFile(path.join(__dirname, "../views/index.html"));
  res.render('index', { name: 'this is /index' ,list:result});
});
router.get('/first',authMiddleware.getCode, function(req, res, next) {
	let result = indexjs("what a fuck");
  res.render('first', { name: 'this is /first' ,list:result});

});

router.get("/getUserInfo",authMiddleware.getAccess_token, authMiddleware.getUserInfo, (req,res,next)=>{
    console.log(req.query);
    let back_url = req.query.back_url;
    for(let item in req.query){
        if(item !== "back_url" && item !== "code" && item !== "state"){
            back_url += `&${item}=${req.query[item]}`;
        };
    };
    console.log(back_url);
    res.redirect(back_url);
});


const crypto = require("crypto")
const sha1 = require("sha1")
const accessTokenMiddle = require("../app/middlewares/accessToken.middleware.js")
const weixinConfig = require("../config/env.config");

router.get("/weixin",accessTokenMiddle.accessToken,accessTokenMiddle.ticket,function(req,res,next){
    console.log(JSON.stringify(req.query))
    crypto.randomBytes(16,function(ex,buf){
        var appid = weixinConfig.appID;
        var noncestr = buf.toString("hex")
        var jsapi_ticket = req.query.ticket;
        var timestamp = new Date().getTime();
        timestamp = parseInt(timestamp/1000);
        var url = req.query.url;
        console.log("参数")
        console.log(noncestr)
        console.log(jsapi_ticket)
        console.log(timestamp)
        console.log(url)
        var str = ["noncestr="+noncestr,"jsapi_ticket="+jsapi_ticket,"timestamp=" + timestamp, "url=" + url].sort().join("&")
        console.log("字符串")
        console.log(str)
        var signature = sha1(str)
        console.log("签名")
        console.log("signature")
        console.log(signature)

        var result = {code:0,result:{appId:appId,timestamp: timestamp,nonceStr: noncestr,signature: signature}}
        res.json(result)
    })

})
module.exports = router;
