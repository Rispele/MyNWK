﻿document.addEventListener('DOMContentLoaded', async function() {
    fetch('api/isAuthenticated', {method: 'get'})
        .then((response) => response.text())
        .then((userId) => {
            if (userId !== "non") {
                const li = document.createElement('li');
                li.setAttribute('class', 'li');
                li.setAttribute('id', 'profileli');
                document.getElementsByClassName("tgli")[0].remove();
                li.insertAdjacentHTML("afterbegin", `<button class="profileButton"><a class="link" href="Profile">Профиль</a></button>`);
                document.getElementsByClassName("ul")[0].appendChild(li)
            }
        });
        
    
    const getAllProductsUrl = new URL('http://127.0.0.1:80/products/get/all');
    const params = {pageNumber:0, batchSize:20};
    getAllProductsUrl.search = new URLSearchParams(params).toString();
    const slots = document.getElementsByClassName("baraholka-slots-container")[0];
    fetch(getAllProductsUrl, {method: 'get'})
        .then((response) => response.json())
        .then((products) => {
            for (product of products) {
                const productImage = document.createElement('img');
                productImage.setAttribute('src', product.imageLocation);
                productImage.setAttribute('class', 'baraholka-slot-photo');

                const productPrice = document.createElement('p');
                productPrice.innerText = `${product['price']} р.`;

                const productInfo = document.createElement('div');
                productInfo.setAttribute('class', 'baraholka-slot-info');
                productInfo.textContent = product['title'];
                productInfo.appendChild(productPrice);

                const productSlot = document.createElement('div');
                productSlot.setAttribute('class', 'baraholka-slot');
                productSlot.appendChild(productImage);
                productSlot.appendChild(productInfo);

               slots.appendChild(productSlot);
            }
        });
        
    const categoriesList = document.getElementsByClassName("baraholka-filters category")[0];
    fetch('api/get/all/categories', {method: 'get'})
        .then((response) => response.json())
        .then((categories) => {
            for (category of categories) {
                const option = document.createElement("option");
                option.setAttribute('value', category.id);
                option.textContent = category.title;
                categoriesList.appendChild(option);
            }
        })
        
    const marketsList = document.getElementsByClassName("baraholka-filters seller")[0];
    fetch('api/get/all/markets', {method: 'get'})
        .then((response) => response.json())
        .then((markets) => {
            for (market of markets) {
                const option = document.createElement("option");
                option.setAttribute('value', market.id);
                option.textContent = market.name;
                marketsList.appendChild(option);
            }
        })
});

async function onTelegramAuth(user) {
    const postData = async (url, data) => {
        return fetch(url, {
            method: 'POST',
            redirect: 'manual',
            body: data,
            credentials: 'include'
        });
    }

    let formData = new FormData();
    formData.append('id', user.id);
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('username', user.username);
    formData.append('photo_url', user.photo_url);
    formData.append('auth_date', user.auth_date);
    formData.append('hash', user.hash);
    postData("/Account/Login", formData)
        .then(response => {location.reload();});
}