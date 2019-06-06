//function for loading other functions on site main page refresh.
function onIndexLoad() {
    connectToDB("KanbanDatabase", 20);
    listTagsOverview();
    listTagsNewSelect();
    listTagsEditSelect();
    listMemberOverview();
    listMembersNewSelect();
    listMembersEditSelect();
}

//function for loading other functions on archived site page refresh
function onArchiveLoad() {
    connectToDB("KanbanDatabase", 20);
}

//function for finding memberInitials given memberFullName on add-new-card modal input
function findMemberInitials(object) {
    let result = members.filter( obj => {
        return obj.memberFullName == object;
    })[0].memberInitials;

    return result;
}

//function for finding tagColor given tagName on add-new-card modal input
function findTagColor(object) {
    let result = tags.filter(obj => {
        return obj.tagName == object;
    })[0].tagColor;

    return result;
}

//function for finding tagTextColor given tagName on add-new-card modal input
function findTagTextColor(object) {
    let result = tags.filter(obj => {
        return obj.tagName == object;
    })[0].tagTextColor;

    return result;
}

//function for removing upcoming due dates list. Used when cards are moved to done.
function deleteDueList() {
    let getDueDateList = document.getElementById("due-date-card-container");
    let getDueDateExpired = document.getElementById("due-date-expired-container");

    while (getDueDateExpired.firstChild) {
        getDueDateExpired.removeChild(getDueDateExpired.firstChild);
    }

    while (getDueDateList.firstChild) {
        getDueDateList.removeChild(getDueDateList.firstChild);
        getDueDateExpired.setAttribute("style", "display: none;")
    }
}

//function for removing elements from DOM when archived.
function deleteDoneList() {
    let getTaskContainer = document.getElementById("list-done");
                        
    while (getTaskContainer.firstChild) {
        getTaskContainer.removeChild(getTaskContainer.firstChild);
    }
}

//function for deleting members list at main page. Used when new members are added, and dom needs to be reloaded.
function deleteMemberListOverview() {
    let getMemberContainer = document.getElementById("member-container");
                        
    while (getMemberContainer.firstChild) {
        getMemberContainer.removeChild(getMemberContainer.firstChild);
    }
}

function deleteMembersAddNewSelect() {
    let getMemberSelect = document.getElementById("modal-add-new-task-member");
                        
    while (getMemberSelect.firstChild) {
        getMemberSelect.removeChild(getMemberSelect.firstChild);
    }
}

function deleteMembersEditSelect() {
    let getMemberSelect = document.getElementById("modal-edit-task-member");
                        
    while (getMemberSelect.firstChild) {
        getMemberSelect.removeChild(getMemberSelect.firstChild);
    }
}

//function for deleting tags list at main page. Used when new members are added, and dom needs to be reloaded.
function deleteTagListOverview() {
    let getTagContainer = document.getElementById("tag-container");
                        
    while (getTagContainer.firstChild) {
        getTagContainer.removeChild(getTagContainer.firstChild);
    }
}

function deleteTagsAddNewSelect() {
    let getTagSelect = document.getElementById("modal-add-new-task-tag");
                        
    while (getTagSelect.firstChild) {
        getTagSelect.removeChild(getTagSelect.firstChild);
    }
}

function deleteTagsEditSelect() {
    let getTagSelect = document.getElementById("modal-edit-task-tag");
                        
    while (getTagSelect.firstChild) {
        getTagSelect.removeChild(getTagSelect.firstChild);
    }
}

//function for deleting overdue notifications at main page. Used when overdue tasks are marked as done.
function deleteOverDueNotifications() {
    let getOverDueContainer = document.getElementById("banners");

    while (getOverDueContainer.firstChild) {
        getOverDueContainer.removeChild(getOverDueContainer.firstChild);
    }
}

//function for preventing forms reloading after submit. Used when adding new members and tags
function handleForm(e){
    e.preventDefault();
}

