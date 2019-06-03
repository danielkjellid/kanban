
//function for adding task directly from list. Destination is specifed by element ID
function addTaskFromList(destination) {

    //function for activating modal. 
    function activateModal() {
        var modal = document.querySelector('.modal');  // only works with a single modal
        var html = document.querySelector('html');
        modal.classList.add('is-active');
        html.classList.add('is-clipped');
    
        modal.querySelector('.modal-background').addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.remove('is-active');
                html.classList.remove('is-clipped');
        });
    }

    //conditional check for destination, and selecting appropriate option as default in the form
    if (destination == "list-to-do") {
        let getSelectItem = document.getElementById("select-to-do");
        getSelectItem.setAttribute("selected", "selected");
        activateModal();
    } else if (destination == "list-in-progress") {
        let getSelectItem = document.getElementById("select-in-progress");
        getSelectItem.setAttribute("selected", "selected");
        activateModal();
    } else if (destination == "list-done") {
        let getSelectItem = document.getElementById("select-done");
        getSelectItem.setAttribute("selected", "selected");
        activateModal();
    } else {
        console.error("There was an error finding the selected destination.");
    }
}

//function for adding task in general. Fired when form is submitted.
function addTask() {

    //variables for getting all of the user values inputed in the form
    let titleInput = document.getElementById("modal-add-new-task-title").value;
    let statusInput = document.getElementById("modal-add-new-task-status").value.toLowerCase();
    let tagInput = document.getElementById("modal-add-new-task-tag").value;
    let dueDateInput = document.getElementById("modal-add-new-task-dueDate").value;
    let descInput = document.getElementById("modal-add-new-task-desc").value;
    let assigneeInput = document.getElementById("modal-add-new-task-assignee").value;
    let getMemberInitials = findMemberInitials(document.getElementById("modal-add-new-task-assignee").value);
    let getTagColor = findTagColor(document.getElementById("modal-add-new-task-tag").value);
    let getTagTextColor = findTagTextColor(document.getElementById("modal-add-new-task-tag").value);

    //since we're trying to add to the database after the initial connect, we
    //need to open a new connection.

    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 17), 
    db,
    tx,
    store,
    index;

    //error handler on connection
    request.onerror = function(e) {
        console.error("There was an error opening the database: " + e.target.errorCode);
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
        
        //define array for adding object to the database
        let newTask = [{
            title: titleInput,
            status: statusInput,
            dueDate: dueDateInput,
            description: descInput,
            memberFullName: assigneeInput,
            memberInitials: getMemberInitials,
            tagName: tagInput,
            tagColor: getTagColor,
            tagTextColor: getTagTextColor
        }];

        //adding the task itself
        let addNewTask = tasksStore.add(newTask[0]);

        //error handler on adding task
        addNewTask.onerror = function(e) {
            console.error("Therre was an error adding task " + e.target.errorCode);
        }

        //success handler on adding task
        addNewTask.onsuccess = function() {
            console.log("Added task to database");
            
        }

        //close database after transaction is complete
        tasksTx.oncomplete = function() {
            db.close();
        }
    }
}



//list functions
function listTasks() {
    //variable for counting objects in the index
    let amountOfTasks = tasksStore.count();

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

                    if (document.getElementById("list-archived")) {
                        let getCardContainer = document.getElementById("list-archived");
                        let createCard = addCard(getTasks.result.taskID, getTasks.result.title, getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagName, getTasks.result.tagColor, getTasks.result.tagTextColor);

                        getCardContainer.appendChild(createCard);
                    } else {
                        //nothing
                    }
                }
            }
        }   
    }
}

function archiveTasks() {
    //since we're trying to add to the database after the initial connect, we
    //need to open a new connection.

    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 17), 
    db,
    tx,
    store,
    index;

    //error handler on connection
    request.onerror = function(e) {
        console.error("There was an error opening the database: " + e.target.errorCode);
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
        
        let amountOfDoneTasks = tasksIndex.count("done");

        amountOfDoneTasks.onerror = function(e) {
            console.error("There was an error getting all done tasks: " + e.target.errorCode);
        }

        amountOfDoneTasks.onsuccess = function() {
            //function stops here
            for (var i = 0; i < amountOfDoneTasks.result; i++) {
                let getTasks = tasksIndex.get("done");

                getTasks.onerror = function() {
                    console.error("There was an error looping through the tasks index");
                }

                getTasks.onsuccess = function(e) {
                    let data = e.target.result;
                    data.status = "archived";

                    let requestUpdate = tasksStore.put(data);

                    requestUpdate.onerror = function() {
                        console.error("There was an error updateing done entries " + e.target.errorCode);
                    }

                    requestUpdate.onsuccess = function() {
                        let getTaskContainer = document.getElementById("list-done");
                        
                        while (getTaskContainer.firstChild) {
                            getTaskContainer.removeChild(getTaskContainer.firstChild);
                        }

                        console.log("Successfully archived tasks");
                    }
                }
            }
        }


        //close database after transaction is complete
        tasksTx.oncomplete = function() {
            db.close();
        }
    }
}

function changeTaskStatus(id, list) {
    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 17), 
    db,
    tx,
    store,
    index;

    //error handler on connection
    request.onerror = function(e) {
        console.error("There was an error opening the database: " + e.target.errorCode);
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

        let getTask = tasksStore.get(id);

        getTask.onerror = function() {
            console.error("There was an error getting the dropped task");
        }

        getTask.onsuccess = function(e) {
            let data = e.target.result;

            if (list == "list-to-do") {
                data.status = "to-do";
            } else if (list == "list-in-progress") {
                data.status = "in-progress";
            } else if (list == "list-done") {
                data.status = "done";
            } else {
                console.error("List not found")
            }
            
            let requestUpdate = tasksStore.put(data);

            requestUpdate.onerror = function() {
                console.error("There was an error updating the status of the dropped task")
            }

            requestUpdate.onsuccess = function() {
                console.log("Dropped task's status updated successfully");
            }
        }

        //close database after transaction is complete
        tasksTx.oncomplete = function() {
            db.close();
        }
    }
}
