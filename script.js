const drinks = [
    {
        id: 1,
        name: "Coca-Cola",
        category: "cola",
        image: "media/coke.png"
    },
    {
        id: 2,
        name: "Pepsi",
        category: "cola",
        image: "media/pepsi.png"
    },
    {
        id: 3,
        name: "Thums Up",
        category: "cola",
        image: "media/thumsup.png"
    },
    {
        id: 4,
        name: "Campa Cola",
        category: "cola",
        image: "media/campa.png"
    },
    {
        id: 5,
        name: "Sprite",
        category: "lemon",
        image: "media/sprite.png"
    },
    {
        id: 6,
        name: "Limca",
        category: "lemon",
        image: "media/limca.png"
    },
    {
        id: 7,
        name: "Fanta",
        category: "orange",
        image: "media/fanta.png"
    },
    {
        id: 8,
        name: "Mirinda",
        category: "orange",
        image: "media/mirinda.png"
    },
    {
        id: 9,
        name: "Mountain Dew",
        category: "energy",
        image: "media/mountain-dew.png"
    },
    {
        id: 10,
        name: "Sting Yellow",
        category: "energy",
        image: "media/sting.png"
    }
    
    
    
];

let cart = [];
let selectedDrink = null;


/* SHOW DRINKS */

function showDrinks(list = drinks) {

    const productGrid =
        document.getElementById("productGrid");

    productGrid.innerHTML = "";

    list.forEach(drink => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img src="${drink.image}" alt="${drink.name}">
            </div>

            <h3>${drink.name}</h3>

            <p>Cold Drink</p>

            <div class="product-bottom">

                <div class="price">
                    From ₹20
                </div>

                <button
                    class="add-btn"
                    onclick="chooseSize(${drink.id})">
                    + Add
                </button>

            </div>
        `;

        productGrid.appendChild(card);
    });
}


/* FILTER */

function filterDrinks(category, button) {

    document.querySelectorAll(".filter").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    if (category === "all") {
        showDrinks(drinks);
        return;
    }

    const filtered = drinks.filter(
        drink => drink.category === category
    );

    showDrinks(filtered);
}


/* SIZE POPUP */

function chooseSize(id) {

    selectedDrink = drinks.find(
        drink => drink.id === id
    );

    if (!selectedDrink) return;

    let oldPopup = document.getElementById("sizePopup");

    if (oldPopup) {
        oldPopup.remove();
    }

    const popup = document.createElement("div");

    popup.id = "sizePopup";

    popup.innerHTML = `
        <div class="size-popup-box">

            <button
                class="size-close"
                onclick="closeSizePopup()">
                ×
            </button>

            <div class="size-icon">
                🥤
            </div>

            <h2>
                ${selectedDrink.name}
            </h2>

            <p>
                Apni bottle size choose karo
            </p>

            <div class="size-options">

                <button
                    class="size-option"
                    onclick="selectSize('Small', 20)">

                    <span>🥤</span>

                    <strong>Small</strong>

                    <b>₹20</b>

                </button>

                <button
                    class="size-option big-option"
                    onclick="selectSize('Big', 40)">

                    <span>🥤</span>

                    <strong>Big</strong>

                    <b>₹40</b>

                </button>

            </div>

        </div>
    `;

    document.body.appendChild(popup);
}


/* SELECT SIZE */

function selectSize(size, price) {

    if (!selectedDrink) return;

    addToCart(
        selectedDrink.id,
        size,
        price
    );

    closeSizePopup();
}


/* CLOSE SIZE POPUP */

function closeSizePopup() {

    const popup =
        document.getElementById("sizePopup");

    if (popup) {
        popup.remove();
    }

    selectedDrink = null;
}


/* ADD TO CART */

function addToCart(id, size, price) {

    const drink = drinks.find(
        item => item.id === id
    );

    if (!drink) return;

    const existing = cart.find(
        item =>
            item.id === id &&
            item.size === size
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...drink,
            size: size,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}


/* UPDATE CART */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const quantity = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    cartCount.textContent = quantity;

    showCartItems();
}


/* SHOW CART */

function showCartItems() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="
                text-align:center;
                padding:25px;
                color:#777;
            ">
                Cart abhi empty hai 🥤
            </p>
        `;

        cartTotal.textContent = "0";

        return;
    }

    let total = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>

                <div class="cart-item-name">
                    🥤 ${item.name}
                </div>

                <small>
                    ${item.size} •
                    ₹${item.price} ×
                    ${item.quantity}
                </small>

            </div>

            <div>

                <span class="cart-item-price">
                    ₹${itemTotal}
                </span>

                <button
                    class="remove-btn"
                    onclick="removeFromCart(
                        ${item.id},
                        '${item.size}'
                    )">
                    −
                </button>

            </div>
        `;

        cartItems.appendChild(div);
    });

    cartTotal.textContent = total;
}


/* REMOVE FROM CART */

function removeFromCart(id, size) {

    const item = cart.find(
        item =>
            item.id === id &&
            item.size === size
    );

    if (!item) return;

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart = cart.filter(
            item =>
                !(
                    item.id === id &&
                    item.size === size
                )
        );
    }

    updateCart();
}


/* OPEN CART */

function openCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "flex";

    showCartItems();
}


/* CLOSE CART */

function closeCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "none";
}


/* WHATSAPP ORDER */

function sendOrder() {

    if (cart.length === 0) {

        alert(
            "Pehle cold drink cart mein add karo 🥤"
        );

        return;
    }

    const location =
        document.getElementById(
            "location"
        ).value.trim();

    if (location === "") {

        alert(
            "Please apna delivery address likho 📍"
        );

        document.getElementById(
            "location"
        ).focus();

        return;
    }

    let message =
        "🥤 *NEW COLD DRINK ORDER*%0A%0A";

    let total = 0;

    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        message +=
            `🥤 ${item.name} - ${item.size} - ${item.quantity} × ₹${item.price} = ₹${itemTotal}%0A`;
    });

    message +=
        `%0A💰 *TOTAL: ₹${total}*%0A`;

    message +=
        `%0A📍 *DELIVERY ADDRESS:*%0A` +
        encodeURIComponent(location);

    const phoneNumber =
        "919719008281";

    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(
        whatsappURL,
        "_blank"
    );
}


/* OUTSIDE CART CLICK */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("cartModal");

        if (event.target === modal) {
            closeCart();
        }
    }
);


/* POPUP CSS */

const sizeStyle =
document.createElement("style");

sizeStyle.textContent = `

#sizePopup {
    position: fixed;
    inset: 0;
    background: rgba(10, 25, 45, 0.65);
    backdrop-filter: blur(7px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    padding: 20px;
    animation: sizeFade 0.25s ease;
}

@keyframes sizeFade {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.size-popup-box {
    position: relative;
    width: 100%;
    max-width: 420px;
    background: white;
    border-radius: 25px;
    padding: 30px;
    text-align: center;
    box-shadow: 0 25px 80px rgba(0,0,0,0.3);
    animation: sizeBox 0.3s ease;
}

@keyframes sizeBox {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.9);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.size-close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 38px;
    height: 38px;
    border: none;
    border-radius: 50%;
    background: #f1f5f9;
    font-size: 24px;
    cursor: pointer;
}

.size-icon {
    font-size: 45px;
    margin-bottom: 8px;
}

.size-popup-box h2 {
    margin: 0;
    font-size: 25px;
    color: #172033;
}

.size-popup-box p {
    margin: 7px 0 22px;
    color: #667085;
    font-size: 14px;
}

.size-options {
    display: flex;
    gap: 12px;
}

.size-option {
    flex: 1;
    border: 2px solid #dce8f5;
    background: #f8fbff;
    border-radius: 18px;
    padding: 18px 10px;
    cursor: pointer;
    transition: 0.25s ease;
}

.size-option:hover {
    border-color: #087cf7;
    background: #eef7ff;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(8,124,247,0.15);
}

.size-option span {
    display: block;
    font-size: 30px;
    margin-bottom: 7px;
}

.size-option strong {
    display: block;
    font-size: 17px;
    color: #172033;
}

.size-option b {
    display: block;
    color: #087cf7;
    font-size: 20px;
    margin-top: 5px;
}

.big-option:hover {
    border-color: #00a86b;
    background: #effff8;
}

.big-option b {
    color: #00a86b;
}

@media (max-width: 500px) {

    .size-popup-box {
        padding: 25px 18px;
    }

    .size-options {
        gap: 8px;
    }

    .size-option {
        padding: 15px 7px;
    }
}

`;

document.head.appendChild(sizeStyle);


/* START WEBSITE */

showDrinks();
updateCart();