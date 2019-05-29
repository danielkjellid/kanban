//IndexedDb for storing data

//Structures:
//Tasks: taskID (autoincremented), title, status, tags, dueDate, description
//Members: memberID, fullName, initials
//Assignments: assignmentID, memberID, taskID
window.webkitIndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//check for support
if(!window.indexedDB) {
    alert("Your browser do not support indexedDB. Please update you browser.")
}

//open database "KanbanDatabase" version 1. 
//db = database, tx = transaction, store = store data, index = index (seach data).
let request = window.indexedDB.open("KanbanDatabase", 2), 
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
    tasksIndex = tasksStore.createIndex(["title", "status"], "title", {
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
    });
};

//open database will return response. 
//error handler:
request.onerror = function(e) {
    console.log("There was an error opening the database: " + e.target.errorCode);
};

//success handler:
request.onsuccess = function(e) {
    console.log("Successfully connected to database.")
    db = request.result;
    //tasks
    tasksTx = db.transaction("tasksStore", "readwrite");
    tasksStore = tasksTx.objectStore("tasksStore");
    tasksIndex = tasksStore.index("title", "status");

    //members
    membersTx = db.transaction("membersStore", "readwrite");
    membersStore = membersTx.objectStore("membersStore");
    membersIndex = membersStore.index("fullName");

    //assignments
    assignmentTx = db.transaction("assignmentStore", "readwrite");
    assignmentStore = assignmentTx.objectStore("assignmentStore");
    assignmentIndex = assignmentStore.index("assignmentID");

    db.onerror = function(e) {
        console.log("ERROR " + e.target.errorCode);
    }

    /* commented out to not put the same objects in the stores multiple times.
    Do not uncomment! Easy to view the structure:
    //put object in tasksStore
    tasksStore.put({
        taskID: 1,
        title: "Desgin kanban board for exam project",
        status: "backlog",
        tags: "Priority",
        dueDate: "2019-29-05",
        description: "This is a description describing the task that is to be done. Lorem ipsum dolor amet asymmetrical artisan literally pork belly pug microdosing kitsch authentic pinterest subway tile tousled craft beer church-key art party. Chambray brooklyn copper DemsuigndkiarencbtatnrabdoeairPdhofonreemxaumstawcehbe typewriter paleo selvage."
    });
    

    //put object in membersStore
    membersStore.put({
        memberID: 1,
        fullName: "Daniel Kjellid",
        initials: "DK"
    });
    
    //put object in assignmentStore
    assignmentStore.put({
        assigmentID: 1,
        memberID: 1,
        taskID: 1
    });
    

    //retrive data
    let t1 = tasksStore.get(1);
    let m1 = membersStore.get(2);
    let a1 = assignmentStore.get(1);

    t1.onsuccess = function() {
        console.log(t1.result);
    }

    m1.onsuccess = function() {
        console.log(m1.result);
    }

    a1.onsuccess = function() {
        console.log(a1.result);
    }*/

    //close DB conection once transaction is complete.
    tasksTx.oncomplete = function() {
        db.close();
    };

    membersTx.oncomplete = function() {
        db.close();
    }

    assignmentTx.oncomplete = function() {
        db.close();
    }
}
