const field = document.querySelector("#todo-field");
const time = document.querySelector("#todo-time");
const add = document.querySelector("#add");
const filter = document.querySelector("#filter");
const wrapper = document.querySelector("#wrapper");

function validate(field, time) {
  if (field.value.length < 5) {
    alert("todo kamida 6 ta belgidan iborat bo'lsin");
    field.focus();
    return false;
  }
  if (!time.value) {
    alert("time tanlangan bo'lishi kerak");
    time.focus();
    return false;
  }
  return true;
}

function getData() {
  let data = [];
  if (localStorage.getItem("todos")) {
    data = JSON.parse(localStorage.getItem("todos"));
  }
  return data;
}

add &&
  add.addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = validate(field, time);
    if (!isValid) {
      return;
    }
    let todo = {
      name: field.value,
      time: time.value,
      status: "active",
      id: Date.now(),
    };
    let todos = getData();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    field.value = "";
    time.value = "";
    displayTodos();
  });

function displayTodos() {
  let todos = getData();
  wrapper.innerHTML = ""; // Oldingi todos'ni tozalash
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo_item");

    todoItem.innerHTML = `
      <div class="info">
        <div class="check">
          <input type="checkbox" id="checked" ${
            todo.status === "completed" ? "checked" : ""
          }/>
        </div>
        <div class="text_data">
          <p class="todo_name">${todo.name}</p>
          <p class="todo_time">${new Date(todo.time).toLocaleString()}</p>
        </div>
      </div>
      <div class="actions">
        <i class="fa-solid fa-trash" onclick="deleteTodo(${todo.id})"></i>
        <i class="fa-solid fa-pencil"></i>
      </div>
    `;
    wrapper.appendChild(todoItem);
  });
}

function deleteTodo(id) {
  let todos = getData();
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
  displayTodos();
}

document.addEventListener("DOMContentLoaded", displayTodos);
