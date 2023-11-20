/*
    For Navbar in Landing Page
    Change the active class of the current link when the user clicks on it
    and remove active class from the other links
*/

const sideLinksEL = document.querySelectorAll(".sidebar .side-menu li a");

sideLinksEL.forEach((links) => {
    const li = links.parentElement;
    links.addEventListener("click", () => {
        sideLinksEL.forEach((i) => {
            i.parentElement.classList.remove("active");
        });
        li.classList.add("active");
    });
});