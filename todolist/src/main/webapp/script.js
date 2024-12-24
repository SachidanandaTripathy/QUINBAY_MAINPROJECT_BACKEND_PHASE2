const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoContainer = document.getElementById("todo-container");
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");

let completedTodos = 0;
let totalTodos = 0;

const API_URL = "http://localhost:8081/api/todos";

window.onload = async () => {
    await fetchTodos();
};

async function fetchTodos() {
    try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        completedTodos = 0;
        totalTodos = 0;
        todoContainer.innerHTML = "";
        todos.forEach((todo) => {
            createTodoCard(todo);
        });
        updateCounts();
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}

addBtn.addEventListener("click", async () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: todoText, completed: false }),
            });
            const newTodo = await response.json();
            createTodoCard(newTodo);
            todoInput.value = "";
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }
});

function createTodoCard(todo) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");
    if (todo.completed) {
        todoCard.classList.add("completed");
        completedTodos++;
    }

    const todoText = document.createElement("p");
    todoText.classList.add("todo-text");
    todoText.textContent = todo.text;

    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.textContent = "✔";
    checkBtn.addEventListener("click", () => toggleTodoCompletion(todo.id, todoCard));

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id, todoCard));

    actionButtons.appendChild(checkBtn);
    actionButtons.appendChild(deleteBtn);

    todoCard.appendChild(todoText);
    todoCard.appendChild(actionButtons);

    todoContainer.appendChild(todoCard);

    totalTodos++;
    updateCounts();
}

async function toggleTodoCompletion(todoId, todoCard) {
    const isCompleted = !todoCard.classList.contains("completed");
    try {
        await fetch(`${API_URL}/${todoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: isCompleted }),
        });

        todoCard.classList.toggle("completed");
        completedTodos += isCompleted ? 1 : -1;
        updateCounts();
    } catch (error) {
        console.error("Error updating todo:", error);
    }
}

async function deleteTodo(todoId, todoCard) {
    try {
        await fetch(`${API_URL}/${todoId}`, { method: "DELETE" });
        if (todoCard.classList.contains("completed")) {
            completedTodos--;
        }
        todoCard.remove();
        totalTodos--;
        updateCounts();
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}

function updateCounts() {
    totalCount.textContent = totalTodos;
    completedCount.textContent = completedTodos;
}
