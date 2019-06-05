const taskCard = document.querySelector(".task-card");
const taskCards = document.querySelectorAll(".task-card")
const cardContainers = document.querySelectorAll(".card-container");

var draggingCard = null;

// card listeners
taskCards.forEach(addCardListeners);

// Loop through taskContainer boxes and add listeners
cardContainers.forEach(addContainerListeners);

// Drag Functions
function dragStart(event) {
    this.className += " card-hold";
    setTimeout(() => (this.className = "invisible"), 0); //set timeout so card wont dissapear
    draggingCard = event.target;
}

function dragEnd() {
    this.className = "task-card";
    draggingCard = null;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += " card-container-hover";
}

function dragLeave() {
    this.className = "card-container";
}

function dragDrop(target) {
    this.className = "card-container";
    this.append(draggingCard);

    let getCardId = parseInt(draggingCard.getAttribute("data-taskid"));
    let getList = this.id;

    changeTaskStatus(getCardId, getList);
}

function addCardListeners(taskCard) {
    taskCard.addEventListener("dragstart", dragStart);
    taskCard.addEventListener("dragend", dragEnd);
    taskCard.addEventListener("click", openEditModal);
}

function addContainerListeners(cardContainer) {
    cardContainer.addEventListener("dragover", dragOver);
    cardContainer.addEventListener("dragenter", dragEnter);
    cardContainer.addEventListener("dragleave", dragLeave);
    cardContainer.addEventListener("drop", dragDrop);
}