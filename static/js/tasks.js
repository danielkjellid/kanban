//add member function
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

//handleForm is defined in members.js
//form handler to prevent page from reloading
var addTaskForm = document.getElementById("addTaskForm");

//to prevent page from reloading
addTaskForm.addEventListener('submit', handleForm);