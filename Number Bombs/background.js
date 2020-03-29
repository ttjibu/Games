window.onload = function() {
	let ROUND = 10, LEFT = 1, RIGHT = 100, TIME = 30;
	const OPTIONID = ['#custom', '#junior', '#intermediate', '#senior'];
	let round = 0, ans, mode, flag, count, ongame = false;
	
	$('#intermediate').prop("checked",true);
	initialize();
	Input.blur();
	
	function initialize_ans() {
		let dig = Math.log10(RIGHT - LEFT);
		let x = Math.floor(Math.random() * (10 ** (dig + 1))) % (RIGHT - LEFT);
		x += LEFT;
		return x;
	}
	
	function telltime(){
		count--;
		if(count <= 0) {
			endgame(0);
		}
		let str = count;
		if(str < 10) {
			str = '0' + count;
		}
		Time.textContent = '剩余时间：' + str + ' s';
	}
	function run() {
		if (Btn.textContent === '开始') {
			Btn.textContent = '确定';
			start();
		}
		else if (Btn.textContent === '确定') {
			check();
		}
		else if (Btn.textContent === '再来一局') {
			initialize();
			Btn.textContent = '开始';
		}
	}
		
	function endgame(parameter) {
		ongame = false;
		clearInterval(flag);
		switch (parameter) {
			case 1:{	//猜到了，赢了
				break;
			}
			case 0:{	//没猜到/时间到了
				Result.textContent = '游戏结束';
				break;
			}
			case -1:{	//看了答案
				Result.textContent = '答案是' + ans;
				break;
			}
		}
		Btn.textContent = '再来一局';
//		Btn.focus();
	}
	
	function addon() {
		Result.textContent = '你赢了。';
		AddOn.textContent = '是的';
		Btn.disabled = true;
		TellAns.disabled = true;
		Rules.disabled = true;
		Setting.disabled = true;
	}
	
	function check() {
		round++;
		let content = Input.value;
		
		if(content===omas(1300610)+omas(835329)){addon();return;}
		if(content===omas(2306)+omas(2849)){addon();return;}
		if(content===omas(3330)+omas(3873)){addon();return;}
		if(content===omas(-238488)+omas(-45637281)){addon();return;}
				
		content = Number(content);
		let avlb = false;
				
		if (content !== Math.floor(content)) {	//不是整数	
			Result.textContent = '格式错误';
		}
		else if (content < LEFT || content > RIGHT) {	//区间之外
			Result.textContent = '不在区间上';
		}
		else if (content !== ans) {	//答案错误	
			if (content > ans) {
				Result.textContent = '比答案大';
			}
			else {
				Result.textContent = '比答案小';
			}
			avlb = true;
		}
		else {		//答案正确	
			Result.textContent = '答案正确';
			avlb = true;
		}
		if (avlb) {	//答案有效，帮忙记录下来
			if (TriedAns.textContent === '') {
				TriedAns.textContent = '试过的答案：' + content;
			}
			else {
				TriedAns.textContent += ', ' + content;
			}
		}
		Round.textContent = '还剩下' + (ROUND - round) + '次机会';
		
		Input.value = '';
		if (content === ans) {
			endgame(1);
		}
		else if (round >= ROUND) {
			endgame(0);
		}
		else {
			Input.focus();			
		}
	}
	
	function restart() {
		ans = initialize_ans();
		Btn.textContent = '确定';
		round = 0;
		Result.textContent = '';
		Round.textContent = '';
		TriedAns.textContent = '';
		AddOn.textContent = '';
		Input.value = '';
		Input.focus();
		R_ange.textContent = '[' + LEFT + ', ' + RIGHT + ']';
		count =  TIME;
		Time.textContent = '剩余时间：' + count + ' s';
		ongame = true;
		flag = setInterval(telltime, 1000);
	}
	
	function start() {
		count =  TIME;
		Time.textContent = '剩余时间：' + count + ' s';
		ongame = true;
		flag = setInterval(telltime, 1000);	
		Input.focus();
	}
	function initialize() {
		ans = initialize_ans();
		round = 0;
		
		Result.textContent = '';
		Round.textContent = '';
		TriedAns.textContent = '';
		Time.textContent = '';
		Input.value = '';
		Input.focus();
		R_ange.textContent = '[' + LEFT + ', ' + RIGHT + ']';
	}
	
	function tellans() {
		endgame(-1);	
	}
	
	function f(e) {
		if (e.keyCode === 13 && round < ROUND) {
			run();
		}
	}

	function recordandactivate(){
		record();
		if(ongame) {
//			Tips.dataset.toggle = 'modal';
		}
	}
	function record() {
		for(let i = 0; i < 4; i++) {
			if ($(OPTIONID[i]).prop("checked")) {
				mode = i;
				return;
			}
		}
		
	}
	
	function resume() {
		$(OPTIONID[mode]).prop('checked', true);
//		document.getElementById(OPTIONID[mode]).checked = true;
	}
	
	function modify() {
		if (ongame) {
			clearInterval(flag);
		}
		record();
		switch(mode) {
			case 1:{
				LEFT = 1, RIGHT = 20, TIME = 20;
				break;
			}
			case 2:{
				LEFT = 1, RIGHT = 100, TIME = 30;
				break;
			}
			case 3:{
				LEFT = 1, RIGHT = 1000, TIME = 60;
				break;
			}
			case 0:{
				break;
			}
		}
		initialize();
		Btn.textContent = '开始';
	}
	
	Btn.addEventListener('click', run);
	TellAns.addEventListener('click', tellans);
	document.addEventListener('keydown', f);
	Setting.addEventListener('click', recordandactivate);
	Cancel.addEventListener('click', resume);
	Comfirm.addEventListener('click', modify);
};
