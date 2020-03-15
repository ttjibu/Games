window.onload = function() {
	function getEle(e) {
		return document.getElementById(e);
	}
	
	const ROUND = 10, LEFT = 1, RIGHT = 100;
	let round = 0, ans = initialize_ans() ,addonused = false;
	function initialize_ans() {
		let x = Math.floor(Math.random() * 100);
		x = (x + 1) % 100;	//防止出现‘0’
		return x;
	}
	
	function run() {
		if (addonused) {return ;}
		if (Btn.textContent === '确定') {
			check();
		}
		else if (Btn.textContent === '再来一局') {
			restart();
		}
	}
	
	function endgame(parameter) {
		switch (parameter) {
			case 1:{	//猜到了，赢了
				break;
			}
			case 0:{	//没猜到
				Result.textContent = '游戏结束';
				break;
			}
			case -1:{	//看了答案
				Result.textContent = '答案是' + ans;
				break;
			}
		}
		Btn.textContent = '再来一局';
		Btn.focus();
	}
	
	function addon() {
		Result.textContent = '你赢了。';
		AddOn.textContent = '是的';
		addonused = true;
	}
	
	function check() {
		round++;
		let content = Input.value;
		
		if (content === 'SanThiaGo' || content === 'hy' || content === '黄旸') {
			addon();
			return;
		}		
		
		content = Number(content);
		let avlb = false;
		
		if (content !== Math.floor(content)) {	//不是整数	
			Result.textContent = '请输入整数';
		}
		else if (content < LEFT || content > RIGHT) {	//区间之外
			Result.textContent = '请输入区间内的整数';
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
	}
	
	function tellans() {
		if(addonused) {return;}
		endgame(-1);	
	}
	
	function f(e) {
		if (e.keyCode === 13) {
			run();
		}
	}
	Input.value = '';
	Input.focus();
	Btn.addEventListener('click', run);
	TellAns.addEventListener('click', tellans);
	document.addEventListener('keydown', f);
};