function addStyleSheets(href) {
    const head = document.head;
    const link = document.createElement('link');

    link.rel = 'stylesheet';
    link.id = "inversia-true";
    link.href = href;

    head.appendChild(link);

    if (modeButtonPng !== null) {
        modeButtonPng.src = "/assets/modeButtonInversia.png";
    }
    
    if (cartPng !== null) {
        cartPng.src = "/assets/cartInversia.png";
    }
    
    if (logoPng !== null) {
        logoPng.src = "/assets/logoInversia.png";
    }

    if (editPng !== null) {
        console.log(editPng.id);
        editPng.src = "/assets/editButtonInversia.png";
    }
    mode = true;
}

function disableStyleSheets(href) {
    const head = document.head;
    const link = document.getElementById("inversia-true");

    head.removeChild(link);

    if (modeButtonPng !== null) {
        modeButtonPng.src = "/assets/modeButton.png";
    }

    if (cartPng !== null) {
        cartPng.src = "/assets/cart.png";
    }

    if (logoPng !== null) {
        logoPng.src = "/assets/logo.png";
    }

    if (editPng !== null) {
        console.log(editPng.id);
        editPng.src = "/assets/editButton.png";
    }
    
    mode=false;
}

function switchMode(href) {
    if (mode == true) {
        disableStyleSheets(href);
    }
    else {
        addStyleSheets(href);
    }
}

const modeButton = document.getElementsByClassName("modeButton");
modeButton[0].addEventListener('click', () => switchMode("/css/ColorsInversia.css"));

const modeButtonPng = document.getElementById("modeButton");
const logoPng = document.getElementById("logo");
const cartPng = document.getElementById("cart");
const editPng = document.getElementById("editButton");

let mode = false;
