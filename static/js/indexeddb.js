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

        //defining transaction, store and index.
        tasksTx = db.transaction("tasksStore", "readwrite");
        tasksStore = tasksTx.objectStore("tasksStore");
        tasksIndex = tasksStore.index("status");

        //eerror handler for result of request
        db.onerror = function(e) {
            console.error("ERROR " + e.target.errorCode);
        }
        
        //declaring constants to load different functions on different sites
        const getBoard= document.getElementById("board");
        const getArchive = document.getElementById("archive");

        //front page
        if(getBoard) {
            listTasks();
            progressBar();
            //leaderBoard();
            listUpcomingDue();
        //archive page
        } else if (getArchive) {
            listArchivedTasks();
        }

        //close DB conection once transaction is complete.
        tasksTx.oncomplete = function() {
            db.close();
        }
    }
}

