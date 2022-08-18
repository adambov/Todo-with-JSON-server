const dom = {
    input : document.querySelector('input'),
    addBtn : document.querySelector('.addBtn'),
    todos : document.querySelector('.todos'),
};

const url = "http://localhost:3000";

dom.addBtn.addEventListener('click', addTodo)

const delBtn = document.createElement('button');
delBtn.innerHTML = '<i class="fas fa-trash"></i>';
delBtn.classList.add("del-btn");

const checkBtn = document.createElement('button');
checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
checkBtn.classList.add("check-btn");

delBtn.addEventListener('click', deleteCheck);
checkBtn.addEventListener('click', deleteCheck);

function deleteCheck(e) {
    
}

function addTodo(todo) {
    //remove the default refresh of the submit button
    todo.preventDefault();
    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");

    // making the click and to show info, +empty input after submit
    // var todo = dom.input.value;
    const singleTodo = document.createElement('li');
    singleTodo.innerText = dom.input.value;
    singleTodo.classList.add('todo-item');
    todoDiv.appendChild(singleTodo);

    todoDiv.appendChild(checkBtn);

    todoDiv.appendChild(delBtn);

    // add/append to the todos div
    dom.todos.appendChild(todoDiv);
        
    addTodoOnServer(url + '/todos', singleTodo.innerText);
    dom.input.value = '';

}

function render(todos) {
    dom.input.innerHTML = '';
    todos.forEach(todo => {
        dom.todos.innerHTML += `
        <li data = "${todo.id}">${todo.id} 
        <span>${todo.title} 
        <button>${checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>'}</button>
        <button>${delBtn.innerHTML = '<i class="fas fa-trash"></i>'}</button></li>`
    });
}


function fetchTodos(url){
	fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    })
    .then (data => {
        todos = data;
        render(todos);
    });
}

function addTodoOnServer(url, title) {
    const newTodo = {
        "title": title,
        "completed": false
    };
    fetch(url, {
        method: 'post',
        body:JSON.stringify(newTodo),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then(r=> r.json())
    .then(data => {
        todos.push(data);
        render(todos);
    })
}

fetchTodos(url + '/todos');

function delTodoOnServerFetch(url) {
    fetch(url, {
        method: 'DELETE',
      });
}

function checkBtnfetch(url) {
    fetch(url, {
  method: 'PATCH',
  body: JSON.stringify({
    // "title": title,
    "completed": true,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data));
}





// const dom = {
//     input : document.querySelector('input'),
//     addBtn : document.querySelector('.addBtn'),
//     todos : document.querySelector('.todos'),
// };

// const url = "http://localhost:3000";


// dom.addBtn.addEventListener("click", function todoVisible(e) {
//         //remove the default refresh of the submit button
//     e.preventDefault();
    
//     const todoDiv = document.createElement("div");
//     todoDiv.classList.add("todoDiv");

//     // making the click and to show info, +empty input after submit
//     // var todo = dom.input.value;
//     const singleTodo = document.createElement('li');
//     singleTodo.innerText = dom.input.value;
//     singleTodo.classList.add('todo-item');
//     todoDiv.appendChild(singleTodo);

//     //check button create
//     const checkBtn = document.createElement('button');
//     checkBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
//     checkBtn.classList.add("check-btn");
//     todoDiv.appendChild(checkBtn);

//     //del button create
//     const delBtn = document.createElement('button');
//     delBtn.innerHTML = '<i class="fas fa-trash"></i>';
//     delBtn.classList.add("del-btn");
//     todoDiv.appendChild(delBtn);

//     // add/append to the todos div
//     dom.todos.appendChild(todoDiv);
    
    
//     addTodoOnServer(url + '/todos', singleTodo.innerText);
//     dom.input.value = '';
// });


// function render(todos) {
//     dom.input.innerHTML = '';
//     todos.forEach(todo => {
//         dom.todos.innerHTML += `
//         <li data = "${todo.id}">${todo.id} <span>${todo.title}</span></li>`
//     });
    
// }


// function fetchTodos(url){
// 	fetch(url)
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//     })
//     .then (data => {
//         todos = data;
//         render(todos);
//     });
// }

// function addTodoOnServer(url, title) {
//     const newTodo = {
//         "title": title,
//         "completed": false
//     };
//     fetch(url, {
//         method: 'post',
//         body:JSON.stringify(newTodo),
//         headers:{
//             "Content-Type":"application/json"
//         }
//     })
//     .then(r=> r.json())
//     .then(data => {
//         todos.push(data);
//         render(todos);
//     })
// }

// fetchTodos(url + '/todos');

// function delTodoOnServer(url) {
//     fetch(url, {
//         method: 'DELETE',
//       });
// }

// function checkBtnfetch(url) {
//     fetch(url, {
//   method: 'PATCH',
//   body: JSON.stringify({
//     // "title": title,
//     "completed": true,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((data) => console.log(data));
// }

// // {<span>${checkBtn}</span> <span>${delBtn}</span>}
// //<li data = "${todo.id}">${todo.id} <span>${todo.title}</span></li>