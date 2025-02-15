function createTask(_taskName, _id) {
    const taskName = typeof _taskName === "string" ?
        _taskName : document.getElementById("create-task-input").value;
    const id = typeof _id === "number" ?
        _id : document.querySelectorAll(".task").length;

    let newTaskDiv = document.createElement("div");
    newTaskDiv.className = "form-check task";
    newTaskDiv.id = "task-" + id;
    newTaskDiv.innerHTML = `
        <div>
            <label class="form-check-label task-label" for="task-${id}">
                ${taskName}
            </label>
            <input class="form-check-input" id="checkbox-task-${id}" type="checkbox" />
        </div>
        <button class="btn btn-danger btn-sm" style="margin-left: auto" type="button" title="Delete task">
            <i class="bi bi-trash3-fill"></i>
        </button>
    `;
    document.getElementById("tasks-list").appendChild(newTaskDiv);

    // Reset input
    document.getElementById("create-task-input").value = "";

    // If we are not adding task from the local storage
    if (typeof _taskName !== "string") {
        updateLocalStorage(taskName);
    }

}

function updateLocalStorage(taskNameToAdd) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(taskNameToAdd);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let id = 0;
    for (const task of tasks) {
        createTask(task, id++);
    }
}

document.getElementById("create-task-button").addEventListener("click", createTask);
loadTasksFromLocalStorage();
