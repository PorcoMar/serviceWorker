// var $ = require("jquery");
function indexTest(res){
	let result=["firstOne","firstTwo","firstThird"]
	result.push(res)
	return result;
}
var callBack = ()=>{
	var result = ["aaa","bbb","ccc","ddd"]
	add_callback(3, 15, function(num){
	    console.log("call====== " + num);
	    result.push(num)
	});
	return result
}

var add_callback = (p1,p2,back)=>{
	var aa = p1*p2;
	setTimeout(()=>{
		aa = p1+p2;
		back(aa)
	},3000)
	back(aa)
}
module.exports ={
	indexTest:indexTest,
	callBack:callBack
}