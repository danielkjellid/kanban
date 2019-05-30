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




//Tab function


/*

//Tab function

var firstTab = document.getElementById("firstTab");
var overview = document.getElementsByClassName("overview");
var secondTab = document.getElementById("secondTab");
var edit = document.getElementsByClassName("edit");


function open(tabName) {
    var i;
    var x = document.getElementsByClassName(tabs);
    for(i = 0; i < x.length; i++) {
        x[i].style.display = none;
    }
    document.getElementById(tabName).style.display = "block";
}

*/





























