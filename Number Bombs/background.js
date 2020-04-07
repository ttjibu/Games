window.onload = function() {
	let ROUND = 10, LEFT = 1, RIGHT = 100, TIME = 30;
	const OPTIONID = ['#custom', '#junior', '#intermediate', '#senior'],
		  BOMB = ['自定义炸弹', '低级炸弹', '中级炸弹', '高级炸弹'];
	let round = 0, ans, mode, flag, count, ongame = false;
	
	$('#junior').prop("checked",true);
	modify();
//	initialize();
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
		if (Btn.textContent === '激活') {
			Btn.textContent = '确定';
			start();
		}
		else if (Btn.textContent === '确定') {
			check();
		}
		else if (Btn.textContent === '老子还要拆!' || Btn.textContent === '老子还能拆!') {
			initialize();
			Btn.textContent = '激活';
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
				Result.textContent = '!! 炸弹炸了 !!';
				break;
			}
			case -1:{	//看了密钥
				Result.textContent = '密钥是' + ans;
				break;
			}
		}
		if(parameter > 0) {
			Btn.textContent = '老子还能拆!';
		}
		else {
			Btn.textContent = '老子还要拆!';
		}
		
	}
	
	function solve() {
		clearInterval(flag);
		Result.textContent = '你赢了。';
		Solve.textContent = '是的';
		Btn.disabled = true;
		TellAns.disabled = true;
		Rules.disabled = true;
		Bomb.disabled = true;
	}
	
	function check() {
		round++;
		let content = Input.value;
		
		if(content===omas(1300610)+omas(835329)){solve();return;}
		if(content===omas(2306)+omas(2849)){solve();return;}
		if(content===omas(3330)+omas(3873)){solve();return;}
		if(content===omas(-238488)+omas(-45637281)){solve();return;}
				
		content = Number(content);
		let avlb = false;
				
		if (content !== Math.floor(content)) {	//不是整数	
			Result.textContent = '格式错误';
		}
		else if (content < LEFT || content > RIGHT) {	//区间之外
			Result.textContent = '不在区间上';
		}
		else if (content !== ans) {	//密钥错误	
			if (content > ans) {
				Result.textContent = '比密钥数值大';
			}
			else {
				Result.textContent = '比密钥数值小';
			}
			avlb = true;
		}
		else {		//密钥正确，拆弹成功!	
			Result.textContent = '密钥正确，拆弹成功！';
			avlb = true;
		}
		if (avlb) {	//密钥有效，帮忙记录下来
			if (TriedAns.textContent === '') {
				TriedAns.textContent = content;
			}
			else {
				TriedAns.textContent += ', ' + content;
			}
		}
		Round.textContent = '机会次数：' + (ROUND - round);
		
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
	
//	function restart() {
//		ans = initialize_ans();
//		Btn.textContent = '确定';
//		round = 0;
//		Result.textContent = '炸弹未激活（ zzz...';
//		Round.textContent = '';
//		TriedAns.textContent = '';
//		Solve.textContent = '';
//		Input.value = '';
//		Input.focus();
//		R_ange.textContent = '区间：' + '[' + LEFT + ', ' + RIGHT + ']';
//		count =  TIME;
//		Time.textContent = '剩余时间：' + count + ' s';
//		ongame = true;
//		flag = setInterval(telltime, 1000);
//	}
	
	function start() {
		Result.textContent = '炸弹激活了！！！'
		count =  TIME;
		Time.textContent = '剩余时间：' + count + ' s';
		ongame = true;
		flag = setInterval(telltime, 1000);	
		Input.focus();
	}
	function initialize() {
		ans = initialize_ans();
		round = 0;
		
		Bomb.textContent = BOMB[mode];
		Result.textContent = '炸弹未激活（ zzz...';
		Round.textContent = '机会次数：10';
		TriedAns.textContent = '';
		Time.textContent = '时间：' + TIME + 's';
		Input.value = '';
		Input.focus();
		R_ange.textContent = '区间：' + '[' + LEFT + ', ' + RIGHT + ']';
	}
	
	function tellans() {
		endgame(-1);	
	}
	
	function f(e) {
		if (e.keyCode === 13 && round < ROUND) {
			run();
		}
	}

	function recordAndActivate(){
		if(ongame) {
			if (confirm("当前炸弹未拆除，你确定要换炸弹吗？")) {
				ongame = false;
//				alert("bitch");
				clearInterval(flag);
			}
			else {
//				Bomb.data.toggle = '';
				Bomb.setAttribute('data-toggle', '');
				setTimeout(function () {
					Bomb.setAttribute('data-toggle', 'modal');
				}, 10);
				return;
			}
		}
		record();
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
		Btn.textContent = '激活';
	}
	
	Btn.addEventListener('click', run);
	TellAns.addEventListener('click', tellans);
	document.addEventListener('keydown', f);
	Bomb.addEventListener('click', recordAndActivate);
	Cancel.addEventListener('click', resume);
	Confirm.addEventListener('click', modify);
	
};
