document.getElementById("addBtn").addEventListener("click", addTask);

function addTask() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) {
    alert("Please fill out both fields!");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    description,
    time: new Date().toLocaleString(),
    completed: false,
  };

  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  renderTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function renderTasks() {
  const tasks = getTasks();
  const pendingList = document.getElementById("pendingList");
  const completedList = document.getElementById("completedList");

  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="task-header">
        <span class="task-title">${task.title}</span>
      </div>
      <p class="task-desc">${task.description}</p>
      <p class="task-time">${task.completed ? "Completed on: " : "Added on: "} ${task.time}</p>
      <div class="actions">
        ${!task.completed ? `<button class="complete" onclick="markComplete(${task.id})">Complete</button>` : ""}
        <button class="edit" onclick="editTask(${task.id})">Edit</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    if (task.completed) {
      completedList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });
}

function markComplete(id) {
  const tasks = getTasks().map(task => {
    if (task.id === id) {
      task.completed = true;
      task.time = new Date().toLocaleString();
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(id) {
  const tasks = getTasks().filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function editTask(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);

  const newTitle = prompt("Edit title:", task.title);
  const newDesc = prompt("Edit description:", task.description);

  if (newTitle && newDesc) {
    task.title = newTitle;
    task.description = newDesc;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

document.addEventListener("DOMContentLoaded", renderTasks);
