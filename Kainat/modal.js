var main = document.getElementById("mainBox");
var openBtn = document.getElementById("button");
var closeBtn = document.getElementsByClassName("closeBtn")[0];

openBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

function openModal(){
   main.style.display = 'block';
}

function closeModal(){
    main.style.display = 'none';
}







/*var btn = document.getElementById('boxOpener');
var box = document.getElementById('.box');

function attachBoxListeners(boxFunction){
boxFunction.querySelector('.closeBox').addEventListener('click', mainBox);
boxFunction.querySelector('.overlay').addEventListener('click', mainBox);
}

function detachBoxListener(boxFunction){
boxFunction.querySelector('.closeBox').removeEventListener('click', mainBox);
boxFunction.querySelector('.overlay').removeEventListener('click', mainBox);
}

function mainBox(){
    var currentState = box.style.display;
    
    if(currentState === 'none'){
        box.style.display = 'block';
        attachBoxListeners(box);
    } else {
        box.style.display = 'none';
        detachBoxListener(box);
    }
}

btn.addEventListener('click', mainBox);*/


































