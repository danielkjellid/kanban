//function for adding the entire html structure for the cards.
function addCard(taskID, title, dueDate, memberFullName, tagName, tagColor, tagTextColor) {

    //create card
    let createTaskCard = document.createElement("div");
    createTaskCard.setAttribute("aria-label", "Task card")

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
    createTaskHeader.setAttribute("aria-label", "Card header showing tag and more actions button");

    createTags.className = "tags";
    createTags.setAttribute("aria-label", "Tags used to show workflow");
    createTag.className = "tag";
    createTag.innerHTML = tagName;
    createTag.setAttribute("style", "background-color: " + tagColor + "; color: " + tagTextColor + ";");
    createTag.setAttribute("aria-label", "Workflow " + tagName);
    createActionsBtn.className = "actions";

    createActionA.setAttribute("href", "#");
    createActionA.setAttribute("aria-label", "More actions button. Click to edit the task attributes.")
    createActionA.classList = "action-btn";

    createIcon.className="icon";

    createActionsImg.setAttribute("src", "static/img/dots-horizontal-triple.png");
    createActionsImg.setAttribute("height", "16px");
    createActionsImg.setAttribute("width", "4px");
    createActionsImg.setAttribute("alt", "Three dotted button symbolizing more actions, such as editing card");

    createActionsBtn.appendChild(createActionA);
    createActionA.appendChild(createIcon);
    createIcon.appendChild(createActionsImg);

    createTaskHeader.appendChild(createActionsBtn);
    createTaskHeader.appendChild(createTags);
    createTags.appendChild(createTag);

    //create card body
    let createTaskBody = document.createElement("div");
    createTaskBody.setAttribute("aria-label", "Task card body");
    let createTaskTitle = document.createElement("p");
    createTaskTitle.setAttribute("aria-label", "Task card title");

    createTaskBody.className = "task-card-body";
    createTaskTitle.innerHTML = title;
    createTaskTitle.setAttribute("aria-label", "title of the task is " + title);

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
    createTaskFooter.setAttribute("aria-label", "Task card footer");

    createAssignee.className = "assignee";
    createAssignee.setAttribute("aria-label", "Task is assigned to " + memberFullName);
    createAssigneeIcon.className = "icon";
    createAssigneeIconImg.setAttribute("src", "static/img/person.png");
    createAssigneeIconImg.setAttribute("height", "13px");
    createAssigneeIconImg.setAttribute("width", "13px");
    createAssigneeIconImg.setAttribute("alt", "Person icon")
    createAssigneeMember.innerHTML = memberFullName;

    createDueDate.className = "dueDate";
    createDueDate.setAttribute("aria-label", "task is due " + dueDate);
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

//function for creating upcoming due card
function addDueCard(dueDate, memberFullName, tagColor, title) {

    let getParent = document.getElementById("due-date-card-container");
    getParent.setAttribute("tabindex", "0");

    let createListBlock = document.createElement("div");

    createListBlock.className = "due-date-list-block";
    createListBlock.setAttribute("tabindex", "0");

    let createListCard = document.createElement("div");

    createListCard.className = "due-date-list-card";
    createListCard.setAttribute("tabindex", "0");
    createListCard.setAttribute("aria-label", "Upcoming due date card")

    let createMeta = document.createElement("div");
    let createMetaSpan = document.createElement("span");

    createMeta.className = "meta";
    createMeta.setAttribute("tabindex", "0");
    createMeta.setAttribute("aria-label", "Meta info about when task is due, and who is assigned");
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
    createTitle.setAttribute("tabindex", "0");
    createTitle.setAttribute("aria-label", "task title is " + title);

    getParent.appendChild(createListBlock);
    createListBlock.appendChild(createListCard);
    createListCard.appendChild(createMeta);
    createMeta.appendChild(createMetaSpan);
    createListCard.appendChild(createMiniTags);
    createMiniTags.appendChild(createMiniTag);
    createListCard.appendChild(createTitle);
    createTitle.appendChild(createTitleP);
}

//function for adding expired due date card
function addDueCardExpired(dueDate, memberFullName, tagColor, title) {

    let getParent = document.getElementById("due-date-expired-container");
    getParent.setAttribute("style", "display: block;")
    getParent.setAttribute("tabindex", "0");

    let createListBlock = document.createElement("div");

    createListBlock.className = "due-date-list-block";
    createListBlock.setAttribute("tabindex", "0");

    let createListCard = document.createElement("div");

    createListCard.className = "due-date-list-card";
    createListCard.setAttribute("tabindex", "0");
    createListCard.setAttribute("aria-label", "Expired due date card")

    let createMeta = document.createElement("div");
    let createMetaSpan = document.createElement("span");

    createMeta.className = "meta";
    createMeta.setAttribute("tabindex", "0");
    createMeta.setAttribute("aria-label", "Meta info about when task is due, and who is assigned");
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
    createTitle.setAttribute("tabindex", "0");
    createTitle.setAttribute("aria-label", "task title is " + title);

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
    createArchivedCard.setAttribute("aria-label", "Archived task card")

    createArchivedCard.className = "archived-card";
    createArchivedCard.id = "task-" + taskID;
    createArchivedCard.setAttribute("data-taskid", taskID);
    addCardListeners(createArchivedCard);

    //create card header
    let createArchivedHeader = document.createElement("div");
    let createTags = document.createElement("div");
    let createEmblem = document.createElement("img");
    let createTag = document.createElement("span");

    createArchivedHeader.className = "archived-card-header";
    createArchivedHeader.setAttribute("tabindex", "0");
    createArchivedHeader.setAttribute("aria-label", "Archived card header showing tag and more actions button");
    createTags.className = "tags";
    createTags.setAttribute("aria-label", "Tags used to show workflow");
    createTag.className = "tag";
    createTag.innerHTML = tagName;
    createTag.setAttribute("style", "background-color: " + tagColor + "; color: " + tagTextColor + ";");
    createTag.setAttribute("tabindex", "0");
    createTag.setAttribute("aria-label", "Workflow " + tagName);
    createEmblem.setAttribute("src", "static/img/archived.png");
    createEmblem.setAttribute("height", "20px");
    createEmblem.setAttribute("width", "20px");
    createEmblem.setAttribute("alt", "Archived icon");


    createArchivedHeader.appendChild(createTags);
    createTags.appendChild(createEmblem);
    createTags.appendChild(createTag);

    //create card body
    let createArchivedBody = document.createElement("div");
    let createArchivedTitle = document.createElement("p");

    createArchivedBody.className = "archived-card-body";
    createArchivedBody.setAttribute("aria-label", "Archived task card body");
    createArchivedTitle.innerHTML = title;
    createArchivedTitle.setAttribute("aria-label", "Archived task card title");

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
    createArchivedFooter.setAttribute("aria-label", "Archived task card footer");

    createAssignee.className = "assignee";
    createAssignee.setAttribute("tabindex", "0");
    createAssignee.setAttribute("aria-label", "Task was assigned to " + memberFullName);
    createAssigneeIcon.className = "icon";
    createAssigneeIconImg.setAttribute("src", "static/img/person.png");
    createAssigneeIconImg.setAttribute("height", "13px");
    createAssigneeIconImg.setAttribute("width", "13px");
    createAssigneeIconImg.setAttribute("alt", "Person icon")
    createAssigneeMember.innerHTML = memberFullName;

    createDueDate.className = "dueDate";
    createDueDate.setAttribute("tabindex", "0");
    createDueDate.setAttribute("aria-label", "task was due " + dueDate);
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
                getProgressBar.setAttribute("tabindex", "0");
                getProgressBar.setAttribute("aria-label", "amount of done task are at " + progress + "%");

            }
        }
    }
}

//function for creating a banner on the front page when a task is past due.
function overDueBanner(title, task) {
    let getParent = document.getElementById("banners");

    let createNotification = document.createElement("div");
    let createNotificationIcon = document.createElement("div");
    let createNotificationIconImg = document.createElement("img");
    let createNotificationTxt = document.createElement("div");
    let createNotificationTitle = document.createElement("h1");
    let createNotificationMsg = document.createElement("p");

    createNotification.className = "notification";
    createNotification.setAttribute("aria-label", "Notification notifying a task is overdue");

    createNotificationIcon.className = "notification-icon";

    createNotificationIconImg.setAttribute("src", "static/img/warning.png");
    createNotificationIconImg.setAttribute("width", "22px");
    createNotificationIconImg.setAttribute("height", "20px");
    createNotificationIconImg.setAttribute("alt", "Warning icon displaying overdue task");

    createNotificationTxt.className = "notification-text";

    createNotificationTitle.className = "notification-heading";
    createNotificationTitle.innerHTML = title;

    createNotificationMsg.className = "notification-message";
    createNotificationMsg.innerHTML = "Task " + task + " is overdue! Please extend the due date, or resolve it as soon as possible. To resolve it; move the task to done."


    getParent.appendChild(createNotification);
    createNotification.appendChild(createNotificationIcon);
    createNotificationIcon.appendChild(createNotificationIconImg);
    createNotification.appendChild(createNotificationTxt);
    createNotificationTxt.appendChild(createNotificationTitle);
    createNotificationTxt.appendChild(createNotificationMsg);
}

//function for creating a banner on the front page when a task is past due.
function successBanner(title, text, time) {
    let getParent = document.getElementById("banners");

    let createNotification = document.createElement("div");
    let createNotificationIcon = document.createElement("div");
    let createNotificationIconImg = document.createElement("img");
    let createNotificationTxt = document.createElement("div");
    let createNotificationTitle = document.createElement("h1");
    let createNotificationMsg = document.createElement("p");

    createNotification.className = "notification is-success";
    createNotification.id = "success-notification";
    createNotification.setAttribute("aria-label", "Notification notifying a successfull action");

    createNotificationIcon.className = "notification-icon";

    createNotificationIconImg.setAttribute("src", "static/img/success.png");
    createNotificationIconImg.setAttribute("width", "20px");
    createNotificationIconImg.setAttribute("height", "20px");
    createNotificationIconImg.setAttribute("alt", "Success icon on succes message");

    createNotificationTxt.className = "notification-text is-success";

    createNotificationTitle.className = "notification-heading";
    createNotificationTitle.innerHTML = title;

    createNotificationMsg.className = "notification-message is-success";
    createNotificationMsg.innerHTML = text


    getParent.appendChild(createNotification);
    createNotification.appendChild(createNotificationIcon);
    createNotificationIcon.appendChild(createNotificationIconImg);
    createNotification.appendChild(createNotificationTxt);
    createNotificationTxt.appendChild(createNotificationTitle);
    createNotificationTxt.appendChild(createNotificationMsg);

    let timeleft = time;
    let timer = setInterval(function() {
        timeleft--;
        console.log(timeleft);
        if(timeleft <= 0) {
            document.getElementById("success-notification").remove();
            clearInterval(timer);
        }
    }, 1000);
}