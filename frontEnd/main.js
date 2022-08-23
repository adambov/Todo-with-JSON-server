function addTodo(todo) {
    //remove the default refresh of the submit button
    todo.preventDefault();

    singleTodoValue = dom.input.value;

    dom.input.value = '';
    addTodoOnServer(url + '/todos', singleTodoValue);

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
    // console.log('addTodoOnServer');
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
        dom.todos.push(data);
        // render(todos);
    })
}

function delTodoOnServerFetch(url) {
    fetch(url, {
        method: 'DELETE',
        headers:{"Content-Type":"application/json"}
    })
    .then(r=> r.json())
    .then(data => {
        dom.todos.remove(data);
    });
    // must check what is the response - see if the request is ok
    // return the current data from the server - rendered
}

function checkBtnfetch(url) {
    fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
            // "id": id,
            "title": title,
            "completed": true,
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


const url = "http://localhost:3000";

dom.addBtn.addEventListener('click', addTodo);
dom.todos.addEventListener('click', function(e) {
    console.log(e.target);
    if(e.target.classList.contains('fa-check')){
        console.log(`Check btn was clicked`);
    }else if(e.target.classList.contains('fa-trash')){
        console.log(`Trash btn was clicked`);
    }
})

fetchTodos(url + '/todos');


// to check how to attach ID to the check button
