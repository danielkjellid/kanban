//function for loading other functions on site refresh.
function onIndexLoad() {
    connectToDB("KanbanDatabase", 17);
    listTagsOverview();
    listTagsSelect();
}

function onArchiveLoad() {
    connectToDB("KanbanDatabase", 17);
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

function deleteDoneList() {
    let getTaskContainer = document.getElementById("list-done");
                        
    while (getTaskContainer.firstChild) {
        getTaskContainer.removeChild(getTaskContainer.firstChild);
    }
}

