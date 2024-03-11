const items = [
    { id: 'item1', name: 'Farine', price: 0.9, quantity: 0,imageLink: 'http://lepidor.com.tn/wp-content/uploads/farine-patissiere-1.png'},
    { id: 'item2', name: 'Semoule', price: 0.8, quantity: 0,imageLink:'http://www.warda.tn/sites/default/files/2023-03/semoule-fine-list.png'},
    { id: 'item3', name: 'Lait', price: 1.5, quantity: 0,imageLink:'http://www.delice.tn/wp-content/uploads/2023/04/lait-demi-ecreme.png'},
    { id: 'item4', name: 'Sucre', price: 1.2, quantity: 0,imageLink:"http://www.espacemanager.com/sites/default/files/sucre-blanc_1607.jpg"},
    { id: 'item5', name: 'Yaourt à boire', price: 1.15, quantity: 0,imageLink:"http://courses.monoprix.tn/lac/131081-large_default/yaourt-%C3%A0-boire.jpg"},
];

const cartElement = document.getElementById('cart');
const totalElement = document.getElementById('total');

function renderCart() {
    cartElement.innerHTML = ''; 
    let total = 0;

    for (const item of items) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.id = item.id;

        const imgElement = document.createElement('img');
        imgElement.src = item.imageLink;
        imgElement.alt = item.name;

        const itemNameElement = document.createElement('span');
        itemNameElement.textContent = item.name;

        const quantityIncBtn = createButton('+', () => adjustQuantity(item.id, 1));
        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = item.quantity;
        const quantityDecBtn = createButton('-', () => adjustQuantity(item.id, -1));

        const deleteBtn = createButton('Delete', () => deleteItem(item.id));

        const itemPriceElement = document.createElement('span');
        itemPriceElement.textContent = `DT ${(item.price * item.quantity).toFixed(2)}`;

        total += item.price * item.quantity;

        itemElement.appendChild(imgElement);
        itemElement.appendChild(itemNameElement);
        itemElement.appendChild(quantityIncBtn);
        itemElement.appendChild(quantityDisplay);
        itemElement.appendChild(quantityDecBtn);
        itemElement.appendChild(deleteBtn);
        itemElement.appendChild(itemPriceElement);

        cartElement.appendChild(itemElement);
    }

    const totalElement = document.createElement('div');
    totalElement.textContent = `Total: DT ${total.toFixed(2)}`;
    cartElement.appendChild(totalElement);
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

function adjustQuantity(itemId, amount) {
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.quantity = Math.max(0, item.quantity + amount);
        renderCart();
    }
}

function toggleLike(itemId) {
    const item = items.find(item => item.id === itemId);
    if (item) {
        item.liked = !item.liked;
        renderCart();
    }
}

function deleteItem(itemId) {
    const index = items.findIndex(item => item.id === itemId);
    if (index !== -1) {
        items.splice(index, 1);
        renderCart();
    }
}

renderCart();
