const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const list = document.querySelector(".list-group");
const firstCardbody = document.querySelectorAll(".card-body")[0];
const secondCardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearAll = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){
    form.addEventListener("submit", addTodo);
    //sayfa yuklendiginde loadAllTodosToUI fonks calissin
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardbody.addEventListener("click", deleteTodo);
    filter.addEventListener("keypress", filterTodos);
    clearAll.addEventListener("click", deleteAll);
}

function filterTodos(e){

    const value = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group-item");

    listItem.forEach(function(listitem){
        const item =  listitem.textContent.toLowerCase();
        if(item.indexOf(value) === -1){
            //bulunamadiysa 
            listitem.setAttribute("style", "display:none !important;");
        }
        else{
            listitem.setAttribute("style", "display: block;");
        }

    });

}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoUI(todo);
    });
}
function addTodo(e){
    const newTodo = todoInput.value.trim();
    //trim() bastaki ve sondaki bosluklari sildik
    
    if (newTodo === ""){
        showAlert("danger", "Lutfen bir todo giriniz...");
    }
    else{
    
        showAlert("success", "Todo Ekleme Islemi Basarili ");
        addTodoUI(newTodo);
        addTodoStorage(newTodo);
    
    }
    e.preventDefault();
}

function getTodosFromStorage(){// storagedan butun todolari alir
    
    //varsa todos arrayini al yoksa bos bir sekilde baslat
    let todos;
    if(localStorage.getItem("todos") === null){
        todos=[];
    }  
    else{
        todos  = JSON.parse(localStorage.getItem("todos"));
        //string gelen degerleri arraye atama
    }
    return todos;
}

function addTodoStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type,message){

    const warningDiv = document.createElement("div");
    warningDiv.className = ` alert alert-${type} `;
    warningDiv.textContent = message;
 
    firstCardbody.appendChild(warningDiv);
 
    //hata mesajini gosterme suresi
 
     setTimeout(function(){
        warningDiv.remove();
     },1500);
     
 }

function addTodoUI(newTodo){ // aldigi string degeri list item olarak ekler

    // <!-- <li class="list-group-item d-flex justify-content-between">
    //     Todo 1
    //     <a href = "#" class ="delete-item">
    //     <i class = "fa fa-remove" onclick="deleteTodo()"></i>
    //     </a>
    
    // </li> -->


    // list item olusturma
    const listItem = document.createElement("li");
    //link olusturma
    const link = document.createElement("a");

    link.href = "#";
    link.className ="delete-item";
    link.innerHTML = "<i class ='fa fa-remove'></i>";
    link.onclick = deleteTodo;

    listItem.className ="list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    list.appendChild(listItem);
    
    todoInput.value = "";
    // her bir item eklendikten sonra bir to do girin alani bosalsin
    
}


function deleteTodo(e){
    if(e.target.className ==='fa fa-remove'){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        //showAlert("success", "silme islemi basariyle tamamlandi");
    }
        
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1);//arrayden deger silme
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteAll(e){
    //arayuzden list itemlari kaldirma
    if (confirm("tumunu silmek istediginize emin misiniz ?")){
        list.innerHTML = "";
    }

}




