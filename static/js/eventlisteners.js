//listner for
/*
archive tasks
addTask*/

const getBoard= document.getElementById("board");
const getArchive = document.getElementById("archive");
const addNewCardToDo = document.getElementById("add-new-task-to-do");
const addNewCardInProgress = document.getElementById("add-new-task-in-progress");
const addNewCardDone = document.getElementById("add-new-task-done");
const archiveCards = document.getElementById("done-list-archive-cards");
const addNewModal = document.getElementById("add-new-modal");
const modalOpenBtn = document.getElementById("open-add-new-modal");
const getActionBtn = document.querySelectorAll(".task-card");

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

if (addNewModal) {
    addNewModal.addEventListener("submit", function() {
        addTask();
    });
}

if (modalOpenBtn) {
    modalOpenBtn.addEventListener("click", function() {
        openModal();
    });
}

getActionBtn.forEach(addActionListeners);

function addActionListeners(getActionBtn) {
    getActionBtn.addEventListener("click", editTask);
}
