import { 
	secretNumber, 
	currentId, 
	initializeDB, 
	getGames, 
	createReplay, 
	writeGameInfo, 
	updateGameStatus, 
	writeAttemptInfo 
} from './Model.js'

import { 
	hide, 
	show,
	reload
} from "./View.js"

var game = document.getElementById("game")
var info = document.getElementById("info")
var header = document.getElementById("header")
var start_button = document.getElementById("startGame")
var game_button = document.getElementById("showGames")
var replay_button = document.getElementById("showReplay")
var menu = document.getElementById("menu")
var play_button = document.getElementById("button")
var text_field = document.getElementById("guessNumber")
var t = 1
window.onload = initializeDB

function coldHot(currentStrNumber, hiddenStrNumber) {
	var arr = []
	for (var i = 0; i < 3; i++) {
		if (currentStrNumber[i] == hiddenStrNumber[i]) {
			arr[i] = "Горячо"
		} else if (
			currentStrNumber[i] == hiddenStrNumber[0] ||
			currentStrNumber[i] == hiddenStrNumber[1] ||
			currentStrNumber[i] == hiddenStrNumber[2]
		) {
			arr[i] = "Тепло"
		} else {
			arr[i] = "Холодно"
		}
	}
	return arr
}

function startGame() {
	var username = prompt("Введите своё имя")
	if(username == null) {
		alert("Имя не может быть пустым")
		return
	}
	hide(info)
	hide(menu)
	hide(header)
	show(game)
	writeGameInfo(username)
}

function play() {
	var currentNumber = text_field.value
	var currentCheckNumber = Number(currentNumber)

	if (!Number.isInteger(currentCheckNumber)) {
		alert('Ошибка! Введите число.')
		return
	}

	if (currentNumber.length != 3) { 
		alert('Ошибка! Число должно быть трехзначным')
		return
	}

	currentNumber = currentNumber.split('')
	var currentStrNumber = currentNumber.toString()
	var hiddenStrNumber = secretNumber.toString()

	if (currentStrNumber == hiddenStrNumber && t <= 10) {
		alert("Победа")
		writeAttemptInfo(currentId, "Победа", t, currentNumber.join(""))
		updateGameStatus("Победа")
		text_field.value = ""
		reload()
		t = 0
	} else if (t < 10) {
		var arr = coldHot(currentNumber, secretNumber)
		writeAttemptInfo(currentId, arr.join(","), t, currentNumber.join(""))
		alert(arr.join(" "))
		t++
	} else {
		alert("Поражение")
		writeAttemptInfo(currentId, "Поражение", t, currentNumber.join(""))
		updateGameStatus("Поражение")
		text_field.value = ""
		reload()
		t = 0
	}
}

function getReplay() {
	var gameId = parseInt(prompt("Введите id игры")) 
	if(gameId == null) {
		alert("Введите id игры!")
		return
	}
	createReplay(gameId)
}

start_button.onclick = startGame
game_button.onclick = getGames
play_button.onclick = play
replay_button.onclick = getReplay