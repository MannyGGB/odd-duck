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
