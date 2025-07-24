// Product Data
const products = [
    {
        id: 1,
        name: "MacBook Pro 16\" M3",
        category: "laptop",
        brand: "apple",
        price: 2499,
        originalPrice: 2699,
        description: "Powerful laptop with M3 Pro chip, 18GB RAM, 512GB SSD. Perfect for professionals and creators.",
        icon: "fas fa-laptop",
        rating: 4.8,
        reviews: 245,
        inStock: true,
        features: ["M3 Pro Chip", "18GB RAM", "512GB SSD", "16.2-inch Display"]
    },
    {
        id: 2,
        name: "iPhone 15 Pro Max",
        category: "phone",
        brand: "apple",
        price: 1199,
        originalPrice: 1299,
        description: "Latest iPhone with titanium design, advanced camera system, and A17 Pro chip.",
        icon: "fas fa-mobile-alt",
        rating: 4.7,
        reviews: 389,
        inStock: true,
        features: ["A17 Pro Chip", "256GB Storage", "Pro Camera System", "Titanium Design"]
    },
    {
        id: 3,
        name: "Dell XPS 13 Plus",
        category: "laptop",
        brand: "dell",
        price: 1299,
        originalPrice: 1499,
        description: "Ultra-portable laptop with stunning InfinityEdge display and premium build quality.",
        icon: "fas fa-laptop",
        rating: 4.6,
        reviews: 167,
        inStock: true,
        features: ["Intel i7", "16GB RAM", "512GB SSD", "13.4-inch OLED"]
    },
    {
        id: 4,
        name: "Logitech MX Master 3S",
        category: "mouse",
        brand: "logitech",
        price: 99,
        originalPrice: 119,
        description: "Advanced wireless mouse with precision scroll wheel and customizable buttons.",
        icon: "fas fa-mouse",
        rating: 4.5,
        reviews: 523,
        inStock: true,
        features: ["8K DPI Sensor", "Wireless", "Fast Charging", "Multi-Device"]
    },
    {
        id: 5,
        name: "Samsung Galaxy S24 Ultra",
        category: "phone",
        brand: "samsung",
        price: 1299,
        originalPrice: 1399,
        description: "Flagship Android phone with S Pen, AI-powered features, and 200MP camera.",
        icon: "fas fa-mobile-alt",
        rating: 4.4,
        reviews: 298,
        inStock: true,
        features: ["S Pen Included", "200MP Camera", "AI Features", "512GB Storage"]
    },
    {
        id: 6,
        name: "Apple Magic Keyboard",
        category: "keyboard",
        brand: "apple",
        price: 179,
        originalPrice: 199,
        description: "Wireless keyboard with scissor mechanism, numeric keypad, and Touch ID.",
        icon: "fas fa-keyboard",
        rating: 4.3,
        reviews: 156,
        inStock: true,
        features: ["Touch ID", "Numeric Keypad", "Wireless", "Scissor Keys"]
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        category: "earbuds",
        brand: "sony",
        price: 399,
        originalPrice: 449,
        description: "Industry-leading noise canceling wireless headphones with 30-hour battery life.",
        icon: "fas fa-headphones",
        rating: 4.9,
        reviews: 674,
        inStock: true,
        features: ["30H Battery", "Noise Canceling", "Hi-Res Audio", "Quick Charge"]
    },
    {
        id: 8,
        name: "Apple 67W USB-C Charger",
        category: "charger",
        brand: "apple",
        price: 59,
        originalPrice: 69,
        description: "Fast charging USB-C power adapter with GaN technology for efficient charging.",
        icon: "fas fa-plug",
        rating: 4.2,
        reviews: 89,
        inStock: true,
        features: ["67W Power", "USB-C", "GaN Technology", "Compact Design"]
    },
    {
        id: 9,
        name: "HP Spectre x360 16",
        category: "laptop",
        brand: "hp",
        price: 1599,
        originalPrice: 1799,
        description: "Convertible laptop with OLED display, premium design, and all-day battery life.",
        icon: "fas fa-laptop",
        rating: 4.5,
        reviews: 134,
        inStock: true,
        features: ["OLED Display", "360° Hinge", "Intel i7", "16GB RAM"]
    },
    {
        id: 10,
        name: "AirPods Pro 2nd Gen",
        category: "earbuds",
        brand: "apple",
        price: 249,
        originalPrice: 279,
        description: "Advanced noise cancellation with spatial audio and adaptive transparency.",
        icon: "fas fa-headphones",
        rating: 4.6,
        reviews: 445,
        inStock: true,
        features: ["Active Noise Cancellation", "Spatial Audio", "MagSafe Case", "6H Battery"]
    },
    {
        id: 11,
        name: "Logitech G915 TKL",
        category: "keyboard",
        brand: "logitech",
        price: 249,
        originalPrice: 299,
        description: "Low-profile mechanical gaming keyboard with RGB lighting and wireless connectivity.",
        icon: "fas fa-keyboard",
        rating: 4.4,
        reviews: 278,
        inStock: true,
        features: ["Mechanical Keys", "RGB Lighting", "Wireless", "Low Profile"]
    },
    {
        id: 12,
        name: "Samsung 65W Super Fast Charger",
        category: "charger",
        brand: "samsung",
        price: 49,
        originalPrice: 59,
        description: "Super fast charging adapter with PPS technology and USB-C cable included.",
        icon: "fas fa-plug",
        rating: 4.1,
        reviews: 167,
        inStock: true,
        features: ["65W Power", "PPS Technology", "USB-C Cable", "Fast Charging"]
    },
    {
        id: 13,
        name: "Google Pixel 8 Pro",
        category: "phone",
        brand: "google",
        price: 999,
        originalPrice: 1099,
        description: "AI-powered smartphone with advanced photography features and pure Android experience.",
        icon: "fas fa-mobile-alt",
        rating: 4.3,
        reviews: 234,
        inStock: true,
        features: ["AI Photography", "Pure Android", "Tensor G3", "256GB Storage"]
    },
    {
        id: 14,
        name: "Razer DeathAdder V3",
        category: "mouse",
        brand: "razer",
        price: 89,
        originalPrice: 99,
        description: "Ergonomic gaming mouse with Focus Pro sensor and ultra-lightweight design.",
        icon: "fas fa-mouse",
        rating: 4.6,
        reviews: 189,
        inStock: true,
        features: ["30K DPI", "Ultra-Lightweight", "Ergonomic", "Gaming Grade"]
    },
    {
        id: 15,
        name: "Anker PowerCore 26800",
        category: "charger",
        brand: "anker",
        price: 79,
        originalPrice: 89,
        description: "High-capacity portable charger with fast charging for multiple devices.",
        icon: "fas fa-battery-full",
        rating: 4.4,
        reviews: 356,
        inStock: true,
        features: ["26800mAh", "Fast Charging", "3 USB Ports", "Portable"]
    }
];

// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let filteredProducts = [...products];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const brandFilter = document.getElementById('brandFilter');
const sortFilter = document.getElementById('sortFilter');
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartCount = document.getElementById('cartCount');
const loading = document.getElementById('loading');
const modal = document.getElementById('modal');
const toast = document.getElementById('toast');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    displayProducts(products);
    updateCartUI();
    setupEventListeners();
    setupScrollEffects();
    populateBrandFilter();
}

function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter functionality
    categoryFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    brandFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    
    // Click outside to close cart
    document.addEventListener('click', function(event) {
        if (!cartSidebar.contains(event.target) && !event.target.closest('.cart-btn')) {
            cartSidebar.classList.remove('open');
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            cartSidebar.classList.remove('open');
        }
        if (event.ctrlKey && event.key === 'k') {
            event.preventDefault();
            searchInput.focus();
        }
    });
}

function setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

function populateBrandFilter() {
    const brands = [...new Set(products.map(product => product.brand))];
    brandFilter.innerHTML = '<option value="">All Brands</option>';
    
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand.charAt(0).toUpperCase() + brand.slice(1);
        brandFilter.appendChild(option);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showLoading() {
    loading.classList.add('show');
    productsGrid.style.opacity = '0.5';
}

function hideLoading() {
    loading.classList.remove('show');
    productsGrid.style.opacity = '1';
}

function showToast(message, type = 'success') {
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Remove existing classes
    toast.className = 'toast';
    
    // Set icon and class based on type
    switch(type) {
        case 'success':
            toastIcon.className = 'toast-icon fas fa-check-circle';
            toast.classList.add('success');
            break;
        case 'error':
            toastIcon.className = 'toast-icon fas fa-exclamation-circle';
            toast.classList.add('error');
            break;
        case 'info':
            toastIcon.className = 'toast-icon fas fa-info-circle';
            toast.classList.add('info');
            break;
    }
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Product Display Functions
function displayProducts(productsToShow) {
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: white; font-size: 1.2rem; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search criteria or filters</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="showProductDetails(${product.id})" data-product-id="${product.id}">
            <div class="product-image">
                <i class="${product.icon}"></i>
                ${product.originalPrice > product.price ? '<div class="sale-badge">SALE</div>' : ''}
                <div class="product-overlay">
                    <button class="wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="quick-view-btn" onclick="event.stopPropagation(); showProductDetails(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand.toUpperCase()}</div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
                </div>
                <div class="product-pricing">
                    <div class="product-price">${product.price.toLocaleString()}</div>
                    ${product.originalPrice > product.price ? 
                        `<div class="original-price">${product.originalPrice.toLocaleString()}</div>` : ''}
                </div>
                <div class="product-features">
                    ${product.features.slice(0, 2).map(feature => 
                        `<span class="feature-tag">${feature}</span>`
                    ).join('')}
                </div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="buy-now" onclick="buyNow(${product.id})">
                        <i class="fas fa-bolt"></i> Buy Now
                    </button>
                </div>
                <div class="stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                    <i class="fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                    ${product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add entrance animation
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Search and Filter Functions
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.features.some(feature => feature.toLowerCase().includes(searchTerm))
        );
    }
    
    applyFilters();
}

function applyFilters() {
    showLoading();
    
    setTimeout(() => {
        let filtered = [...filteredProducts];
        
        // Category filter
        const category = categoryFilter.value;
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }
        
        // Price filter
        const priceRange = priceFilter.value;
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
            filtered = filtered.filter(product => {
                if (priceRange === '1000+') return product.price >= 1000;
                return product.price >= parseInt(min) && product.price <= parseInt(max);
            });
        }
        
        // Brand filter
        const brand = brandFilter.value;
        if (brand) {
            filtered = filtered.filter(product => product.brand === brand);
        }
        
        // Sort products
        const sortBy = sortFilter.value;
        filtered.sort((a, b) => {
            switch(sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
        
        hideLoading();
        displayProducts(filtered);
    }, 500);
}

function clearFilters() {
    searchInput.value = '';
    categoryFilter.value = '';
    priceFilter.value = '';
    brandFilter.value = '';
    sortFilter.value = 'name';
    
    filteredProducts = [...products];
    displayProducts(products);
    showToast('Filters cleared', 'info');
}

function filterByCategory(category) {
    categoryFilter.value = category;
    applyFilters();
    
    // Scroll to products section
    document.getElementById('products').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showToast(`${product.name} added to cart!`, 'success');
    
    // Add visual feedback
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (productCard) {
        productCard.classList.add('added-to-cart');
        setTimeout(() => {
            productCard.classList.remove('added-to-cart');
        }, 600);
    }
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        cart.splice(itemIndex, 1);
        updateCartUI();
        saveCartToStorage();
        showToast(`${item.name} removed from cart`, 'info');
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        saveCartToStorage();
    }
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const subtotalElement = document.getElementById('subtotalAmount');
    const shippingElement = document.getElementById('shippingAmount');
    const taxElement = document.getElementById('taxAmount');
    const totalElement = document.getElementById('totalAmount');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p>Start shopping to add items to your cart</p>
            </div>
        `;
        cartTotal.style.display = 'none';
        return;
    }
    
    // Display cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <i class="${item.icon}"></i>
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">${item.price.toLocaleString()}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <div class="qty-display">${item.quantity}</div>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    subtotalElement.textContent = subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 });
    shippingElement.textContent = shipping.toLocaleString('en-US', { minimumFractionDigits: 2 });
    taxElement.textContent = tax.toLocaleString('en-US', { minimumFractionDigits: 2 });
    totalElement.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2 });
    
    cartTotal.style.display = 'block';
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    
    if (cartSidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Wishlist Functions
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast(`${product.name} removed from wishlist`, 'info');
    } else {
        wishlist.push(productId);
        showToast(`${product.name} added to wishlist!`, 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update wishlist button
    const wishlistBtn = document.querySelector(`.product-card[data-product-id="${productId}"] .wishlist-btn`);
    if (wishlistBtn) {
        wishlistBtn.classList.toggle('active');
    }
}

// Product Details Modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalPrimary = document.getElementById('modalPrimary');
    const modalSecondary = document.getElementById('modalSecondary');
    
    modalTitle.textContent = product.name;
    
    modalBody.innerHTML = `
        <div class="product-details-modal">
            <div class="product-modal-image">
                <i class="${product.icon}"></i>
            </div>
            <div class="product-modal-info">
                <div class="product-brand-modal">${product.brand.toUpperCase()}</div>
                <p class="product-description-modal">${product.description}</p>
                <div class="product-rating-modal">
                    ${generateStars(product.rating)}
                    <span>${product.rating} (${product.reviews} reviews)</span>
                </div>
                <div class="product-pricing-modal">
                    <div class="price-current">${product.price.toLocaleString()}</div>
                    ${product.originalPrice > product.price ? 
                        `<div class="price-original">${product.originalPrice.toLocaleString()}</div>` : ''}
                </div>
                <div class="product-features-modal">
                    <h4>Key Features:</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="stock-status-modal ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                    <i class="fas ${product.inStock ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                    ${product.inStock ? 'In Stock - Ready to Ship' : 'Currently Out of Stock'}
                </div>
            </div>
        </div>
    `;
    
    modalPrimary.textContent = 'Add to Cart';
    modalPrimary.onclick = () => {
        addToCart(productId);
        closeModal();
    };
    
    modalSecondary.textContent = 'Buy Now';
    modalSecondary.style.display = 'inline-block';
    modalSecondary.onclick = () => {
        buyNow(productId);
        closeModal();
    };
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Purchase Functions
function buyNow(productId) {
    addToCart(productId);
    toggleCart();
    showToast('Product added to cart. Proceed to checkout!', 'success');
}

function checkout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate checkout process
    showModal('Checkout', 'Redirecting to secure payment gateway...', 'Proceed', null);
    
    setTimeout(() => {
        closeModal();
        cart = [];
        updateCartUI();
        saveCartToStorage();
        toggleCart();
        showToast('Order placed successfully! Thank you for your purchase!', 'success');
    }, 2000);
}

// Modal Functions
function showModal(title, message, primaryText = 'OK', secondaryText = null) {
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalPrimary = document.getElementById('modalPrimary');
    const modalSecondary = document.getElementById('modalSecondary');
    
    modalTitle.textContent = title;
    
    if (typeof message === 'string') {
        modalMessage.textContent = message;
        document.getElementById('modalBody').innerHTML = `<p id="modalMessage">${message}</p>`;
    }
    
    modalPrimary.textContent = primaryText;
    modalPrimary.onclick = closeModal;
    
    if (secondaryText) {
        modalSecondary.textContent = secondaryText;
        modalSecondary.style.display = 'inline-block';
        modalSecondary.onclick = closeModal;
    } else {
        modalSecondary.style.display = 'none';
    }
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('open');
}

// Newsletter Subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simulate subscription
    setTimeout(() => {
        showToast(`Thank you! We've subscribed ${email} to our newsletter.`, 'success');
        event.target.reset();
    }, 500);
}

// Additional CSS for new features
const additionalStyles = `
    .sale-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #ff6b6b;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: bold;
        z-index: 2;
    }
    
    .product-overlay {
        position: absolute;
        top: 10px;
        left: 10px;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .product-card:hover .product-overlay {
        opacity: 1;
    }
    
    .wishlist-btn, .quick-view-btn {
        background: rgba(255, 255, 255, 0.9);
        border: none;
        color: #666;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .wishlist-btn:hover, .quick-view-btn:hover {
        background: white;
        transform: scale(1.1);
    }
    
    .wishlist-btn.active {
        color: #ff6b6b;
        background: white;
    }
    
    .product-brand {
        font-size: 0.8rem;
        color: #4ecdc4;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }
    
    .product-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .product-rating .fas, .product-rating .far {
        color: #ffd700;
        font-size: 0.9rem;
    }
    
    .rating-text {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.7);
    }
    
    .product-pricing {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        margin-bottom: 1rem;
    }
    
    .original-price {
        text-decoration: line-through;
        color: rgba(255, 255, 255, 0.5);
        font-size: 1.1rem;
    }
    
    .product-features {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
    }
    
    .feature-tag {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.7rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .stock-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;
        margin-top: 1rem;
    }
    
    .stock-status.in-stock {
        color: #4ecdc4;
    }
    
    .stock-status.out-of-stock {
        color: #ff6b6b;
    }
    
    .product-card.added-to-cart {
        transform: scale(1.05);
        box-shadow: 0 0 30px rgba(78, 205, 196, 0.5);
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    .product-details-modal {
        text-align: left;
    }
    
    .product-modal-image {
        width: 100px;
        height: 100px;
        background: linear-gradient(45deg, #4ecdc4, #44a08d);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        color: white;
        margin: 0 auto 1.5rem;
    }
    
    .product-brand-modal {
        color: #4ecdc4;
        font-weight: bold;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
    }
    
    .product-description-modal {
        color: #666;
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    
    .product-rating-modal {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .product-rating-modal .fas, .product-rating-modal .far {
        color: #ffd700;
    }
    
    .product-pricing-modal {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .price-current {
        font-size: 1.8rem;
        font-weight: bold;
        color: #4ecdc4;
    }
    
    .price-original {
        text-decoration: line-through;
        color: #999;
        font-size: 1.2rem;
    }
    
    .product-features-modal h4 {
        color: #333;
        margin-bottom: 0.8rem;
        font-size: 1.1rem;
    }
    
    .product-features-modal ul {
        list-style: none;
        padding: 0;
    }
    
    .product-features-modal li {
        padding: 0.3rem 0;
        color: #666;
        position: relative;
        padding-left: 1.2rem;
    }
    
    .product-features-modal li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #4ecdc4;
        font-weight: bold;
    }
    
    .stock-status-modal {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem;
        border-radius: 10px;
        margin-top: 1rem;
    }
    
    .stock-status-modal.in-stock {
        background: rgba(78, 205, 196, 0.1);
        color: #4ecdc4;
        border: 1px solid rgba(78, 205, 196, 0.3);
    }
    
    .stock-status-modal.out-of-stock {
        background: rgba(255, 107, 107, 0.1);
        color: #ff6b6b;
        border: 1px solid rgba(255, 107, 107, 0.3);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);