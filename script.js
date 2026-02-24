function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}

function setTheme(mode) {
  document.body.className = mode;
  localStorage.setItem("theme", mode);
}

window.onload = function() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.className = savedTheme;
  renderHabits();
}

function addHabit() {
  const name = document.getElementById("habitName").value;
  if (!name) return;

  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits.push({ name: name, streak: 0 });
  localStorage.setItem("habits", JSON.stringify(habits));
  window.location.href = "index.html";
}

function incrementStreak(name) {
  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  habits = habits.map(h => {
    if (h.name === name) h.streak++;
    return h;
  });
  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
}

function renderHabits() {
  const list = document.getElementById("habitList");
  if (!list) return;

  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  list.innerHTML = "";

  habits.forEach(habit => {
    const card = document.createElement("div");
    card.className = "card";

    if (habit.streak >= 3) card.classList.add("streak-active");

    const streakClass = habit.streak >= 3 ? "streak-text-active" : "";

    card.innerHTML = `
      <h3>${habit.name}</h3>
      <p class="${streakClass}">🔥 Streak: ${habit.streak} hari</p>
      <button onclick="incrementStreak('${habit.name}')">Done Today</button>
    `;

    list.appendChild(card);
  });

  renderChart(habits);
}

function renderChart(habits) {
  const ctx = document.getElementById("progressChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: habits.map(h => h.name),
      datasets: [{
        label: "Streak Progress",
        data: habits.map(h => h.streak),
        backgroundColor: "rgba(0,240,255,0.6)",
        borderColor: "#ff00ff",
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        legend: { labels: { color: "#fff" } }
      },
      scales: {
        x: { ticks: { color: "#fff" } },
        y: { ticks: { color: "#fff" } }
      }
    }
  });
}