 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let time = 1500;
let timerInterval;
let sessions = localStorage.getItem("sessions") || 0;

document.getElementById("sessions").innerText = sessions;

function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value === "") return;

  tasks.push({ text: input.value, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    list.innerHTML += `
      <li>
        ${task.text}
        <button onclick="completeTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">❌</button>
      </li>
    `;
  });
}

function completeTask(index) {
  tasks[index].done = true;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Timer
function updateTimer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  document.getElementById("timer").innerText =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      updateTimer();
    } else {
      clearInterval(timerInterval);
      sessions++;
      localStorage.setItem("sessions", sessions);
      document.getElementById("sessions").innerText = sessions;
      alert("Session Complete!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  time = 1500;
  updateTimer();
}

renderTasks();
updateTimer();