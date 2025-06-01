const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let editMode = false;
let taskToEdit = null;

function addTask() {
    const inputValue = inputBox.value.trim();

    if (inputValue === '') {
        alert("You must write something!");
        return;
    }

    if (editMode && taskToEdit) {
        taskToEdit.querySelector(".task-text").textContent = inputValue;
        editMode = false;
        taskToEdit = null;
    } else {
        let li = document.createElement("li");

        
        let spanText = document.createElement("span");
        spanText.className = "task-text";
        spanText.textContent = inputValue;

        
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        
        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "\u00d7";
        deleteBtn.className = "delete-btn";

        li.appendChild(spanText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        listContainer.appendChild(li);
    }

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    const li = e.target.closest("li");

    if (e.target.classList.contains("delete-btn")) {
        li.remove();
        saveData();
    } 
    else if (e.target.classList.contains("edit-btn")) {
        inputBox.value = li.querySelector(".task-text").textContent;
        inputBox.focus();
        editMode = true;
        taskToEdit = li;
    } 
    else if (e.target.classList.contains("task-text")) {
        li.classList.toggle("checked");
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
