
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

function listArchivedTasks() {

    let amountOfTasks = tasksStore.count();

    amountOfTasks.onerror = function() {
        console.error("There was an error finding the amount of archived tasks.");
    }

    amountOfTasks.onsuccess = function() {
        
        for (var i = 1; i < amountOfTasks.result+1; i++) {
            let getTasks = tasksStore.get(i);

            getTasks.onerror = function() {
                console.error("There was an error looping through the tasks");
            }

            getTasks.onsuccess = function() {
                if (getTasks.result.status == "archived") {
                    let getCardContainer = document.getElementById("list-to-do");
                    let createCard = addArchivedCard(getTasks.result.taskID, getTasks.result.title, getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagName, getTasks.result.tagColor, getTasks.result.tagTextColor);

                    getCardContainer.appendChild(createCard);
                }
            }
        }
    }
}

//function for archiving an entire list at once
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

        let amountOfTasks = tasksStore.count()

        amountOfTasks.onerror = function() {
            console.error("There was an error finding the amount of tasks");
        }

        amountOfTasks.onsuccess = function() {

            for (var i = 1; i < amountOfTasks.result+1; i++) {
                let getTasks = tasksStore.get(i);
    
                getTasks.onerror = function() {
                    console.error("There was an error looping through the tasks");
                }
    
                getTasks.onsuccess = function(e) {
                    if (getTasks.result.status == "done") {
                        
                        let data = e.target.result;

                        data.status = "archived";

                        let requestUpdate = tasksStore.put(data);

                        requestUpdate.onerror = function() {
                            console.error("There was an error archiving the task");
                        }

                        requestUpdate.onsuccess = function() {
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
                progressBar();
                deleteDueList();
                listUpcomingDue();
            }
        }

        //close database after transaction is complete
        tasksTx.oncomplete = function() {
            db.close();
        }
    }
}

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

            getTasks.onerror = function() {
                console.error("There was an error looping through the tasks");
            }

            getTasks.onsuccess = function() {
                if (getTasks.result.status == "done" || getTasks.result.status == "archived") {
                
                } else {
                    let now = new Date();
                    let day = ("0" + now.getDate()).slice(-2);
                    let month = ("0" + (now.getMonth() + 1)).slice(-2);
                    let today = now.getFullYear() + "-" + (month) + "-" + (day);
                    
                    if (today < getTasks.result.dueDate) {
                        addDueCard(getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagColor, getTasks.result.title);
            
                    } else {
                        addDueCardExpired(getTasks.result.dueDate, getTasks.result.memberFullName, getTasks.result.tagColor, getTasks.result.title);
                    }
                }
            }
        }   
    }
}

function openEditModal() {

    let getTaskID = parseInt(this.getAttribute("data-taskid"));
    let getModal = document.getElementById("edit-modal");

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
         let getTask = tasksStore.get(getTaskID);
 
         //error handler for getting data-taskid
         getTask.onerror = function() {
             //error
         }
 
         //success handler for getting data-taskid
         getTask.onsuccess = function(e) {
 
             //variables for displaying correct information in the modal
            let getTitleInput = document.getElementById("modal-edit-task-title");
            getTitleInput.setAttribute("value", getTask.result.title);

            if (getTask.result.status == "to-do") {
                let getStatusSelectItem = document.getElementById("select-" + getTask.result.status);
                getStatusSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.status = "in-progress") {
                let getStatusSelectItem = document.getElementById("select-" + getTask.result.status);
                getStatusSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.status == "done") {
                let getStatusSelectItem = document.getElementById("select-" + getTask.result.status);
                getStatusSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.status == "archived") {
                let getStatusSelectItem = document.getElementById("select-" + getTask.result.status);
                getStatusSelectItem.setAttribute("selected", "selected");
            }

            if (getTask.result.tagName.toLowerCase() == "plan") {
                let getTagSelectItem = document.getElementById("edit-tag-" + getTask.result.tagName.toLowerCase());
                getTagSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.tagName == "activity") {
                let getTagSelectItem = document.getElementById("edit-tag-" + getTask.result.tagName.toLowerCase());
                getTagSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.tagName.toLowerCase() == "some") {
                let getTagSelectItem = document.getElementById("edit-tag-" + getTask.result.tagName.toLowerCase());
                getTagSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.tagName.toLowerCase() == "campaign") {
                let getTagSelectItem = document.getElementById("edit-tag-" + getTask.result.tagName.toLowerCase());
                getTagSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.tagName.toLowerCase() == "pr") {
                let getTagSelectItem = document.getElementById("edit-tag-" + getTask.result.tagName.toLowerCase());
                getTagSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.tagName.toLowerCase() == "goal") {
                let getTagSelectItem = document.getElementById("edit-tag-" + getTask.result.tagName.toLowerCase());
                getTagSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.tagName.toLowerCase() == "content") {
                let getTagSelectItem = document.getElementById("edit-tag-" + getTask.result.tagName.toLowerCase());
                getTagSelectItem.setAttribute("selected", "selected");
            }

            let getDueDateInput = document.getElementById("modal-edit-task-dueDate");

            getDueDateInput.value = getTask.result.dueDate;

            let getDescInput = document.getElementById("modal-edit-task-desc");

            getDescInput.innerHTML = getTask.result.description;
            
            if (getTask.result.memberInitials.toLowerCase() == "dk") {
                let getAssigneeSelectItem = document.getElementById("edit-member-" + getTask.result.memberInitials.toLowerCase());
                getAssigneeSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.memberInitials.toLowerCase() == "kz") {
                let getAssigneeSelectItem = document.getElementById("edit-member-" + getTask.result.memberInitials.toLowerCase());
                getAssigneeSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.memberInitials.toLowerCase() == "lf") {
                let getAssigneeSelectItem = document.getElementById("edit-member-" + getTask.result.memberInitials.toLowerCase());
                getAssigneeSelectItem.setAttribute("selected", "selected");
            } else if (ggetTask.result.memberInitials.toLowerCase() == "md") {
                let getAssigneeSelectItem = document.getElementById("edit-member-" + getTask.result.memberInitials.toLowerCase());
                getAssigneeSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.memberInitials.toLowerCase() == "sk") {
                let getAssigneeSelectItem = document.getElementById("edit-member-" + getTask.result.memberInitials.toLowerCase());
                getAssigneeSelectItem.setAttribute("selected", "selected");
            }

            activateModal("edit-modal");

            getModal.addEventListener("submit", function() {
                editTask(getTaskID);
            }); 
         }
 
         //close database after transaction is complete
         tasksTx.oncomplete = function() {
             db.close();
         }
     }

}

function editTask(id) {
    //let card = document.querySelectorAll(".action-btn");
  
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
            //error
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

            let data = e.target.result;

            data.title = titleInput;
            data.status = statusInput;
            data.dueDate = dueDateInput;
            data.description = descInput;
            data.memberFullName = assigneeInput;
            data.memberInitials = getMemberInitials;
            data.tagName = tagInput;
            data.tagColor = getTagColor;
            data.tagTextColor = getTagTextColor;
            

            let updateTask = tasksStore.put(data);

            updateTask.onerror = function() {
                console.error("There was an error updating the task");
            }

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
