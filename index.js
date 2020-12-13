console.log('hey',document)

let score = document.getElementById('scores')
score.innerHTML = '0';
let timer = document.getElementById('timer')
timer.innerHTML = 10000;
let question = document.getElementById('questionRow')
question.innerHTML = '1. loading';
let a = document.getElementById('a')
a.innerHTML = 'a. loading';
let b = document.getElementById('b')
b.innerHTML = 'b. loading';
let c = document.getElementById('c')
c.innerHTML = 'c. loading';
let d = document.getElementById('d')
d.innerHTML = 'd. loading';

let allQandAns = []
let curQandAns = {}
let questionNum = 0
async function getQandAns() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');
    const myJson = await response.json();
    allQandAns = myJson.results;

    startGame();
}
function startGame() {
    curQandAns = allQandAns[questionNum];
    console.log('This is the correct answer', curQandAns.correct_answer)
    question.innerHTML = `${questionNum + 1}. ${curQandAns.question}`
//    Timer
setInterval(() => {
    timer -= 1000;
    timer.innerHTML = msToTimeString(timer);
}, 1000);
function msToTimeString(ms) {
    let seconds = (ms / 1000) % 60;
   
    seconds = ('0' + seconds).slice(-2);

    return `${seconds}`;
}
// Fix the bug where clicking 'Start Timer' more than once speeds up the timer.
// Add a button to stop the timer
// Add a button to reset the timer

    // Shuffle Possible answers
    let possibleAns = curQandAns.incorrect_answers
    possibleAns.push(curQandAns.correct_answer)
    let newPossibleAns = shuffle(possibleAns)
    a.innerHTML = `a. ${newPossibleAns[0]}`
    b.innerHTML = `b. ${newPossibleAns[1]}`
    c.innerHTML = `c. ${newPossibleAns[2]}`
    d.innerHTML = `d. ${newPossibleAns[3]}`
}
getQandAns();

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
a.addEventListener("click", function (event) {
    if (a.innerHTML == `a. ${curQandAns.correct_answer}`) {
        a.style.border = '2px solid green'
    } else {
        a.style.border = '2px solid red'
    }
})
b.addEventListener("click", function (event) {
    if (b.innerHTML == `b. ${curQandAns.correct_answer}`) {
        b.style.border = '2px solid green'
        b.setTimeout((response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')) => {
            
        }, 3000); 
   
    } else {
        b.style.border = '2px solid red'
    }
})
d.addEventListener("click", function (event) {
    if (d.innerHTML == 'd. '+ curQandAns.correct_answer) {
        d.style.border = '2px solid green'
        d.setTimeout((response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')) => {
        }, 3000); 
   
    } else {
        d.style.border = '2px solid red'
    }
})
c.addEventListener("click", function (event) {
    if (c.innerHTML == 'c. '+ curQandAns.correct_answer) {
        c.style.border = '2px solid green'
        c.setTimeout((response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')) => {
            
        }, 3000); 
    } else {
        c.style.border = '2px solid red'
       
    }
})

// function answer(arg) {
//     if (a.innerHTML == `a. ${curQandAns.correct_answer}`){
//         a.style.border = '2px solid green'

//     } if(b.innerHTML == `b. ${curQandAns.correct_answer}`){
//         b.style.border = '2px solid green'
//     }  b.setTimeout 
//   }
  
//   setTimeout(answer, 3000, getQandAns());