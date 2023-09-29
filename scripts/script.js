// Vars - Consts
const imageX = "x_icon.png";
const imageO = "o_icon.png";

// Vars
let positions = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
let lastBeginnerPlayer = (localStorage.getItem("playerTurnValue") == null) ? "X" : localStorage.getItem("playerTurnValue");
let whoIsPlaying = lastBeginnerPlayer;
let turns = 0;
let xVictories = (localStorage.getItem("xVictories") == null) ? 0 : localStorage.getItem("xVictories");
let oVictories = (localStorage.getItem("oVictories") == null) ? 0 : localStorage.getItem("oVictories");

// Methods
main();

function main() {
    initializeButtonsEvents();

    const colorPlayer = (whoIsPlaying == "X") ? "player_x" : "player_o";

    const playerTurnValue = document.getElementById("player_turn_value");
    playerTurnValue.innerHTML = whoIsPlaying;
    playerTurnValue.className = colorPlayer;


    document.getElementById("xVictories").innerHTML = xVictories;
    document.getElementById("oVictories").innerHTML = oVictories;
}

function initializeButtonsEvents() {
    setButtonClickEvent("button00", 0, 0);
    setButtonClickEvent("button01", 0, 1);
    setButtonClickEvent("button02", 0, 2);
    setButtonClickEvent("button10", 1, 0);
    setButtonClickEvent("button11", 1, 1);
    setButtonClickEvent("button12", 1, 2);
    setButtonClickEvent("button20", 2, 0);
    setButtonClickEvent("button21", 2, 1);
    setButtonClickEvent("button22", 2, 2);
    setResetButtonClickEvent();
}

function setButtonClickEvent(idButton, i, j) {
    document.getElementById(idButton).addEventListener("click", function () {
        positions[i][j] = whoIsPlaying;
        turns++;

        this.disabled = true;
        changeButtonImage(idButton, (whoIsPlaying == "X" ? imageX : imageO))

        gameLogic();
    });
}

function setResetButtonClickEvent() {
    document.getElementById("buttonReset").addEventListener("click", function () {
        this.classList.add("rotation");
        setTimeout(() => {
            this.classList.remove("rotation");

        }, 500);

        xVictories = 0;
        document.getElementById("xVictories").innerHTML = xVictories;
        oVictories = 0;
        document.getElementById("oVictories").innerHTML = oVictories;

        endGame(true);
    });
}

function gameLogic() {
    let winnerPossibility = 0;
    let hasWinner = null;
    let test = null;

    while (winnerPossibility < 8 && hasWinner == null) {
        switch (winnerPossibility) {
            case 0:
                test = positions[0][0] + positions[0][1] + positions[0][2];
                break;
            case 1:
                test = positions[1][0] + positions[1][1] + positions[1][2];
                break;
            case 2:
                test = positions[2][0] + positions[2][1] + positions[2][2];
                break;
            case 3:
                test = positions[0][0] + positions[1][0] + positions[2][0];
                break;
            case 4:
                test = positions[0][1] + positions[1][1] + positions[2][1];
                break;
            case 5:
                test = positions[0][2] + positions[1][2] + positions[2][2];
                break;
            case 6:
                test = positions[0][0] + positions[1][1] + positions[2][2];
                break;
            case 7:
                test = positions[0][2] + positions[1][1] + positions[2][0];
        }

        hasWinner = checkWinner(test);
        winnerPossibility++;
    }

    if (hasWinner != null || turns == 9) {
        setTimeout(function () {
            if (hasWinner == null) {
                popup("It's a Draw");
            } else {
                popup("The winner is: " + hasWinner);
            }

            endGame(false);
        });
    } else {
        changePlayerTurn();
    }
}

function checkWinner(test) {
    if (test == "XXX") {
        xVictories++;
        document.getElementById("xVictories").innerHTML = xVictories;
        return "X";
    } else if (test == "OOO") {
        oVictories++;
        document.getElementById("oVictories").innerHTML = oVictories;
        return "O";
    }

    return null;
}

function changePlayerTurn() {
    whoIsPlaying = whoIsPlaying == "X" ? "O" : "X";
    const colorPlayer = (whoIsPlaying == "X") ? "player_x" : "player_o";

    const playerTurnValue = document.getElementById("player_turn_value");
    playerTurnValue.innerHTML = whoIsPlaying;
    playerTurnValue.className = colorPlayer
}

function endGame(restart) {
    resetPositions();
    turns = 0;

    if (restart) {
        lastBeginnerPlayer = "X";
    } else {
        lastBeginnerPlayer = lastBeginnerPlayer == "X" ? "O" : "X";
    }

    whoIsPlaying = lastBeginnerPlayer;

    localStorage.setItem("playerTurnValue", whoIsPlaying);
    localStorage.setItem("xVictories", xVictories);
    localStorage.setItem("oVictories", oVictories);

    const colorPlayer = (whoIsPlaying == "X") ? "player_x" : "player_o";

    const playerTurnValue = document.getElementById("player_turn_value");
    playerTurnValue.innerHTML = whoIsPlaying;
    playerTurnValue.className = colorPlayer

    restoreDefaultButtons();
}

function resetPositions() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            positions[i][j] = null;
        }
    }
}

function restoreDefaultButtons() {
    helperRestoreDefaultButtons("button00");
    helperRestoreDefaultButtons("button01");
    helperRestoreDefaultButtons("button02");
    helperRestoreDefaultButtons("button10");
    helperRestoreDefaultButtons("button11");
    helperRestoreDefaultButtons("button12");
    helperRestoreDefaultButtons("button20");
    helperRestoreDefaultButtons("button21");
    helperRestoreDefaultButtons("button22");
}

function helperRestoreDefaultButtons(idButton) {
    changeButtonImage(idButton);
    document.getElementById(idButton).disabled = false;
}

function changeButtonImage(button, image) {
    if (image != "") {
        document.querySelector("#" + button).style.backgroundImage = "url('images/" + image + "')";
    } else {
        document.querySelector("#" + button).style.background = "#FFF";
    }
}

function popup(text) {
    const popup = document.getElementById("popup");
    const buttonClose = document.getElementById("popup_close");

    document.getElementById("popup_text").innerHTML = text;

    buttonClose.onclick = function () {
        popup.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }

    popup.style.display = "flex";
}