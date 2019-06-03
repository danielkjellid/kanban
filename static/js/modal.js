function openModal() {
    document.querySelector('a#open-add-new-modal').addEventListener('click', function(event) {
        event.preventDefault();
        var modal = document.querySelector('.modal');  // only works with a single modal
        var html = document.querySelector('html');
        modal.classList.add('is-active');
        html.classList.add('is-clipped');
    
        modal.querySelector('.modal-background').addEventListener('click', function(e) {
                e.preventDefault();
                modal.classList.remove('is-active');
                html.classList.remove('is-clipped');
        });
    });
}