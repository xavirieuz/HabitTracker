let habits = JSON.parse(localStorage.getItem("habits")) || [];
let chart;

function saveData(){
  localStorage.setItem("habits",JSON.stringify(habits));
}

function addHabit(){
  const input=document.getElementById("habitInput");
  if(!input.value.trim()) return;

  habits.push({
    id:Date.now(),
    name:input.value,
    dates:[]
  });

  input.value="";
  saveData();
  render();
}

function toggleHabit(id){
  const today=new Date().toISOString().split("T")[0];
  const habit=habits.find(h=>h.id===id);

  if(!habit.dates.includes(today)){
    habit.dates.push(today);
  }

  saveData();
  render();
}

function calculateStreak(dates){
  let streak=0;
  let today=new Date();

  while(dates.includes(today.toISOString().split("T")[0])){
    streak++;
    today.setDate(today.getDate()-1);
  }
  return streak;
}

function getLevel(streak){
  if(streak>=30) return "legend";
  if(streak>=14) return "beast";
  if(streak>=7) return "hot";
  if(streak>=3) return "fire";
  return "normal";
}

function getEmoji(streak){
  if(streak>=30) return "👑";
  if(streak>=14) return "🔥🔥🔥";
  if(streak>=7) return "🔥🔥";
  if(streak>=3) return "🔥";
  return "⚡";
}

function render(){
  const list=document.getElementById("habitList");
  list.innerHTML="";

  habits.forEach(habit=>{
    const streak=calculateStreak(habit.dates);
    const level=getLevel(streak);

    const div=document.createElement("div");
    div.className="habit";

    div.innerHTML=`
      <span>${habit.name}</span>
      <div class="habit-right">
        <span class="streak ${level}">
          ${getEmoji(streak)} ${streak}
        </span>
        <button class="done-btn" onclick="toggleHabit(${habit.id})">
          Done
        </button>
      </div>
    `;

    list.appendChild(div);
  });

  updateChart();
}

function updateChart(){
  const ctx=document.getElementById("progressChart");

  if(chart) chart.destroy();

  chart=new Chart(ctx,{
    type:"bar",
    data:{
      labels:habits.map(h=>h.name),
      datasets:[{
        label:"Total Done",
        data:habits.map(h=>h.dates.length)
      }]
    }
  });
}

render();