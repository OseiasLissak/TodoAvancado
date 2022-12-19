// Seleção elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelInput = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Funções

const saveTodo = (text) => {
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text
    todo.appendChild(todoTitle);

    console.log(todo)

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-sharp fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todo.appendChild(removeBtn);

    todoList.appendChild(todo)

    todoInput.value = " ";
    todoInput.focus();
}

const toggleForms = (e) => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (editInputValue) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = editInputValue;
        }
    })
}

//Eventos

todoForm.addEventListener("submit",(e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    console.log(inputValue)

    if(inputValue){
        saveTodo(inputValue)
    }
})

document.addEventListener("click", (e)=> {
    const targetEl = e.target   //elemento clicado
    const parentEl = targetEl.closest("div"); //selecionou o elemento pai "div" mais próximo = "todo"
    let todoTitle;
    
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }


    //FINALIZAR TAREFA
    if(targetEl.classList.contains("finish-todo")){  // se contem a classe "finish-todo"
        parentEl.classList.toggle("done");
    }

    //EDITAR TAREFA
    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    //DELETAR TAREFA
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }                

})

// CANCELA EDIÇÃO
cancelInput.addEventListener("click", (e) => {
    todoForm();
});

editForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    const editInputValue = editInput.value;

    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms();
})
