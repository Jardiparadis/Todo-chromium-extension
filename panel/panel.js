function createTask(_taskName, _id) {
    const taskName = typeof _taskName === "string" ?
        _taskName : document.getElementById("create-task-input").value;
    const id = typeof _id === "string" ? _id : 'id' + (new Date()).getTime();

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
        <button class="btn btn-danger btn-sm" style="margin-left: auto" type="button" title="Delete task" id="delete-${id}">
            <i class="bi bi-trash3-fill"></i>
        </button>
    `;
    document.getElementById("tasks-list").appendChild(newTaskDiv);
    document.getElementById("delete-" + id).addEventListener("click", deleteButtonClickHandler(id));

    // Reset input
    document.getElementById("create-task-input").value = "";

    // If we are not adding task from the local storage
    if (typeof _taskName !== "string") {
        // Then we add it to the local storage
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push({
            name : taskName,
            id   : id
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
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
    for (const task of tasks) {
        createTask(task.name, task.id);
    }
}

document.getElementById("create-task-button").addEventListener("click", createTask);
loadTasksFromLocalStorage();
