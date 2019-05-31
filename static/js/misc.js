//function to load different functions onload.
function onLoad() {
    /*listMembers();
    listTasks();
    listAssignments();*/

    listTasks();
}


function addCard(title, tags, dueDate, id) {

    //HTML structure:
    /*
    <div class="task-card" id="4" draggable="true">
        <div class="task-card-header">
            <div class="tags">
                <span class="tag" id="tag-">Priority</span>
            </div>
            <div class="actions">
                <a href="#">
                    <span class="icon">
                        <img src="static/img/dots-horizontal-triple.png" height="16px" width="4px">
                    </span>
                </a>
            </div>
        </div>
        <div class="task-card-body">
            <p>Desgin kanban board for exam project</p>
        </div>
        <div class="task-card-footer">
            <div class="asignee">
                <span class="icon">
                    <img src="static/img/person.png" height="13px" width="13px">
                </span>
                <span>Assignee name</span>
            </div>
            <div class="dueDate">
                <span>2019-29-05</span>
                <span class="icon">
                    <img src="static/img/calendar.png" height="14px" width="13px">
                </span>
            </div>
        </div>
    </div>
    */

    //create card
    let createTaskCard = document.createElement("div");

    createTaskCard.className = "task-card";
    createTaskCard.id = id;
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
    createTag.id = "tag-";
    createTag.innerHTML = tags;
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
    createAsigneeMember.innerHTML = "Assignee name";

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