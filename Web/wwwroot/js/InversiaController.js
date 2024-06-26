function addStyleSheets(href) {
    const head = document.head;
    const link = document.createElement('link');

    const editPng1 = document.getElementById("editButton1");
    const editPng2 = document.getElementById("editButton2");

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

    if (profilePhotoPng !== null) {
        profilePhotoPng.src = "/assets/profilePhotoInversia.png"
    }

    if (editPng1 !== null) {
        editPng1.src = "/assets/editButtonInversia.png";
    }

    if (editPng2 !== null) {
        editPng2.src = "/assets/editButtonInversia.png";
    }

    mode = true;
}

function disableStyleSheets(href) {
    const head = document.head;
    const link = document.getElementById("inversia-true");

    const editPng1 = document.getElementById("editButton1");
    const editPng2 = document.getElementById("editButton2");

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

    if (profilePhotoPng !== null) {
        profilePhotoPng.src = "/assets/profilePhoto.png"
    }

    if (editPng1 !== null) {
        editPng1.src = "/assets/editButton.png";
    }

    if (editPng2 !== null) {
        editPng2.src = "/assets/editButton.png";
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
const profilePhotoPng = document.getElementById("profilePhoto");

let mode = false;
