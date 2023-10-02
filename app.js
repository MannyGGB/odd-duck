// DOM Nodes
let toyContainer = document.getElementById("pollSection");
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");

// Toy construct
function Toy(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

// function to choose a random image
function getRandomIndex() {
  return Math.floor(Math.random() * allToys.length);
}

// function to render 3 random toys
function renderToys() {
  // get 3 random indexes from our toy array
  let toy1Index = getRandomIndex();
  let toy2Index = getRandomIndex();
  let toy3Index = getRandomIndex();

  // prevent the images being the same
  while (
    toy1Index === toy2Index ||
    toy1Index === toy3Index ||
    toy2Index === toy3Index
  ) {
    toy3Index = getRandomIndex();
  }

  // change the src of our 3 images
  image1.src = allToys[toy1Index].src;
  image2.src = allToys[toy2Index].src;
  image3.src = allToys[toy3Index].src;
  image1.alt = allToys[toy1Index].name;
  image2.alt = allToys[toy2Index].name;
  image3.alt = allToys[toy3Index].name;
  // increase the views
  allToys[toy1Index].views++;
  allToys[toy2Index].views++;
  allToys[toy3Index].views++;
}

// handle the toy being clicked
function toyClick(event) {
  let clickedToy = event.target.alt;

  // check if the click is on an image
  if (event.target === toyContainer) {
    alert("Please, click on an image");
  } else {
    renderToys();
  }

  // loop through allToys
  for (let i = 0; i < allToys.length; i++) {
    if (clickedToy === allToys[i].name) {
      allToys[i].clicks++;
      break;
    }
  }
  // 25 rounds
  let rounds = 2;
  if (toyClick !== rounds) {
    alert("Thank you for your contribution.");
  }
}

// make the toys
const allToys = [
  new Toy("bag", "./assets/bag.jpg"),
  new Toy("banana", "./assets/banana.jpg"),
  new Toy("bathroom", "./assets/bathroom.jpg"),
  new Toy("boots", "./assets/boots.jpg"),
  new Toy("breakfast", "./assets/breakfast.jpg"),
  new Toy("bubblegum", "./assets/bubblegum.jpg"),
  new Toy("chair", "./assets/chair.jpg"),
  new Toy("cthulhu", "./assets/cthulhu.jpg"),
  new Toy("dog-duck", "./assets/dog-duck.jpg"),
  new Toy("dragon", "./assets/dragon.jpg"),
  new Toy("pen", "./assets/pen.jpg"),
  new Toy("pet-sweep", "./assets/pet-sweep.jpg"),
  new Toy("scissors", "./assets/scissors.jpg"),
  new Toy("shark", "./assets/shark.jpg"),
  new Toy("sweep", "./assets/sweep.png"),
  new Toy("tauntaun", "./assets/tauntaun.jpg"),
  new Toy("unicorn", "./assets/unicorn.jpg"),
  new Toy("water-can", "./assets/water-can.jpg"),
  new Toy("wine-glass", "./assets/wine-glass.jpg"),
];

// add the event listener to the toys
toyContainer.addEventListener("click", toyClick);

renderToys();

//add results to the list
