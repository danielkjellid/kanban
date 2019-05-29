window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDb || window.msIndexedDB;


//function to store the input in the database
function addText() {
    var titleInput = document.getElementById("title").value;
    var duedateInput = document.getElementById("duedate").value;
    var descriptionInput = document.getElementById("description").value;
    

//open connection to database
let request = window.indexedDB.open("infoDatabase", 2), 
    textDB,
    textTx,
    textStore,
    index;
    
 //upgrade the database
request.onupgradeneeded = function(event) {
    let textDB = textRequest.result,
        
        
    //titleDatabase    
    titleStore = textDB.createObjectStore("titleStore", { 
                    keyPath: "titleID", autoIncrement: true}), 
        
    titleIndex = titlesStore.createIndex("title", { unique: false}), 
        
    //duedateDatabase    
    duedateStore = textDB.createObjectStore("duedateStore", {  
                    keyPath: "duedateID", autoIncrement: true}), 
        
    duedateIndex = duedateStore.createIndex("duedate", { unique: false}),
        
        
    //descriptionDatabase    
    descriptionStore = textDB.createObjectStore("descriptionStore", { 
                    keyPath: "descriptionID", autoIncrement: true}), 
        
    descriptionIndex = descriptionStore.createIndex("description", { unique: false});
};

//error handler on connection
request.onerror = function(event) {
    console.log("There was an error opening the database: " + e.target.errorCode);
    }

 
    //success handler
request.onsuccess = function(event) {
    textDB = request.result;
    
    //define transaction, store and index 
    //title
    titleTx = textDB.transaction("titleStore", "readwrite");
    titleStore = textDB.objectStore("titleStore");
    titleIndex = titleStore.index("title");
    
    //duedate
    duedateTx = textDB.transaction("duedateStore", "readwrite");
    duedateStore = duedateTx.obejctStore("duedateStore");
    duedateIndex = duedateStore.index("duedate");
    
    //description
    descriptionTx = textDB.transaction("descriptionStore", "readwrite");
    descriptionStore = descriptionTx.objectStore("descriptionStore");
    descriptionIndex = descriptionStore.index("description");
    }


//add new variables to the database
    let newTitle = titleStore.add({
        title: titleInput
    });
    
    let newDuedate = duedateStore.add({
        duedate: duedateInput
    });
    
    let newDescription = descriptionStore.add({
        description: descriptionInput
    });

    
    newTitle.onsuccess = function() {
        console.log(newTitle.result);
    }
    
    newDuedate.onsuccess = function() {
        console.log(newDuedate.result);
    }
    
    newDescription.onsuccess = function() {
        console.log(newDescription.result);
    }
    
    textDB.onerror = function (event) {
        console.log("ERROR " + e.target.errorCode);
    }
    
    titleTx.oncomplete = function() {
        textDB.close();
    }
    
    duedateTx.oncomplete = function() {
        textDB.close();
    
    }
    
    descriptionTx.oncomplete = function() {
        textDB.close();
        }
    }


var addTextForm = document.getElementById("addTextForm");



