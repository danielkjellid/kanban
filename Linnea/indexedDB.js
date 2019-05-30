window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDb || window.msIndexedDB;


function addText() {
    //define user input
    var titleInput = document.getElementById("title").value;
    var duedateInput = document.getElementById("duedate").value;
    var descriptionInput = document.getElementById("description").value;
    
    //open connection to database
    let request = window.indexedDB.open("infoDatabase", 1),
        db,
        tx,
        store,
        index;
    
    //error handler on connection
    request.onerror = function(e) {
        alert("There was an error adding a task: " + e.target.errorCode);
    }
    
    //success handler on connection
    request.onsuccess = function(e) {
        db = request.result;
        
        var titleTx = db.transaction("titleStore", "readwrite");
        var titleStore = titleTx.objectStore("titleStore");
        var titleIndex = titleStore.index("title");
        
        
        var duedateTx = db.transaction("duedateStore", "readwrite");
        var duedateStore = duedateTx.objectStore("duedateStore");
        var duedateIndex = duedateStore.index("duedate");
        
        
        var descriptionTx = db.transaction("descriptionStore", "readwrite");
        var descriptionStore = descriptionTx.objectStore("descriptionStore");
        var descriptionIndex = descriptionStore.index("description");
        
        //error handler on result of the request
        db.onerror = function(e) {
            alert("ERROR " + e.target.errorCode);
        }
        
            let newTitle = [{
                titleID: auto,
                title: titleInput
            }];

            let newDuedate = [{
                duedateID: auto,
                duedate: duedateInput
            }];

            let newDescription = [{
                descriptionID: auto, 
                description: descriptionInput
        }];
        
        var addNewTitle = titleStore.add(newTitle[i]);

    }
   
    
}



function createDB() {
    
    //define user input
    var titleInput = document.getElementById("title").value
    var duedateInput = document.getElementById("duedate").value
    var descriptionInput = document.getElementById("description").value
    
    let request = window.indexedDB.open("infoDatabase", 1), 
        db,
        tx,
        store,
        index;

        //on upgrade needed 
        request.onupgradeneeded = function(e) {
            let db = request.result,
                
                titleStore = db.createObjectStore("titles", {keyPath: "titleID", autoIncrement: true}),
                
                titleIndex = titleStore.createIndex("title", "title", {unique: false}),
                
                duedateStore = db.createObjectStore("duedates", {keyPath: "duedateID", autoIncrement: true}),
                
                duedateIndex = duedateStore.createIndex("duedate", "duedate", {unique: false}),
                
                descriptionStore = db.createObjectStore("descriptions", {keyPath: "descriptionID", autoIncrement: true}),
                
                descriptionIndex = descriptionStore.createIndex("description", "description", {unique: false});
            

        }

        //on success
        request.onsuccess = function(e) {
            alert("success is called")
        }

        request.onerror = function(e) {
            alert("error!")
        }
    
}