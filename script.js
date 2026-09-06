// =============================================
// Sawsan Aroma Coffee - E-Commerce Store
// =============================================

// =============================================
// PRODUCTS DATABASE
// =============================================

const products = [
    {
        id: 1,
        name: "بن سوسن أروما 250 جم",
        description: "نكهة غنية ومميزة - جودة فاخرة",
        price: 50,
        rating: 4.8,
        image: "☕"
    },
    {
        id: 2,
        name: "بن سوسن أروما 500 جم",
        description: "للمحبين الحقيقيين للقهوة",
        price: 90,
        rating: 4.9,
        image: "☕"
    },
    {
        id: 3,
        name: "بن سوسن أروما 1 كجم",
        description: "تغليف فاخر لعشاق القهوة الحقيقيين",
        price: 160,
        rating: 5.0,
        image: "☕"
    },
    {
        id: 4,
        name: "مزيج أروما الفاخر",
        description: "خليط خاص من أفضل حبوب البن العالمية",
        price: 120,
        rating: 4.7,
        image: "☕"
    },
    {
        id: 5,
        name: "بن أثيوبي أصلي",
        description: "بن طبيعي من مزارع أثيوبيا الجبلية",
        price: 130,
        rating: 4.9,
        image: "☕"
    },
    {
        id: 6,
        name: "قهوة منزلية الفاخرة",
        description: "تجربة فريدة من نوعها في راحة منزلك",
        price: 100,
        rating: 4.6,
        image: "☕"
    }
];

// Shopping Cart
let cart = [];

// =============================================
// INITIALIZATION
// =============================================

window.addEventListener("load", () => {
    console.log("🎉 موقع سوسن أروما كوفي تم تحميله بنجاح");
    renderProducts();
    loadCart();
    setupEventListeners();
});

// =============================================
// RENDER PRODUCTS
// =============================================

/**
 * عرض جميع المنتجات
 * Render all products
 */
function renderProducts() {
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product";
        productCard.innerHTML = `
            <div style="font-size: 3em; margin-bottom: 10px;">${product.image}</div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-rating">
                ${'⭐'.repeat(Math.floor(product.rating))} (${product.rating})
            </div>
            <div class="price">${product.price} ريال</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                أضف إلى السلة 🛒
            </button>
        `;
        container.appendChild(productCard);
    });

    console.log(`📦 تم عرض ${products.length} منتج`);
}

// =============================================
// SHOPPING CART FUNCTIONS
// =============================================

/**
 * إضافة منتج إلى السلة
 * Add product to cart
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) {
        alert("المنتج غير موجود!");
        return;
    }

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
        console.log(`✅ تم زيادة كمية: ${product.name}`);
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
        console.log(`✅ تم إضافة: ${product.name}`);
    }

    saveCart();
    updateCartDisplay();
    showNotification(`تم إضافة ${product.name} إلى السلة ✅`);
}

/**
 * إزالة منتج من السلة
 * Remove product from cart
 */
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);

    if (index > -1) {
        const product = cart[index];
        cart.splice(index, 1);
        saveCart();
        updateCartDisplay();
        console.log(`🗑️ تم حذف: ${product.name}`);
    }
}

/**
 * تحديث عرض السلة
 * Update cart display
 */
function updateCartDisplay() {
    const cartCount = document.getElementById("cartCount");
    const cartItemsDiv = document.getElementById("cartItems");
    const totalPrice = document.getElementById("totalPrice");

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Clear cart items display
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #999;">
                <p>🛒 السلة فارغة</p>
                <p style="font-size: 0.9em;">ابدأ بإضافة المنتجات الآن</p>
            </div>
        `;
        totalPrice.textContent = "0";
        return;
    }

    // Render cart items
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.innerHTML = `
            <div>
                <div class="cart-item-name">${item.name}</div>
                <div style="font-size: 0.9em; color: #999;">
                    الكمية: ${item.quantity} × ${item.price} ريال
                </div>
            </div>
            <div>
                <div class="cart-item-price">${itemTotal} ريال</div>
                <button class="remove-from-cart" onclick="removeFromCart(${item.id})">
                    حذف
                </button>
            </div>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });

    totalPrice.textContent = total;
}

/**
 * تفريغ السلة
 * Clear cart
 */
function clearCart() {
    if (cart.length === 0) {
        alert("السلة فارغة بالفعل!");
        return;
    }

    if (confirm("هل تريد تفريغ السلة بالكامل؟")) {
        cart = [];
        saveCart();
        updateCartDisplay();
        console.log("🗑️ تم تفريغ السلة");
        showNotification("تم تفريغ السلة ✅");
    }
}

/**
 * إتمام الشراء
 * Checkout
 */
function checkout() {
    if (cart.length === 0) {
        alert("السلة فارغة! أضف منتجات أولاً.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const message = encodeURIComponent(
        `مرحباً! أريد أن أطلب:\n${cart.map(item => 
            `- ${item.name} (الكمية: ${item.quantity})`
        ).join('\n')}\n\nالإجمالي: ${total} ريال`
    );

    window.open(`https://wa.me/201234567890?text=${message}`, "_blank");
    
    console.log("✅ تم توجيهك إلى واتساب");
    showNotification("جاري فتح واتساب... 📱");
}

// =============================================
// LOCAL STORAGE FUNCTIONS
// =============================================

/**
 * حفظ السلة في التخزين المحلي
 * Save cart to local storage
 */
function saveCart() {
    try {
        localStorage.setItem("sawsanCart", JSON.stringify(cart));
        console.log("💾 تم حفظ السلة");
    } catch (error) {
        console.error("خطأ في الحفظ:", error);
    }
}

/**
 * تحميل السلة من التخزين المحلي
 * Load cart from local storage
 */
function loadCart() {
    try {
        const savedCart = localStorage.getItem("sawsanCart");
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartDisplay();
            console.log("✅ تم تحميل السلة المحفوظة");
        }
    } catch (error) {
        console.error("خطأ في التحميل:", error);
        cart = [];
    }
}

// =============================================
// UI FUNCTIONS
// =============================================

/**
 * تبديل عرض السلة
 * Toggle cart modal
 */
function toggleCart() {
    const modal = document.getElementById("cartModal");
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

/**
 * إغلاق السلة عند النقر خارجها
 * Close cart when clicking outside
 */
window.addEventListener("click", (event) => {
    const modal = document.getElementById("cartModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

/**
 * إظهار إشعار عائم
 * Show notification
 */
function showNotification(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = "slideOut 0.3s ease";
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// =============================================
// EVENT LISTENERS
// =============================================

/**
 * إعداد مستمعي الأحداث
 * Setup event listeners
 */
function setupEventListeners() {
    // Contact form
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showNotification("شكراً لرسالتك! سنرد عليك قريباً ✅");
            contactForm.reset();
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    console.log("✅ تم إعداد مستمعي الأحداث");
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * الحصول على إجمالي سعر السلة
 * Get cart total
 */
function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * طباعة معلومات التصحيح
 * Log debug info
 */
function logDebugInfo() {
    console.group("📊 Debug Info - Sawsan Aroma Coffee");
    console.log("📦 المنتجات:", products.length);
    console.log("🛒 عناصر السلة:", cart.length);
    console.log("💰 إجمالي السلة:", getCartTotal(), "ريال");
    console.log("🛒 السلة:", cart);
    console.groupEnd();
}

// Export functions
window.logDebugInfo = logDebugInfo;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.clearCart = clearCart;
window.checkout = checkout;

console.log("☕ سوسن أروما كوفي - موقع متجر البن");
console.log("استخدم logDebugInfo() للمزيد من المعلومات");
