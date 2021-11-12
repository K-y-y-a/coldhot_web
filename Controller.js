import {
    help,
    closeHelp,
    goToMenu,
	changeLogColor
} from "./View.js";

var currentNumber = []

function developing() {
    alert("В разработке...")
}

function showList() {
    developing()
}

function showReplay() {
    developing()
}

function startGame() {
    $("#change").hide()
    $("#game_box").show()
    $('#number').val('')
    $('#log').html('')

    currentNumber = []
	currentNumber[0] = getRandomInt(10)
	do {
		var new_num = getRandomInt(10);
		if(currentNumber.indexOf(new_num) == -1) {
			currentNumber.push(new_num)
		}			
	} while(currentNumber.length < 3);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function guess() {
	var number = $("#number").val()
    if(number == "404"){
        goToMenu()
        return
    }

	if (Number.isInteger(parseInt(number)) && number >= 0) {
		if (number.length != 3) {
			alert("Ошибка! Число должно быть трехзначным");
            $('#number').val('')
		} else {
			var numberArray = number.split('');
			if (numberArray.join('') == currentNumber.join('')) {
				alert("Вы выиграли!");
				restart();
			} else {
                $("#log").show()
				var attemptRes = coldhot(numberArray, currentNumber);
                changeLogColor(attemptRes)
				attemptRes = attemptRes.join(" ")
                $('#log').html(number + "<br>" + attemptRes)
			}
		}
	} else {
		alert("Ошибка! Введите число");
        $('#number').val('')
	}
	
}

function coldhot(numberArray, currentNumber)
{
	var arr = [];
	for (var i = 0; i < 3; i++) {
		if (numberArray[i] == currentNumber[i]) {
			arr.push("Горячо");
		} 
		else if ( 
            numberArray[i] == currentNumber[0] || 
            numberArray[i] == currentNumber[1] || 
            numberArray[i] == currentNumber[2] 
        ) {
			arr.push("Тепло");
		} else {
			arr.push("Холодно");
		}
	}
	arr.sort()
	return arr;
}

function restart()
{
	var restart = confirm("Хотите сыграть ещё?");
	if (restart) {
		startGame()
	} else {
		goToMenu()
	}
}

function checkButton(e) {
    if(window.event.keyCode == 13)
       guess();
}

document.getElementById("start_button").onclick = () => {
    startGame();
}

document.getElementById("history_button").onclick = () => {
    showList();
}

document.getElementById("repeat_button").onclick = () => {
    showReplay();
}

document.getElementById("help_button").onclick = () => {
    help();
}

document.getElementById("number").onkeypress = () => {
   checkButton();
}

document.getElementById("guess").onclick = () => {
    guess();
}

