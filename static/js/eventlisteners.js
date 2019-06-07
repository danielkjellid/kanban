const getBoard= document.getElementById("board");
const getArchive = document.getElementById("archive");
const addNewCardToDo = document.getElementById("add-new-task-to-do");
const addNewCardInProgress = document.getElementById("add-new-task-in-progress");
const addNewCardDone = document.getElementById("add-new-task-done");
const archiveCards = document.getElementById("done-list-archive-cards");
const addNewModal = document.getElementById("add-new-modal");
const editTaskModal = document.getElementById("edit-task-modal");
const modalOpenBtn = document.getElementById("open-add-new-modal");
const getCancelNewTaskModalBtn = document.getElementById("add-new-task-cancel");
const getCancelNewTagModalBtn = document.getElementById("add-new-tag-cancel");
const getCancelNewMemberBtn = document.getElementById("add-new-member-cancel");
const getEditCardDiscardBtn = document.getElementById("edit-task-discard");
const getAddNewTagModalBtn = document.getElementById("add-new-tag-submit");
const getAddNewMemberModalBtn = document.getElementById("add-new-member-submit");
const getModalTabCard = document.getElementById("new-card");
const getModalTabMember = document.getElementById("new-member");
const getModalTabTag = document.getElementById("new-tag");

//onload functions based on site id
if(getBoard) {
    getBoard.addEventListener("onload", onIndexLoad());

} else if (getArchive) {
    getArchive.addEventListener("onload", onArchiveLoad());
}

if (addNewCardToDo) {
    addNewCardToDo.addEventListener("click", function() {
        addTaskFromList("list-to-do");
    });
}

if (addNewCardInProgress) {
    addNewCardInProgress.addEventListener("click", function() {
        addTaskFromList("list-in-progress");
    });
}

if (addNewCardDone) {
    addNewCardDone.addEventListener("click", function() {
        addTaskFromList("list-done");
    });
}

if (archiveCards) {
    archiveCards.addEventListener("click", function() {
        archiveTasks();
    });
}

if (modalOpenBtn) {
    modalOpenBtn.addEventListener("click", function() {
        openModal('add-new-modal');
    });
}

//buttons for closing modals
if (getCancelNewTaskModalBtn) {
    getCancelNewTaskModalBtn.addEventListener("click", closeModal);
}

if (getCancelNewTagModalBtn) {
    getCancelNewTagModalBtn.addEventListener("click", closeModal);
}

if (getCancelNewMemberBtn) {
    getCancelNewMemberBtn.addEventListener("click", closeModal);
}   

if (getEditCardDiscardBtn) {
    getEditCardDiscardBtn.addEventListener("click", closeModal);
}

if(getAddNewTagModalBtn) {
    getAddNewTagModalBtn.addEventListener("click", function() {
        //add tag
        addNewTag();
        //remove and readd tags in modals
        deleteTagsAddNewSelect();
        listTagsNewSelect();
        deleteTagsEditSelect();
        listTagsEditSelect();
        //close modal
        closeModal();
    });
}

if(getAddNewMemberModalBtn) {
    getAddNewMemberModalBtn.addEventListener("click", function() {
        //add member
        addNewMember();
        //remove amd readd members in modals
        deleteMembersAddNewSelect();
        listMembersNewSelect();
        deleteMembersEditSelect();
        listMembersEditSelect();
        //close modal
        closeModal();
    });
}

if (getModalTabCard) {
    getModalTabCard.addEventListener("click", function() {
        openNewModal(event, "new-card-modal");
    });
}

if (getModalTabMember) {
    getModalTabMember.addEventListener("click", function() {
        openNewModal(event, "new-member-modal");
    });
}

if (getModalTabTag) {
    getModalTabTag.addEventListener("click", function() {
        openNewModal(event, "new-tag-modal");
    })
}

//have to be on the bottom of the file. If not empty tasks will be added when adding memebers/tags
if (addNewModal) {
    addNewModal.addEventListener("submit", function() {
        addTask();
    });
}

