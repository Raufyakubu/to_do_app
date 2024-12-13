let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function updateProgressBar() {
            const completedTasks = tasks.filter(task => task.completed).length;
            const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
            const progressBar = document.getElementById('progressBar');
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}%`;
        }

        function renderTasks() {
            const tasksContainer = document.getElementById('tasks');
            tasksContainer.innerHTML = '';
            tasks.forEach((task, index) => {
                const taskElement = document.createElement('div');
                taskElement.className = `list-group-item d-flex justify-content-between align-items-center`;
                taskElement.innerHTML = `
                    <div>
                        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                        <span class="${task.completed ? 'text-decoration-line-through' : ''}">${task.name}</span>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-warning me-2" onclick="editTask(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
                    </div>
                `;
                tasksContainer.appendChild(taskElement);
            });
            updateProgressBar();
        }

        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const taskName = taskInput.value.trim();
            if (taskName) {
                tasks.push({ name: taskName, completed: false });
                taskInput.value = '';
                saveTasks();
                renderTasks();
            }
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }

        function editTask(index) {
            const newTaskName = prompt('Edit task name:', tasks[index].name);
            if (newTaskName !== null) {
                tasks[index].name = newTaskName.trim();
                saveTasks();
                renderTasks();
            }
        }

        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }

        function sortTasks() {
            tasks.sort((a, b) => a.name.localeCompare(b.name));
            saveTasks();
            renderTasks();
        }

        // Initial render
        renderTasks();