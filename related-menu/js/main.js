//封装成jQuery插件，方便同页面多次调用
(function($){
    $.fn.extend({
        "selectRelate":function(){
            this.each(function() {
            	//模拟后台数据
                var areaJson=
              				[ 
              				{"p":"广东省", 
              				"c":[ 
              				{"ct":"深圳市", 
              				"d":[ 
              				{"dt":"南山区"}, 
              				{"dt":"罗湖区"}, 
              				{"dt":"福田区"},
              				{"dt":"宝安区"},
              				{"dt":"龙华区"},
              				]}, 
              				{"ct":"广州市", 
              				"d":[ 
              				{"dt":"天河区"}, 
              				{"dt":"白云区"}, 
              				{"dt":"番禺区"} 
              				]} 
              				]}, 
              				{"p":"北京", 
              				"c":[ 
              				{"ct":"东城区"}, 
              				{"ct":"西城区"} 
              				]}, 
              				{"p":"广西省", 
              				"c":[ 
              				{"ct":"南宁市", 
              				"d":[ 
              				{"dt":"青秀区"}, 
              				{"dt":"兴宁区"}, 
              				{"dt":"江南区"} 
              				]}, 
              				{"ct":"桂林市", 
              				"d":[ 
              				{"dt":"象山区"}, 
              				{"dt":"秀峰区"}, 
              				{"dt":"七星区"} 
              				]} 
              				]} 
              				]; 
              	//获取省、市、区元素
              	var oProvince=$(this).find(".province");
              	var oCity=$(this).find(".city");
              	var oDis=$(this).find(".district");
              	//获取展示信息框
              	var oShow=$(".u-show");
              	//分别获取选择省、市、区的option
              	var chooseP=oProvince.html();
              	var chooseC=oCity.html();
              	var chooseD=oDis.html();
              	//创建临时变量用于生成option
              	var temp_option=chooseP;
              	//初始化省
              	function province(){
              		$.each(areaJson, function(index, val) { 
              			 temp_option+="<option value="+val.p+">"+val.p+"</option>";
              			 oProvince.html(temp_option);
              		});
              	}

              	//根据省赋值市
              	function city(){
              		temp_option=""+chooseC;
              		var proIndex=oProvince.get(0).selectedIndex-1;
              		if(proIndex>=0){
              			$.each(areaJson[proIndex].c, function(index, val) {
              				 temp_option+="<option value="+val.ct+">"+val.ct+"</option>";
              				 oCity.html(temp_option);
              				 oDis.html(chooseD);
              			});
              		}else{
              			oCity.html(chooseC);
              			oDis.html(chooseD);
              		}
              	}
              	
              	//赋值区|县
              	function district(){
              		temp_option=""+chooseD;
              		var proIndex=oProvince.get(0).selectedIndex-1;
              		var cityIndex=oCity.get(0).selectedIndex-1;
              		if( proIndex>=0 && cityIndex>=0){
              			if(typeof(areaJson[proIndex].c[cityIndex].d)!=="undefined"){
              				$.each(areaJson[proIndex].c[cityIndex].d, function(index, val) {
	              				 temp_option+="<option value="+val.dt+">"+val.dt+"</option>";
	              				 oDis.html(temp_option);
	              			});
              			}else{
              				showInfo();
              			}        			
              		}else{
              			oDis.html(chooseD);
              		}
              	}
              	function showInfo(){
              		var proIndex=oProvince.get(0).selectedIndex;
              		var cityIndex=oCity.get(0).selectedIndex;
              		var disIndex=oDis.get(0).selectedIndex;
              		var p=oProvince.get(0).options[proIndex].value;
              		var c=oCity.get(0).options[cityIndex].value;
              		var d=disIndex>0?oDis.get(0).options[disIndex].value:"";
              		oShow.css("display","block").find("p").html(p+c+d);
              	}
              	function closeInfo(){
              		var btnClose=oShow.find(".btn-close");
              		var btnOk=oShow.find("button").eq(0);
              		var btnReset=oShow.find("button").eq(1);
              		var btnArr=[btnClose,btnOk,btnReset];
              		$.each(btnArr, function() {
              			 $(this).click(function() {
              			 	oShow.css("display","none");
              			 });
              		});
              	}
              	//调用初始化省
              	province();
              	//省发生变化改变市
              	oProvince.change(function() {
              		city();
              	});
              	//市发生变化改变区|县
              	oCity.change(function() {
              		district();
              	});
              	//区|县选择完后弹出浮层信息框
              	oDis.change(function() {
              		showInfo();
              	});
              	//执行关闭浮层函数
              	closeInfo();
            });
            return this;
        }
    });

})(jQuery);

//调用插件
$(function(){
	$(".m-select").selectRelate();
});
