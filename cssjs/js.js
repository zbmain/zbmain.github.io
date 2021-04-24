var state = getParamKey('cv') == undefined ? 'none':'block';//初始状态
//获取参数
function getParamKey(key){
    var str = window.location.search;
    if (str.indexOf(key) != -1) {
        var pos_start = str.indexOf(key) + key.length + 1;
        var pos_end = str.indexOf("&", pos_start);
        if (pos_end == -1) {
            return str.substring(pos_start)
        }
    }
}
// cvtips
function cvTips(){
    $('.tooltip').css('display',state);
    $('#cv-tips').css('display',state);
    $('#cv-tips').delay(3000).slideUp(1000);
}

// 百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?d66b1b7cf0bd11e0a719659f2c2256e0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

// $(function(){
//     $('#cv-tips').delay(3000).slideUp(500);
// });
