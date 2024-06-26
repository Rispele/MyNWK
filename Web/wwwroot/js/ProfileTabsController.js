async function loadPurchases() {
    const getProductsByBuyer = new URL('http://127.0.0.1:80/products/get/byBuyer');
    const container = document.getElementsByClassName("profile-purchases-container")[0];
    container.innerHTML = '';

    await fetch(getProductsByBuyer, {method: 'get'})
        .then((response) => response.json())
        .then(async (orders) => {
            for (order of orders) {
                const purchases = document.createElement('div');
                purchases.setAttribute('class', 'profile-purchases');
                for (product of order["products"]) {
                    const productImage = document.createElement('img');
                    productImage.setAttribute('src', product.imageRef);
                    productImage.setAttribute('class', 'profile-purchase-photo');
    
                    const productPrice = document.createElement('p');
                    productPrice.innerText = `${product['price']} р.`;

                    const number = document.createElement('p');
                    number.innerText = `${product['remained']} шт.`;
    
                    const productInfo = document.createElement('div');
                    productInfo.setAttribute('class', 'profile-purchase-info');
                    productInfo.textContent = product['title'];
                    productInfo.appendChild(productPrice);
                    productInfo.appendChild(number);
    
                    const productSlot = document.createElement('div');
                    productSlot.setAttribute('class', 'profile-purchase');
                    productSlot.appendChild(productImage);
                    productSlot.appendChild(productInfo);

                    purchases.appendChild(productSlot);
                }

                getUserInfo = new URL('http://127.0.0.1:80/api/get/user/info');
                getUserInfo.search = new URLSearchParams({userId: order["sellerId"]}).toString();
                await fetch(getUserInfo, {method: 'get'})
                    .then((response) => response.json())
                    .then((userId) => {
                        const header = document.createElement('div');
                        header.setAttribute('class', 'profile-purchases-header');
                        header.textContent = `Телеграм продавца @${userId["username"]}`;

                        const innerContainer = document.createElement('div');
                        innerContainer.setAttribute('class', 'profile-purchases-inner-container');
                        innerContainer.appendChild(header);
                        innerContainer.appendChild(purchases);
                        if (order["workflowState"] === 4) {
                            const div = document.createElement('div');
                            div.setAttribute('class', "profile-purchases-status");
                            div.textContent = 'Отменён ';
                            img = document.createElement('img');
                            img.setAttribute('src', "/assets/cancelled.png");
                            img.setAttribute('width', "15px");
                            img.setAttribute('height', "15px");
                            div.appendChild(img);
                            innerContainer.appendChild(div);
                        } else if (order["workflowState"] === 3) {
                            const div = document.createElement('div');
                            div.setAttribute('class', "profile-purchases-status");
                            div.textContent = 'Получен ';
                            img = document.createElement('img');
                            img.setAttribute('src', "/assets/received.png");
                            img.setAttribute('width', "15px");
                            img.setAttribute('height', "15px");
                            div.appendChild(img);
                            innerContainer.appendChild(div);
                        } else if (order["workflowState"] === 2) {
                            const div = document.createElement('div');
                            div.setAttribute('class', "profile-purchases-status");
                            div.textContent = 'Принят в работу ';
                            img = document.createElement('img');
                            img.setAttribute('src', "/assets/prinyato.png");
                            img.setAttribute('width', "15px");
                            img.setAttribute('height', "15px");
                            div.appendChild(img);
                            innerContainer.appendChild(div);
                            
                            const button = document.createElement('button');
                            button.setAttribute('class', "profile-purchases-accept");
                            button.setAttribute('id', `accept-${order["orderId"]}`);
                            button.textContent = 'Подтвердить получение';
                            button.addEventListener('click', async (event) => {
                                const confirm = new URL('http://127.0.0.1:80/orders/confirm');
                                const id = event.target.getAttribute('id');
                                confirm.search = new URLSearchParams({orderId: id.substring(id.indexOf('-') + 1)}).toString();
                                fetch(confirm, {method: 'get'})
                                    .then(() => loadPurchases());
                            });
                            innerContainer.appendChild(button);
                        } else if (order["workflowState"] === 1) {
                            const div = document.createElement('div');
                            div.setAttribute('class', "profile-purchases-status");
                            div.textContent = 'Ожидание ответа продавца';
                            innerContainer.appendChild(div);
                        } 
                        container.appendChild(innerContainer);
                    });
            }
        });
}

function loadProducts() {
    const getProductsByUser = new URL('http://127.0.0.1:80/products/get/byUser');
    const container = document.getElementsByClassName("profile-products-inner-container")[0];
    container.innerHTML = '';
        
    fetch(getProductsByUser, {method: 'get'})
        .then((response) => response.json())
        .then((products) => {
            let i = 0;
            for (let product of products) {
                const removeButton = document.createElement('button');
                const image = document.createElement('img');
                const price = document.createElement('p');
                const info = document.createElement('div');
                const slot = document.createElement('div');

                removeButton.setAttribute('class', `profile-product-remove-button`);
                removeButton.setAttribute('id', `profile-product-remove-button-id-${i}`)
                removeButton.textContent = 'x';
                removeButton.style.zIndex = '3';
                removeButton.style.position = 'relative';
                image.setAttribute('src', product.imageRef);
                image.setAttribute('class', 'profile-product-photo');
                image.setAttribute('id', `profile-product-photo-id-${i}`)
                price.innerText = `${product['price']} р.`;
                info.setAttribute('class', 'profile-product-info');
                info.textContent = product['title'];
                info.appendChild(price);
                slot.setAttribute('class', 'profile-product');
                slot.setAttribute('id', `profile-product-${i}`);
                slot.appendChild(image);
                slot.appendChild(info);
                slot.appendChild(removeButton);

                container.appendChild(slot);
                
                document.getElementById(`profile-product-photo-id-${i}`)
                    .addEventListener('click', (event) => {
                        const id = event.target.getAttribute('id').split('-').pop();
                        openProductInfoUpdateWindow(products[Number(id)]);
                    });
                document.getElementById(`profile-product-remove-button-id-${i}`)
                    .addEventListener('click', (event) => {
                        const id = event.target.getAttribute('id').split('-').pop();
                        openDeleteConfirmationWindow(products[Number(id)], id);
                })
                i++;
            }
        });
}

async function loadOrders() {
    const getProductsBySeller = new URL('http://127.0.0.1:80/products/get/bySeller');
    const container = document.getElementsByClassName("profile-orders-container")[0];
    container.innerHTML = '';

    await fetch(getProductsBySeller, {method: 'get'})
        .then((response) => response.json())
        .then(async (orders) => {
            for (order of orders) {
                const orders = document.createElement('div');
                orders.setAttribute('class', 'profile-orders');
                for (product of order["products"]) {
                    const productImage = document.createElement('img');
                    productImage.setAttribute('src', product.imageRef);
                    productImage.setAttribute('class', 'profile-order-photo');
    
                    const productPrice = document.createElement('p');
                    productPrice.innerText = `${product['price']} р.`;
    
                    const number = document.createElement('p');
                    number.innerText = `${product['remained']} шт.`;

                    const productInfo = document.createElement('div');
                    productInfo.setAttribute('class', 'profile-order-info');
                    productInfo.textContent = product['title'];
                    productInfo.appendChild(productPrice);
                    productInfo.appendChild(number);
    
                    const productSlot = document.createElement('div');
                    productSlot.setAttribute('class', 'profile-order');
                    productSlot.appendChild(productImage);
                    productSlot.appendChild(productInfo);

                    orders.appendChild(productSlot);
                }
                
                getUserInfo = new URL('http://127.0.0.1:80/api/get/user/info');
                getUserInfo.search = new URLSearchParams({userId: order["buyerId"]}).toString();
                await fetch(getUserInfo, {method: 'get'})
                    .then((response) => response.json())
                    .then((userId) => {
                        const header = document.createElement('div');
                        header.setAttribute('class', 'profile-orders-header');
                        header.textContent = `Телеграм покупателя @${userId["username"]}`;

                        const innerContainer = document.createElement('div');
                        innerContainer.setAttribute('class', 'profile-orders-inner-container');
                        innerContainer.appendChild(header);
                        innerContainer.appendChild(orders);

                        if (order["workflowState"] === 4) {
                            const div = document.createElement('div');
                            div.setAttribute('class', "profile-orders-status");
                            div.textContent = 'Отменён ';
                            img = document.createElement('img');
                            img.setAttribute('src', "/assets/cancelled.png");
                            img.setAttribute('width', "15px");
                            img.setAttribute('height', "15px");
                            div.appendChild(img);
                            innerContainer.appendChild(div);
                        } else if (order["workflowState"] === 3) {
                            const div = document.createElement('div');
                            div.setAttribute('class', "profile-orders-status");
                            div.textContent = 'Получен ';
                            img = document.createElement('img');
                            img.setAttribute('src', "/assets/received.png");
                            img.setAttribute('width', "15px");
                            img.setAttribute('height', "15px");
                            div.appendChild(img);
                            innerContainer.appendChild(div);
                        } else if (order["workflowState"] === 2) {
                            const div = document.createElement('div');
                            div.setAttribute('class', "profile-orders-status");
                            div.textContent = 'Принят в работу ';
                            img = document.createElement('img');
                            img.setAttribute('src', "/assets/prinyato.png");
                            img.setAttribute('width', "15px");
                            img.setAttribute('height', "15px");
                            div.appendChild(img);
                            innerContainer.appendChild(div);
        
                            const cancelButton = document.createElement('button');
                            cancelButton.setAttribute('class', "profile-orders-cancel");
                            cancelButton.setAttribute('id', `cancel-${order["orderId"]}`);
                            cancelButton.textContent = 'Отменить заказ';
                            cancelButton.addEventListener('click', async (event) => {
                                const id = event.target.getAttribute('id');
                                const cancel = new URL('http://127.0.0.1:80/orders/cancel');
                                cancel.search = new URLSearchParams({orderId: id.substring(id.indexOf('-') + 1)}).toString();
                                fetch(cancel, {method: 'get'})
                                    .then(() => loadOrders());
                            });
                            innerContainer.appendChild(cancelButton);
                        } else if (order['workflowState'] === 1) {
                            const cancelButton = document.createElement('button');
                            cancelButton.setAttribute('class', "profile-orders-cancel");
                            cancelButton.setAttribute('id', `cancel-${order["orderId"]}`);
                            cancelButton.textContent = 'Отменить заказ';
                            cancelButton.addEventListener('click', async (event) => {
                                const id = event.target.getAttribute('id');
                                const cancel = new URL('http://127.0.0.1:80/orders/cancel');
                                cancel.search = new URLSearchParams({orderId: id.substring(id.indexOf('-') + 1)}).toString();
                                fetch(cancel, {method: 'get'})
                                    .then(() => loadOrders());
                            });
                            innerContainer.appendChild(cancelButton);
                            
                            const confirmButton = document.createElement('button');
                            confirmButton.setAttribute('class', "profile-orders-accept");
                            confirmButton.setAttribute('id', `cancel-${order["orderId"]}`);
                            confirmButton.textContent = 'Взять в работу';
                            confirmButton.addEventListener('click', async (event) => {
                                const id = event.target.getAttribute('id');
                                const cancel = new URL('http://127.0.0.1:80/orders/confirm');
                                cancel.search = new URLSearchParams({orderId: id.substring(id.indexOf('-') + 1)}).toString();
                                fetch(cancel, {method: 'get'})
                                    .then(() => loadOrders());
                            });
                            innerContainer.appendChild(confirmButton);
                        }
                        container.appendChild(innerContainer);
                    });
            }
        });
}

function openProductInfoUpdateWindow(data) {
    const title = document.createElement("div");
    const price = document.createElement("div");
    const remained = document.createElement("div");
    const description = document.createElement("div");
    const category = document.createElement("select")
    const form = document.createElement('form');
    const windowTitle = document.createElement('div');
    const applyButton = document.createElement("div");

    title.setAttribute('class', 'product-info-content');
    title.setAttribute('id', 'product-info-title');
    price.setAttribute('class', 'product-info-content');
    price.setAttribute('id', 'product-info-price');
    remained.setAttribute('class', 'product-info-content');
    remained.setAttribute('id', 'product-info-remained');
    description.setAttribute('class', 'product-info-content');
    description.setAttribute('id', 'product-info-description');
    category.setAttribute('class', 'product-info-content');
    category.setAttribute('id', 'product-info-category');
    category.setAttribute('type', "number");
    category.setAttribute('name', "category");
    form.setAttribute('class', 'info-update-form-container');
    form.setAttribute('encType', 'multipart/form-data');
    windowTitle.setAttribute('class', 'info-update-header');
    windowTitle.innerText = 'Информация о товаре';
    applyButton.setAttribute('class', 'info-update-buttons');
    applyButton.insertAdjacentHTML('afterbegin', `<input class="info-update-accept" type="button" value="Применить изменения"/>`)

    title.insertAdjacentText('afterbegin', `Название:`);
    price.insertAdjacentText('afterbegin', `Цена:`);
    remained.insertAdjacentText('afterbegin', `Осталось:`);
    description.insertAdjacentText('afterbegin', `Описание:`);

    title.insertAdjacentHTML('beforeend', `<br><input class="product-info-fields" type="text" name="title" id="info-title"/>`)
    price.insertAdjacentHTML('beforeend', `<br><input class="product-info-fields" type="number" name="title" id="info-price"/>`)
    remained.insertAdjacentHTML('beforeend', `<br><input class="product-info-fields" type="number" name="title" id="info-remained"/>`)
    description.insertAdjacentHTML('beforeend', `<br><textarea class="product-info-fields" name="description" id="info-desc"></textarea>`)

    const info = document.getElementsByClassName('product-info-content');
    const len = info.length;
    for (let i = 0; i < len; i++) {
        info[0].remove();
    }
    
    fetch('api/get/all/categories', {method: 'get'})
        .then((response) => response.json())
        .then((categories) => {
            let currCatTitle = "Выберите категорию";
            let currCatId = 0;
            for (cat of categories) {
                if (cat.id === Number(data['categoryId'])) {
                    category.insertAdjacentHTML('afterbegin',
                        `<option value="${Number(data['categoryId'])}">${cat.title}</option>`);
                    currCatTitle = cat.title;
                    currCatId = Number(data['categoryId']);
                } else {
                    const option = document.createElement("option");
                    option.setAttribute('value', cat.id);
                    option.textContent = cat.title;
                    category.appendChild(option);
                }
            }
            category.insertAdjacentHTML('afterbegin',
                `<option selected value="defaultCategory" class="default-content">Выбрать категорию</option>`);
            if (currCatId !== 0) {
                category.value = currCatId;
            }
        })

    const text = document.createElement('text');
    text.innerText = 'Категория:';
    text.className = "product-category-text"
    text.insertAdjacentHTML('beforeend', `<br>`);

    form.appendChild(windowTitle);
    form.appendChild(title);
    form.appendChild(price);
    form.appendChild(remained);
    form.appendChild(description);
    form.appendChild(text);
    form.appendChild(category);
    form.appendChild(applyButton);

    document.getElementsByClassName('profile-market-info-update-window')[0].appendChild(form);

    document.getElementById("info-title").value = data['title'];
    document.getElementById("info-price").value = data['price'];
    document.getElementById("info-remained").value = data['remained'];
    document.getElementById("info-desc").value = data['description'];
    category.value = data['categoryId'];

    applyButton.addEventListener('click', async function () {
        let formData = new FormData();
        formData.append('marketId', JSON.stringify(data['fullId']['marketId']));
        formData.append('userId', JSON.stringify(data['fullId']['userId']));
        formData.append('productId', JSON.stringify(data['fullId']['productId']));
        formData.append('title', document.getElementById("info-title").value);
        formData.append('price', document.getElementById("info-price").value);
        formData.append('remained', document.getElementById("info-remained").value);
        formData.append('description', document.getElementById("info-desc").value);
        formData.append('category', document.getElementById("product-info-category").value);

        await fetch('products/save', {
            method: 'post',
            body: formData
        });
        productInfoUpdateWindow.hidden = true;
    })

    productInfoUpdateWindow.hidden = false;
}

function openDeleteConfirmationWindow(data, id) {
    const form = document.createElement('form');
    const question = document.createElement("div");
    const confirm = document.createElement("button");
    const deny = document.createElement("button");

    form.setAttribute('class', 'info-update-form-container');
    form.setAttribute('encType', 'multipart/form-data');
    question.setAttribute('class', 'product-delete-content');
    question.setAttribute('id', 'product-info-question');
    confirm.setAttribute('class', 'product-delete-accept');
    confirm.setAttribute('id', 'product-info-confirm');
    confirm.setAttribute('type', 'button');
    confirm.textContent = 'Удалить';
    deny.setAttribute('class', 'product-cancel-button');
    deny.setAttribute('id', 'product-info-deny');
    deny.setAttribute('type', 'button');
    deny.textContent = 'Отмена';
    question.insertAdjacentText('afterbegin', `Вы действительно хотите удалить товар \"${data['title']}\"?`);

    const info = document.getElementsByClassName('product-info-content');
    const len = info.length;
    for (let i = 0; i < len; i++) {
        info[0].remove();
    }

    form.appendChild(question);
    form.appendChild(confirm);
    form.appendChild(deny);

    document.getElementsByClassName('profile-market-info-update-window')[0].appendChild(form);

    confirm.addEventListener('click', async function () {
        let formData = new FormData();
        formData.append('productId', JSON.stringify(data['fullId']['productId']));

        fetch('products/delete', {
            method: 'post',
            body: formData
        }).then((response) => {
            document.getElementById(`profile-product-${id}`).remove();
            closeProductInfoUpdateWindow();
        });
    });
    deny.addEventListener('click', function () {
        closeProductInfoUpdateWindow()
    });
    
    productInfoUpdateWindow.hidden = false;
}

function openPurchases() {
    purchasesInnerContainer[0].hidden = false;
    productsInnerContainer[0].hidden = true;
    ordersInnerContainer[0].hidden = true;

    const purchases = document.getElementById("profile-tabs-purchases");
    purchases.innerHTML = '';
    const b = document.createElement('b');
    b.textContent = "Мои покупки"
    purchases.appendChild(b);

    const products = document.getElementById("profile-tabs-products");
    products.innerHTML = '';
    products.textContent = "Мои товары";

    const orders = document.getElementById("profile-tabs-orders");
    orders.innerHTML = '';
    orders.textContent = "Мои заказы";

    purchasesInnerContainer[0].style.opacity = 1;
    productsInnerContainer[0].style.opacity = 0;
    ordersInnerContainer[0].style.opacity = 0;
}

function openProducts () {
    purchasesInnerContainer[0].hidden = true;
    productsInnerContainer[0].hidden = false;
    ordersInnerContainer[0].hidden = true;

    const purchases = document.getElementById("profile-tabs-purchases");
    purchases.innerHTML = '';
    purchases.textContent = "Мои покупки";

    const products = document.getElementById("profile-tabs-products");
    products.innerHTML = '';
    const b = document.createElement('b');
    b.textContent = "Мои товары"
    products.appendChild(b);
    
    const orders = document.getElementById("profile-tabs-orders");
    orders.innerHTML = '';
    orders.textContent = "Мои заказы";

    purchasesInnerContainer[0].style.opacity = 0;
    productsInnerContainer[0].style.opacity = 1;
    ordersInnerContainer[0].style.opacity = 0;
}

function openOrders () {
    purchasesInnerContainer[0].hidden = true;
    productsInnerContainer[0].hidden = true;
    ordersInnerContainer[0].hidden = false;

    const purchases = document.getElementById("profile-tabs-purchases");
    purchases.innerHTML = '';
    purchases.textContent = "Мои покупки";

    const products = document.getElementById("profile-tabs-products");
    products.innerHTML = '';
    products.textContent = "Мои товары";
    
    const orders = document.getElementById("profile-tabs-orders");
    orders.innerHTML = '';
    const b = document.createElement('b');
    b.textContent = "Мои заказы";
    orders.appendChild(b);
    
    purchasesInnerContainer[0].style.opacity = 0;
    productsInnerContainer[0].style.opacity = 0;
    ordersInnerContainer[0].style.opacity = 1;
}

const container = document.querySelector('.profile-container');

const purchasesButton = document.getElementById("profile-tabs-purchases");
purchasesButton.addEventListener('click', () => openPurchases());

const productsButton = document.getElementById("profile-tabs-products");
productsButton.addEventListener('click', () => openProducts());

const ordersButton = document.getElementById("profile-tabs-orders");
ordersButton.addEventListener('click', () => openOrders());

const purchasesInnerContainer = document.getElementsByClassName("profile-purchases-container");
const productsInnerContainer = document.getElementsByClassName("profile-products-container");
const ordersInnerContainer = document.getElementsByClassName("profile-orders-container");

const purchases = document.getElementsByClassName("profile-purchases-inner-container")
const products = document.getElementsByClassName("profile-products-inner-container")
const orders = document.getElementsByClassName("profile-orders-inner-container")

loadPurchases().then(loadOrders);
loadProducts();
openProducts();
