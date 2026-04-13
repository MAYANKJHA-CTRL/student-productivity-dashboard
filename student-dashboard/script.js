let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on page load
window.onload = function () {
  displayTasks();
};

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value;

  if (taskText === "") return;

  tasks.push(taskText);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  displayTasks();
}
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;

// Load expenses also
window.onload = function () {
  displayTasks();
  displayExpenses();
};

function addExpense() {
  let input = document.getElementById("expenseInput");
  let amount = parseFloat(input.value);

  if (isNaN(amount)) return;

  expenses.push(amount);

  localStorage.setItem("expenses", JSON.stringify(expenses));

  input.value = "";
  displayExpenses();
}
let timer = null;
let seconds = 0;

function startTimer() {
  if (timer !== null) return; // prevent multiple timers

  timer = setInterval(() => {
    seconds++;
    document.getElementById("time").innerText = seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

function displayExpenses() {
  total = expenses.reduce((sum, val) => sum + val, 0);
  document.getElementById("totalExpense").innerText = total;
}

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerText = task;

    let btn = document.createElement("button");
    btn.innerText = "X";

    btn.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}