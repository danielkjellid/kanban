const card = document.querySelector('.card');
const cards = document.querySelectorAll('.card')
const taskContainers = document.querySelectorAll('.taskContainer');

var draggingCard = null;

// card listeners
cards.forEach(addCardListeners);

// Loop through taskContainer boxes and add listeners
taskContainers.forEach(addContainerListeners);

// Drag Functions
function dragStart(event) {
    this.className += ' hold';
    setTimeout(() => (this.className = 'invisible'), 0); //set timeout so card wont dissapear
    draggingCard = event.target;
}

function dragEnd() {
    this.className = 'card';
    draggingCard = null;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.className += ' hover';
}

function dragLeave() {
    this.className = 'taskContainer';
}

function dragDrop() {
    this.className = 'taskContainer';
    this.append(draggingCard);
}

//add card function
function addTaskContainer() {
    var taskContainer = document.createElement('div');
    taskContainer.className = "taskContainer";
    taskContainer.id = "add-new-card";
    addContainerListeners(taskContainer);
    document.getElementById("backlog").append(taskContainer);
    return taskContainer;
}

function addCard() {
    var container = addTaskContainer();
    var card = document.createElement('div');
    card.className = "card";
    card.id = "new-card";

    card.setAttribute('draggable', true);
    addCardListeners(card);
    container.appendChild(card);
}

function addCardListeners(card) {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
}

function addContainerListeners(taskContainer) {
    taskContainer.addEventListener('dragover', dragOver);
    taskContainer.addEventListener('dragenter', dragEnter);
    taskContainer.addEventListener('dragleave', dragLeave);
    taskContainer.addEventListener('drop', dragDrop);
}