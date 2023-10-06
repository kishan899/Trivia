let x = document.getElementById("mode")
let y = document.getElementById("category")
let url = `https://opentdb.com/api.php?amount=1&category=${y.value}&difficulty=${x.value}&type=multiple`;
let triviabox = document.querySelector(".container");
let questiontext;
  let rightans;
  let wrongans;
  let sound = true;
  let buttons = document.querySelectorAll(".ans");
function fetchData(link) {
   url = `https://opentdb.com/api.php?amount=1&category=${y.value}&difficulty=${x.value}&type=multiple`;
   console.log(url)
  return fetch(link)
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
let audio = document.getElementById("audio")

function start(){
  soundplay("flip");
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
 
})
})
}
buttons.forEach((x) => {
  x.addEventListener("click", (b) => {
    check(b, x);
    })
})

function check(b, x){
  if(b.target.textContent === rightans){
    soundplay("right");
       x.style.backgroundColor = "green"
      buttons.forEach((x) => {
      if(x.textContent !== rightans){
        x.style.backgroundColor = "transparent"
      }
      })
    } else {
      soundplay("wrong");
      buttons.forEach((x) => {
      x.style.backgroundColor = "red"
      if(x.textContent === rightans){
        x.style.backgroundColor = "green"
      }
      });
    }
  setTimeout(()=> {
     for(var i = 0; i < buttons.length; i++){
    buttons[i].style.backgroundColor = "transparent";
       };
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
let audiobtn = document.querySelector("#audio i")
function sounds(){
if(sound){
  sound = false;
  audiobtn.classList.remove("fa-volume-up");
  audiobtn.classList.add("fa-volume-off");
  console.log(audiobtn)
} else {
  sound = true;
  audiobtn.classList.remove("fa-volume-off");
  audiobtn.classList.add("fa-volume-up");
  console.log(audiobtn)
}
console.log(sound)
}
function soundplay(name){
  if(sound){
    if(name === "flip"){
    audio.src = "cardflip.mp3"
    audio.load();
    } else if(name === "right"){
    audio.src = "right.mp3"
    audio.load();  
    } else {
    audio.src = "wrong.mp3"
    audio.load();
    }
  audio.play()
    
  }
}