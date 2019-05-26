let tasks = [
    {
        id: 1,
        tags: {
        },
        title: "Desgin kanban board for exam project",
        dueDate: "2019-05-25",
        description: "This is a description describing the task that is to be done. Lorem ipsum dolor amet asymmetrical artisan literally pork belly pug microdosing kitsch authentic pinterest subway tile tousled craft beer church-key art party. Chambray brooklyn copper DemsuigndkiarencbtatnrabdoeairPdhofonreemxaumstawcehbe typewriter paleo selvage."
    }
]

var selectCard = document.getElementById("CardToMember");

for (i = 0; i < tasks.length; i++) {
    var option = document.createElement('option');
    option.value = tasks[i].title;
    option.text = tasks[i].title;
    selectCard.add(option);
}

function createCard() {
    var card = document.createElement('div');
    card.className = "card";

    card.setAttribute('draggable', true);
    addCardListeners(card);
    return card;
}

function addCard(destination) {
    container = document.getElementById(destination);
    createCard();
    container.appendChild(createCard());
}