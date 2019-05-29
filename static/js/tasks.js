//add task button function
function createCard() {
    var card = document.createElement('div');
    card.className = "card";

    card.setAttribute('draggable', true);
    addCardListeners(card);
    return card;
}

 function addCard(destination) {
    container = document.getElementById(destination);
    createCard();
    container.appendChild(createCard());
} 

//add task form function
function addTask() {
    //define user input in the addTaskForm
    var titleInput = document.getElementById('task-title').value;
    var statusInput = document.getElementById('task-status').value;
    var tagInput = document.getElementById("task-tag").value;
    var dueDateInput = document.getElementById("task-dueDate").value;
    var descriptionInput = document.getElementById("task-desc").value;

    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 2), 
    db,
    tx,
    store,
    index;

    //error handler on connection
    request.onerror = function(e) {
        console.log("There was en error adding a task: " + e.target.errorCode);
    }

    //success handler on connection
    request.onsuccess = function(e) {
        console.log("Successfully added task to database");
        db = request.result;

        //define transaction, store and index
        tasksTx = db.transaction("tasksStore", "readwrite");
        tasksStore = tasksTx.objectStore("tasksStore");
        tasksIndex = tasksStore.index("title");

        //error handler on result of the request
        db.onerror = function(e) {
            console.log("ERROR " + e.target.errorCode);
        }

        //add new member variables to the database
        let newTask = tasksStore.add({
            title: titleInput,
            status: statusInput,
            tags: tagInput,
            dueDate: dueDateInput,
            description: descriptionInput
        });

        //success handler on adding member to database handler
        newTask.onsuccess = function() {
            console.log(newTask.result);
        }

    }
}

//List card function
function listTask() {
    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 2), 
    db,
    tx,
    store,
    index;

    //error handler on connection
    request.onerror = function(e) {
        console.log("There was en error listing tasks: " + e.target.errorCode);
    }

    //success handler on connection
    request.onsuccess = function(e) {
        console.log("Successfully listed tasks");
        db = request.result;

        //define transaction, store and index
        tasksTx = db.transaction("tasksStore", "readwrite");
        tasksStore = tasksTx.objectStore("tasksStore");
        tasksIndex = tasksStore.index("title", "status");

        //error handler on result of the request
        db.onerror = function(e) {
            console.log("ERROR " + e.target.errorCode);
        }

        //variable for counting objects in the index
        let amountOfTasks = tasksIndex.count();

        //error handler
        amountOfTasks.onerror = function() {
            console.log("There was an error finding the amount of tasks")
        }

        //success handler
        amountOfTasks.onsuccess = function() {
            //console.log("Tasks: " + amountOfTasks.result);
            //TODO: add destination to the function to be able to list tasks with the specific statuses
            for (var i = 0; i < amountOfTasks.result+1; i++) {
                let getTasks = tasksStore.get(i);

                let getTasksElementContainer = document.getElementById("list-tasks");
                let createTasksList = document.createElement("li");
                createTasksList.id = "task-" + i;
                
                getTasks.onerror = function() {
                    console.log("There was an error looping through the tasks")
                }

                getTasks.onsuccess = function() {
                    console.log(getTasks.result);
                    getTasksElementContainer.appendChild(createTasksList);
                    //JSON stringify to return object in string format, and not [Object object]
                    createTasksList.innerHTML = JSON.stringify(getTasks.result);
                }
            }   
        }
    }
}

//handleForm is defined in members.js
//form handler to prevent page from reloading
var addTaskForm = document.getElementById("addTaskForm");
var tasksForm = document.getElementById("tasksForm");

//to prevent page from reloading
addTaskForm.addEventListener('submit', handleForm);
tasksForm.addEventListener('submit', handleForm);