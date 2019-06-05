function openNewModal(evt, pageName) {
    
    //declare the variables
    let i, 
        tabContent, 
        tabLinks;
    
    //Get all elements with class="modals" and hide them
    tabContent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
    
    //Get all elements with class="menu-item" and remove the class "active"
    tabLinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tabLinks.length; i++) { 
            tabLinks[i].className = tabLinks[i].className.replace(" active", "");
        }
    
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("new-card").click(); 