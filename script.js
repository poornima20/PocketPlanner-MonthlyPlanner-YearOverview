const monthsContainer = document.getElementById("months");
const titleEl = document.getElementById("plannerTitle");
const prevBtn = document.getElementById("prevYear");
const nextBtn = document.getElementById("nextYear");

let activeYear = new Date().getFullYear();

const monthNames = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
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
      title.style.transform = "scale(1.08)";
      title.style.opacity = "1";

      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      if (
        activeYear === currentYear &&
        monthIndex === currentMonth
      ) {
        title.style.fontWeight = "700";
      }

    const lines = document.createElement("div");
    lines.className = "lines";

    for (let i = 0; i < 4; i++) {

      const input = document.createElement("input");
      input.setAttribute("maxlength", "35");
      input.setAttribute("inputmode", "text");

      const storageKey = `fullmoon.pocketplanner.yearoverview.${activeYear}-${monthIndex}-${i}`;

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


const header = document.querySelector(".title-wrapper");

let startX = 0;
let endX = 0;

header.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

header.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;

  const diff = endX - startX;

  // swipe right → next year
  if (diff < 50) {
    activeYear++;
    renderYear();
  }

  // swipe left → previous year
  if (diff > -50) {
    activeYear--;
    renderYear();
  }
});