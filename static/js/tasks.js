
//add task form function
/*
function addTask() {
    //define user input in the addTaskForm
    var titleInput = document.getElementById("task-title").value;
    var statusInput = document.getElementById("task-status").value;
    var tagInput = document.getElementById("task-tag").value;
    var dueDateInput = document.getElementById("task-dueDate").value;
    var descriptionInput = document.getElementById("task-desc").value;

    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 9), 
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
}*/

//list functions
function listTasks() {
    //variable for counting objects in the index
    let amountOfTasks = tasksIndex.count();

    //error handler
    amountOfTasks.onerror = function() {
        console.error("There was an error finding the amount of tasks");
    }

    //success handler
    amountOfTasks.onsuccess = function() {
        //i starts at 1 because the key in the store starts at 1
        for (var i = 1; i < amountOfTasks.result+1; i++) {
            let getTasks = tasksStore.get(i);

            getTasks.onerror = function() {
                console.error("There was an error looping through the tasks");
            }

            getTasks.onsuccess = function() {
                if (getTasks.result.status == "to-do") {
                    let getCardContainer = document.getElementById("list-to-do");
                    let createCard = addCard(getTasks.result.taskID, getTasks.result.title, getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagName, getTasks.result.tagColor, getTasks.result.tagTextColor);

                    getCardContainer.appendChild(createCard);
                } else if (getTasks.result.status == "in-progress") {
                    let getCardContainer = document.getElementById("list-in-progress");
                    let createCard = addCard(getTasks.result.taskID, getTasks.result.title, getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagName, getTasks.result.tagColor, getTasks.result.tagTextColor);

                    getCardContainer.appendChild(createCard);
                } else if (getTasks.result.status == "done") {
                    let getCardContainer = document.getElementById("list-done");
                    let createCard = addCard(getTasks.result.taskID, getTasks.result.title, getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagName, getTasks.result.tagColor, getTasks.result.tagTextColor);

                    getCardContainer.appendChild(createCard);
                } else if (getTasks.result.status == "archived") {
                    let getCardContainer = document.getElementById("list-archived");
                    let createCard = addCard(getTasks.result.taskID, getTasks.result.title, getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagName, getTasks.result.tagColor, getTasks.result.tagTextColor);

                    getCardContainer.appendChild(createCard);
                }
            }
        }   
    }
}
