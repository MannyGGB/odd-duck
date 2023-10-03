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

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
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
