var game = document.getElementById("game")
var info = document.getElementById("info")
var header = document.getElementById("header")

export var reload = () => {
    menu.classList.remove("hidden")
    game.classList.add("hidden")
    info.classList.add("hidden")
    header.classList.add("hidden")
}

export var hide = (element) => {
    element.classList.add("hidden")
}

export var show = (element) => {
    element.classList.remove("hidden")
}

export var showAllInfo = (array) => {
    hide(game, "hidden")
    show(info, "hidden")
    show(header, "hidden")
    header.innerHTML = "<h2>Информация об играх</h2>"
    var html = "<table><tr>"
    html += "<th>id игры</th>"
    html += "<th>Имя игрока</th>"
    html += "<th>Дата игры</th>"
    html += "<th>Загаданное число</th>"
    html += "<th>Статус игры</th>"
    html += "</tr>"
    for(var i = 0; i < array.length; i++) {
        html += "<tr>"
        html += "<td>" + array[i]['gameId'] + "</td>"
        html += "<td>" + array[i]['username'] + "</td>"
        html += "<td>" + array[i]['date'] + "</td>"
        html += "<td>" + array[i]['computerNumber'] + "</td>"
        html += "<td>" + array[i]['gameStatus'] + "</td>"
        html += "</tr>"
    }
    html += "</table>"
    info.innerHTML = html
}

export var showGameInfo = (array, gameId) => {
    hide(game, 'hidden')
    show(info, 'hidden')
    show(header, 'hidden')
    header.innerHTML = "<h2>Информация об игре с id = " + gameId + "</h2>"
    var html = "<table><tr>"
    html += "<th>Номер хода</th>"
    html += "<th>Введенное число</th>"
    html += "<th>Результат хода</th>"
    html += "</tr>"
    for(var i = 0; i < array.length; i++) {
        html += "<tr>"
        html += "<td>" + array[i]['turnNumber'] + "</td>"
        html += "<td>" + array[i]['guess'] + "</td>"
        html += "<td>" + array[i]['gameStatus'] + "</td>"
        html += "</tr>"
    }
    html += "</table>"
    info.innerHTML = html
}