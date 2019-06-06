function myFunction() {


  document.getElementById("myDropdown").classList.toggle("show");

}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function display() {
    const dropdown = document.getElementById("myDropdown");
    dropdown.style.display = "block";
    document.getElementById("cover").style.display = "block";
}

function display1() {
    const dropdown = document.getElementById("myDropdown1");
    dropdown.style.display = "block";
    document.getElementById("cover").style.display = "block";
}

function display2() {
    const dropdown = document.getElementById("myDropdown2");
    dropdown.style.display = "block";
    document.getElementById("cover").style.display = "block";
}
function removePop() {
    const dropdown = document.getElementById("myDropdown");
    dropdown.style.display = "none";
    const dropdown1 = document.getElementById("myDropdown1");
    dropdown1.style.display = "none";
    const dropdown2 = document.getElementById("myDropdown2");
    dropdown2.style.display = "none";
    document.getElementById("cover").style.display = "none";
}