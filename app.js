// DOM Nodes
let toyContainer = document.getElementById("poll-section");
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");
let ctx = document.getElementById("results-chart");

// attempts
let userClicks = 0;
let maxClicks = 25;

//array for local storage
const allToys = [];
//here we store a reference to the previous toys
let prevToys = [];

// Toy construct
function Toy(name, src, views, clicks) {
  this.name = name;
  this.src = src;
  this.views = views;
  this.clicks = clicks;
  allToys.push(this);
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

  // prevent the images being the same and not repeat
  while (
    toy1Index === toy2Index ||
    toy1Index === toy3Index ||
    toy2Index === toy3Index ||
    prevToys.includes(toy1Index) ||
    prevToys.includes(toy2Index) ||
    prevToys.includes(toy3Index)
  ) {
    toy1Index = getRandomIndex();
    toy2Index = getRandomIndex();
    toy3Index = getRandomIndex();
  }
  // empty toys array and add to the prevToys array for the next time we get new products
  prevToys = [toy1Index, toy2Index, toy3Index];

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
  } else if (userClicks === maxClicks) {
    alert("Thank you for your votes.");
    //showResults(); to show results after finishing voting without pressing button
    localStorage.setItem("toys", JSON.stringify(allToys));
    return;
  }
  userClicks++;

  // loop through allToys
  for (let i = 0; i < allToys.length; i++) {
    if (clickedToy === allToys[i].name) {
      allToys[i].clicks++;
      break;
    }
  }

  renderToys();
}
if (localStorage.getItem("toys") === null) {
  new Toy("bag", "./assets/bag.jpg", 0, 0);
  new Toy("banana", "./assets/banana.jpg", 0, 0);
  new Toy("bathroom", "./assets/bathroom.jpg", 0, 0);
  new Toy("boots", "./assets/boots.jpg", 0, 0);
  new Toy("breakfast", "./assets/breakfast.jpg", 0, 0);
  new Toy("bubblegum", "./assets/bubblegum.jpg", 0, 0);
  new Toy("chair", "./assets/chair.jpg", 0, 0);
  new Toy("cthulhu", "./assets/cthulhu.jpg", 0, 0);
  new Toy("dog-duck", "./assets/dog-duck.jpg", 0, 0);
  new Toy("dragon", "./assets/dragon.jpg", 0, 0);
  new Toy("pen", "./assets/pen.jpg", 0, 0);
  new Toy("pet-sweep", "./assets/pet-sweep.jpg", 0, 0);
  new Toy("scissors", "./assets/scissors.jpg", 0, 0);
  new Toy("shark", "./assets/shark.jpg", 0, 0);
  new Toy("sweep", "./assets/sweep.png", 0, 0);
  new Toy("tauntaun", "./assets/tauntaun.jpg", 0, 0);
  new Toy("unicorn", "./assets/unicorn.jpg", 0, 0);
  new Toy("water-can", "./assets/water-can.jpg", 0, 0);
  new Toy("wine-glass", "./assets/wine-glass.jpg", 0, 0);
} else {
  const toysLS = JSON.parse(localStorage.getItem("toys"));
  for (let i = 0; i < toysLS.length; i++) {
    new Toy(toysLS[i].name, toysLS[i].src, toysLS[i].views, toysLS[i].clicks);
  }
}

// add the event listener to the toys
const toysClickLS = localStorage.getItem(toyContainer);
toyContainer.addEventListener("click", toyClick);

renderToys();
