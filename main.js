let x = document.getElementById("mode")
let y = document.getElementById("category")
let url = `https://opentdb.com/api.php?amount=1&category=${y.value}&difficulty=${x.value}&type=multiple`;
let triviabox = document.querySelector(".container");
document.querySelector(".span1").textContent = 100;
let questiontext;
let rightans;
let wrongans;
let sound = true;
let buttons = document.querySelectorAll(".ans");
let volumelevel;

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

//Starting The main Game
function start() {
  soundplay("flip");
  document.querySelector(".home").style.display = "none";
  triviabox.style.display = "flex"
  triviabox.style.animation = "flipIn 1s ease-in";
  let question = document.querySelector(".triviabox h1");
  let ansbox = document.querySelectorAll(".ans h1")

  fetchData(url).then((data) => {

    console.log(data.incorrect_answers)
    questiontext = resolve(data.question);
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

//Adding Listner to the buttons
buttons.forEach((x) => {
  x.addEventListener("click", (b) => {
    check(b, x);
  })
})

//Function to check answers
function check(b, x) {
  if (b.target.textContent === rightans) {
    soundplay("right");
    x.style.backgroundColor = "green"
    buttons.forEach((x) => {
      if (x.textContent !== rightans) {
        x.style.backgroundColor = "transparent"
      }
    })
  } else {
    soundplay("wrong");
    buttons.forEach((x) => {
      x.style.backgroundColor = "red"
      if (x.textContent === rightans) {
        x.style.backgroundColor = "green"
      }
    });
  }
  setTimeout(() => {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = "transparent";
    };
    start();
  }, 1000)
};

//Resolving Escape Functions
function resolve(args) {
  const parser = new DOMParser();
  return parser.parseFromString(args, 'text/html').body.textContent;
};

function rhome() {
  document.querySelector(".home").style.display = "flex";
  let triviabox = document.querySelector(".container");
  triviabox.style.display = "none"
  triviabox.style.animation = "flipIn 1s ease-in";

}
//Sound Controls
let audio = document.getElementById("audio")
let audiobtn = document.querySelector("#audiodiv i")
var volumeSlider = document.querySelector("#volumeSlider");

function sounds() {
  if (sound) {
    sound = false;
    volumeSlider.value = 0;
    document.querySelector(".span1").textContent = 0;
    audiobtn.classList.remove("fa-volume-up");
    audiobtn.classList.add("fa-volume-off");
  } else {
    sound = true;
    volumeSlider.value = 1;
    document.querySelector(".span1").textContent = 100;
    audiobtn.classList.remove("fa-volume-off");
    audiobtn.classList.add("fa-volume-up");
  }
  console.log(sound)
}

function soundplay(name) {
  if (sound) {
    if (name === "flip") {
      audio.src = "cardflip.mp3"
      audio.load();
    } else if (name === "right") {
      audio.src = "right.mp3"
      audio.load();
    } else {
      audio.src = "wrong.mp3"
      audio.load();
    }

    audio.play()

  }
}
var audiodiv = document.querySelector("#audiodiv");

audiodiv.addEventListener("mouseenter", () => {
  volumeSlider.style.display = "block"
});
audiodiv.addEventListener("mouseout", () => {
  volumeSlider.style.display = "none"
})

function updateVolume() {
  audio.volume = volumeSlider.value;
  if(Number(volumeSlider.value) === 0){
    volumelevel = 0;
    audiobtn.classList.remove("fa-volume-up");
    audiobtn.classList.add("fa-volume-off");
  } else if(Number(volumeSlider.value) === 1){
    volumelevel = 100;
    audiobtn.classList.remove("fa-volume-off");
    audiobtn.classList.add("fa-volume-up");
  } else{
volumelevel = volumeSlider.value.split(".")[1];
  }
  document.querySelector(".span1").textContent = volumelevel;
}