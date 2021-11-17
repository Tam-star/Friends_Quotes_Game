const quote = document.getElementsByClassName("quote")[0];
const resetButton = document.getElementsByClassName("reset-button")[0];
const charactersButtons = document.getElementsByClassName("answer");
const score = document.getElementById("score");


let listOfQuotes=[];
let quoteNumber = 0;
let userScore = 0;

async function getListAndFirstQuote(){
    await getListOfQuotes()  
    quote.textContent = `"${listOfQuotes[quoteNumber].quote}"`
    score.textContent=userScore;
}

getListAndFirstQuote();

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
    quoteNumber===17 ? quoteNumber=0 : quoteNumber+=1;
    quote.textContent = `"${listOfQuotes[quoteNumber].quote}"`
}

  
function checkAnswer(answer){
    let {character} = listOfQuotes[quoteNumber];
    character==answer ? goodAnswer() : wrongAnswer(answer);
}

function goodAnswer(){
    alert("That is a good answer!");
    userScore+=1;
    score.textContent=userScore;
    changeQuote();
}

function wrongAnswer(answer){
    alert(`Sorry! It was not ${answer}. Better luck next time!`);
    changeQuote();
}
function reset(){
    quoteNumber = 0;
    quote.textContent = `"${listOfQuotes[quoteNumber].quote}"`
    userScore=0;
    score.textContent=0;
}

//LISTENERS

//NEXT QUOTE
resetButton.addEventListener("click", () => reset());


for(let i=0;i<charactersButtons.length;i++){
    charactersButtons[i].addEventListener("click", () => {
        //console.log(charactersButtons[i].textContent)
        checkAnswer(charactersButtons[i].textContent);
    });
}


