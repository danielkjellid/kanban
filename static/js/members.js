let team =[
    {
        id: 1,
        name: "Daniel Kjellid",
        initials: "DK"
    },
    /*
    {
        id: 2,
        name: "Jonmar Rmt",
        initials: "JR"
    },
    */
    {
        id: 2,
        name: "Kainat Zahoor",
        initials: "KZ"
    },
    {
        id: 3,
        name: "Linnea S. Fylling",
        initials: "LF"
    },
    {
        id: 4,
        name: "Magomed Derbtichev",
        initials: "MD"
    },
    {
        id: 5,
        name: "Sultan Khan",
        initials: "SK"
    },
]

function addMember() {
    fullname = document.getElementById('fullname').value;
    initials = document.getElementById('initials').value;
    team.push({
        id: team.length+1,
        name: this.fullname, 
        initials: this.initials
    });
    console.log(team);
}

var addMemberForm = document.getElementById("addMemberForm");

function handleForm(e) {
    e.preventDefault();
}

//to prevent page from reloading
addMemberForm.addEventListener('submit', handleForm);

//add options to member in "Add card to member firm"
var selectMember = document.getElementById("MemberToCard");

for (i = 0; i < team.length; i++) {
    var option = document.createElement('option');
    option.value = team[i].name;
    option.text = team[i].name;
    selectMember.add(option);
}
