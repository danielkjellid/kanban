//function for opening model by id
function openModal(id) {
    var modal = document.getElementById(id); 
    var html = document.querySelector('html');
    modal.classList.add('is-active');
    html.classList.add('is-clipped');
    //set focus so screen readers get "into" modal when opening
    modal.focus();

    //close modal if there is a click outside the modal
    modal.querySelector('.modal-background').addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('is-active');
        html.classList.remove('is-clipped');
    });
}

//function for closing all modals (add new, and edit)
function closeModal() {
    let getAddNewModal = document.getElementById("add-new-modal");
    let getEditModal = document.getElementById("edit-modal");
    let html = document.querySelector('html');

    getAddNewModal.classList.remove("is-active");
    getEditModal.classList.remove("is-active");
    html.classList.remove('is-clipped');
}

//function for editing existing card
function openEditModal() {

    //get Id of task card clicked, and convert it to int
    let getTaskID = parseInt(this.getAttribute("data-taskid"));
    //get appropriate modal
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
             console.error("There was an error getting ID of clicked task");
         }
 
         //success handler for getting data-taskid
         getTask.onsuccess = function(e) {
 
             //variables for displaying correct information in the modal
            let getTitleInput = document.getElementById("modal-edit-task-title");
            getTitleInput.setAttribute("value", getTask.result.title);

            //select appropriate status
            if (getTask.result.status == "to-do") {
                let getStatusSelectItem = document.getElementById("edit-select-" + getTask.result.status);
                getStatusSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.status = "in-progress") {
                let getStatusSelectItem = document.getElementById("edit-select-" + getTask.result.status);
                getStatusSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.status == "done") {
                let getStatusSelectItem = document.getElementById("edit-select-" + getTask.result.status);
                getStatusSelectItem.setAttribute("selected", "selected");
            } else if (getTask.result.status == "archived") {
                let getStatusSelectItem = document.getElementById("eedit-select-" + getTask.result.status);
                getStatusSelectItem.setAttribute("selected", "selected");
            }

            //select appropriate tag
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

            //get inputs
            let getDueDateInput = document.getElementById("modal-edit-task-dueDate");
            getDueDateInput.value = getTask.result.dueDate;

            let getDescInput = document.getElementById("modal-edit-task-desc");
            getDescInput.innerHTML = getTask.result.description;
            
            //select appropriate member
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

            //open modal
            openModal("edit-modal");

            //eventlistener for editing task. Defined here because IndexedDB is needed to get the task ID
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

//function for changing content in add new modal
function openNewModal(evt, pageName) {
    
    //declare the variables
    let i, tabContent, tabLinks;
    
    //Get all elements with class="tab-content" and hide them
    tabContent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
    
    //Get all elements with class="menu-item" and remove the class "active"
    tabLinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tabLinks.length; i++) { 
            tabLinks[i].className = tabLinks[i].className.replace(" active", "");
        }
    
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("new-card").click(); 