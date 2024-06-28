function inAreaDeterminant(elem, area) {
    let elemCoords = elem.getBoundingClientRect();
    let areaCoords = area.getBoundingClientRect();

    if (
        (elemCoords.top > areaCoords.top) && (elemCoords.bottom < areaCoords.bottom)
    ) {
        return true;
    }
    else {
        return false;
    }
}

document.onscroll = function () {
    let scrollButton = document.getElementById('scroll-to-menu');
    if (document.documentElement.scrollTop > document.getElementById('menu-1').offsetHeight) {
        if (
            inAreaDeterminant(scrollButton, document.querySelector('.do-you-have-questions-container'))
            ||
            (window.innerWidth < 768 && inAreaDeterminant(scrollButton, document.querySelector('.international-li-1')))
            ||
            (window.innerWidth < 768 && inAreaDeterminant(scrollButton, document.querySelector('.international-li-2')))
            ||
            (window.innerWidth < 768 && inAreaDeterminant(scrollButton, document.querySelector('.international-li-3')))
            ||
            (window.innerWidth < 768 && inAreaDeterminant(scrollButton, document.querySelector('.international-li-4')))
        ) {
            scrollButton.classList.add('inverted-color-button');
        }
        else {
            scrollButton.classList.remove('inverted-color-button');
        }

        if (scrollButton.style.display == 'block') return;
        scrollButton.style.display = 'block';
    }
    else {
        scrollButton.style.display = 'none';
    }

}

let nextPartners = [];
let prevPartners = [];
let timerToRemoveNavLinkList;
for (let navLinkList of document.querySelectorAll('.nav-link-list')) {
    navLinkList.onpointerover = function () {
        clearTimeout(timerToRemoveNavLinkList);
    }
}

function documentClickEvents() {
    document.addEventListener('click', onClick);

    let langListIsOpen = null;
    let langListHeight = null;
    let prevNavLinkList2 = null;
    let prevServiceInfo = document.getElementById('service-info_1');
    let serviceInfo = null;
    let serviceNum = null;
    let serviceSection = document.getElementById('service');
    function onClick(event) {

        let currentPartner = document.querySelector('.currentPartner');

        switch (event.target.dataset.click) {
            case 'open-lang-list':
                let langList = event.target.closest('.header-buttons').querySelector('.lang-list');
                if (langListIsOpen) {
                    langListIsOpen = false;
                    langList.style.maxHeight = 0 + 'px';
                    function removeList() {
                        langList.style.display = 'none';
                    }
                    langList.addEventListener('transitionend', removeList);
                    langList.removeEventListener('transitionend', removeList);
                }
                else {
                    langListIsOpen = true;
                    langList.style.display = 'block';
                    if (!langListHeight) {
                        langListHeight = langList.offsetHeight;
                    }
                    langList.style.maxHeight = 0 + 'px';
                    setTimeout(() => {
                        langList.style.maxHeight = langListHeight + 'px';
                    }, 0);
                }

                break;

            case 'lang-li-highlight':
                let langLi = event.target;

                setTimeout(() => {
                    langLi.style.background = '#F3F6F8';
                }, 100);
                setTimeout(() => {
                    langLi.style.background = '';
                }, 500);

                break;
            case 'call-menu':
                document.getElementById('menu-2-container').style.display = 'grid';
                document.body.style.overflow = 'hidden';

                break;
            case 'close-menu':
                document.getElementById('menu-2-container').style.display = 'none';
                document.body.style.overflow = 'auto';

                break;
            case 'menu-2-open-link-list':

                let navLinkList2 = event.target.closest('li').querySelector('.menu-2-nav-link-list');
                if (prevNavLinkList2 != navLinkList2) {
                    if (prevNavLinkList2) {
                        prevNavLinkList2.style.top = '';
                        prevNavLinkList2.style.display = 'none';
                    }
                    prevNavLinkList2 = navLinkList2;
                    navLinkList2.style.display = 'flex';
                    navLinkList2.style.top = 40 + document.getElementById('menu-2-container').scrollTop + 'px';
                }
                else {
                    prevNavLinkList2 = null;
                    navLinkList2.style.top = '';
                    navLinkList2.style.display = 'none';
                }

                break;
            case 'open-service-info':
                if (event.target.closest('#menu-2')) {
                    document.getElementById('menu-2-container').style.display = 'none';
                    document.body.style.overflow = 'auto';
                }

                serviceNum = event.target.dataset.servicenum;

                if (window.innerWidth > 768) {
                    serviceInfo = document.getElementById(`service-info_${serviceNum}`);
                    if (prevServiceInfo != serviceInfo) {
                        prevServiceInfo.style.display = 'none';
                        if (prevServiceInfo) {
                            document.querySelector(`.js-service-bg_${prevServiceInfo.id.slice(13)}`).style.display = 'none';
                        }
                        document.querySelector(`.js-service-bg_${serviceNum}`).style.display = 'block';
                        prevServiceInfo = serviceInfo;
                        serviceInfo.style.display = 'block';

                        // serviceSection.style.setProperty('--service-bg', `url('../img/service-bg_${serviceNum}.png')`);
                        serviceSection.dataset.currentservice = serviceNum;
                    }
                    event.target.focus();
                    window.scrollTo(0, serviceSection.getBoundingClientRect().top + window.pageYOffset);
                }

                else {

                    serviceInfo = document.getElementById(`service-info_${serviceNum}-mobile`);
                    itIsClosed = true;

                    for (let openedServiceInfo of document.querySelectorAll('.service-info-mobile')) {
                        if (openedServiceInfo.style.display == 'block' && openedServiceInfo == serviceInfo) {
                            serviceInfo.style.display = 'none';
                            itIsClosed = false;
                        }
                        else {
                            openedServiceInfo.classList.remove('currentOpenedServiceInfoMobile');
                        }
                    }

                    if (itIsClosed) {
                        serviceInfo.classList.add('currentOpenedServiceInfoMobile');
                        serviceInfo.style.display = 'block';
                    }

                }

                break;
            case 'get-next-partner':
                if (nextPartners.length == 0) {                    
                    return;
                }
                let nextPartner = nextPartners[0];
                nextPartners.shift();

                currentPartner.style.display = 'none';
                currentPartner.classList.remove('currentPartner');
                prevPartners.push(currentPartner);

                nextPartner.style.display = '';
                nextPartner.classList.add('currentPartner');

                break;
            case 'get-previous-partner':
                if (prevPartners.length == 0) {                    
                    return;
                }
                let prevPartner = prevPartners[prevPartners.length - 1];
                prevPartners.pop();

                currentPartner.style.display = 'none';
                currentPartner.classList.remove('currentPartner');
                nextPartners.unshift(currentPartner);

                prevPartner.style.display = '';
                prevPartner.classList.add('currentPartner');

                break;
            default:
                return;
        }
    }
}

function documentPointerOverEvents() {
    document.addEventListener('pointerover', onPointerOver);

    let prevNavLinkList = null;
    timerToRemoveNavLinkList = null;

    function onPointerOver(event) {
        switch (event.target.dataset.pointerover) {
            case 'menu-1-nav-link':
                clearTimeout(timerToRemoveNavLinkList);

                let navLink = event.target;
                let navLinkList = navLink.closest('li').querySelector('.nav-link-list');

                navLinkList.style.animation = '';

                if (navLinkList != prevNavLinkList) {
                    if (prevNavLinkList) {
                        prevNavLinkList.style.display = 'none';
                    }
                    prevNavLinkList = navLinkList;
                }

                navLinkList.style.display = 'block';

                navLink.onpointerleave = function () {
                    timerToRemoveNavLinkList = setTimeout(() => {
                        prevNavLinkList.style.animation = 'disappearance 0.3s';
                        prevNavLinkList.onanimationend = function () {
                            prevNavLinkList.style.display = 'none';
                        }
                    }, 500);
                }
                navLinkList.onpointerleave = function () {
                    timerToRemoveNavLinkList = setTimeout(() => {
                        prevNavLinkList.style.animation = 'disappearance 0.3s';
                        prevNavLinkList.onanimationend = function () {
                            prevNavLinkList.style.display = 'none';
                        }
                    }, 500);
                }
                break;

                // case 'menu-1-nav-link-list':
                //     clearTimeout(timerToRemoveNavLinkList);  
                //     alert('ve');
                break;
            case 'replace-circles':
                let smallCircle = event.target.previousElementSibling.querySelector('.sm-circle');
                let bigCircle = event.target.previousElementSibling.querySelector('.lg-circle');
                smallCircle.style.order = 1;

                smallCircle.style.width = 0.78 + 'em';
                smallCircle.style.height = 0.78 + 'em';

                bigCircle.style.width = 0.47 + 'em';
                bigCircle.style.height = 0.47 + 'em';

                event.target.onpointerleave = function () {
                    smallCircle.style.order = '';

                    smallCircle.style.width = '';
                    smallCircle.style.height = '';

                    bigCircle.style.width = '';
                    bigCircle.style.height = '';
                }
                break;
            default:
                return;
        }
    }
}


documentClickEvents();
documentPointerOverEvents();




