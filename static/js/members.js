//data structure for members
let members = [
    {
        id: 1,
        memberFullName: "Daniel Kjellid",
        memberInitials: "DK"
    },
    {
        id: 2,
        memberFullName: "Kainat Zahoor",
        memberInitials: "KZ"
    },
    {
        id: 3,
        memberFullName: "Linnea S. Fylling",
        memberInitials: "LF"
    },
    {
        id: 4,
        memberFullName: "Magomed Derbtichev",
        memberInitials: "MD"
    },
    {
        id: 5,
        memberFullName: "Sultan Khan",
        memberInitials: "SK"
    }   
];

//function for listing members on the front page
function listMemberOverview() {
    let getMemberContainer = document.getElementById("member-container");

    //traverse through array
    for (var i = 0; i < members.length; i++) {
        let createMemberDiv = document.createElement("div");
        let createEmblem = document.createElement("img");
        let createMemberName = document.createElement("span");

        createMemberDiv.className = "member-div";

        //conditional statements to select approrpriate image emblem
        if (members[i].memberFullName == "Daniel Kjellid") {
            createEmblem.setAttribute("src", "static/img/member-icons/dk.png")
            createEmblem.setAttribute("height", "24px");
            createEmblem.setAttribute("width", "24px");
            createEmblem.setAttribute("alt", "Circle emblem containing member " + members[i].memberFullName + "'s initials.");
        } else if (members[i].memberFullName == "Kainat Zahoor") {
            createEmblem.setAttribute("src", "static/img/member-icons/kz.png")
            createEmblem.setAttribute("height", "24px");
            createEmblem.setAttribute("width", "24px");
            createEmblem.setAttribute("alt", "Circle emblem containing member " + members[i].memberFullName + "'s initials.");
        } else if (members[i].memberFullName == "Linnea S. Fylling") {
            createEmblem.setAttribute("src", "static/img/member-icons/lf.png")
            createEmblem.setAttribute("height", "24px");
            createEmblem.setAttribute("width", "24px");
            createEmblem.setAttribute("alt", "Circle emblem containing member " + members[i].memberFullName + "'s initials.");
        } else if (members[i].memberFullName == "Magomed Derbtichev") {
            createEmblem.setAttribute("src", "static/img/member-icons/md.png")
            createEmblem.setAttribute("height", "24px");
            createEmblem.setAttribute("width", "24px");
            createEmblem.setAttribute("alt", "Circle emblem containing member " + members[i].memberFullName + "'s initials.");
        } else if (members[i].memberFullName == "Sultan Khan") {
            createEmblem.setAttribute("src", "static/img/member-icons/sk.png")
            createEmblem.setAttribute("height", "24px");
            createEmblem.setAttribute("width", "24px");
            createEmblem.setAttribute("alt", "Circle emblem containing member " + members[i].memberFullName + "'s initials.");
        }
        
        createMemberName.className = "member-name";
        createMemberName.innerHTML = members[i].memberFullName;

        createMemberName.setAttribute("tabindex", "0");
        createMemberName.setAttribute("aria-label", "Member " + members[i].memberFullName);

        getMemberContainer.appendChild(createMemberDiv);
        createMemberDiv.appendChild(createEmblem);
        createMemberDiv.appendChild(createMemberName);
    }
}

//function for adding list of members to the add new task modal
function listMembersNewSelect() {

    //get select in modal
    let getSelect = document.getElementById("modal-add-new-task-member");

    //traverse through array
    for (var i = 0; i < members.length; i++) {
        let createOption = document.createElement("option");

        createOption.id = "member-" + members[i].memberInitials.toLowerCase();
        createOption.innerHTML = members[i].memberFullName;

        getSelect.appendChild(createOption);
    }
}

//function for adding list of members to existing cards
function listMembersEditSelect() {

    let getSelect = document.getElementById("modal-edit-task-member");

    for (var i = 0; i < members.length; i++) {
        let createOption = document.createElement("option");

        createOption.id = "edit-member-" + members[i].memberInitials.toLowerCase();
        createOption.innerHTML = members[i].memberFullName;

        getSelect.appendChild(createOption);
    }
}

//function for adding new members in the array
function addNewMember() {
    let newMember = document.getElementById("modal-add-new-member").value;
    let newMemberInit = document.getElementById("modal-add-new-member-init").value;

    //actually adding to the array.
    members.push({
        id: members.length+1, 
        memberFullName: newMember, 
        memberInitials: newMemberInit
    });

    //deleting overview first, before listing them again to avoid listning multiple times.
    deleteMemberListOverview();
    listMemberOverview();
}

//variables and event listener for avoiding page refrsh after submit to avodi losing DOM.
let memberForm = document.getElementById("add-new-tag");

memberForm.addEventListener('submit', handleForm);

