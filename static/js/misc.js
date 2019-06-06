//function for adding the entire html structure for the cards.
function addCard(taskID, title, dueDate, memberFullName, tagName, tagColor, tagTextColor) {

    //create card
    let createTaskCard = document.createElement("div");

    createTaskCard.className = "task-card";
    createTaskCard.id = "task-" + taskID;
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
    createActionA.setAttribute("tabindex", "0");
    createActionA.classList = "action-btn";

    createIcon.className="icon";

    createActionsImg.setAttribute("src", "static/img/dots-horizontal-triple.png");
    createActionsImg.setAttribute("height", "16px");
    createActionsImg.setAttribute("width", "4px");
    createActionAImg.setAttribute("alt", "Three dotted button symbolizing more actions, such as editing card");

    createActionsBtn.appendChild(createActionA);
    createActionA.appendChild(createIcon);
    createIcon.appendChild(createActionsImg);

    createTaskHeader.appendChild(createActionsBtn);
    createTaskHeader.appendChild(createTags);
    createTags.appendChild(createTag);

    //create card body
    let createTaskBody = document.createElement("div");
    let createTaskTitle = document.createElement("p");

    createTaskBody.className = "task-card-body";
    createTaskTitle.innerHTML = title;

    createTaskBody.appendChild(createTaskTitle);

    //create card footer
    let createTaskFooter = document.createElement("div");
    let createAssignee = document.createElement("div");
    let createAssigneeIcon = document.createElement("span");
    let createAssigneeIconImg = document.createElement("img");
    let createAssigneeMember = document.createElement("span");
    let createDueDate = document.createElement("div");
    let createDueDateDate = document.createElement("span");
    let createDueDateIcon = document.createElement("span");
    let createDueDateImg = document.createElement("img");

    createTaskFooter.className = "task-card-footer";

    createAssignee.className = "asignee";
    createAssigneeIcon.className = "icon";
    createAssigneeIconImg.setAttribute("src", "static/img/person.png");
    createAssigneeIconImg.setAttribute("height", "13px");
    createAssigneeIconImg.setAttribute("width", "13px");
    createAssigneeIconImg.setAttribute("alt", "Person icon")
    createAssigneeMember.innerHTML = memberFullName;

    createDueDate.className = "dueDate";
    createDueDateDate.innerHTML = dueDate;
    createDueDateIcon.className = "icon";
    createDueDateImg.setAttribute("src", "static/img/calendar.png");
    createDueDateImg.setAttribute("height", "14px");
    createDueDateImg.setAttribute("width", "13px");
    createDueDateImg.setAttribute("alt", "Calendar icon")

    createTaskFooter.appendChild(createAssignee);
    createAssignee.appendChild(createAssigneeIcon);
    createAssigneeIcon.appendChild(createAssigneeIconImg);

    createTaskFooter.appendChild(createDueDate);
    createAssignee.appendChild(createAssigneeMember)
    createDueDate.appendChild(createDueDateDate);
    createDueDate.appendChild(createDueDateIcon);
    createDueDateIcon.appendChild(createDueDateImg);

    createTaskCard.appendChild(createTaskHeader);
    createTaskCard.appendChild(createTaskBody);
    createTaskCard.appendChild(createTaskFooter);

    return createTaskCard;
}

function addDueCard(dueDate, memberFullName, tagColor, title) {

    let getParent = document.getElementById("due-date-card-container");

    let createListBlock = document.createElement("div");

    createListBlock.className = "due-date-list-block";

    let createListCard = document.createElement("div");

    createListCard.className = "due-date-list-card";

    let createMeta = document.createElement("div");
    let createMetaSpan = document.createElement("span");

    createMeta.className = "meta";
    createMetaSpan.innerHTML = dueDate + " • " + memberFullName;

    let createMiniTags = document.createElement("div");
    let createMiniTag = document.createElement("span");

    createMiniTags.className = "mini-tags";
    createMiniTag.className = "mini-tag"
    createMiniTag.setAttribute("style", "background-color: " + tagColor + ";");

    let createTitle = document.createElement("div");
    let createTitleP = document.createElement("p");

    createTitle.className = "title";
    createTitleP.innerHTML = title;

    getParent.appendChild(createListBlock);
    createListBlock.appendChild(createListCard);
    createListCard.appendChild(createMeta);
    createMeta.appendChild(createMetaSpan);
    createListCard.appendChild(createMiniTags);
    createMiniTags.appendChild(createMiniTag);
    createListCard.appendChild(createTitle);
    createTitle.appendChild(createTitleP);
}

function addDueCardExpired(dueDate, memberFullName, tagColor, title) {

    let getParent = document.getElementById("due-date-expired-container");

    getParent.setAttribute("style", "display: block;")

    let createListBlock = document.createElement("div");

    createListBlock.className = "due-date-list-block";

    let createListCard = document.createElement("div");

    createListCard.className = "due-date-list-card";

    let createMeta = document.createElement("div");
    let createMetaSpan = document.createElement("span");

    createMeta.className = "meta";
    createMetaSpan.innerHTML = dueDate + " • " + memberFullName;

    let createMiniTags = document.createElement("div");
    let createMiniTag = document.createElement("span");

    createMiniTags.className = "mini-tags";
    createMiniTag.className = "mini-tag"
    createMiniTag.setAttribute("style", "background-color: " + tagColor + ";");

    let createTitle = document.createElement("div");
    let createTitleP = document.createElement("p");

    createTitle.className = "title";
    createTitleP.innerHTML = title;

    getParent.appendChild(createListBlock);
    createListBlock.appendChild(createListCard);
    createListCard.appendChild(createMeta);
    createMeta.appendChild(createMetaSpan);
    createListCard.appendChild(createMiniTags);
    createMiniTags.appendChild(createMiniTag);
    createListCard.appendChild(createTitle);
    createTitle.appendChild(createTitleP);
}

//function for adding the entire html structure for the cards.
function addArchivedCard(taskID, title, dueDate, memberFullName, tagName, tagColor, tagTextColor) {

    //create card
    let createArchivedCard = document.createElement("div");

    createArchivedCard.className = "archived-card";
    createArchivedCard.id = "task-" + taskID;
    createArchivedCard.setAttribute("data-taskid", taskID);
    addCardListeners(createArchivedCard);

    //create card header
    let createArchivedHeader = document.createElement("div");
    let createTags = document.createElement("div");
    let createEmblem = document.createElement("img");
    let createTag = document.createElement("span");

    let createActionsBtn = document.createElement("div");
    let createActionA = document.createElement("a");
    let createIcon = document.createElement("span");

    let createActionsImg = document.createElement("img");

    createArchivedHeader.className = "archived-card-header";
    createTags.className = "tags";
    createTag.className = "tag";
    createTag.innerHTML = tagName;
    createTag.setAttribute("style", "background-color: " + tagColor + "; color: " + tagTextColor + ";");
    createEmblem.setAttribute("src", "static/img/archived.png");
    createEmblem.setAttribute("height", "20px");
    createEmblem.setAttribute("width", "20px");
    createActionsBtn.className = "actions";

    createActionA.setAttribute("href", "#");

    createIcon.className="icon";

    createActionsImg.setAttribute("src", "static/img/dots-horizontal-triple.png");
    createActionsImg.setAttribute("height", "16px");
    createActionsImg.setAttribute("width", "4px");
    createActionAImg.setAttribute("alt", "Three dotted button symbolizing more actions, such as editing card");


    createArchivedHeader.appendChild(createTags);
    createTags.appendChild(createEmblem);
    createArchivedHeader.appendChild(createActionsBtn);
    createTags.appendChild(createTag);

    createActionsBtn.appendChild(createActionA);
    createActionA.appendChild(createIcon);
    createIcon.appendChild(createActionsImg);

    //create card body
    let createArchivedBody = document.createElement("div");
    let createArchivedTitle = document.createElement("p");

    createArchivedBody.className = "archived-card-body";
    createArchivedTitle.innerHTML = title;

    createArchivedBody.appendChild(createArchivedTitle);

    //create card footer
    let createArchivedFooter = document.createElement("div");
    let createAssignee = document.createElement("div");
    let createAssigneeIcon = document.createElement("span");
    let createAssigneeIconImg = document.createElement("img");
    let createAssigneeMember = document.createElement("span");
    let createDueDate = document.createElement("div");
    let createDueDateDate = document.createElement("span");
    let createDueDateIcon = document.createElement("span");
    let createDueDateImg = document.createElement("img");

    createArchivedFooter.className = "archived-card-footer";

    createAssignee.className = "asignee";
    createAssigneeIcon.className = "icon";
    createAssigneeIconImg.setAttribute("src", "static/img/person.png");
    createAssigneeIconImg.setAttribute("height", "13px");
    createAssigneeIconImg.setAttribute("width", "13px");
    createAssigneeIconImg.setAttribute("alt", "Person icon")
    createAssigneeMember.innerHTML = memberFullName;

    createDueDate.className = "dueDate";
    createDueDateDate.innerHTML = dueDate;
    createDueDateIcon.className = "icon";
    createDueDateImg.setAttribute("src", "static/img/calendar.png");
    createDueDateImg.setAttribute("height", "14px");
    createDueDateImg.setAttribute("width", "13px");
    createDueDateImg.setAttribute("alt", "Calendar icon")

    createArchivedFooter.appendChild(createAssignee);
    createAssignee.appendChild(createAssigneeIcon);
    createAssigneeIcon.appendChild(createAssigneeIconImg);

    createArchivedFooter.appendChild(createDueDate);
    createAssignee.appendChild(createAssigneeMember)
    createDueDate.appendChild(createDueDateDate);
    createDueDate.appendChild(createDueDateIcon);
    createDueDateIcon.appendChild(createDueDateImg);

    createArchivedCard.appendChild(createArchivedHeader);
    createArchivedCard.appendChild(createArchivedBody);
    createArchivedCard.appendChild(createArchivedFooter);

    return createArchivedCard;
}

//function for dynamically change the progress bar
function progressBar() {

    //count the total amount of tasks
    let amountOfTasks = tasksStore.count();

    //error handler for finding the total amount
    amountOfTasks.onerror = function() {
        console.error("There was an error finding the amount of tasks");
    }

    //success handler for finding the total amount
    amountOfTasks.onsuccess = function() {

        //count amount of tasks with status done
        let amountOfDoneTasks = tasksIndex.count("done");

        //error handler for finding amount of done tasks
        amountOfDoneTasks.onerror = function() {
            console.error("There was an error finding the amount of tasks with status done");
        }

        //success handler for finding amount of done tasks
        amountOfDoneTasks.onsuccess = function() {

            //we do not want to include archived tasks, so we have to remove them from the ecuation
            //count amount of archived task
            let amountOfArchivedTasks = tasksIndex.count("archived");

            //error handler for finding amount of archived tasks
            amountOfArchivedTasks.onerror = function() {
                console.error("There was an error finding the amount of tasks with status archived")
            }

            //success handler for finding amount of archived tasks
            amountOfArchivedTasks.onsuccess = function() {

                //define variables containing results
                let archivedTasks = amountOfArchivedTasks.result;
                let doneTasks = amountOfDoneTasks.result;
                let tasks = amountOfTasks.result;

                //ecuation for finding percentage of completed cards, removing decimals
                let progress = ((doneTasks/(tasks-archivedTasks))*100).toFixed(0);

                //DOM to change the actuall progress bar
                let getProgressBar = document.getElementById("progress-bar");
                getProgressBar.setAttribute("value", progress);

            }
        }
    }
}