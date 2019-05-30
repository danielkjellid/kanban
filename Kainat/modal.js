//Function to open and close modal
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
function openTab(evt, tabName) {
    //Declaring all variables
    var i, tabContent, tabs; //het tablinks
    
    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    
    tabs = document.getElementsByClassName("tabs");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}







