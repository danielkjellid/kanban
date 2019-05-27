window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDb || window.msIndexedDB;

var textDB;
var textRequest;
var textTransaction;
var textObjectStore;

function init() {
    
    /*request to open the database*/
    textRequest = window.indexedDB.open("keptText", 2);
}

function changeText() {
    var titleIn = document.getElementById("title");
    var newTitle = noteIn.value;

    if(newTitle.length>0) {
        textTransaction = textDB.transaction("text", IDBTransaction.READ_WRITE);
        
        textObjectStore = textTransaction.objectStore("text");
    }
}

textRequest = textObjectStore.add({text: newText});
    /*error fires if user does not agree*/
textRequest.onerror = function(event) {
    alert("Can't open text database! " + evt.target.errorCode);
};

    /*success fires if user agrees*/ 
textRequest.onsuccess = function(event) {
    
    noteIn.value="";
    
    /*initiate database*/
    textDB = noterequest.result;
    
    /*call function to read exisiting text and display them*/
    getText();
}

    /*if upgrading - this is where we specify the structure*/
textRequest.onupgradeneeded = function(event) {
    
    /*get the database*/
    textDB = event.target.result;
    
    var textObjectStore = textDB.createObjectStore("text", { keyPath: "textID", autoIncrement: true});
    
}

    /*start the database once dom objects are loaded*/
window.addEventListener("DOMContentLoaded", init, false);



