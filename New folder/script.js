// script.js

document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const newTaskInput = document.getElementById('new-task');
  const taskList = document.getElementById('task-list');

  // Load tasks from local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Function to save tasks to local storage
  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  // Function to render tasks
  const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.innerHTML = `
        <span>${task.name}</span>
        <div>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
          <button class="toggle">${task.completed ? 'Uncomplete' : 'Complete'}</button>
        </div>
      `;

      // Edit task
      li.querySelector('.edit').addEventListener('click', () => {
        const newName = prompt('Edit task:', task.name);
        if (newName) {
          tasks[index].name = newName;
          saveTasks();
          renderTasks();
        }
      });

      // Delete task
      li.querySelector('.delete').addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      // Toggle task completion
      li.querySelector('.toggle').addEventListener('click', () => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      });

      taskList.appendChild(li);
    });
  };

  // Add new task
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
      name: newTaskInput.value,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    newTaskInput.value = '';
  });

  // Initial render
  renderTasks();
});
