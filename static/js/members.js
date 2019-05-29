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
        let newMember = [{
            fullName: fullNameInput,
            initials: initialsInput
        }];

        var addNewMember = membersStore.add(newMember[0]);

        //success handler on adding member to database handler
        addNewMember.onsuccess = function() {
            console.log("Successfully added member to database");
            
            let getMembersElementContainer = document.getElementById("list-members");
            let createMembersList = document.createElement("li");
            createMembersList.id = "newMember";
            getMembersElementContainer.appendChild(createMembersList);
            createMembersList.innerHTML = JSON.stringify(newMember);
        }
    }
}

function listMembers() {
   //open connection to database
   let request = window.indexedDB.open("KanbanDatabase", 2), 
   db,
   tx,
   store,
   index;

   //error handler on connection
   request.onerror = function(e) {
       console.log("There was en error listing members: " + e.target.errorCode);
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

       //variable for counting objects in the index
       let amountOfMembers = membersIndex.count();

       //error handler
       amountOfMembers.onerror = function() {
           console.log("There was an error finding the amount of members")
       }

       //success handler
       amountOfMembers.onsuccess = function() {
           for (var i = 1; i < amountOfMembers.result+1; i++) {
               let getMembers = membersStore.get(i);

               let getMembersElementContainer = document.getElementById("list-members");
               let createMembersList = document.createElement("li");
               createMembersList.id = "member-" + i;
               
               getMembers.onerror = function() {
                   console.log("There was an error looping through the members")
               }

               getMembers.onsuccess = function() {
                   getMembersElementContainer.appendChild(createMembersList);
                   //JSON stringify to return object in string format, and not [Object object]
                   createMembersList.innerHTML = JSON.stringify(getMembers.result);
               }
           }   
       }
   } 
}

var addMemberForm = document.getElementById("addMemberForm");

//to prevent page from reloading
addMemberForm.addEventListener('submit', handleForm);
