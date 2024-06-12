function openProductAddWindow() {
    productAddWindow.hidden = false;
}

function closeProductAddWindow() {
    productAddWindow.hidden = true;
}


function openSettingsWindow() {
    settingsWindow.hidden = false;
    fetch('api/get/market/info', {method: 'get'})
        .then((response) => response.json())
        .then((marketInfo) => {
            console.log(marketInfo);
            const settings = settingsWindow.getElementsByClassName('settings-form-container')[0];
            settings.innerHTML = '';
            
            const settingsHeader = document.createElement('div');
            settingsHeader.setAttribute('class', 'settings-header');
            settingsHeader.textContent = 'Настройте свой магазин';

            const id = document.createElement('input');
            id.setAttribute('hidden', 'true');
            id.setAttribute('type', 'number');
            id.setAttribute('name', 'id');
            id.setAttribute('value', `${marketInfo.id}`);

            const settingsContent1 = document.createElement('div');
            settingsContent1.setAttribute('class', 'settings-content');
            settingsContent1.textContent = 'Название магазина';

            const settingsFields1 = document.createElement('input');
            settingsFields1.setAttribute('class', 'settings-fields');
            settingsFields1.setAttribute('type', 'text');
            settingsFields1.setAttribute('name', 'name');
            settingsFields1.setAttribute('value', `${marketInfo.name}`);

            const settingsContent2 = document.createElement('div');
            settingsContent2.setAttribute('class', 'settings-content');
            settingsContent2.textContent = 'Описание магазина';

            const settingsFields2 = document.createElement('input');
            settingsFields2.setAttribute('class', 'settings-fields');
            settingsFields2.setAttribute('type', 'text');
            settingsFields2.setAttribute('name', 'description');
            settingsFields2.setAttribute('value', `${marketInfo.description}`);

            const settingsContent3 = document.createElement('div');
            settingsContent3.setAttribute('class', 'settings-content');
            settingsContent3.textContent = 'Время работы от:';

            const settingsFields3 = document.createElement('input');
            settingsFields3.setAttribute('id', 'time-from');
            settingsFields3.setAttribute('class', 'settings-fields');
            settingsFields3.setAttribute('type', 'time');
            settingsFields3.setAttribute('name', 'worksFrom');
            settingsFields3.setAttribute('value', `${marketInfo.worksFrom}`);

            const settingsContent4 = document.createElement('div');
            settingsContent4.setAttribute('class', 'settings-content');
            settingsContent4.textContent = 'Время работы до:';

            const settingsFields4 = document.createElement('input');
            settingsFields4.setAttribute('id', 'time-to');
            settingsFields4.setAttribute('class', 'settings-fields');
            settingsFields4.setAttribute('type', 'time');
            settingsFields4.setAttribute('name', 'worksTo');
            settingsFields4.setAttribute('value', `${marketInfo.worksTo}`);

            const settingsContent5 = document.createElement('div');
            settingsContent5.setAttribute('class', 'settings-content');
            settingsContent5.textContent = 'Скрывать товары вне времени работы:';

            const settingsFields5 = document.createElement('input');
            settingsFields5.setAttribute('id', 'auto-hide');
            settingsFields5.setAttribute('class', 'settings-fields');
            settingsFields5.setAttribute('type', 'checkbox');
            settingsFields5.setAttribute('name', 'autoHide');
            settingsFields5.setAttribute('value', `${marketInfo.autoHide ? "checked" : ""}`);

            
            const settingsAccept = document.createElement('input');
            settingsAccept.setAttribute('class', 'settings-accept');
            settingsAccept.setAttribute('type', 'submit');
            settingsAccept.setAttribute('value', 'Изменить');

            const settingsButtons = document.createElement('div');
            settingsButtons.setAttribute('class', 'settings-buttons');
            settingsButtons.appendChild(settingsAccept);

            settings.appendChild(settingsHeader);
            settings.appendChild(id);
            settings.appendChild(settingsContent1);
            settings.appendChild(settingsFields1);
            settings.appendChild(settingsContent2);
            settings.appendChild(settingsFields2);
            settings.appendChild(settingsContent3);
            settings.appendChild(settingsFields3);
            settings.appendChild(settingsContent4);
            settings.appendChild(settingsFields4);
            settings.appendChild(settingsContent5);
            settings.appendChild(settingsFields5);
            settings.appendChild(settingsButtons);
        })
}

function closeSettingsWindow() {
    settingsWindow.hidden = true;
}

function closeProductInfoUpdateWindow() {
    productInfoUpdateWindow.hidden = true;
    productInfoUpdateWindow.innerHTML = '';
    const profileMarketInfoUpdateClose = document.createElement('div');
    profileMarketInfoUpdateClose.setAttribute('id', 'profile-market-info-update-close');
    profileMarketInfoUpdateClose.setAttribute('class', 'product-card-background-shadow');
    productInfoUpdateWindow.appendChild(profileMarketInfoUpdateClose);
    productInfoUpdateCloseButton = document.getElementById("profile-market-info-update-close");
    productInfoUpdateCloseButton.addEventListener('click', () => closeProductInfoUpdateWindow());
}

const productAddWindow = document.getElementsByClassName("profile-product-add-window")[0];
const settingsWindow = document.getElementsByClassName("profile-market-settings-window")[0];
const productInfoUpdateWindow = document.getElementsByClassName("profile-market-info-update-window")[0];

const productAddOpenButton = document.getElementById("profile-product-add");
const settingsOpenButton = document.getElementById("profile-market-settings");

productAddOpenButton.addEventListener('click', () => openProductAddWindow());
settingsOpenButton.addEventListener('click', () => openSettingsWindow());

const productAddCloseButton = document.getElementById("profile-product-add-close");
const settingsCloseButton = document.getElementById("profile-market-settings-close");
let productInfoUpdateCloseButton = document.getElementById("profile-market-info-update-close");

productAddCloseButton.addEventListener('click', () => closeProductAddWindow());
settingsCloseButton.addEventListener('click', () => closeSettingsWindow());
productInfoUpdateCloseButton.addEventListener('click', () => closeProductInfoUpdateWindow());
