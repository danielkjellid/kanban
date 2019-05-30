window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDb || window.msIndexedDB;


//add text form function
function addText() {
    //define user input in the addTextForm
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
        let textDB = request.result,
        
        
        //titleDatabase    
        titleStore = textDB.createObjectStore("titleStore", { 
                    keyPath: "titleID", autoIncrement: true}), 
            
        titleIndex = titleStore.createIndex("title", { unique: false}), 
            
            
        
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
            console.log("Successfully added task to database");
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
            
        
        //error handler on result of the request
        textDB.onerror = function(event) {
            console.log("ERROR " + e.target.errorCode);
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
        
        
        //success handler on adding new info to the database handler
        newTitle.onsuccess = function() {
            console.log(newTitle.result);
    }
    
        newDuedate.onsuccess = function() {
            console.log(newDuedate.result);
    }
    
        newDescription.onsuccess = function() {
            console.log(newDescription.result);
        
        }
    
function listText() {
      
    //open connection to database 
    let request = window.indexedDB.open("infoDatabase", 2), 
        textDB,
        textTx,
        textStore,
        index;
    
    //error handler on connection
    request.onerror = function(event) {
        console.log("There was ane rror listing text: " + e.target.errorCode);
    }
    
    //success handler on connection
    request.onsuccess = function(event) {
        console.log("Successfully listed text");
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
        
        //error handler on result of the request
        textDB.onerror = function(event) {
            console.log("ERROR " + e.target.errorCode);
        }
    
        
        //variable for counting objects in the index
        let amountOfText = titleIndex.count();
        
        //error handler
        amountOfText.onerror = function() {
            console.log("There was an error finding the amount of tasks");
        }
        
        //success handler 
        amountOfText.onsuccess = function() {
        
            for (i = 0; i < amountOfText.result+1; i++) {
                let getText = titleStore.get[1];
                
                let titleContainer = document.getElementById("new-title");
                let duedateContainer = document.getElementById("new-duedate");
                let descriptionContainer = document.getElementById("new-description");
            
                
                getText.onerror = function() {
                    console.log("There was an error looping through the text");
                }
                
                getText.onsuccess = function() {
                    console.log(getText.result);
                    titleContainer.innerHTML = JSON.stringify(getText.result);
                }
            }
        }
    }
}
            
function handleForm(e) {
    e.preventDefault();
}
    
   
//handleForm is defined in 
//form handler to prevent page from reloading
var addTextForm = document.getElementById("addTextForm");
var textForm = document.getElementById("listText");

//to prevent page from reloading
addTextForm.addEventListener("submit", handleForm);
textForm.addEventListener("submit", handleForm);