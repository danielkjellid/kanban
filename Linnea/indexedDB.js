window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDb || window.msIndexedDB;


function createDB() {
    
    let request = indexedDB.open("infoDatabase")

        //on upgrade needed 
        request.onupgradeneeded = function(e) {
            alert("upgrade is called")

        }

        //on success
        request.onsuccess = function(e) {
            alert("success is called")
        }

        request.onerror = function(e) {
            alert("error!")
        }
    }

