
let btnCancel = document.getElementsById("btnCancel")[0];
closeBtn.addEventListener('click', closeModal);

function openModal(){
   main.style.display = 'block';
}

function closeModal(){
    main.style.display = 'none';
}

