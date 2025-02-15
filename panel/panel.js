function createTask(_taskName, _id, _isCompleted) {
    const taskName = typeof _taskName === "string" ?
        _taskName : document.getElementById("create-task-input").value;
    const id = typeof _id === "string" ? _id : 'id' + (new Date()).getTime();
    const isCompleted = _isCompleted || false;

    let newTaskDiv = document.createElement("div");
    newTaskDiv.className = "form-check task";
    newTaskDiv.id = "task-" + id;
    newTaskDiv.innerHTML = `
        <div>
            <label class="form-check-label task-label" for="task-${id}">
                ${isCompleted === true ? "<del>" : ""}
                ${taskName}
                ${isCompleted === true ? "</del>" : ""}
            </label>
            <input class="form-check-input" id="checkbox-task-${id}" type="checkbox" />
        </div>
        <button class="btn btn-danger btn-sm" style="margin-left: auto" type="button" title="Delete task" id="delete-${id}">
            <i class="bi bi-trash3-fill"></i>
        </button>
    `;
    document.getElementById("tasks-list").appendChild(newTaskDiv);
    document.getElementById("delete-" + id).addEventListener("click", deleteButtonClickHandler(id));
    document.getElementById("checkbox-task-" + id).addEventListener("click", completeTaskButtonClickHandler(id));
    document.getElementById("checkbox-task-" + id).checked = isCompleted;

    // Reset input
    document.getElementById("create-task-input").value = "";

    // If we are not adding task from the local storage
    if (typeof _taskName !== "string") {
        // Then we add it to the local storage
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push({
            name      : taskName,
            id        : id,
            isCompleted : isCompleted
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

const completeTaskButtonClickHandler = (taskIdToComplete) => {
    return function(_event){
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        for (const task of tasks) {
            if (task.id === taskIdToComplete) {
                task.isCompleted = document.getElementById("checkbox-task-" + taskIdToComplete).checked;
                break;
            }
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasksFromLocalStorage()
    }
}

const deleteButtonClickHandler = (taskIdToDelete) => {
    return function(_event){
        document.getElementById("task-" + taskIdToDelete).remove();
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        localStorage.setItem("tasks", JSON.stringify(tasks.filter(el => el.id !== taskIdToDelete)));
    }
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    document.getElementById("tasks-list").innerHTML = "";
    for (const task of tasks) {
        createTask(task.name, task.id, task.isCompleted);
    }
}

document.getElementById("create-task-button").addEventListener("click", createTask);
loadTasksFromLocalStorage();
