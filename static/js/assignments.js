/*
function addAssignment() {
    var memberInput = parseInt(document.getElementById("list-available-members").value);
    var taskInput = parseInt(document.getElementById("list-available-tasks").value);

    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 9), 
    db,
    tx,
    store,
    index;

    //error handler on connection
    request.onerror = function(e) {
        console.log("There was en error connecting to the DB: " + e.target.errorCode);
    }

    request.onsuccess = function() {
        db = request.result;

        //define transaction, store and index
        assignmentTx = db.transaction("assignmentStore", "readwrite");
        assignmentStore = assignmentTx.objectStore("assignmentStore");
        assignmentIndex = assignmentStore.index("assignmentID");

        //error handler on result of the request
        db.onerror = function(e) {
            console.log("ERROR " + e.target.errorCode);
        }

        let newAssignment = [{
            memberID: memberInput,
            taskID: taskInput
        }];

        var addNewAssignment = assignmentStore.add(newAssignment[0]);

        addNewAssignment.onsuccess = function() {
            console.log("Successfully added assignment to database");
            console.log(newAssignment);
        }

        assignmentTx.oncomplete = function() {
            db.close();
        };

    }
}

function listAssignments() {
    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 9), 
    db,
    tx,
    store,
    index;
 
    //error handler on connection
    request.onerror = function(e) {
        console.log("There was an error connecting to the database: " + e.target.errorCode);
    }
 
    //success handler on connection
    request.onsuccess = function(e) {
        db = request.result;
 
        //define transaction, store and index
        assignmentTx = db.transaction("assignmentStore", "readwrite");
        assignmentStore = assignmentTx.objectStore("assignmentStore");
        assignmentIndex = assignmentStore.index("assignmentID");
 
        //error handler on result of the request
        db.onerror = function(e) {
            console.log("ERROR " + e.target.errorCode);
        }
 
        //variable for counting objects in the index
        let amountOfAssignments = assignmentIndex.count();
 
        //error handler
        amountOfAssignments.onerror = function() {
            console.log("There was an error finding the amount of assignments")
        }
 
        //success handler
        amountOfAssignments.onsuccess = function() {
            for (var i = 1; i < amountOfAssignments.result+1; i++) {
                let getAssignments = assignmentStore.get(i);
 
                let getAssignmentElementContainer = document.getElementById("list-assignments");
                let createAssignmentList = document.createElement("li");
                createAssignmentList.id = "assignment-" + i;
                
                getAssignments.onerror = function() {
                    console.log("There was an error looping through the assignments")
                }
 
                getAssignments.onsuccess = function() {
                    getAssignmentElementContainer.appendChild(createAssignmentList);
                    //JSON stringify to return object in string format, and not [Object object]
                    createAssignmentList.innerHTML = JSON.stringify(getAssignments.result);
                }
            }   
         }
 
        membersTx.oncomplete = function() {
            db.close();
        }
    } 
}*/