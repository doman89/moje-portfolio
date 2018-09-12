const menuIcon = document.querySelector(".hamburger");
const icons = document.querySelectorAll(".fas");
const menu = document.querySelector("aside");
const link = document.querySelectorAll("li");
const portfolioButton = document.querySelector(".button");
const modalCloseButton = document.querySelector(".close");
const wrapper = document.querySelector(".wrapper");
const popupWindow = document.querySelector(".modal");
const speedScrollWebPage = 30;
const progressBar = document.querySelector(".progressBar");
const header = document.querySelector("header");
let timerScrollWebPage;

//tablica położenia sekcji na stronie
let documentElementsPosition = [
    document.querySelector('header').offsetTop,
    document.querySelector('.aboutme').offsetTop,
    document.querySelector('.technology').offsetTop,
    document.querySelector('.projects').offsetTop,
    document.querySelector('.motto').offsetTop,
    document.querySelector('.contact').offsetTop
];

//aktualizacja pozycji sekcji po zmianie rozmiaru okna - bez tego sypie sie :)
window.addEventListener("resize", () => {
    documentElementsPosition = [
        document.querySelector('header').offsetTop,
        document.querySelector('.aboutme').offsetTop,
        document.querySelector('.technology').offsetTop,
        document.querySelector('.projects').offsetTop,
        document.querySelector('.motto').offsetTop,
        document.querySelector('.contact').offsetTop
    ]
})
//typ wyliczeniowy do pracy z sekcjami na stronie
const enumPosition = {
    HEADER: 0,
    ABOUTME: 1,
    TECHNOLOGY: 2,
    PROJECTS: 3,
    MOTTO: 4,
    CONTACT: 5
}

//obsługa kliknięcia hamburgera
const toggleMenuHamburger = () => {
    menuIcon.classList.toggle("active");
    for (let i = 0; i < icons.length; i++)
        icons[i].classList.toggle("active");
    menu.classList.toggle("active");
}

//obsługa zamknięcia popupa
const closePopupWindow = () => {
    wrapper.classList.add("active");
    popupWindow.classList.remove("active");
}

//scrollowanie do określonej pozycji strony
function scrollWebPage(positionY) {
    if ((positionY + speedScrollWebPage) > document.documentElement.innerHeight) {
        window.scrollTo(0, positionY);
    } else if (window.pageYOffset > positionY) {
        if (window.pageYOffset - speedScrollWebPage > positionY + 1)
            window.scrollTo(0, (window.pageYOffset - speedScrollWebPage));
        else
            window.scrollTo(0, (window.pageYOffset - 1));
    } else if (window.pageYOffset < positionY) {
        if (window.pageYOffset + speedScrollWebPage < positionY - 1)
            window.scrollTo(0, (window.pageYOffset + speedScrollWebPage));
        else
            window.scrollTo(0, (window.pageYOffset + 1));
    }
    if (window.pageYOffset != positionY)
        timerScrollWebPage = setTimeout(`scrollWebPage(${positionY})`, 1);
    else
        timerScrollWebPage = null;
}

//nasłuchiwanie na ikonke hamburgera oraz na hiperłącza
portfolioButton.addEventListener("click", () => {
    timerScrollWebPage = setTimeout(`scrollWebPage(${documentElementsPosition[enumPosition.PROJECTS]})`, 1);
});
modalCloseButton.addEventListener("click", closePopupWindow);
menuIcon.addEventListener("click", toggleMenuHamburger);
for (let i = 0; i < link.length; i++) {
    link[i].addEventListener("click", () => {
        toggleMenuHamburger();
        timerScrollWebPage = setTimeout(`scrollWebPage(${documentElementsPosition[i]})`, 1);
    });
};

//obsługa paska wskazującego pozycję strony oraz efektów przy scrollu
window.addEventListener("scroll", function () {
    const currentPercent = Math.round(window.pageYOffset / (document.documentElement.offsetHeight - window.innerHeight) * 100);
    progressBar.style.width = currentPercent + "%";
    if (window.scrollY < documentElementsPosition[enumPosition.ABOUTME]) {
        header.style.filter = `grayscale(${1.5 * window.scrollY / documentElementsPosition[enumPosition.ABOUTME]})`;
    }
    if ((window.scrollY < documentElementsPosition[enumPosition.TECHNOLOGY])) {
        if (((window.scrollY - documentElementsPosition[enumPosition.ABOUTME]) / (documentElementsPosition[enumPosition.TECHNOLOGY] - documentElementsPosition[enumPosition.ABOUTME])) > -0.15) {
            document.querySelector(".aboutme p:nth-of-type(1)").classList.add("active");
        }
    }
})

//obsługa klawiszy w lewo i prawo
window.addEventListener("keydown", (e) => {
    if ((e.keyCode == 38) && (timerScrollWebPage == null)) {
        for (let iteration = 0; iteration < documentElementsPosition.length; iteration++) {
            if ((iteration == (documentElementsPosition.length - 1)) && (documentElementsPosition[iteration] <= window.pageYOffset) && (documentElementsPosition[iteration] <= document.documentElement.offsetHeight)) {
                timerScrollWebPage = setTimeout(`scrollWebPage(${documentElementsPosition[iteration]})`, 1);
                break;
            } else if ((documentElementsPosition[iteration] <= window.pageYOffset) && (documentElementsPosition[iteration + 1] >= window.pageYOffset)) {
                timerScrollWebPage = setTimeout(`scrollWebPage(${documentElementsPosition[iteration]})`, 1);
                break;
            }
        }
    } else if ((e.keyCode == 40) && (timerScrollWebPage == null)) {
        for (let iteration = 0; iteration < documentElementsPosition.length; iteration++) {
            if ((documentElementsPosition[iteration] <= window.pageYOffset) && (documentElementsPosition[iteration + 1] > window.pageYOffset)) {
                timerScrollWebPage = setTimeout(`scrollWebPage(${documentElementsPosition[iteration + 1]})`, 1);
                break;
            } else if ((iteration == (documentElementsPosition.length - 1)) && (documentElementsPosition[iteration] <= window.pageYOffset)) {
                break;
            };
        }

    }
})