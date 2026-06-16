/* ==========================================
   Initialization 
========================================== */
const monthsContainer = document.getElementById("months");
const titleEl = document.getElementById("plannerTitle");
const prevBtn = document.getElementById("prevYear");
const nextBtn = document.getElementById("nextYear");

let activeYear = new Date().getFullYear();

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* ==========================================
   Local Storage
========================================== */
const STORAGE_KEY = "fullmoon.pocketplanner.yearoverview";

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const yearOverviewData = savedData.years || {};

function notifyDashboardSync() {
  if (window.parent !== window) {
    window.parent.postMessage(
      {
        type: "plannerChanged",
        planner: STORAGE_KEY,
      },
      "*",
    );
  }
}

function saveYearOverview() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      years: yearOverviewData,
      updatedAt: Date.now(),
    }),
  );

  notifyDashboardSync();
}

/* ==========================================
  Main Function
========================================== */
function renderYear() {
  monthsContainer.innerHTML = "";
  titleEl.textContent = activeYear;

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

    if (activeYear === currentYear && monthIndex === currentMonth) {
      title.style.fontWeight = "700";
    }

    const notes = document.createElement("textarea");
    notes.className = "month-notes";

    if (!yearOverviewData[activeYear]) {
      yearOverviewData[activeYear] = {};
    }

    notes.value = yearOverviewData[activeYear][month] || "";

    notes.addEventListener("input", () => {
      if (!yearOverviewData[activeYear]) {
        yearOverviewData[activeYear] = {};
      }

      yearOverviewData[activeYear][month] = notes.value;
    });

    notes.addEventListener("blur", saveYearOverview);

    monthDiv.appendChild(title);
    monthDiv.appendChild(notes);

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

/* ==========================================
   Start up Call
========================================== */
// Initial render
renderYear();

/* ==========================================
   Helper functions
========================================== */
// Jump back to current year when title is clicked
titleEl.addEventListener("click", () => {
  const todayYear = new Date().getFullYear();
  if (activeYear !== todayYear) {
    activeYear = todayYear;
    renderYear();
  }
});
