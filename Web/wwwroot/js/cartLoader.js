﻿document.addEventListener('DOMContentLoaded', async function () {
    await fetch('/cart/get', {
        method: 'get'
    }).then((response) => response.json())
        .then((data) => {
            const container = document.getElementsByClassName('cart-slots-container')[0];
            let i = 0;
            for (let product of data) {
                const closeButton = document.createElement("div");
                closeButton.setAttribute('class', 'cart-slot-delete-button');
                closeButton.insertAdjacentHTML('afterbegin', 
                    `<img src="assets/closeButton.png" width="30px" height="30px"/>`);
                
                closeButton.addEventListener('click', async function () {
                    let formData = new FormData();
                    formData.append('marketId', product['fullId']['marketId']);
                    formData.append('productId', product['fullId']['productId']);
                    formData.append('sellerId', product['fullId']['userId']);
                    
                    await fetch('/cart/remove', {
                        method: 'post',
                        body: formData
                    });
                    
                    closeButton.parentElement.remove()
                });

                const photo = document.createElement("img");
                photo.setAttribute('class', 'cart-slot-photo');
                photo.setAttribute('src', product.imageRef);
                
                const slotInfo = document.createElement("div");
                slotInfo.setAttribute('class', 'cart-slot-info');
                slotInfo.innerText = product['title'];
                slotInfo.insertAdjacentHTML('beforeend', `<p>${product['price']} руб</p>`)
                slotInfo.insertAdjacentHTML('beforeend', `${product['remained']} шт.`);
                
                const cartSlot = document.createElement('div');
                cartSlot.setAttribute('class', 'cart-slot');
                cartSlot.setAttribute('id', `cart-slot-${i}`);
                
                cartSlot.appendChild(closeButton);
                cartSlot.appendChild(photo);
                cartSlot.appendChild(slotInfo);
                
                container.appendChild(cartSlot);
                i++;
            }
            if (i !== 0) {
                document.getElementsByClassName('cart-accept')[0].addEventListener('click', async function () {
                    await fetch('/cart/accept', {method: 'post'})
                        .then(() => window.location.reload());
                })
            } else {
                document.getElementsByClassName('cart-accept')[0].textContent = "Корзина пуста";
            }
        });
});
