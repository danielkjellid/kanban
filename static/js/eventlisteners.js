//listner for
/*
archive tasks
addTask*/

const getBody = document.querySelector("body");
const addNewCardToDo = document.getElementById("add-new-task-to-do");
const addNewCardInProgress = document.getElementById("add-new-task-in-progress");
const addNewCardDone = document.getElementById("add-new-task-done");
const archiveCards = document.getElementById("done-list-archive-cards");
const addNewModal = document.getElementById("add-new-modal");
const modalOpenBtn = document.getElementById("open-add-new-modal");

getBody.addEventListener("onload", onLoad());

addNewCardToDo.addEventListener("click", function() {
    addTaskFromList("list-to-do");
});
addNewCardInProgress.addEventListener("click", function() {
    addTaskFromList("list-in-progress");
});
addNewCardDone.addEventListener("click", function() {
    addTaskFromList("list-done");
});

archiveCards.addEventListener("click", function() {
    archiveTasks();
});

addNewModal.addEventListener("submit", function() {
    addTask();
});

modalOpenBtn.addEventListener("click", function() {
    openModal();
});