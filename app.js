//vanilla javascript todolist practice by owynn
//thanks to deved@youtube for the awesome tutorial!

// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos); //whenever HTML is loaded, getTodos (get local save data, like a game!)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event){
    event.preventDefault(); //disable the auto-refresh after clicking add button

    //create div with todo class
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li wih hey class
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; //set todo text = textbox
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo); //add this li element to div's child -- hence the appendChild

    //add todo list to local storage/db
    saveLocalTodos(todoInput.value);

    //create complete/checkmark button for finished todo
    const completedButton = document.createElement("button"); //create button for checkmark/complete list todo
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn"); //add complete-btn class to the button
    todoDiv.appendChild(completedButton); //add this button element to div's child -- hence the appendChild
    
    //create delete/trash button for finished todo
    const trashButton = document.createElement("button"); //create button for checkmark/complete list todo
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //use innerHTML instead of innerText because we need to input HTML code, not text/string
    trashButton.classList.add("trash-btn"); //add trash-btn class to the button
    todoDiv.appendChild(trashButton); //add this button element to div's child -- hence the appendChild

    //add to list / append to list / add above codes to HTML
    todoList.appendChild(todoDiv);

    //clear the textbox after pressing enter or inputting
    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target; //our event listener target

    //delete todo item function
    if(item.classList[0] === 'trash-btn'){ //if we click on element that has class of .trash-btn then...
        const todo = item.parentElement; //set todo to .trash-btn parent element, which is an element with .todo class
        todo.classList.add("remove-todo-item"); //add CSS animation for deletin todo item
        removeLocalTodos(todo); //call the function to remove todo item and save it to local storage
        todo.addEventListener('transitionend', function(){ //eventListener that allows it to wait for the CSS transition to end then...
            todo.remove(); //...then remove an element with .todo class
        })
    }

    //completed todo item function
    if(item.classList[0] === 'complete-btn'){ //if we click on element that has class of .complete-btn then...
        const todo = item.parentElement; //set todo to .complete-btn parent element, which is an element with .todo class
        todo.classList.toggle("completed-todo-item"); //...then toggle (means:clickable) a new class to the element that allows us to style this element in CSS later on
    }
}

function filterTodo(event){
    const todos = todoList.childNodes; //set todos to all child/options inside the .todo-list element (which is our todo items)
    todos.forEach(function(todo){ //loop function, for each todo-item
        switch(event.target.value){ //switch between the value, loop function
            case "all": //if value for filter is all
                todo.style.display = 'flex'; //show all, nothing changes
                break;
            case "completed": //if value is completed
                if(todo.classList.contains('completed-todo-item')){ //this is an if function by checking via .completed-todo-item class
                    todo.style.display = 'flex'; //if it contains that class, then displaly like usual
                }else{
                    todo.style.display = 'none'; //if not, then display none (this means that uncompleted todo item will not be shown)
                }
                break; //needed! or else it will not show the completed todo items
            case "uncompleted":
                if(!todo.classList.contains('completed-todo-item')){ //if the todo item doesnt have class of completed-todo-item then...
                    todo.style.display = 'flex'; //show like usual
                }else{
                    todo.style.display = 'none'; //else, dont display
                }
                break;
        }
    })
} 

function saveLocalTodos(todo){ //save todo items to database
    //checker -- do we already have any todos in the database?
    let todos;
    if(localStorage.getItem('todos') === null){ //if todos = null/not avail. then...
        todos = []; //we create a new array
    }else{
        todos = JSON.parse(localStorage.getItem('todos')); //if it EXISTS then we use JSON function to parse the .todos!
    }
    todos.push(todo); //then we push it to todo
    localStorage.setItem('todos', JSON.stringify(todos)); //saving the todos item to local storage with json.stringify
}

function getTodos(){ //loading ouor todos file
    let todos;
    if(localStorage.getItem('todos') === null){ //if todos = null/not avail. then...
        todos = []; //we create a new array
    }else{
        todos = JSON.parse(localStorage.getItem('todos')); //if it EXISTS then we use JSON function to parse the .todos!
    }
    todos.forEach(function(todo){ //for every todo item, we will need to display them (function below is same as above)
        //create div with todo class
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //create li wih hey class
        const newTodo = document.createElement("li");
        newTodo.innerText = todo; //set todo text = textbox
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo); //add this li element to div's child -- hence the appendChild

        //create complete/checkmark button for finished todo
        const completedButton = document.createElement("button"); //create button for checkmark/complete list todo
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn"); //add complete-btn class to the button
        todoDiv.appendChild(completedButton); //add this button element to div's child -- hence the appendChild
        
        //create delete/trash button for finished todo
        const trashButton = document.createElement("button"); //create button for checkmark/complete list todo
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //use innerHTML instead of innerText because we need to input HTML code, not text/string
        trashButton.classList.add("trash-btn"); //add trash-btn class to the button
        todoDiv.appendChild(trashButton); //add this button element to div's child -- hence the appendChild

        //add to list / append to list / add above codes to HTML
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){ //if todos = null/not avail. then...
        todos = []; //we create a new array
    }else{
        todos = JSON.parse(localStorage.getItem('todos')); //if it EXISTS then we use JSON function to parse the .todos!
    }

    const todoIndex = todo.children[0].innerText; //set todoIndex to the todo item
    todos.splice(todos.indexOf(todoIndex), 1) //split function, todos.indexOf(todoIndex) = from what array position do we want to delete the todo item?; 1 = how many item do we want to delete, in this scase, 1
    localStorage.setItem("todos", JSON.stringify(todos)); //after we delete them, we need to save them to local storage
}