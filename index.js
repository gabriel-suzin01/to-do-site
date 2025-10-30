let savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
const taskList = document.querySelector("#task-list");
const createBar = document.querySelector("#create-task");
const clearButton = document.querySelector("#clear");

savedTasks.forEach(task => loadTasks(task));

createBar.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        addTask();
    }
});

clearButton.addEventListener("click", () => clearTasks());

function loadTasks(text = createBar.value){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const newTask = document.createElement("li");
    newTask.id = (tasks.length + 1).toString();
    newTask.className = "task";
    taskList.appendChild(newTask);

    const newSpan = document.createElement("span");
    newSpan.textContent = text;
    newTask.appendChild(newSpan);

    const deleteIcon = document.createElement("button");
    deleteIcon.textContent = "❌";
    deleteIcon.onclick = () => removeTask(newTask);
    newTask.appendChild(deleteIcon);
}

function addTask(){
    if(!createBar.value.trim()) return;

    loadTasks();
    
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks.push(createBar.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createBar.value = "";
}

function removeTask(task){
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    let taskText = task.querySelector("span").textContent;
    const index = tasks.findIndex(t => t === taskText);
    if(index > -1) tasks.splice(index, 1);

    taskList.removeChild(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks(){
    Array.from(taskList.children).forEach(child => {
        taskList.removeChild(child);
    });

    localStorage.clear();
}