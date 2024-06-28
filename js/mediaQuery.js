const mobileQuery = window.matchMedia('(max-width: 768px)');
const desktopQuery = window.matchMedia('(min-width: 769px)');

let partners = document.querySelector('.partners-list').children;
let serviceSection = document.getElementById('service');

let openedServiceInfoID = null;

function handleMobileChange(e) {
    if (e.matches) {

        for (let serviceInfo of document.querySelectorAll('.service-info')) {
            if (serviceInfo.style.display == 'block') {
                openedServiceInfoID = serviceInfo.id;
            }
            serviceInfo.style.display = 'none';
        }
        document.getElementById(`${openedServiceInfoID}-mobile`).style.display = 'block';
        document.getElementById(`${openedServiceInfoID}-mobile`).classList.add('currentOpenedServiceInfoMobile');


        partners[0].classList.add('currentPartner');
        for (let i = 1; i < partners.length; i++) {
            nextPartners.push(partners[i]);
            partners[i].style.display = 'none';
        }
    }
}
function handleDesktopChange(e) {
    if (e.matches) {

        for(let serviceInfoMobile of document.querySelectorAll('.service-info-mobile')){
            serviceInfoMobile.style.display = 'none';
        }

        let currentOpenedServiceInfoMobile = document.querySelector('.currentOpenedServiceInfoMobile');                
        openedServiceInfoID = currentOpenedServiceInfoMobile.id;        
        let cut = openedServiceInfoID.substring(0, openedServiceInfoID.length - 7);        
        idNumber = cut[cut.length - 1];        
        document.getElementById(`service-info_${idNumber}`).style.display = 'block';
        serviceSection.style.setProperty('--service-bg', `url('../img/service-bg_${idNumber}.png')`);
        serviceSection.dataset.currentservice = idNumber;         

        for (let partner of partners) {
            partner.style.display = '';
        }

    }
}
mobileQuery.addListener(handleMobileChange);
desktopQuery.addListener(handleDesktopChange);
handleMobileChange(mobileQuery);