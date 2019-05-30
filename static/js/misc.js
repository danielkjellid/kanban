//function to load different functions onload.
function onLoad() {
    listMembers();
    listTasks();
    listAssignments();
}

function makeCard(destination) {
    //defining all variables needed for creating a card
    let getCardContainer = document.getElementById(destination);
    let createTaskCard = document.createElement("div");

    //varibles needed for task header
    let createTaskHeader = document.createElement("div");
    let createTags = document.createElement("div");
    let createTag = document.createElement("span");
    let createActionsBtn = document.createElement("div");

    //varibles needed for task body
    let createTaskBody = document.createElement("div");
    let createTaskTitle = document.createElement("p");

    //varibles needed for task footer
    let createTaskFooter = document.createElement("div");
    let createAsignee = document.createElement("div");
    let createAsigneeIcon = document.createElement("span");
    let createAsigneeMember = document.createElement("span");
    let createDueDate = document.createElement("div");
    let createDueDateDate = document.createElement("span");
    let createDueDateIcon = document.createElement("span");

    //creating card
    createTaskCard.className = "task-card";
    createTaskCard.setAttribute("draggable", true);
    
    //addding class/id and HTML to task header
    createTaskHeader.className = "task-card-header";
    createTags.className = "tags";
    createTag.className = "tag";
    createTag.id = "tag-";
    createTag.innerHTML = "someTags"
    createActionsBtn.className = "actions";
    //add action itself (svg)

    //addding class/id and HTML to task body
    createTaskBody.className = "task-card-body";
    createTaskTitle.innerHTML = "someTitle"

    //addding class/id and HTML to task footer
    createTaskFooter.className = "task-card-footer";
    createAsignee.className = "asignee";
    createAsigneeIcon.className = "icon";
    createAsigneeIcon.innerHTML = "I";
    createAsigneeMember.innerHTML = "Assignee name";
    createDueDate.className = "dueDate";
    createDueDateDate.innerHTML = "someDate"
    createDueDateIcon.className = "icon";
    createDueDateIcon.innerHTML = "I";

    //setting up structure
    createTaskHeader.appendChild(createTags);
    createTaskCard.appendChild(createTaskHeader);
    createTags.appendChild(createTag);
    createTaskHeader.appendChild(createActionsBtn);
    createTaskCard.appendChild(createTaskBody);
    createTaskBody.appendChild(createTaskTitle);
    createTaskCard.appendChild(createTaskFooter);
    createTaskFooter.appendChild(createAsignee);
    createAsignee.appendChild(createAsigneeIcon);
    createTaskFooter.appendChild(createDueDate);
    createAsignee.appendChild(createAsigneeMember)
    createDueDate.appendChild(createDueDateDate);
    createDueDate.appendChild(createDueDateIcon);

    //appending card to card container
    getCardContainer.appendChild(createTaskCard);
}