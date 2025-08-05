import { Task } from './task.js';

const appName = "To-do List App Modern";
document.getElementById("title").textContent = appName;

let tasks = [];

// Arrow function dengan return eksplisit
const fetchMockTasks = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                new Task("Belajar JavaScript"),
                new Task("Makan siang")
            ]);
        }, 500);
    });
};

// Async/await
const loadTasks = async () => {
    const fetchedTasks = await fetchMockTasks();
    tasks = [...tasks, ...fetchedTasks]; // spread operator
    renderTasks();
};

// Arrow function + template literal + destructuring
const renderTasks = () => {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach(({ title, completed }, index) => {
        const li = document.createElement("li");
        li.textContent = `${completed ? "✅" : "❌"} ${title}`;
        li.style.cursor = "pointer";
        li.onclick = () => {
            tasks[index].toggle();
            renderTasks();
        };
        list.appendChild(li);
    });
};

// Tambah task dan expose ke global agar bisa diakses dari HTML
const addTask = () => {
    const input = document.getElementById("taskInput");
    const newTask = new Task(input.value);
    tasks.push(newTask);
    input.value = "";
    renderTasks();
};

window.addTask = addTask;

loadTasks();
