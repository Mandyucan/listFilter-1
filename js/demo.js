var personArr = [
			{name: '张三',src:'3.png', des:'很努力', sex:'m'},
			{name: '李四',src:'5.png', des:'认真的娃', sex:'m'},
			{name: '张明',src:'4.png', des:'要乐观哦', sex:'f'},
			{name: '李明',src:'1.png', des:'童话镇', sex:'f'},
			{name: '王五',src:'2.png', des:'明爱笑的眼睛', sex:'m'}
		];

//将拼接的元素插入到ul
var oUl = document.getElementsByTagName('ul')[0];
//获取input框
var oInput = document.getElementsByClassName('search-box')[0];
var oP = document.getElementsByTagName('p')[0];

//渲染数据 
function renderPage(list) {
	var str = '';
	list.forEach(function(ele,index) { //（遍历、拼接字符串）
		str += '<li>\
					<img src="img/'+ ele.src +'" alt="">\
					<p>'+ ele.name +'</p>\
					<p>'+ ele.des +'</p>\
				</li>'
	})
	oUl.innerHTML = str;
}
renderPage(personArr);


var state = {  ///建立一个公共状态，全局下可以一起选择筛选，功能类似react;
	text: '',  //默认情况下是空
	sex:'a'  //默认是a
}

//绑定input事件 根据输入的值进行筛选，oninput指在input输入框中输入的值有变化时触发
oInput.oninput = function() {
	//var text = this.value;
	state.text = this.value;
	// console.log(text);

	// var ar = filterText(state.text,personArr);
	// renderPage(ar);
	renderPage(lastFilterFunc());
	// console.log(1);
}
// 根据input框中输入的值进行筛选新数组
function filterText(text,arr) {
	return arr.filter(function(ele,index){
		if(ele.name.indexOf(text) != -1 || ele.des.indexOf(text) != -1) {  //判断输入的值是否含有text，如果前面的字符串包含了text，会返回这个字符串在哪个位置‘abc’.indexof (b),找到b的索引，返回1；如果没有返回-1；
			return true;
		}
	})
}
//给span绑定点击事件
oP.addEventListener('click',function(e) { //选中p标签，冒泡事件委托
	// console.log(888); //点击span时会触发、空白地方也会触发
	if(e.target.tagName == 'SPAN') {  //判断点击在span标签上才生效
		//var sex = e.target.getAttribute('sex');
		state.sex = e.target.getAttribute('sex');
		document.getElementsByClassName('active')[0].className = '';
		e.target.className = 'active';
		//renderPage(filterSex(state.sex,personArr));
		renderPage(lastFilterFunc());
	}			
})

//根据性别进行筛选新数组
function filterSex(sex,arr) {
	if(sex == 'a') {
		return arr;
	}else{
		return arr.filter(function(ele,index) { //筛选出来 return出去
			if(sex == ele.sex) {
				return true;
			}
		})	
	}	
}

// //公共函数 合并筛选条件
// function combineFilterFunc(obj,arr) {
// 	var lastArr = arr;
// 	for (var prop in obj) {
// 		 lastArr = obj[prop](state[prop],lastArr);//用变量接收，再把它当参数传进来
// 	}
// 	return lastArr; //最后将结果return
// }

// //combineFilterFunc({text: filterText, sex: filterSex},personArr); //采用对象形式一个个筛选，

function combineFilterFunc(obj,arr) {
	return function() {  //闭包 内部的函数存储在外部（全局作用下）
		var lastArr = arr;
			for (var prop in obj) {
				 lastArr = obj[prop](state[prop],lastArr);//用个变量接收，再把它当参数传进来
			}
			return lastArr; //最后将结果return
	}
}
var lastFilterFunc = combineFilterFunc({text: filterText, sex: filterSex},personArr) //需要筛选更多条件时，可以直接在这里添加