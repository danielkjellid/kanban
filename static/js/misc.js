//function to load different functions onload.
function onLoad() {
    listMembers();
    listTasks();
    listAssignments();
}

//form handler to prevent page from reloading
function handleForm(e) {
    e.preventDefault();
}