let assignments = [
    {
        member: 1,
        card: 1
    },
    {
        member: 1,
        card: 2
    },
    {
        member: 2,
        card: 4
    }
]

function addAssignment() {
    member = document.getElementById("memberToCards");
    task = document.getElementById("CardToMember");
    assignments.push({
        member: this.member.id,
        card: this.card.id
    })
}

var addCardToMemberForm = document.getElementById("addCardToMemberForm");

function handleForm(e) {
    e.preventDefault();
}

//prevent refresh after submit
addCardToMemberForm.addEventListener('submit', handleForm);