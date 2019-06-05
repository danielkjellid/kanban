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

function listMemberOverview() {
    let getMemberContainer = document.getElementById("member-container");

    for (var i = 0; i < members.length; i++) {
        let createMemberDiv = document.createElement("div");
        let createEmblem = document.createElement("img");
        let createMemberName = document.createElement("span");

        createMemberDiv.className = "member-div";

        if (members[i].memberFullName == "Daniel Kjellid") {
            createEmblem.setAttribute("src", "static/img/member-icons/dk.png")
            createEmblem.setAttribute("height", "24px");
            createEmblem.setAttribute("width", "24px");
        } else if (members[i].memberFullName == "Kainat Zahoor") {
            createEmblem.setAttribute("src", "static/img/member-icons/kz.png")
            createEmblem.setAttribute("height", "24px");
            createEmblem.setAttribute("width", "24px");
        } else if (members[i].memberFullName == "Linnea S. Fylling") {
            createEmblem.setAttribute("src", "static/img/member-icons/lf.png")
            createEmblem.setAttribute("height", "24px");
            createEmblem.setAttribute("width", "24px");
        } else if (members[i].memberFullName == "Magomed Derbtichev") {
            createEmblem.setAttribute("src", "static/img/member-icons/md.png")
            createEmblem.setAttribute("height", "24px");
            createEmblem.setAttribute("width", "24px");
        } else if (members[i].memberFullName == "Sultan Khan") {
            createEmblem.setAttribute("src", "static/img/member-icons/sk.png")
            createEmblem.setAttribute("height", "24px");
            createEmblem.setAttribute("width", "24px");
        }
        
        createMemberName.className = "member-name";
        createMemberName.innerHTML = members[i].memberFullName;

        getMemberContainer.appendChild(createMemberDiv);
        createMemberDiv.appendChild(createEmblem);
        createMemberDiv.appendChild(createMemberName);
    }
}

function listMembersNewSelect() {

    let getSelect = document.getElementById("modal-add-new-task-member");

    for (var i = 0; i < members.length; i++) {
        let createOption = document.createElement("option");

        createOption.id = "member-" + members[i].memberInitials.toLowerCase();
        createOption.innerHTML = members[i].memberFullName;

        getSelect.appendChild(createOption);
    }
}

function listMembersEditSelect() {

    let getSelect = document.getElementById("modal-edit-task-member");

    for (var i = 0; i < members.length; i++) {
        let createOption = document.createElement("option");

        createOption.id = "edit-member-" + members[i].memberInitials.toLowerCase();
        createOption.innerHTML = members[i].memberFullName;

        getSelect.appendChild(createOption);
    }
}