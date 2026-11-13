// Find the content pages and navigation controls.
const pages = document.querySelectorAll(".page");

const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

const pageStatus = document.getElementById("page-status");
const navigation = document.querySelector(".page-navigation");

// JavaScript counts from zero.
// 0 = first page, 1 = second page, 2 = third page.
let currentPage = 0;


// Display one page and update the controls.
function showPage(pageIndex, moveFocus = false) {
    // Prevent navigation outside the available pages.
    if (pageIndex < 0 || pageIndex >= pages.length) {
        return;
    }

    currentPage = pageIndex;

    pages.forEach(function (page, index) {
        const isCurrentPage = index === currentPage;

        page.hidden = !isCurrentPage;

        // Remove the previous animation class.
        page.classList.remove("page-enter");
    });

    const activePage = pages[currentPage];

    // Restart the entrance animation.
    void activePage.offsetWidth;
    activePage.classList.add("page-enter");

    // Disable Previous on the first page.
    previousButton.disabled = currentPage === 0;

    // Disable Next on the last page.
    nextButton.disabled = currentPage === pages.length - 1;

    const heading = activePage.querySelector(".page-title");

    pageStatus.textContent =
        `Page ${currentPage + 1} of ${pages.length} - ${heading.textContent.trim()}`;

    // After a button click, focus the new page heading.
    // This also helps keyboard and screen-reader users.
    if (moveFocus) {
        heading.focus();
    }
}


// Go back one page.
previousButton.addEventListener("click", function () {
    showPage(currentPage - 1, true);
});


// Go forward one page.
nextButton.addEventListener("click", function () {
    showPage(currentPage + 1, true);
});


// Start with the first page and reveal the controls.
// Without JavaScript, all content remains readable.
showPage(0);
navigation.hidden = false;