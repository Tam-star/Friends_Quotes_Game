const quote = document.getElementsByClassName("quote")[0];
const nextButton = document.getElementsByClassName("next-button")[0];
const charactersButtons = document.getElementsByClassName("answer")


let listOfQuotes=[];
let quoteNumber = 0;

async function getListAndFirstQuote(){
    await getListOfQuotes()  
    quote.textContent = `"${listOfQuotes[quoteNumber].quote}"`
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
    character==answer ? alert("That is a good answer!") : alert("Nope! Try again!");
}



//LISTENERS

//NEXT QUOTE
nextButton.addEventListener("click", () => changeQuote());


for(let i=0;i<charactersButtons.length;i++){
    charactersButtons[i].addEventListener("click", () => {
        //console.log(charactersButtons[i].textContent)
        checkAnswer(charactersButtons[i].textContent);
    });
}


