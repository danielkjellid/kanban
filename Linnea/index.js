window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDb || window.msIndexedDB;

let textRequest = window.indexedDB.open("infoDatabase", 2), 
    textDB,
    textTx,
    textStore,
    index;

request.onupgradeneeded = function(event) {
    let textDB = textRequest.result,
        
    titleStore = textDB.createObjectStore("titleStore", { keyPath: "titleID", autoIncrement: true}), 
        
    titleIndex = titlesStore.createIndex("title", { unique: false}), 
        
    duedateStore = textDB.createObjectStore("duedateStore", { keyPath: "duedateID", autoIncrement: true}), 
        
    duedateIndex = duedateStore.createIndex("text", { unique: false}), 
        
    descriptionStore = textDB.createObjectStore("descriptionStore", { keyPath: "descriptionID", autoIncrement: true}), 
        
    descriptionIndex = descriptionStore.createIndex("text", { unique: false});
};

request.onerrer = function(event) {
    console.log("There was an error opening the database: " + e.target.errorCode);
};

request.onsuccess = function(event) {
    textDB = textRequest.result;
    
    //title
    titleTx = textDB.transaction("titleStore", "readwrite");
    titleStore = textDB.objectStore("titleStore");
    titleIndex = titleStore.index("title");
    
    //duedate
    duedateTx = textDB.transaction("duedateStore", "readwrite");
    duedateStore = duedateTx.obejctStore("duedateStore");
    duedateIndex = duedateStore.index("text");
    
    //description
    descriptionTx = textDB.transaction("descriptionStore", "readwrite");
    descriptionStore = descriptionTx.objectStore("descriptionStore");
    descriptionIndex = descriptionStore.index("text");
    
    textDB.onerror = function (event) {
        console.log("ERROR " + e.target.errorCode);
    }
    
    
}



