let score = document.getElementById('scores')
score.innerHTML = 0;
let timer = document.getElementById('timer')
timer.innerHTML = 20;
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

    displayQuestion();
}
function displayQuestion() {
    curQandAns = allQandAns[questionNum];
    console.log('This is the correct answer', curQandAns.correct_answer)
    question.innerHTML = `${questionNum + 1}. ${curQandAns.question}`

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
timeTick();

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
        scoreMarks();
    } else {
        a.style.border = '2px solid red'
    }
    highLightCorrectAnswer();

})
b.addEventListener("click", function (event) {
    if (b.innerHTML == `b. ${curQandAns.correct_answer}`) {
        b.style.border = '2px solid green'
        scoreMarks();
    } else {
        b.style.border = '2px solid red'
    }
    highLightCorrectAnswer();

})
d.addEventListener("click", function (event) {
    if (d.innerHTML == 'd. ' + curQandAns.correct_answer) {
        d.style.border = '2px solid green'
        scoreMarks();
    } else {
        d.style.border = '2px solid red'
    }
    highLightCorrectAnswer();

})
c.addEventListener("click", function (event) {
    if (c.innerHTML == 'c. ' + curQandAns.correct_answer) {
        c.style.border = '2px solid green'
        scoreMarks();
    } else {
        c.style.border = '2px solid red'
    }
    highLightCorrectAnswer();

})

function goToNextQuestion() {
    setTimeout(() => {
        questionNum += 1;
        clearLineBorders();
        displayQuestion();
        timer.innerHTML = 20;
    }, 2000)
}

function highLightCorrectAnswer() {
    if (a.innerHTML == `a. ${curQandAns.correct_answer}`)
        a.style.border = '2px solid green'
    else if (b.innerHTML == `b. ${curQandAns.correct_answer}`)
        b.style.border = '2px solid green'
    else if (c.innerHTML == `c. ${curQandAns.correct_answer}`)
        c.style.border = '2px solid green'
    else {
        d.style.border = '2px solid green'
    }
    goToNextQuestion();
}

function timeTick() {
    setInterval(() => {
        timer.innerHTML -= 1;
        if (timer.innerHTML == 0) {
            goToNextQuestion();
        }
    }, 1000);
}


function scoreMarks() {
   console.log(score.innerHTML); 
   score.innerHTML = 5 + +score.innerHTML;
}

function clearLineBorders() {
    a.style.border = '2px solid rgba(243, 241, 241, 0.651)';
    b.style.border = '2px solid rgba(243, 241, 241, 0.651)';
    c.style.border = '2px solid rgba(243, 241, 241, 0.651)';
    d.style.border = '2px solid rgba(243, 241, 241, 0.651)';
}
