//IndexedDb for storing data

//Structures:
//Tasks: taskID (autoincremented), title, status, dueDate, description
//Members: memberID, fullName, initials
//Assignments: assignmentID, memberID, taskID
//Tags: tagID, tagName, tagColor, textColor, taskID


function connectToDB() {
const indexedDB = window.webkitIndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//check for support
if(!indexedDB) {
    alert("Your browser do not support indexedDB. Please update you browser.")
}

//open database "KanbanDatabase" version 9. 
//db = database, tx = transaction, store = store data, index = index (seach data).
let request = window.indexedDB.open("KanbanDatabase", 9), 
    db,
    tx,
    store,
    index;

//when creating a new databse, a store(structure) must be added
request.onupgradeneeded = function(e) {
    let db = request.result,
    //tasks
    tasksStore = db.createObjectStore("tasksStore",{
        keyPath: "taskID", autoIncrement: true
    }),
    tasksIndex = tasksStore.createIndex("status", "status", {
        unique: false
    }),
    //members
    membersStore = db.createObjectStore("membersStore", {
        keyPath: "memberID", autoIncrement: true
    }),
    membersIndex = membersStore.createIndex("fullName", "fullName", {
        unique: false
    }),
    //assignments
    assignmentStore = db.createObjectStore("assignmentStore", {
        keyPath: "assignmentID", autoIncrement: true
    }),
    assignmentIndex = assignmentStore.createIndex("assignmentID", "assignmentID", {
        unique: true
    }),
    //tags
    tagsStore = db.createObjectStore("tagsStore", {
        keyPath: "tagID", autoIncrement: true
    }),
    tagsIndex = tagsStore.createIndex("tagID", "tagID", {
        unique: true
    });
};

//open database will return response. 
//error handler:
request.onerror = function(e) {
    console.error("There was an error opening the database: " + e.target.errorCode);
};

//success handler:
request.onsuccess = function(e) {
    console.log("Successfully connected to DB")
    db = request.result;
    //tasks
    tasksTx = db.transaction("tasksStore", "readwrite");
    tasksStore = tasksTx.objectStore("tasksStore");
    tasksIndex = tasksStore.index("status");

    //members
    membersTx = db.transaction("membersStore", "readwrite");
    membersStore = membersTx.objectStore("membersStore");
    membersIndex = membersStore.index("fullName");

    //assignments
    assignmentTx = db.transaction("assignmentStore", "readwrite");
    assignmentStore = assignmentTx.objectStore("assignmentStore");
    assignmentIndex = assignmentStore.index("assignmentID");

    //tags
    tagsTx = db.transaction("tagsStore", "readwrite");
    tagsStore = tagsTx.objectStore("tagsStore");
    tagsIndex = tagsStore.index("tagID");

    db.onerror = function(e) {
        console.error("ERROR " + e.target.errorCode);
    }
    
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

                //adding tasks to select for assigning members to tasks
                /*
                let getAssignmentElementSelect = document.getElementById("list-available-tasks");
                let createTaskOption = document.createElement("option");
                createTaskOption.id = "task-option-" + i;
                */

                getTasks.onerror = function() {
                    console.error("There was an error looping through the tasks");
                }

                getTasks.onsuccess = function() {
                    if (getTasks.result.status == "to-do") {
                        let getCardContainer = document.getElementById("list-to-do");
                        let createCard = addCard(getTasks.result.title, getTasks.result.tags, getTasks.result.dueDate, getTasks.result.taskID);

                        getCardContainer.appendChild(createCard);
                    } else if (getTasks.result.status == "in-progress") {
                        let getCardContainer = document.getElementById("list-in-progress");
                        let createCard = addCard(getTasks.result.title, getTasks.result.tags, getTasks.result.dueDate, getTasks.result.taskID);

                        getCardContainer.appendChild(createCard);
                    } else if (getTasks.result.status == "done") {
                        let getCardContainer = document.getElementById("list-done");
                        let createCard = addCard(getTasks.result.title, getTasks.result.tags, getTasks.result.dueDate, getTasks.result.taskID);

                        getCardContainer.appendChild(createCard);
                    } else if (getTasks.result.status == "archived") {
                        let getCardContainer = document.getElementById("list-archived");
                        let createCard = addCard(getTasks.result.title, getTasks.result.tags, getTasks.result.dueDate, getTasks.result.taskID);

                        getCardContainer.appendChild(createCard);
                    }

                    /*
                    //adding tasks to select for assigning members to tasks
                    getAssignmentElementSelect.appendChild(createTaskOption);
                    createTaskOption.innerHTML = JSON.stringify("[" + getTasks.result.taskID + "] " + getTasks.result.title);
                    createTaskOption.value = getTasks.result.taskID;
                    */

                }
            }   
        }
    }

    function tagsToTasks() {
        let amountOfTasks = tasksIndex.count();
        let amountOfTags = tagsIndex.count();

        function getTasks() {
            for (var i = 1; i < amountOfTasks.result+1; i++) {
                let getTasks = tasksStore.get(i);
                
                getTasks.onerror = function() {
                    console.error("There was an error looping through the tasks");
                }

                getTasks.onsuccess = function() {
                    console.log(getTasks.result.taskID)
                }
            }
        }

        function getTags() {
            for (var j = 1; j < amountOfTags.result+1; j++) {
                let getTags = tagsStore.get(j);

                getTags.onerror = function() {
                    console.error("There was en error looping through the tags");
                }

                getTags.onsuccess = function() {
                    let result = getTags.result.taskID;

                    return result;
                }
            }
        }

        function compareID() {
            //what to do?
        }

        amountOfTasks.onerror = function() {
            console.error("There was an error finding the amount of tasks");
        }

        amountOfTasks.onsuccess = function() {
            getTasks();
        }

        amountOfTags.onerror = function() {
            console.error("There was an error finding the amount of tags");
        }

        amountOfTags.onsuccess = function() {
            getTags();
        }

        


        /*amountOfTags.onsuccess = function() {
                for (var i = 1; i < amountOfTags.result+1; i++) {
                    let getTags = tagsStore.get(i);
                    
    
                    getTags.onerror = function() {
                        console.log("There was an error looping through the tags");
                    }
    
                    getTags.onsuccess = function() {
                        console.log(getTags.result);
                    }
                }
            }*/

    }


    //fire functions
    tagsToTasks();
    listTasks();

    //close DB conection once transaction is complete.
    tasksTx.oncomplete = function() {
        db.close();
    }

    membersTx.oncomplete = function() {
        db.close();
    }

    assignmentTx.oncomplete = function() {
        db.close();
    }

    tagsTx.oncomplete = function() {
        db.close();
    }
}
}


/* commented out to not put the same objects in the stores multiple times.
    Do not uncomment! Easy to view the structure:*/
    //put object in tasksStore
    /*
    tasksStore.put({
        title: "Desgin kanban board for exam project",
        status: "to-do",
        dueDate: "2019-29-05",
        description: "This is a description describing the task that is to be done. Lorem ipsum dolor amet asymmetrical artisan literally pork belly pug microdosing kitsch authentic pinterest subway tile tousled craft beer church-key art party. Chambray brooklyn copper DemsuigndkiarencbtatnrabdoeairPdhofonreemxaumstawcehbe typewriter paleo selvage.",
        taskID: 1
    });

    tasksStore.put({
        title: "exam project",
        status: "to-do",
        dueDate: "2019-29-05",
        description: "This is a description describing the task that is to be done. Lorem ipsum dolor amet asymmetrical artisan literally pork belly pug microdosing kitsch authentic pinterest subway tile tousled craft beer church-key art party. Chambray brooklyn copper DemsuigndkiarencbtatnrabdoeairPdhofonreemxaumstawcehbe typewriter paleo selvage.",
        taskID: 2
    });

    //put object in membersStore
    membersStore.put({
        fullName: "Daniel Kjellid",
        initials: "DK",
        memberID: 1
    });
    
    //put object in assignmentStore
    assignmentStore.put({
        memberID: 1,
        taskID: 1,
        assignmentID: 1
    });

    tagsStore.add({
        taskID: 1,
        tagColor: "#ffbdbd",
        textColor: "#850303",
        tagName: "Priority",
        tagID: 1
    })

    tagsStore.add({
        taskID: 2,
        tagColor: "#C1FEF6",
        textColor: "#13595B",
        tagName: "Design",
        tagID: 2
    })

    //retrive data
    
    let t1 = tasksStore.get(1);
    let m1 = membersStore.get(0);
    let a1 = assignmentStore.get(0);
    let ta1 = tagsStore.get(0);
    

    
    t1.onsuccess = function() {
        console.log(t1.result);
    }

    m1.onsuccess = function() {
        console.log(m1.result);
    }

    a1.onsuccess = function() {
        console.log(a1.result);
    }
    */