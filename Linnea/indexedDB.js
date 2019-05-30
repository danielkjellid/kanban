/*
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
        
        //define transaction, store and index
        var tx = db.transaction("info", "readwrite");
        var infoStore = tx.objectStore("info");
        var index = infoStore.index("title","duedate","description");
        
        
        //error handler on result of the request
        db.onerror = function(e) {
            alert("ERROR " + e.target.errorCode);
        }
        
        
        //adding user input to the store 
            let newInfo = [{
                title: titleInput,
                duedate: duedateInput,
                description: descriptionInput
        }];
        
        var addNewInfo = infoStore.add(newInfo[0]);
                                                
        addNewInfo.onsuccess = function() {
            console.log("Great success")
                                                
        }

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
                
                infoStore = db.createObjectStore("info", {keyPath: "text", autoIncrement: true}),
                infoIndex = infoStore.index("title", "duedate", "description", {unique: false});
        
            
        }

        //on success
        request.onsuccess = function(e) {
            alert("success is called")
        }

        request.onerror = function(e) {
            alert("error!")
        }
    
} */

