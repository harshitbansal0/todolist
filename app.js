const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const ul = document.querySelector('ul');
const noTasksMessage = document.querySelector('#no-tasks-message');
let isEditing = false;

function startEditing() {
  isEditing = true;
  document.removeEventListener('keydown', focusInput);
}

function stopEditing() {
  isEditing = false;
  document.addEventListener('keydown', focusInput);
}

function focusInput() {
  input.focus();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim() !== '') {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const bulletPoint = document.createElement('label');
    bulletPoint.textContent = `${ul.children.length + 1}. `;
    const span = document.createElement('span');
    span.textContent = input.value;
    label.appendChild(bulletPoint);
    label.appendChild(span);
    li.appendChild(label);
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    li.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    li.appendChild(deleteButton);
    ul.appendChild(li);
    input.value = '';
    noTasksMessage.style.display = 'none';
  }
});

function checkNoTasks() {
  if (ul.children.length === 0) {
    noTasksMessage.style.display = 'block';
  }
}


ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const li = e.target.parentNode;
    if (e.target.textContent === 'Delete') {
      ul.removeChild(li);
      checkNoTasks();
    } else if (e.target.textContent === 'Edit') {
      const label = li.querySelector('label');
      const span = li.querySelector('span');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      label.replaceChild(input, span);
      e.target.textContent = 'Save';
      startEditing();
      input.addEventListener('blur', stopEditing);
    } else if (e.target.textContent === 'Save') {
      const label = li.querySelector('label');
      const input = label.querySelector('input[type="text"]');
      const span = document.createElement('span');
      span.classList.add('task-text');
      span.textContent = input.value;
      label.replaceChild(span, input);
      e.target.textContent = 'Edit';
      stopEditing();
    }
    
  } else if (e.target.tagName === 'INPUT') {
    const label = e.target.nextElementSibling;
    if (e.target.checked) {
      label.classList.add('completed');
    } else {
      label.classList.remove('completed');
    }
  }
  checkNoTasks();
});

if (!isEditing) {
  document.addEventListener('keydown', focusInput);
}
