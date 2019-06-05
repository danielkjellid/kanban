function openNewModal(pageName, elmnt) {
    
    let i, tabForm, menuItem;
    
    tabForm = document.getElementsByClassName("tab-form");
        for (i = 0; i < tabForm.length; i++) {
            tabForm[i].style.display = "none";
        }
    
    menuItem = document.getElementsByClassName("menu-item");
        for (i = 0; i < menuItem.length; i++) { 
            menuItem[i].style.display = "none";
        }

}

document.getElementById("defaultOpen").click();