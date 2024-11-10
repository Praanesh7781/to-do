// Function to show the selected content section
function showContent(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');

    document.getElementById(sectionId).style.display = 'block';
}

// Navigation event listeners
document.getElementById('dashboardLink').addEventListener('click', () => {
    showContent('dashboardContent');
    setActiveLink('dashboardLink');
});

document.getElementById('calendarLink').addEventListener('click', () => {
    showContent('calendarContent');
    setActiveLink('calendarLink');
});

// Function to set the active link in the navigation bar
function setActiveLink(activeLinkId) {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => link.classList.remove('active'));

    document.getElementById(activeLinkId).classList.add('active');
}

// Add a new task
function addTask() {
    const taskInput = document.querySelector('#taskInput');
    const taskDate = document.querySelector('#taskDate').value;
    const taskPriority = document.querySelector('#taskPriority').value;
    const taskList = document.querySelector('#taskUL');
    const taskName = taskInput.value.trim();

    if (taskName === '') {
        alert('Please enter a task name.');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-name">${taskName}</span>
        <span class="task-date">${taskDate}</span>
        <span class="task-priority">${taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1)}</span>
        <div class="task-buttons">
            <button class="in-progress-btn">In Progress</button>
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
    taskInput.value = ''; // Clear the input
}

// Edit a task
function editTask(taskItem) {
    const taskName = taskItem.querySelector('.task-name').textContent;
    const newTaskName = prompt('Edit Task Name:', taskName);

    if (newTaskName) {
        taskItem.querySelector('.task-name').textContent = newTaskName;
    }
}

// Delete a task
function deleteTask(taskItem) {
    taskItem.remove();
}

// Mark a task as in progress
function markInProgress(taskItem) {
    const progressList = document.querySelector('#progressUL');
    taskItem.classList.remove('completed');
    taskItem.classList.add('in-progress');
    progressList.appendChild(taskItem);
}

// Mark a task as complete
function completeTask(taskItem) {
    const completedList = document.querySelector('#completedUL');
    taskItem.classList.add('completed');
    completedList.appendChild(taskItem);
}

// Event Listeners
document.querySelector('.addBtn').addEventListener('click', addTask);
document.querySelector('.content').addEventListener('click', function(event) {
    const taskItem = event.target.closest('li');

    if (event.target.classList.contains('edit-btn')) {
        editTask(taskItem);
    } else if (event.target.classList.contains('delete-btn')) {
        deleteTask(taskItem);
    } else if (event.target.classList.contains('complete-btn')) {
        completeTask(taskItem);
    } else if (event.target.classList.contains('in-progress-btn')) {
        markInProgress(taskItem);
    }
});

// Initialize with the dashboard content visible
showContent('dashboardContent');
