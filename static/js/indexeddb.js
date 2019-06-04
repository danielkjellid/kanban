//IndexedDb for storing data

//Structure:
//Tasks: taskID, title, status, dueDate, description, memberName, memberInitials, tagName, tagColor, textColor

function connectToDB(database, version) {
    const indexedDB = window.webkitIndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //check for support
    if(!indexedDB) {
        alert("Your browser do not support indexedDB. Please update you browser.")
    }

    //open database "KanbanDatabase" version 9. 
    //db = database, tx = transaction, store = store data, index = index (seach data).
    let request = window.indexedDB.open(database, version), 
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

        db.onerror = function(e) {
            console.error("ERROR " + e.target.errorCode);
        }
    
        //listTasks() list all tasks and appends them to the appropriate list based on status.
        //defined in tasks.js
        listTasks();
        progressBar();
        leaderBoard();
        listUpcomingDue();

        /*
        let test = tasksIndex.get("done");

        test.onsuccess = function() {
            console.log(test.result);
        }*/

        //close DB conection once transaction is complete.
        tasksTx.oncomplete = function() {
            db.close();
        }
    }
}

/*
//Tasks: taskID, title, status, dueDate, description, memberName, memberInitials, tagName, tagColor, textColor
tasksStore.put({
taskID: 1,
title: "Design kanban board for exam web project.",
status: "to-do",
dueDate: "2019-05-31",
description: "Some desc",
memberFullName: "Daniel Kjellid",
memberInitials: "DK",
tagName: "Priority",
tagColor: "#fbcdcd",
tagTextColor: "#850303"
});

*/

