function openModal() {
    //get a-element with id "open-add-new-modal"
    document.querySelector('a#open-add-new-modal').addEventListener('click', function(event) {
        event.preventDefault();
        //find element with .modal class and html element
        var modal = document.querySelector('.modal');  // only works with a single modal
        var html = document.querySelector('html');
        //add is-active to element with modal class, and is-clipped to html
        modal.classList.add('is-active');
        html.classList.add('is-clipped');
        
        //when modal-background is clicked, close modal
        modal.querySelector('.modal-background').addEventListener('click', function(e) {
            closeModal();
        });
    });
}

function closeModal() {
    let getAddNewModal = document.getElementById("add-new-modal");
    let getEditModal = document.getElementById("edit-modal");
    let html = document.querySelector('html');

    getAddNewModal.classList.remove("is-active");
    getEditModal.classList.remove("is-active");
    html.classList.remove('is-clipped');
}