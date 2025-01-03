var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; 
var sum = 0; 
var selected = []; 
var selectedSum = 0; 
var started = false; 
var firstdice=0;
var seconddice=0;

function restart() {
    sum = 0;
    selected = [];
    selectedSum = 0;
    arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; 
    document.querySelectorAll(".button").forEach(button => {
        button.classList.remove("pressed");  
    });
    document.querySelectorAll(".dice").forEach(dice => dice.src = "images/dice-6.svg");
    document.querySelector(".title").textContent = "Press Start to roll the dice";
    document.querySelector(".start").src="images/start.svg";
    document.querySelector(".start").disabled = false;
    started = false;
    document.querySelector(".start").addEventListener("click", function () {
        if (!started) {
            started = true; 
            document.querySelector(".start").disabled = true;
            diceRoll(); 
            
        }
    }); 
}

function diceRoll() {
    firstdice = Math.floor(Math.random() * 6) + 1;
    document.querySelectorAll(".dice")[0].src = "images/dice-" + firstdice + ".svg";
    seconddice = Math.floor(Math.random() * 6) + 1;
    document.querySelectorAll(".dice")[1].src = "images/dice-" + seconddice + ".svg";
    sum = firstdice + seconddice; 
    selected = []; 
    selectedSum = 0; 
    document.querySelector(".title").textContent="Roll:"+sum;
    addButtonListeners(); 
}

function addButtonListeners() {
    document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", function () {
            var key = parseInt(this.innerHTML); 
            userChoice(key); 
        });
    });
}

function userChoice(key) {
    var index = arr.indexOf(key);
    if (index !== -1) {
        arr[index] = 0; 
        document.querySelector(".btn-" + key).classList.add("pressed"); 
        selected.push(key); 
        selectedSum += key; 
        checkSum(); 
    }
}


function checkSum() {
    if (selectedSum === sum) {
        selected = [];
        selectedSum = 0;
        diceRoll(); 
        checkGameOver(); 
    } else if (selectedSum < sum) {
    } else if (selectedSum > sum) {
        deselect(); 
    }
}

function deselect() {
    for (var i = 0; i < selected.length; i++) {
        document.querySelector(".btn-" + selected[i]).classList.remove("pressed");
        arr[selected[i] - 1] = selected[i]; 
    }
    selected = [];
    selectedSum = 0;
}

function hasValidCombination(arr, sum) {
    const n = arr.length;

    if (arr.includes(sum)) {
        return true;
    }
    for (let i = 1; i < (1 << n); i++) {
        let subsetSum = 0;
        for (let j = 0; j < n; j++) {
            if (i & (1 << j)) {
                subsetSum += arr[j];
            }
        }
        if (subsetSum === sum) {
            return true; 
        }
    }
    return false;
}

function checkGameOver() {
    const remainingNumbers = arr.filter(num => num !== 0); 
    if (remainingNumbers.length === 0) {
        document.querySelector(".title").textContent="Congratulations! You won!";
        document.querySelector(".start").src="images/restart.svg";
        document.querySelector(".start").disabled=false; 
        document.querySelector(".start").addEventListener("click",function(){
            restart()});  
        return;
    }

    if (!hasValidCombination(remainingNumbers, sum)) {
        document.querySelector(".title").textContent="You lost. Press Restart"; 
        document.querySelector(".start").src="images/restart.svg";
        document.querySelector(".start").disabled=false;
        document.querySelector(".start").addEventListener("click",function(){
            restart()}); 
    }
}

document.querySelector(".start").addEventListener("click", function () {
    if (!started) {
        started = true; 
        diceRoll(); 
        document.querySelector(".start").disabled=true;
    }
});




