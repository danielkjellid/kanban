
//function for adding task directly from list. Destination is specifed by element ID
function addTaskFromList(destination) {

    //conditional check for destination, and selecting appropriate option as default in the form
    if (destination == "list-to-do") {
        let getSelectItem = document.getElementById("select-to-do");
        getSelectItem.setAttribute("selected", "selected");
        activateModal("add-new-modal");
    } else if (destination == "list-in-progress") {
        let getSelectItem = document.getElementById("select-in-progress");
        getSelectItem.setAttribute("selected", "selected");
        activateModal("add-new-modal");
    } else if (destination == "list-done") {
        let getSelectItem = document.getElementById("select-done");
        getSelectItem.setAttribute("selected", "selected");
        activateModal("add-new-modal");
    } else {
        //error handler
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
    let assigneeInput = document.getElementById("modal-add-new-task-member").value;
    let getMemberInitials = findMemberInitials(document.getElementById("modal-add-new-task-member").value);
    let getTagColor = findTagColor(document.getElementById("modal-add-new-task-tag").value);
    let getTagTextColor = findTagTextColor(document.getElementById("modal-add-new-task-tag").value);

    //since we're trying to add to the database after the initial connect, we
    //need to open a new connection.

    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 19), 
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

        //adding the task itself to the database
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



//list task function
function listTasks() {
    
    //variable for counting objects in the store
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

            //error handler when looping through tasks
            getTasks.onerror = function() {
                console.error("There was an error looping through the tasks");
            }

            //success handler
            getTasks.onsuccess = function() {
                //get approrpriate list from element, and append cards using the addCard function defined in misc.js
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

function listArchivedTasks() {

    //variable for counting obejcts in the storee
    let amountOfTasks = tasksStore.count();

    //error handler for counting objects
    amountOfTasks.onerror = function() {
        console.error("There was an error finding the amount of archived tasks.");
    }

    //success handler for counting objects
    amountOfTasks.onsuccess = function() {
        
        //i starts at 1 because the key in the store starts at 1
        for (var i = 1; i < amountOfTasks.result+1; i++) {
            let getTasks = tasksStore.get(i);

            //error handler for looping through tasks
            getTasks.onerror = function() {
                console.error("There was an error looping through the tasks");
            }

            //success handler for looping through tasks.
            getTasks.onsuccess = function() {
                //since we're only listing archived functions, we find status based on condition
                if (getTasks.result.status == "archived") {
                    let getCardContainer = document.getElementById("list-archived");
                    let createCard = addArchivedCard(getTasks.result.taskID, getTasks.result.title, getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagName, getTasks.result.tagColor, getTasks.result.tagTextColor);

                    getCardContainer.appendChild(createCard);
                }
            }
        }
    }
}

//function for archiving entire "done" list at once
function archiveTasks() {

    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 19), 
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

        //variable for counting objects in store
        let amountOfTasks = tasksStore.count()

        //success handler for getting amount of objects
        amountOfTasks.onerror = function() {
            console.error("There was an error finding the amount of tasks");
        }

        //success handler for getting amount of objects
        amountOfTasks.onsuccess = function() {

            //i starts at 1 because the key in the store starts at 1
            for (var i = 1; i < amountOfTasks.result+1; i++) {
                let getTasks = tasksStore.get(i);
                
                //error handler for looping through tasks
                getTasks.onerror = function() {
                    console.error("There was an error looping through the tasks");
                }
                
                //success handler for looping through tasks
                getTasks.onsuccess = function(e) {
                    //get taks with status done
                    if (getTasks.result.status == "done") {
                        
                        let data = e.target.result;

                        //set status to "archived"
                        data.status = "archived";

                        //replacing current data in store with new
                        let requestUpdate = tasksStore.put(data);

                        //error handler for replacing data
                        requestUpdate.onerror = function() {
                            console.error("There was an error archiving the task");
                        }

                        //success handler for replacing data
                        requestUpdate.onsuccess = function() {
                            //function for removing DOM items from done list
                            deleteDoneList();
                            console.log("Successfully archived tasks");
                        }
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

//function for chanding the status when a card is moved to a new list
function changeTaskStatus(id, list) {
    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 19), 
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

        //get data-taskid of card dropped
        let getTask = tasksStore.get(id);

        //error handler for getting data-taskid
        getTask.onerror = function() {
            console.error("There was an error getting the dropped task");
        }

        //success handler for getting data-taskid
        getTask.onsuccess = function(e) {
            let data = e.target.result;

            //change status based on parent element's id
            if (list == "list-to-do") {
                data.status = "to-do";
            } else if (list == "list-in-progress") {
                data.status = "in-progress";
            } else if (list == "list-done") {
                data.status = "done";
            } else {
                console.error("List not found")
            }
            
            //update the object in the database
            let requestUpdate = tasksStore.put(data);

            //error handler for updating object
            requestUpdate.onerror = function() {
                console.error("There was an error updating the status of the dropped task");
            }

            //success handler for updating object
            requestUpdate.onsuccess = function() {
                console.log("Dropped task's status updated successfully");
                //update and delete functions for DOM elements
                progressBar();
                deleteDueList();
                listUpcomingDue();
                deleteOverDueNotifications();
            }
        }

        //close database after transaction is complete
        tasksTx.oncomplete = function() {
            db.close();
        }
    }
}

//function for listing upcoming due tasks
function listUpcomingDue() {
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

            //error handler for looping through tasks
            getTasks.onerror = function() {
                console.error("There was an error looping through the tasks");
            }

            //success handler for looping through tasks
            getTasks.onsuccess = function() {
                //check if tasks have status done or archived
                if (getTasks.result.status == "done" || getTasks.result.status == "archived") {
                    //do nothing as tasks with status done and archived is finished
                } else {
                    //variables for getting todays date to seprate upcoming due dates, and expired due dates
                    let now = new Date();
                    let day = ("0" + now.getDate()).slice(-2);
                    let month = ("0" + (now.getMonth() + 1)).slice(-2);
                    let today = now.getFullYear() + "-" + (month) + "-" + (day);
                    
                    //list upcoming due dates
                    if (today < getTasks.result.dueDate) {
                        //function for adding upcoming due date card
                        addDueCard(getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagColor, getTasks.result.title);
                    
                    //list expired due dates
                    } else {
                        //function for adding expired due date cards and banner
                        addDueCardExpired(getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagColor, getTasks.result.title);
                        overDueBanner("Task overdue!", getTasks.result.title)
                    }
                }
            }
        }   
    }
}

//function for editing existing task
function editTask(id) {
  
     //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 19), 
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

        //get data-taskid of card dropped
        let getTask = tasksStore.get(id);

        //error handler for getting data-taskid
        getTask.onerror = function() {
            console.error("There was an erro getting ID of dropped task.")
        }

        //success handler for getting data-taskid
        getTask.onsuccess = function(e) {

            //variables for getting input fields
            let titleInput = document.getElementById("modal-edit-task-title").value;
            let statusInput = document.getElementById("modal-edit-task-status").value.toLowerCase();
            let tagInput = document.getElementById("modal-edit-task-tag").value;
            let dueDateInput = document.getElementById("modal-edit-task-dueDate").value;
            let descInput = document.getElementById("modal-edit-task-desc").value;
            let assigneeInput = document.getElementById("modal-edit-task-member").value;
            let getMemberInitials = findMemberInitials(document.getElementById("modal-edit-task-member").value);
            let getTagColor = findTagColor(document.getElementById("modal-edit-task-tag").value);
            let getTagTextColor = findTagTextColor(document.getElementById("modal-edit-task-tag").value);

            //variable for getting target data
            let data = e.target.result;

            //replace existing object with new information from edit modal
            data.title = titleInput;
            data.status = statusInput;
            data.dueDate = dueDateInput;
            data.description = descInput;
            data.memberFullName = assigneeInput;
            data.memberInitials = getMemberInitials;
            data.tagName = tagInput;
            data.tagColor = getTagColor;
            data.tagTextColor = getTagTextColor;
            
            //variable for actually replacing the data in the database
            let updateTask = tasksStore.put(data);

            //error handler for replacing data
            updateTask.onerror = function() {
                console.error("There was an error updating the task");
            }

            //success handleer for replacing data
            updateTask.onsuccess = function() {
                console.log("Updated task successfully");
            }
        }

        //close database after transaction is complete
        tasksTx.oncomplete = function() {
            db.close();
        }
    }
}
