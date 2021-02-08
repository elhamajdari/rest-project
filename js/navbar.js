export function setNavbarBackground() {
    updateNavbarBackgroundColor();

    $(window).scroll(function(){
        updateNavbarBackgroundColor();
    });
}

function updateNavbarBackgroundColor() {
    let windowScrollTop = $(window).scrollTop();
    let navbarSelector = $('.navbar');

    if (windowScrollTop >= 150) {
        updateNavbarBackgroundColorToWhite(navbarSelector);
    } else {
        updateNavbarBackgroundColorToTransparent(navbarSelector);
    }
}

function updateNavbarBackgroundColorToWhite(navbarSelector) {
    navbarSelector.removeClass('trans-navbar');
    navbarSelector.attr('value', 'white');
}

function updateNavbarBackgroundColorToTransparent(navbarSelector) {
    navbarSelector.addClass('trans-navbar');
    navbarSelector.attr('value', 'transparent');
}