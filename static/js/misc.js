//function to load different functions onload.
function onLoad() {
    listMembers();
    listTasks();
    listAssignments();
}
/*
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
    addCardListeners(createTaskCard);

    
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

    return createTaskCard;
}*/

///Start
function makeCard(title, tags, dueDate, id) {
    //defining all variables needed for creating a card
    let createTaskCard = document.createElement("div");

    //varibles needed for task header
    let createTaskHeader = document.createElement("div");
    let createTags = document.createElement("div");
    let createTag = document.createElement("span");

    let createActionsBtn = document.createElement("div");
    let createActionA = document.createElement("a");
    let createIcon = document.createElement("span");

    let createSvg = document.createElement("svg");
    let firstG = document.createElement("g");
    let secondG = document.createElement("g");
    let thirdG = document.createElement("g");
    let fourthG = document.createElement("g");
    let fifthG = document.createElement("g");
    let sixthG = document.createElement("g");
    let seventhG = document.createElement("g");
    let createPath = document.createElement("path");

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
    createTaskCard.id = id;
    createTaskCard.setAttribute("draggable", true);
    addCardListeners(createTaskCard);

    
    //addding class/id and HTML to task header
    createTaskHeader.className = "task-card-header";
    createTags.className = "tags";
    createTag.className = "tag";
    createTag.id = "tag-";
    createTag.innerHTML = tags;
    createActionsBtn.className = "actions";

    createActionA.setAttribute("href", "#");

    createIcon.className="icon";

    //add action itself (svg)
    createSvg.setAttribute("width", "4px");
    createSvg.setAttribute("height", "16px");
    createSvg.setAttribute("viewBox", "0 0 4 16");
    createSvg.setAttribute("version", "1.1");
    createSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    createSvg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    firstG.setAttribute("id", "Welcome");
    firstG.setAttribute("stroke", "none");
    firstG.setAttribute("stroke-width", "1");
    firstG.setAttribute("fill", "none");
    firstG.setAttribute("fill-rule", "evenodd");

    secondG.setAttribute("id", "Front");
    secondG.setAttribute("transform", "translate(-326.000000, -182.000000)");
    secondG.setAttribute("fill", "#CBD2D9");
    secondG.setAttribute("fill-rule", "nonzero");

    thirdG.setAttribute("id", "Body");
    thirdG.setAttribute("transform", "translate(25.000000, 100.000000)");

    fourthG.setAttribute("id", "Backlog");

    fifthG.setAttribute("id", "Task");
    fifthG.setAttribute("transform", "translate(10.000000, 70.000000)");

    sixthG.setAttribute("id", "Body");
    sixthG.setAttribute("transform", "translate(14.000000, 12.000000)");

    seventhG.setAttribute("id", "dots-horizontal-triple");
    seventhG.setAttribute("transform", "translate(277.000000, 0.000000)");

    createPath.setAttribute("d", "M2,10 C0.8954305,10 0,9.1045695 0,8 C0,6.8954305 0.8954305,6 2,6 C3.1045695,6 4,6.8954305 4,8 C4,9.1045695 3.1045695,10 2,10 Z M2,4 C0.8954305,4 0,3.1045695 0,2 C0,0.8954305 0.8954305,0 2,0 C3.1045695,0 4,0.8954305 4,2 C4,3.1045695 3.1045695,4 2,4 Z M2,16 C0.8954305,16 0,15.1045695 0,14 C0,12.8954305 0.8954305,12 2,12 C3.1045695,12 4,12.8954305 4,14 C4,15.1045695 3.1045695,16 2,16 Z");
    createPath.setAttribute("id", "Shape");
    
    










    //addding class/id and HTML to task body
    createTaskBody.className = "task-card-body";
    createTaskTitle.innerHTML = title;

    //addding class/id and HTML to task footer
    createTaskFooter.className = "task-card-footer";
    createAsignee.className = "asignee";
    createAsigneeIcon.className = "icon";
    createAsigneeIcon.innerHTML = "I";
    createAsigneeMember.innerHTML = "Assignee name";
    createDueDate.className = "dueDate";
    createDueDateDate.innerHTML = dueDate;
    createDueDateIcon.className = "icon";
    createDueDateIcon.innerHTML = "I";

    //setting up structure
    createTaskCard.appendChild(createTaskHeader);
    createTaskHeader.appendChild(createTags);
    createTags.appendChild(createTag);
    createTaskHeader.appendChild(createActionsBtn);

    createActionsBtn.appendChild(createActionA);
    createActionA.appendChild(createIcon);
    createIcon.appendChild(createSvg);
    createSvg.appendChild(firstG);
    firstG.appendChild(secondG);
    secondG.appendChild(thirdG);
    thirdG.appendChild(fourthG);
    fourthG.appendChild(fifthG);
    fifthG.appendChild(sixthG);
    sixthG.appendChild(seventhG);
    seventhG.appendChild(createPath);

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

    return createTaskCard;
}
//finish