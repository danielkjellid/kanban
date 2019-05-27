//add member function
function addMember() {
    //define user input in the addMemberForm
    var fullNameInput = document.getElementById('fullname').value;
    var initialsInput = document.getElementById('initials').value;

    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 2), 
    db,
    tx,
    store,
    index;

    //error handler on connection
    request.onerror = function(e) {
        console.log("There was en error adding a member " + e.target.errorCode);
    }

    //success handler on connection
    request.onsuccess = function(e) {
        console.log("Successfully added member to database");
        db = request.result;

        //define transaction, store and index
        membersTx = db.transaction("membersStore", "readwrite");
        membersStore = membersTx.objectStore("membersStore");
        membersIndex = membersStore.index("fullName");

        //error handler on result of the request
        db.onerror = function(e) {
            console.log("ERROR " + e.target.errorCode);
        }

        //add new member variables to the database
        let newMember = membersStore.add({
            fullName: fullNameInput,
            initials: initialsInput
        });

        //success handler on adding member to database handler
        newMember.onsuccess = function() {
            console.log(newMember.result);
        }

    }
}

//form handler to prevent page from reloading
function handleForm(e) {
    e.preventDefault();
}

var addMemberForm = document.getElementById("addMemberForm");

//to prevent page from reloading
addMemberForm.addEventListener('submit', handleForm);

//list members function
/*commented out - does not work
function listMembers() {
    console.log("test")
    
    //open connection to database
    let request = window.indexedDB.open("KanbanDatabase", 2), 
    db,
    tx,
    store,
    index;

    //error handler on connection
    request.onerror = function(e) {
        console.log("There was en error listting members " + e.target.errorCode);
    }

    //success handler on connection
    request.onsuccess = function(e) {
        console.log("Successfully listed members");
        db = request.result;

        //define transaction, store and index
        membersTx = db.transaction("membersStore", "readwrite");
        membersStore = membersTx.objectStore("membersStore");
        membersIndex = membersStore.index("fullName");

        //error handler on result of the request
        db.onerror = function(e) {
            console.log("ERROR " + e.target.errorCode);
        }

        //list members
        let listMembers = membersStore.getAll();

        listMembers.onsuccess = function() {
            var list = document.getElementById("listMembers");
            var listElement = document.createElement("li");

            list.appendChild(listElement);
            listElement.innerHTML(listMembers.result);

        }   

    }
}*/
