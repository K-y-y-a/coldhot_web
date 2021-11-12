export function help() {
    $("#dark").show();
}

export function closeHelp() {
    $("#dark").hide();
}

export function goToMenu() {
    $("#game_box").hide()
    $("#log").hide()
    $("#change").show()
}

export function changeLogColor(attemptRes) {
    var temperature = 0;
    var attemptRes = attemptRes.join(" ")
    temperature += attemptRes.split("Тепло").length - 1
    temperature += (attemptRes.split("Горячо").length - 1)*2
    switch(temperature){
        case 0:
            $("#log").css('background', 'radial-gradient(ellipse, #88f 40%, transparent 60%)');
            break;
        case 1:
            $("#log").css('background', 'radial-gradient(ellipse, #aaf 40%, transparent 60%)');
            break;
        case 2:
            $("#log").css('background', 'radial-gradient(ellipse, #ff8 40%, transparent 60%)');
            break;
        case 3:
            $("#log").css('background', 'radial-gradient(ellipse, #ff4 40%, transparent 60%)');
            break;
        case 4:
            $("#log").css('background', 'radial-gradient(ellipse, #fc4 40%, transparent 60%)');
            break;
        case 5:
            $("#log").css('background', 'radial-gradient(ellipse, #f84 40%, transparent 60%)');
            break;
    }
}