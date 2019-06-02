
function addTask() {

    let titleInput = document.getElementById("modal-add-new-task-title").value;
    let statusInput = document.getElementById("modal-add-new-task-status").value;
    let tagInput = document.getElementById("modal-add-new-task-tag").value;
    let dueDateInput = document.getElementById("modal-add-new-task-dueDate").value;
    let descInput = document.getElementById("modal-add-new-task-desc").value;
    let assigneeInput = document.getElementById("modal-add-new-task-assignee").value;
    let getMemberInitials = findMemberInitials(document.getElementById("modal-add-new-task-assignee").value);
    let getTagColor = findTagColor(document.getElementById("modal-add-new-task-tag").value);
    let getTagTextColor = findTagTextColor(document.getElementById("modal-add-new-task-tag").value);

    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 13), 
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
        db = request.result;

        //define transaction, store and index
        tasksTx = db.transaction("tasksStore", "readwrite");
        tasksStore = tasksTx.objectStore("tasksStore");
        tasksIndex = tasksStore.index("status");

        //error handler on result of the request
        db.onerror = function(e) {
            console.log("ERROR " + e.target.errorCode);
        }
    
        let newTask = [{
            title: titleInput,
            stauts: statusInput,
            dueDate: dueDateInput,
            description: descInput,
            memberFullName: assigneeInput,
            memberInitials: getMemberInitials,
            tagName: tagInput,
            tagColor: getTagColor,
            tagTextColor: getTagTextColor
        }];

        let addNewTask = tasksStore.add(newTask[0]);

        addNewTask.onerror = function(e) {
            console.error("Therre was an error adding task " + e.target.errorCode);
        }

        addNewTask.onsuccess = function() {
            console.log("Added task to database");
        }
    }
}


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
