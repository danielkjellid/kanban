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
    let request = window.indexedDB.open("KanbanDatabase", 7), 
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
        tasksIndex = tasksStore.index("status");

        //error handler on result of the request
        db.onerror = function(e) {
            console.log("ERROR " + e.target.errorCode);
        }

        //add new task variables to the database
        let newTask = [{
            title: titleInput,
            status: statusInput,
            tags: tagInput,
            dueDate: dueDateInput,
            description: descriptionInput
        }];

        var addNewTask = tasksStore.add(newTask[0]);

        //success handler on adding member to database handler
        addNewTask.onsuccess = function() {
            console.log("Successfully added task to database");
            
            let getTasksElementContainer = document.getElementById("list-tasks");
            let createTasksList = document.createElement("li");
            createTasksList.id = "newMember";
            getTasksElementContainer.appendChild(createTasksList);
            createTasksList.innerHTML = JSON.stringify(newTask);
        }

        tasksTx.oncomplete = function() {
            db.close();
        };
    }
}

//List card function
function listTasks() {
    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 7), 
    db,
    tx,
    store,
    index;

    //error handler on connection
    request.onerror = function(e) {
        console.log("There was en error connecting to the DB: " + e.target.errorCode);
    }

    //success handler on connection
    request.onsuccess = function(e) {
        db = request.result;

        //define transaction, store and index
        tasksTx = db.transaction("tasksStore", "readwrite");
        tasksStore = tasksTx.objectStore("tasksStore");
        tasksIndex = tasksStore.index("status");

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
            //TODO: add destination to the function to be able to list tasks with the specific statuses
            for (var i = 1; i < amountOfTasks.result+1; i++) {
                let getTasks = tasksStore.get(i);

                //listing tasks
                let getTasksElementContainer = document.getElementById("list-tasks");
                let createTasksList = document.createElement("li");
                createTasksList.id = "task-" + i;

                //adding tasks to select for assigning members to tasks
                let getAssignmentElementSelect = document.getElementById("list-available-tasks");
                let createTaskOption = document.createElement("option");
                createTaskOption.id = "task-option-" + i;
                
                getTasks.onerror = function() {
                    console.log("There was an error looping through the tasks");
                }

                getTasks.onsuccess = function() {
                    //listing tasks
                    getTasksElementContainer.appendChild(createTasksList);
                    //JSON stringify to return object in string format, and not [Object object]
                    createTasksList.innerHTML = JSON.stringify(getTasks.result);
                    
                    //adding tasks to select for assigning members to tasks
                    getAssignmentElementSelect.appendChild(createTaskOption);
                    createTaskOption.innerHTML = JSON.stringify("[" + getTasks.result.taskID + "] " + getTasks.result.title);
                    createTaskOption.value = getTasks.result.taskID;
                }
            }   
        }

        tasksTx.oncomplete = function() {
            db.close();
        }
    }
}
