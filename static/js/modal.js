function openModal() {
    //get a-element with id "open-add-new-modal"
    document.querySelector('a#open-add-new-modal').addEventListener('click', function(event) {
        event.preventDefault();
        //find element with .modal class and html element
        var modal = document.querySelector('.modal');  // only works with a single modal
        var html = document.querySelector('html');
        //add is-active to element with modal class, and is-clipped to html
        modal.classList.add('is-active');
        html.classList.add('is-clipped');
        
        //when modal-background is clicked, close modal
        modal.querySelector('.modal-background').addEventListener('click', function(e) {
            closeModal();
        });
    });
}

function closeModal() {
    let getAddNewModal = document.getElementById("add-new-modal");
    let getEditModal = document.getElementById("edit-modal");
    let html = document.querySelector('html');

    getAddNewModal.classList.remove("is-active");
    getEditModal.classList.remove("is-active");
    html.classList.remove('is-clipped');
}

function activateModal(id) {
    var modal = document.getElementById(id); 
    var html = document.querySelector('html');
    modal.classList.add('is-active');
    html.classList.add('is-clipped');
    modal.setAttribute("tabindex", "0");
    modal.focus();

    modal.querySelector('.modal-background').addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('is-active');
        html.classList.remove('is-clipped');
    });
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