const quote = document.getElementsByClassName("quote")[0];
const resetButton = document.getElementsByClassName("reset-button")[0];
const charactersButtons = document.getElementsByClassName("answer");
const score = document.getElementById("score");
const endingOpacity = document.getElementsByClassName("ending-opacity")[0];
const endingBlock = document.getElementsByClassName("ending-block")[0];
const endingSentence = document.getElementById("ending-sentence");
const finalScore = document.getElementById("final-score");
const afterAnswering = document.getElementsByClassName("after-answering")[0];
const afterAnsweringSentence = document.getElementById("after-answering-sentence");


let listOfQuotes=[];
let quoteNumber = 0;
let userScore = 0;

/* FUNCTIONS */

async function getListAndFirstQuote(){
    await getListOfQuotes()  
    quote.textContent = `"${listOfQuotes[quoteNumber].quote}"`
    score.textContent=userScore;
}

function getListOfQuotes(){
    return new Promise((resolve,reject)=>{
      const url = 'https://friends-quotes-api.herokuapp.com/quotes';
      const options={
          method : 'GET', 
          headers : {
            Accept: 'application/json', 
            'Content-type' : 'application/json'}
        }
      fetch(url, options)
        .then(reponse => reponse.json())
        .then(data=>{
            listOfQuotes=[...data]
            resolve();   
        })   
        .catch(err =>{
            console.log("Il y a erreur", err);
            })
        .catch(err =>console.log("Il y a erreur json", err))
        });
}
  

function changeQuote(){
    quoteNumber===17 ? endingTest() : quoteNumber+=1;
    quote.textContent = `"${listOfQuotes[quoteNumber].quote}"`
}

  
function checkAnswer(answer){
    let {character} = listOfQuotes[quoteNumber];
    character==answer ? goodAnswer() : wrongAnswer(answer);
}

function goodAnswer(){
    if ( window.innerWidth < 648) {     
      alert("Good answer")  
      userScore+=1;
      score.textContent=userScore;
      changeQuote();
    }
    else {
        afterAnswering.style.visibility="visible";
        afterAnswering.style.color="green";
        afterAnsweringSentence.textContent="Good answer"
        userScore+=1;
        score.textContent=userScore;
        setTimeout(() => {
            afterAnswering.style.visibility="hidden";
            changeQuote();
        }, 2000
        )
    }
   
}

function wrongAnswer(answer){
    if ( window.innerWidth < 648) {     
        alert("Wrong answer")  
        changeQuote();
    }
    else {
        afterAnswering.style.visibility="visible";
        afterAnswering.style.color="red";
        afterAnsweringSentence.textContent="Sorry, wrong answer"
        setTimeout(() => {
        afterAnswering.style.visibility="hidden";
        changeQuote();
    }, 2000)
    }
}

function reset(){
    quoteNumber = 0;
    quote.textContent = `"${listOfQuotes[quoteNumber].quote}"`
    userScore=0;
    score.textContent=0;
}

function endingTest(){
    endingOpacity.style.visibility="visible";
    endingBlock.style.visibility="visible";
    finalScore.textContent = `${userScore}/18`;
    if(userScore<=6){
        endingSentence.textContent="It looks like you don't really know this great show! Come on, join the fan club and meet those fun New Yorkers!"
    } else if(userScore<=12){
        endingSentence.textContent="You might have watched this show a couple of times...but is it enough?"
    } else if(userScore<=17){
        endingSentence.textContent="Congratulations! You seem to know pretty well this series! How about another round of the ten seasons ?"
    } else if(userScore==18){
        endingSentence.textContent="Congratulations!! You've mastered this test! I know you have watched this show at least a hundred times. Don't worry...me too!"
    }
}

/* LISTENERS */

resetButton.addEventListener("click", () => reset());


for(let i=0;i<charactersButtons.length;i++){
    charactersButtons[i].addEventListener("click", () => {
        checkAnswer(charactersButtons[i].textContent);
    });
}



getListAndFirstQuote();
