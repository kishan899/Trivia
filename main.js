let x = document.getElementById("mode")
let y = document.getElementById("category")
let url = `https://opentdb.com/api.php?amount=1&category=${y.value}&difficulty=${x.value}&type=multiple`;
let triviabox = document.querySelector(".container");
let questiontext;
  let rightans;
  let wrongans;
  let buttons = document.querySelectorAll(".ans");

function fetchData(url) {
  return fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    })
    .then(async (data) => {
      return data.results[0];
    });
};
 
function start(){
  document.querySelector(".home").style.display = "none";
  triviabox.style.display = "flex"
  triviabox.style.animation = "flipIn 1s ease-in";
 let question = document.querySelector(".triviabox h1");
 let ansbox = document.querySelectorAll(".ans h1")
 
  fetchData(url).then((data) => {
    console.log(data.incorrect_answers)
  questiontext =  resolve(data.question);
  rightans = resolve(data.correct_answer);
  wrongans = data.incorrect_answers;
  question.textContent = questiontext;
  
 let array = wrongans;
 let randomIndex = Math.floor(Math.random() * (array.length + 1));
array.splice(randomIndex, 0, rightans);


 buttons.forEach((x, i) => {
  x.textContent = array[i++];
  x.style.fontWeight = 800;
  x.style.fontSize = "2vw";
  x.addEventListener("click", (b) => {
    check(b, x);
    })
})
})
}

function check(b, x){
  if(b.target.textContent === rightans){
       x.style.backgroundColor = "green"
      buttons.forEach((x) => {
      if(x.textContent !== rightans){
        x.style.backgroundColor = "transparent"
      }
      })
    } else {
      buttons.forEach((x) => {
      x.style.backgroundColor = "red"
      if(x.textContent === rightans){
        x.style.backgroundColor = "green"
      }
      });
    }
    setTimeout(()=> {
    next();
}, 1000)
};

function next(){
       for(var i = 0; i < buttons.length; i++){
    buttons[i].style.backgroundColor = "transparent";
       };
       setTimeout(() => {
     start();
   }, 1000)
};

function resolve(args){
   const parser = new DOMParser();
  return parser.parseFromString(args, 'text/html').body.textContent;
 };
function rhome(){
  document.querySelector(".home").style.display = "flex";
  let triviabox = document.querySelector(".container");
  triviabox.style.display = "none"
  triviabox.style.animation = "flipIn 1s ease-in";

}
