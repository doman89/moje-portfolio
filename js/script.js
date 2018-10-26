const menuIcon = document.querySelector('.hamburger');
const icons = document.querySelectorAll('.fas');
const menu = document.querySelector('aside');
const link = document.querySelectorAll('li');
const portfolioButton = document.querySelector('.button');
const modalCloseButton = document.querySelector('.close');
const wrapper = document.querySelector('.wrapper');
const popupWindow = document.querySelector('.modal');
const speedScrollWebPage = 30;
const progressBar = document.querySelector('.progressBar');
const header = document.querySelector('header');
const headerImage = document.querySelector('header img');
const arrowNavigation = document.querySelector('.arrowNavigation');
const upArrow = document.querySelector('.upArrow');
const downArrow = document.querySelector('.downArrow');
let timerScrollWebPage;
const landscape = window.innerWidth > window.innerHeight;

//tablica położenia sekcji na stronie
let documentElementsPosition = [
    document.querySelector('header').offsetTop,
    document.querySelector('.aboutme').offsetTop,
    document.querySelector('.technology').offsetTop,
    document.querySelector('.projects').offsetTop,
    document.querySelector('.motto').offsetTop,
    document.querySelector('.contact').offsetTop
];

const documentElementsPositionUpdate = () => {
    documentElementsPosition = [
        document.querySelector('header').offsetTop,
        document.querySelector('.aboutme').offsetTop,
        document.querySelector('.technology').offsetTop,
        document.querySelector('.projects').offsetTop,
        document.querySelector('.motto').offsetTop,
        document.querySelector('.contact').offsetTop
    ]
}

//aktualizacja pozycji sekcji po zmianie rozmiaru okna - bez tego sypie sie :)
window.addEventListener('resize', documentElementsPositionUpdate);
window.addEventListener('scroll', documentElementsPositionUpdate);
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
    menuIcon.classList.toggle('active');
    for (let i = 0; i < icons.length; i++)
        icons[i].classList.toggle('active');
    menu.classList.toggle('active');
    if (!landscape) {
        header.classList.toggle('active');
        wrapper.classList.toggle('active');
        arrowNavigation.classList.toggle('active');
    }
}

//scrollowanie do określonej pozycji strony
const scrollWebPage = (positionY) => {
    if ((positionY + speedScrollWebPage) > wrapper.offsetHeight) {
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
portfolioButton.addEventListener('click', () => {
    timerScrollWebPage = setTimeout(`scrollWebPage(${documentElementsPosition[enumPosition.PROJECTS]})`, 1);
});
// modalCloseButton.addEventListener("click", closePopupWindow);
menuIcon.addEventListener('click', toggleMenuHamburger);
for (let i = 0; i < link.length; i++) {
    link[i].addEventListener('click', () => {
        toggleMenuHamburger();
        timerScrollWebPage = setTimeout(`scrollWebPage(${documentElementsPosition[i]})`, 1);
    });
};


//funkcja obsługi zdarzenia efektu przy scrollowniu
const scrollEffectinSection = (typeSection, childNumber, onOff = true) => {
    if (onOff === true) {
        for (let i = 1; i <= childNumber; i++) {
            document.querySelector(`${typeSection}:nth-of-type(${i})`).classList.add('active');
        }
    } else {
        for (let i = 1; i <= childNumber; i++) {
            document.querySelector(`${typeSection}:nth-of-type(${i})`).classList.remove('active');
        }
    }
}


//nasłuchiwanie na scrolowanie strony i efekty do tego
window.addEventListener('scroll', () => {
    const currentPercent = Math.round(window.pageYOffset / (wrapper.offsetHeight - window.innerHeight) * 100);
    const bottomWindow = window.scrollY + window.innerHeight;
    const topSectionAbout = documentElementsPosition[enumPosition.ABOUTME];
    const topSectionTechnology = documentElementsPosition[enumPosition.TECHNOLOGY];
    const topSectionProjects = documentElementsPosition[enumPosition.PROJECTS];
    const topSectionMotto = documentElementsPosition[enumPosition.MOTTO];

    //progressBar
    progressBar.style.width = `${currentPercent}%`;

    //efekt znikania header + display none (safari błędnie wyswietla strone bez tegos)
    if (window.scrollY < topSectionAbout) {
        header.style.backgroundColor = `rgba(21, 162, 255, ${1-(1.5 * window.scrollY / topSectionAbout)})`;
        headerImage.style.opacity = 1 - (1.5 * window.scrollY / topSectionAbout);
        header.style.display = 'flex';
    } else
        header.style.display = 'none';

    //efekty pojawiania się sekcji aboutme
    if ((bottomWindow > topSectionAbout) && (window.scrollY < topSectionTechnology)) {
        const bottomWindowInSection = ((bottomWindow - topSectionAbout) / (topSectionTechnology - topSectionAbout));
        if (bottomWindowInSection > 0.8) {
            scrollEffectinSection('.aboutme p', 2);
        } else if (bottomWindowInSection > 0.4) {
            scrollEffectinSection('.aboutme p', 1);
        }
    } else {
        scrollEffectinSection('.aboutme p', 2, false);
    }

    //efekty pojawiania się sekcji technology
    if ((bottomWindow > topSectionTechnology) && (window.scrollY < topSectionProjects)) {
        const bottomWindowInSection = ((bottomWindow - topSectionTechnology) / (topSectionProjects - topSectionTechnology));
        if (landscape) {
            if (bottomWindowInSection > 0.75) {
                scrollEffectinSection('.technology .language', 5);
            } else if (bottomWindowInSection > 0.20) {
                scrollEffectinSection('.technology .language', 3);
            }
        } else {
            if (bottomWindowInSection > 0.85) {
                scrollEffectinSection('.technology .language', 5);
            } else if (bottomWindowInSection > 0.71) {
                scrollEffectinSection('.technology .language', 4);
            } else if (bottomWindowInSection > 0.50) {
                scrollEffectinSection('.technology .language', 3);
            } else if (bottomWindowInSection > 0.30) {
                scrollEffectinSection('.technology .language', 2);
            } else if (bottomWindowInSection > 0.05) {
                scrollEffectinSection('.technology .language', 1);
            }
        }
    } else {
        scrollEffectinSection('.technology .language', 5, false);
    }

    //efekty animacji w sekcji projects
    if ((bottomWindow > topSectionProjects) && (window.scrollY < topSectionMotto)) {
        const bottomWindowInSection = ((bottomWindow - topSectionProjects) / (topSectionMotto - topSectionProjects));
        if (landscape) {
            if (bottomWindowInSection > 0.85) {
                scrollEffectinSection('.project', 3);
            } else if (bottomWindowInSection > 0.60) {
                scrollEffectinSection('.project', 2);
            } else if (bottomWindowInSection > 0.20) {
                scrollEffectinSection('.project', 1);
            }
        } else {
            if (bottomWindowInSection > 0.85) {
                scrollEffectinSection('.project', 3);
            } else if (bottomWindowInSection > 0.45) {
                scrollEffectinSection('.project', 2);
            } else if (bottomWindowInSection > 0.20) {
                scrollEffectinSection('.project', 1);
            }
        }
    } else {
        scrollEffectinSection('.project', 3, false);
    }
    // documentElementsPositionUpdate();
})

//funkcja obsługi klawiszy w lewo i prawo
const scrollSection = e => {
    if (((e.keyCode == 38) || (e == 38)) && (timerScrollWebPage == null)) {
        for (let iteration = 0; iteration < documentElementsPosition.length; iteration++) {
            if ((iteration == (documentElementsPosition.length - 1)) && (documentElementsPosition[iteration] <= window.pageYOffset)) {
                timerScrollWebPage = setTimeout(`scrollWebPage(${documentElementsPosition[iteration]})`, 1);
                break;
            } else if ((documentElementsPosition[iteration] <= window.pageYOffset) && (documentElementsPosition[iteration + 1] >= window.pageYOffset)) {
                timerScrollWebPage = setTimeout(`scrollWebPage(${documentElementsPosition[iteration]})`, 1);
                break;
            }
        }
    } else if (((e.keyCode == 40) || (e == 40)) && (timerScrollWebPage == null)) {
        for (let iteration = 0; iteration < documentElementsPosition.length; iteration++) {
            if ((documentElementsPosition[iteration] <= window.pageYOffset) && (documentElementsPosition[iteration + 1] > window.pageYOffset)) {
                timerScrollWebPage = setTimeout(`scrollWebPage(${documentElementsPosition[iteration + 1]})`, 1);
                break;
            }
        }

    }
}

//nasłuchiwanie klawiszy góra/dół oraz strzałek góra/dół na stronie
window.addEventListener('keydown', scrollSection);

upArrow.addEventListener('click', () => {
    scrollSection(38);
});
downArrow.addEventListener('click', () => {
    scrollSection(40);
});