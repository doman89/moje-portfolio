let positionSections = [
    $(".header").offset().top,
    $(".slider").offset().top,
    $(".sprites").offset().top,
    $(".buildingAnimation").offset().top
]

$("a").on("click", function () {
    const goToSection = "." + $(this).attr("data-position");
    $("html, body").animate({
        scrollTop: $(goToSection).offset().top
    })
});

$(".hamburger").on("click", function () {
    $(".hamburger, aside, .fas").toggleClass("active");
});

$(window).on("keydown", function (e) {
    if (e.keyCode == 40) {
        for (let i = 0; i < positionSections.length; i++)
            if ($(document).scrollTop() < positionSections[i]) {
                $("html, body").animate({
                    scrollTop: positionSections[i],
                }, 500);
                break;
            }
    } else if (e.keyCode == 38) {
        for (let i = 0; i < positionSections.length; i++) {
            if (($(document).scrollTop() > positionSections[i]) && ($(document).scrollTop() <= positionSections[i + 1])) {
                $("html, body").animate({
                    scrollTop: positionSections[i],
                }, 500);
                break;
            }
        }
    }
});