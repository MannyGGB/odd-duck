// DOM Nodes
let toyContainer = document.getElementById("poll-section");
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");
let image3 = document.getElementById("image3");
let ctx = document.getElementById("results-chart");

// attempts
let userClicks = 0;
let maxClicks = 5;

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
    toy2Index = getRandomIndex();
    toy3Index = getRandomIndex();
  }

  // make images not repeat after attempts
  let toy123 = [toy1Index, toy2Index, toy3Index];
  if (toy123 === allToys.length) {
    toy123 = getRandomIndex();
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
  } else if (userClicks === maxClicks) {
    alert("Thank you for your votes.");
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
function showResults() {
  // put a bunch of lis into a ul
  const results = document.getElementById("results");

  // loop through our products and make a li for each one
  for (let i = 0; i < allToys.length; i++) {
    const li = document.createElement("li");
    const prod = allToys[i];
    li.textContent = `${prod.name} was viewed ${prod.views} times, and clicked ${prod.clicks} times.`;
    results.appendChild(li);
  }
  // add info to the chart
  let chartLabels = [];
  let chartData = [];
  let chartClicks = [];
  for (let i = 0; i < allToys.length; i++) {
    const prod = allToys[i];
    chartLabels.push(prod.name);
    chartData.push(prod.clicks);
    chartClicks.push(prod.views);
  }
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: "Votes",
          data: chartData,
          borderWidth: 4,
          backgroundColor: "rgb(245, 242, 184)",
          borderColor: "rgb(249, 158, 128)",
        },
        {
          label: "Views",
          data: chartClicks,
          borderWidth: 4,
          backgroundColor: "rgb(164, 145, 211)",
          borderColor: "rgb(86, 94, 118)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// make the button show the results
const viewResults = document.getElementById("view-results");
viewResults.addEventListener("click", showResults);

renderToys();
