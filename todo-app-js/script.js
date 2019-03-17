const form = document.getElementById('form');
const input = document.getElementById('input');
const todos = document.getElementById('todos');

const todosLs = JSON.parse(localStorage.getItem('todos'))

if(todosLs) {
  todosLs.forEach(todoLs => {
    addTodo(todoLs)
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  addTodo()
})

function addTodo(todoLs) {
  let todoText = input.value;

  if (todoLs) {
    todoText = todoLs.text;
  } 

  if(todoText) {
    const todoElement = document.createElement('li');

    if (todoLs && todoLs.completed) {
      todoElement.classList.add('completed')
    }

    todoElement.innerText = todoText;

    todoElement.addEventListener('click', () => {
      todoElement.classList.toggle('completed')

      updateLs()
    })

    todoElement.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      
      todoElement.remove()

      updateLs()
    })

    todos.appendChild(todoElement);

    input.value = ''    
  
    updateLs()
  }
  
}

  

function updateLs() {
  const todosElement = document.querySelectorAll('li')

  const todos = []

  todosElement.forEach(todoElement => {
    todos.push({
      text: todoElement.innerText,
      completed:todoElement.classList.contains('completed')
    })
  })

  localStorage.setItem('todos', JSON.stringify(todos))
}