const chartColumnContainer = document.querySelector(".chart-column-container");

const fetchBarDetails = async function () {
  const response = await fetch("./constant/data.json");
  const barData = await response.json();
  addBarToDom(barData);
};

const createBarInfo = (chartColumnBar, barInfo) => {
  console.log(barInfo);
  const infoContainer = document.createElement("div");
  const infoText = document.createElement("p");
  infoContainer.classList.add("info-container");
  infoContainer.style.opacity = "1";
  infoContainer.style.bottom = `calc(${barInfo}% + 10%)`;
  infoText.classList.add("info-text");
  infoContainer.appendChild(infoText);
  infoText.innerText = ` $${barInfo}`;
  chartColumnBar.appendChild(infoContainer);
};
const removeBarInfo = () => {
  const infoContainer = document.querySelector(".info-container");
  infoContainer.remove();
};
const addBarToDom = function (barDetails) {
  barDetails.forEach((baritem) => {
    const chartColumn = document.createElement("div");
    const chartColumnBar = document.createElement("div");
    const chartColumnInnerBar = document.createElement("div");
    const chartColumnName = document.createElement("div");
    const barDay = document.createElement("p");

    chartColumnInnerBar.style.height = `${baritem?.amount}%`;
    chartColumnInnerBar.style.background = `${baritem?.color}`;
    chartColumn.classList.add("chart-column");
    chartColumnBar.classList.add("chart-column-bar");
    chartColumnInnerBar.classList.add("chart-column-inner-bar");
    chartColumnName.classList.add("chart-column-name");
    chartColumn.appendChild(chartColumnBar);
    chartColumn.appendChild(chartColumnName);
    chartColumnBar.appendChild(chartColumnInnerBar);
    chartColumnName.appendChild(barDay);
    barDay.innerText = baritem?.day;
    chartColumnContainer.appendChild(chartColumn);
    chartColumnInnerBar.addEventListener("mouseenter", () => {
      chartColumnInnerBar.style.opacity = "0.5";
      createBarInfo(chartColumnBar, baritem?.amount);
    });
    chartColumnInnerBar.addEventListener("mouseleave", () => {
      chartColumnInnerBar.style.opacity = "1";
      removeBarInfo(chartColumnInnerBar);
    });
  });
};

fetchBarDetails();
