//function to load different functions onload.
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

let tags = [
    {
        id: 1,
        tagName: "Markedsplan",
        tagColor: "#dac4ff",
        tagTextColor: "#3a106b"
    },
    {
        id: 2,
        tagName: "Markedsaktivitet",
        tagColor: "#ffbdbd",
        tagTextColor: "#850303"
    },
    {
        id: 3,
        tagName: "SoMe",
        tagColor: "#c1fef6",
        tagTextColor: "#166b6e"
    },
    {
        id: 4,
        tagName: "Kampanje",
        tagColor: "#c1eac5",
        tagTextColor: "#38763e"
    },
    {
        id: 5,
        tagName: "PR",
        tagColor: "#fff3c4",
        tagTextColor: "#745e08"
    },
    {
        id: 6,
        tagName: "Mål",
        tagColor: "#ffd0b5",
        tagTextColor: "#7e3105"
    },
    {
        id: 7,
        tagName: "Innhold",
        tagColor: "#d1eefc",
        tagTextColor: "#13506e"
    }
];

function findMemberInitials(object) {
    let result = members.filter( obj => {
        return obj.memberFullName == object;
    })[0].memberInitials;

    return result;
}

function findTagColor(object) {
    let result = tags.filter(obj => {
        return obj.tagName == object;
    })[0].tagColor;

    return result;
}

function findTagTextColor(object) {
    let result = tags.filter(obj => {
        return obj.tagName == object;
    })[0].tagTextColor;

    return result;
}

function onLoad() {
    /*listMembers();
    listTasks();
    listAssignments();*/

    connectToDB("KanbanDatabase", 12);
}

function addCard(taskID, title, dueDate, memberFullName, tagName, tagColor, tagTextColor) {

    //create card
    let createTaskCard = document.createElement("div");

    createTaskCard.className = "task-card";
    createTaskCard.setAttribute("data-taskid", taskID);
    createTaskCard.setAttribute("draggable", true);
    addCardListeners(createTaskCard);

    //create card header
    let createTaskHeader = document.createElement("div");
    let createTags = document.createElement("div");
    let createTag = document.createElement("span");

    let createActionsBtn = document.createElement("div");
    let createActionA = document.createElement("a");
    let createIcon = document.createElement("span");

    let createActionsImg = document.createElement("img");

    createTaskHeader.className = "task-card-header";
    createTags.className = "tags";
    createTag.className = "tag";
    createTag.innerHTML = tagName;
    createTag.setAttribute("style", "background-color: " + tagColor + "; color: " + tagTextColor + ";");
    createActionsBtn.className = "actions";

    createActionA.setAttribute("href", "#");

    createIcon.className="icon";

    createActionsImg.setAttribute("src", "static/img/dots-horizontal-triple.png");
    createActionsImg.setAttribute("height", "16px");
    createActionsImg.setAttribute("width", "4px");

    createTaskHeader.appendChild(createTags);
    createTags.appendChild(createTag);
    createTaskHeader.appendChild(createActionsBtn);

    createActionsBtn.appendChild(createActionA);
    createActionA.appendChild(createIcon);
    createIcon.appendChild(createActionsImg);

    //create card body
    let createTaskBody = document.createElement("div");
    let createTaskTitle = document.createElement("p");

    createTaskBody.className = "task-card-body";
    createTaskTitle.innerHTML = title;

    createTaskBody.appendChild(createTaskTitle);

    //create card footer
    let createTaskFooter = document.createElement("div");
    let createAsignee = document.createElement("div");
    let createAsigneeIcon = document.createElement("span");
    let createAsigneeIconImg = document.createElement("img");
    let createAsigneeMember = document.createElement("span");
    let createDueDate = document.createElement("div");
    let createDueDateDate = document.createElement("span");
    let createDueDateIcon = document.createElement("span");
    let createDueDateImg = document.createElement("img");

    createTaskFooter.className = "task-card-footer";

    createAsignee.className = "asignee";
    createAsigneeIcon.className = "icon";
    createAsigneeIconImg.setAttribute("src", "static/img/person.png");
    createAsigneeIconImg.setAttribute("height", "13px");
    createAsigneeIconImg.setAttribute("width", "13px");
    createAsigneeMember.innerHTML = memberFullName;

    createDueDate.className = "dueDate";
    createDueDateDate.innerHTML = dueDate;
    createDueDateIcon.className = "icon";
    createDueDateImg.setAttribute("src", "static/img/calendar.png");
    createDueDateImg.setAttribute("height", "14px");
    createDueDateImg.setAttribute("width", "13px");

    createTaskFooter.appendChild(createAsignee);
    createAsignee.appendChild(createAsigneeIcon);
    createAsigneeIcon.appendChild(createAsigneeIconImg);

    createTaskFooter.appendChild(createDueDate);
    createAsignee.appendChild(createAsigneeMember)
    createDueDate.appendChild(createDueDateDate);
    createDueDate.appendChild(createDueDateIcon);
    createDueDateIcon.appendChild(createDueDateImg);

    createTaskCard.appendChild(createTaskHeader);
    createTaskCard.appendChild(createTaskBody);
    createTaskCard.appendChild(createTaskFooter);

    return createTaskCard;
}
