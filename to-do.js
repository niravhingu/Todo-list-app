const input = document.getElementById("taskinput");
const button = document.getElementById("addbtn");
const list = document.getElementById("tasklist");

input.addEventListener("keypress", function(event){

if(event.key === "Enter"){
button.click();
}

}); 

let tasks = [];

/* PAGE LOAD PE TASK LOAD */

window.onload = function(){

let savedTasks = localStorage.getItem("tasks");

if(savedTasks){

tasks = JSON.parse(savedTasks);

tasks.forEach(function(task){

createTask(task.text , task.done);

});

}

};



/* ADD BUTTON */

button.addEventListener("click", function(){

let taskText = input.value;

if(taskText === "") return;

createTask(taskText , false);

tasks.push({

text:taskText,
done:false

});

saveTasks();

input.value="";

});



/* CREATE TASK ROW */

function createTask(taskText , done){

const tr = document.createElement("tr");

const tdDone = document.createElement("td");
const tdTask = document.createElement("td");
const tdEdit = document.createElement("td");
const tdDelete = document.createElement("td");

const checkbox = document.createElement("input");
checkbox.type="checkbox";
checkbox.checked = done;

tdTask.innerText = taskText;

if(done){

tdTask.style.textDecoration="line-through";

}

checkbox.addEventListener("change",function(){

if(checkbox.checked){

tdTask.style.textDecoration="line-through";

}else{

tdTask.style.textDecoration="none";

}

updateTasks();

});



const editBtn = document.createElement("button");
editBtn.innerText="Edit";
editBtn.className="edit";

editBtn.addEventListener("click",function(){

let newTask = prompt("Edit Task", tdTask.innerText);

if(newTask){

tdTask.innerText = newTask;

updateTasks();

}

});



const deleteBtn = document.createElement("button");
deleteBtn.innerText="Delete";
deleteBtn.className="delete";

deleteBtn.addEventListener("click",function(){

tr.remove();

updateTasks();

});



tdDone.appendChild(checkbox);
tdEdit.appendChild(editBtn);
tdDelete.appendChild(deleteBtn);

tr.appendChild(tdDone);
tr.appendChild(tdTask);
tr.appendChild(tdEdit);
tr.appendChild(tdDelete);

list.appendChild(tr);

}



/* SAVE TASKS */

function saveTasks(){

localStorage.setItem("tasks", JSON.stringify(tasks));

}



/* UPDATE TASK LIST */

function updateTasks(){

tasks=[];

let rows = document.querySelectorAll("#tasklist tr");

rows.forEach(function(row){

let text = row.children[1].innerText;

let done = row.children[0].querySelector("input").checked;

tasks.push({

text:text,
done:done

});

});

saveTasks();

}