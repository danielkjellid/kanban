//function for loading other functions on site refresh.
function onIndexLoad() {
    connectToDB("KanbanDatabase", 19);
    listTagsOverview();
    listTagsNewSelect();
    listTagsEditSelect();
    listMemberOverview();
    listMembersNewSelect();
    listMembersEditSelect();
}

function onArchiveLoad() {
    connectToDB("KanbanDatabase", 19);
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

function deleteMemberListOverview() {
    let getMemberContainer = document.getElementById("member-container");
                        
    while (getMemberContainer.firstChild) {
        getMemberContainer.removeChild(getMemberContainer.firstChild);
    }
}

function deleteTagListOverview() {
    let getTagContainer = document.getElementById("tag-container");
                        
    while (getTagContainer.firstChild) {
        getTagContainer.removeChild(getTagContainer.firstChild);
    }
}

function activateModal(id) {
    var modal = document.getElementById(id); 
    var html = document.querySelector('html');
    modal.classList.add('is-active');
    html.classList.add('is-clipped');

    modal.querySelector('.modal-background').addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.remove('is-active');
        html.classList.remove('is-clipped');
    });

}

