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

function createCard() {
    var card = document.createElement('div');
    card.className = "card";
    card.id = "new-card";

    card.setAttribute('draggable', true);
    addCardListeners(card);
    return card;
}

function addCard(destination) {
    container = document.getElementById(destination);
    createCard();
    container.appendChild(createCard());
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