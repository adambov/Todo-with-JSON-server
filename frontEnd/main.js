const url = "http://localhost:3000/todos";


function addTodo(todo) {
    //remove the default refresh of the submit button
    todo.preventDefault();

    singleTodoValue = dom.input.value;

    dom.input.value = '';
    addTodoOnServer(url, singleTodoValue);

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
        // console.log(todos);
    });
}

function addTodoOnServer(url, title) {
    // console.log('addTodoOnServer');
    const newTodo = {
        "title": title,
        "completed": false
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers:{
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    .then((r)=> r.json())
    .then((data) => {
        dom.todos.push(data);
        // render(todos);
    })
}

function delTodoOnServerFetch(url) {
    fetch(url, {
        method: 'DELETE',
        //find out how to delete certain todo?
    })
    }
   
function checkBtnfetch(url) {
    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
            completed: true
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
  .then((response) => response.json())
  .then((data) => console.log(data));
}

function render(todos) {
    // dom.input.innerHTML = '';
    todos.forEach(todo => {
        dom.todos.innerHTML += `
        <li data = "${todo.id}">${todo.id}. &nbsp;
        <span>${todo.title}</span>
        <span><button><i class="fa-solid fa-check"></i></button>
        <button><i class="fas fa-trash"></i></button></span></li>`
    });
}

const dom = {
    input : document.querySelector('input'),
    addBtn : document.querySelector('.addBtn'),
    todos : document.querySelector('.todos'),
};



dom.addBtn.addEventListener('click', addTodo);
dom.todos.addEventListener('click', function(e) {
    console.log(e.target);
    if(e.target.classList.contains('fa-check')){
        // console.log(`Check btn was clicked`);
        checkBtnfetch(url);
    }else if(e.target.classList.contains('fa-trash')){
        // console.log(`Trash btn was clicked`);
        delTodoOnServerFetch(url);
    }
})

fetchTodos(url);


// to check how to attach ID to the check button
