// For Navbar

document.addEventListener('DOMContentLoaded', function () {
    const sideLinksEL = document.querySelectorAll(".sidebar .side-menu li a");

    // When the user clicks on the link, add active class to the current link
    // and remove active class from the other links
    sideLinksEL.forEach((links) => {
        const li = links.parentElement;
        links.addEventListener("click", () => {
            sideLinksEL.forEach((i) => {
                i.parentElement.classList.remove("active");
            });
            li.classList.add("active");
        });
    });
});