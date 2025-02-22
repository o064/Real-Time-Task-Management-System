document.getElementById("add-task-btn").addEventListener("click", 
    addNewTask);
    function addNewTask() {
     const taskList = document.getElementById("task-list");
     // Simulate task data
     const newTask = "New task: " + new Date().toLocaleString();
     const listItem = document.createElement("li");
     listItem.textContent = newTask;
     taskList.appendChild(listItem);
    }
    