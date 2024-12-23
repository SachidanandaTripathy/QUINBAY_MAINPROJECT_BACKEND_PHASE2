const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoContainer = document.getElementById("todo-container");
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");

let completedTodos = 0;
let totalTodos = 0;

addBtn.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        createTodoCard(todoText);
        todoInput.value = "";
    }
});

function createTodoCard(text) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");

    const todoText = document.createElement("p");
    todoText.classList.add("todo-text");
    todoText.textContent = text;

    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.textContent = "✔";
    checkBtn.addEventListener("click", () => {
        if (!todoCard.classList.contains("completed")) {
            todoCard.classList.add("completed");
            completedTodos++;
        } else {
            todoCard.classList.remove("completed");
            completedTodos--;
        }
        updateCounts();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => {
        if (todoCard.classList.contains("completed")) {
            completedTodos--;
        }
        todoCard.remove();
        totalTodos--;
        updateCounts();
    });

    actionButtons.appendChild(checkBtn);
    actionButtons.appendChild(deleteBtn);

    todoCard.appendChild(todoText);
    todoCard.appendChild(actionButtons);

    todoContainer.appendChild(todoCard);

    totalTodos++;
    updateCounts();
}

function updateCounts() {
    totalCount.textContent = totalTodos;
    completedCount.textContent = completedTodos;
}
