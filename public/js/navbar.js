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

// function loadContent(page) {
//     $.get(page, function(data) {
//       $("#changing-container-placeholder").html(data);
//     });
// }