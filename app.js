const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMsg = document.getElementById('empty-msg');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('done');

    const checkBtn = document.createElement('button');
    checkBtn.className = 'check-btn';
    checkBtn.title = 'Mark complete';
    checkBtn.addEventListener('click', () => {
      todos[index].done = !todos[index].done;
      save();
      render();
    });

    const span = document.createElement('span');
    span.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      save();
      render();
    });

    li.append(checkBtn, span, deleteBtn);
    list.appendChild(li);
  });

  emptyMsg.style.display = todos.length === 0 ? 'block' : 'none';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  save();
  render();
  input.value = '';
  input.focus();
});

render();
