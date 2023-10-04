// DOM nodes
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

// make sure the user only has 25 clicks
let userClicks = 0;
let maxClick = 25;

//a constructor that makes product objects

function Product(name) {
  this.name = name;
  this.src = `./assets/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
}

const products = [
  new Product("bag"),
  new Product("banana"),
  new Product("bathroom"),
  new Product("boots"),
  new Product("breakfast"),
  new Product("bubblegum"),
  new Product("chair"),
  new Product("cthulhu"),
  new Product("dog-duck"),
  new Product("dragon"),
  new Product("pen"),
];

// function that randomly gets an index
function randomProdIdx() {
  return Math.floor(Math.random() * products.length);
}

// make a function to get 3 products (not the same)
function renderProducts() {
  let prod1 = randomProdIdx();
  let prod2 = randomProdIdx();
  let prod3 = randomProdIdx();

  while (prod1 === prod2 || prod1 === prod3 || prod2 === prod3) {
    prod2 = randomProdIdx();
    prod3 = randomProdIdx();
  }

  // change the src and alt to be products of the array
  img1.src = products[prod1].src;
  img2.src = products[prod2].src;
  img3.src = products[prod3].src;
  img1.alt = products[prod1].name;
  img2.alt = products[prod2].name;
  img3.alt = products[prod3].name;

  //increase views
  products[prod1].views++;
  products[prod2].views++;
  products[prod3].views++;
}

// handle what happens when you you click the image
function handleImgClick(event) {
  //attempts
  if (userClicks === maxClick) {
    alert("Max.");
    renderChart();
    return;
  }
  userClicks++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < products.length; i++) {
    if (clickedProduct === products[i].name) {
      products[i].clicks++;
      break;
    }
  }
  renderProducts();
}

img1.addEventListener("click", handleImgClick);
img2.addEventListener("click", handleImgClick);
img3.addEventListener("click", handleImgClick);

//view results

function showResults() {
  const results = document.getElementById("results");
  for (let i = 0; i < products.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${products[i].name} was viewed ${products[i].views} times | Clicked ${products[i].clicks} times`;
    results.appendChild(li);
  }
}

// make the button show results
const viewResults = document.getElementById("view-results");
viewResults.addEventListener("click", showResults);

renderProducts();

// make a chart
function renderChart() {
  const ctx = document.getElementById("myChart");
  const labels = [];
  const views = [];
  const clicks = [];

  for (let i = 0; i < products.length; i++) {
    labels.push(products[i].name);
    views.push(products[i].views);
    clicks.push(products[i].clicks);
  }
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of views",
          data: views,
          borderWidth: 1,
        },
        {
          type: "line",
          label: "# of clicks",
          data: clicks,
          borderWidth: 1,
        },
      ],
    },
  });
}

// const --> unchanging. If you are unsure, use const.
// let --> changes

// adding a theme to the website through local storage
const theme = localStorage.getItem("theme");
if (theme === "light") {
  document.body.classList.add("light");
} else if (theme === "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.add("light");
  localStorage.setItem("theme", "light");
}

function toggleTheme() {
  if (localStorage.getItem("theme") === "dark") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }

  document.body.classList.toggle("light"); // toggle swaps from light to dark
  document.body.classList.toggle("dark");
}
const themeBtn = document.getElementById("theme");
themeBtn.addEventListener("click", toggleTheme);

//Lab 13
// create a constructor function
function Character(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

// add a method to our Characters
Character.prototype.attack = function () {
  console.log(`${this.name} attacks with their ${this.weapon}`);
};

const charactersArray = [];

function checkLocal() {
  // get the characters from local storage and parse it so it's not a string
  const charsFromLS = JSON.parse(localStorage.getItem("characters"));

  // if that exists:
  if (charsFromLS) {
    // reinstantiate my array of objects one by one
    for (let i = 0; i < charsFromLS.length; i++) {
      const newChar = new Character(charsFromLS[i].name, charsFromLS[i].weapon);
      charactersArray.push(newChar);
    }
  } else {
    // if it doesn't exist:
    // create our characters
    const char1 = new Character("Tim the Preposterous", "nunchucks");
    const char2 = new Character("GJ the Wise", "bowstaff");
    const char3 = new Character("Vicky the Great", "Sarcasm");
    const char4 = new Character("Demie the Demi-god", "big ol' gun");

    // add them to our array
    charactersArray.push(char1, char2, char3, char4);

    // put our characters array into local storage
    putIntoLocalStorage();
  }
}

// put that array into localStorage after stringifying it
function putIntoLocalStorage() {
  const charactersStringified = JSON.stringify(charactersArray);
  localStorage.setItem("characters", charactersStringified);
}

checkLocal();
