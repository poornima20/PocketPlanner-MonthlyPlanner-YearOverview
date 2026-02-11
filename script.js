const monthsContainer = document.getElementById("months");
const titleEl = document.getElementById("plannerTitle");
const prevBtn = document.getElementById("prevYear");
const nextBtn = document.getElementById("nextYear");

let activeYear = new Date().getFullYear();

const monthNames = [
  "JANUARY", "FEBRUARY", "MARCH",
  "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER",
  "OCTOBER", "NOVEMBER", "DECEMBER"
];

function renderYear() {
  monthsContainer.innerHTML = "";
  titleEl.textContent = activeYear + " Overview";
  
   const todayYear = new Date().getFullYear();
  titleEl.style.opacity = activeYear === todayYear ? "1" : "0.8";
  
  monthNames.forEach((month, monthIndex) => {

    const monthDiv = document.createElement("div");
    monthDiv.className = "month";

    const title = document.createElement("div");
    title.className = "month-title";
    title.textContent = month;

    const lines = document.createElement("div");
    lines.className = "lines";

    for (let i = 0; i < 4; i++) {

      const input = document.createElement("input");
      input.setAttribute("maxlength", "30");
      input.setAttribute("inputmode", "text");

      const storageKey = `planner-${activeYear}-${monthIndex}-${i}`;

      // Load saved value
      input.value = localStorage.getItem(storageKey) || "";

      // Save on input
      input.addEventListener("input", () => {
        localStorage.setItem(storageKey, input.value);
      });

      lines.appendChild(input);
    }

    monthDiv.appendChild(title);
    monthDiv.appendChild(lines);
    monthsContainer.appendChild(monthDiv);
  });
}

// Arrow events
prevBtn.addEventListener("click", () => {
  activeYear--;
  renderYear();
});

nextBtn.addEventListener("click", () => {
  activeYear++;
  renderYear();
});

// Initial render
renderYear();


// Jump back to current year when title is clicked
titleEl.addEventListener("click", () => {
  const todayYear = new Date().getFullYear();
  if (activeYear !== todayYear) {
    activeYear = todayYear;
    renderYear();
  }
});
