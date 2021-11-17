const quote = document.getElementsByClassName("quote")[0];

let listOfQuotes=[];

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
  

async function changeQuote(){
    await getListOfQuotes()  
    console.log(listOfQuotes)
    quote.textContent = `"${listOfQuotes[2].quote}"`
}

changeQuote();