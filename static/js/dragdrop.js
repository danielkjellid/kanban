//constants for getting cards and containers
const taskCard = document.querySelector(".task-card");
const taskCards = document.querySelectorAll(".task-card")
const cardContainers = document.querySelectorAll(".card-container");

var draggingCard = null;

//loop through cards and add listeners
taskCards.forEach(addCardListeners);

//loop through taskContainer boxes and add listeners
cardContainers.forEach(addContainerListeners);

//fired wheen a card is first dragged
function dragStart(event) {
    this.className += " card-hold";
    //set timeout so card wont dissapear
    setTimeout(() => (this.className = "invisible"), 0);
    draggingCard = event.target;
}

//fired when card is released and placed in card-container
function dragEnd() {
    this.className = "task-card";
    draggingCard = null;
}

//fired when card is moving
function dragOver(e) {
    e.preventDefault();
}

//fired when card enters card-container
function dragEnter(e) {
    e.preventDefault();
    this.className += " card-container-hover";
}

//fired when card leaves its original card-container
function dragLeave() {
    this.className = "card-container";
}

//fired when card is dropped into container
function dragDrop(target) {
    this.className = "card-container";
    this.append(draggingCard);

    //used to changee task status upon dropping card
    let getCardId = parseInt(draggingCard.getAttribute("data-taskid"));
    let getList = this.id;

    changeTaskStatus(getCardId, getList);
}

//eventlisteners for cards
function addCardListeners(taskCard) {
    taskCard.addEventListener("dragstart", dragStart);
    taskCard.addEventListener("dragend", dragEnd);
    //on task click
    taskCard.addEventListener("click", openEditModal);
}

//eventlisteners for container
function addContainerListeners(cardContainer) {
    cardContainer.addEventListener("dragover", dragOver);
    cardContainer.addEventListener("dragenter", dragEnter);
    cardContainer.addEventListener("dragleave", dragLeave);
    cardContainer.addEventListener("drop", dragDrop);
}