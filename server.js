const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Authentication rate limiting
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many authentication attempts, please try again later.',
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techhub_ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schemas
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, trim: true },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zipCode: { type: String, trim: true },
        country: { type: String, default: 'USA', trim: true }
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    cart: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        addedAt: { type: Date, default: Date.now }
    }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    createdAt: { type: Date, default: Date.now },
    lastLogin: Date,
    preferences: {
        notifications: { type: Boolean, default: true },
        newsletter: { type: Boolean, default: false },
        currency: { type: String, default: 'USD' }
    }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { 
        type: String, 
        required: true,
        enum: ['laptop', 'phone', 'mouse', 'keyboard', 'earbuds', 'charger']
    },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    images: [{
        url: String,
        alt: String,
        isPrimary: { type: Boolean, default: false }
    }],
    specifications: [{
        name: String,
        value: String
    }],
    features: [String],
    inventory: {
        quantity: { type: Number, default: 0, min: 0 },
        sku: { type: String, unique: true },
        lowStockThreshold: { type: Number, default: 10 }
    },
    ratings: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        count: { type: Number, default: 0 }
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    tags: [String],
    seo: {
        metaTitle: String,
        metaDescription: String,
        slug: { type: String, unique: true }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true, trim: true },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: false },
    helpful: { type: Number, default: 0 },
    images: [String],
    createdAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderNumber: { type: String, unique: true, required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        name: String,
        image: String
    }],
    shippingAddress: {
        firstName: String,
        lastName: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        phone: String
    },
    billingAddress: {
        firstName: String,
        lastName: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    payment: {
        method: { type: String, enum: ['stripe', 'paypal', 'apple_pay'], required: true },
        transactionId: String,
        status: { 
            type: String, 
            enum: ['pending', 'completed', 'failed', 'refunded'], 
            default: 'pending' 
        }
    },
    pricing: {
        subtotal: { type: Number, required: true },
        tax: { type: Number, required: true },
        shipping: { type: Number, required: true },
        total: { type: Number, required: true },
        currency: { type: String, default: 'USD' }
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    tracking: {
        carrier: String,
        trackingNumber: String,
        estimatedDelivery: Date
    },
    notes: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    image: String,
    slug: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
});

// Models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Review = mongoose.model('Review', reviewSchema);
const Order = mongoose.model('Order', orderSchema);
const Category = mongoose.model('Category', categorySchema);

// File upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// JWT Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// Utility functions
const generateOrderNumber = () => {
    return 'TH' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
};

const calculateShipping = (subtotal, items) => {
    if (subtotal >= 100) return 0; // Free shipping over $100
    return 15; // Standard shipping
};

const calculateTax = (subtotal, state = 'CA') => {
    const taxRates = {
        'CA': 0.08,
        'NY': 0.085,
        'TX': 0.06,
        'FL': 0.06
    };
    return subtotal * (taxRates[state] || 0.08);
};

// Routes

// Auth Routes
app.post('/api/auth/register', authLimiter, async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;
        
        // Validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            verificationToken: jwt.sign({ email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' })
        });
        
        await user.save();
        
        // Send verification email
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${user.verificationToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verify your TechHub account',
            html: `
                <h2>Welcome to TechHub!</h2>
                <p>Please click the link below to verify your account:</p>
                <a href="${verificationUrl}">Verify Account</a>
                <p>This link will expire in 24 hours.</p>
            `
        });
        
        res.status(201).json({ 
            message: 'User registered successfully. Please check your email for verification.',
            userId: user._id 
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Update last login
        user.lastLogin = new Date();
        await user.save();
        
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );
        
        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

app.post('/api/auth/verify-email', async (req, res) => {
    try {
        const { token } = req.body;
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findOne({ email: decoded.email, verificationToken: token });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }
        
        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();
        
        res.json({ message: 'Email verified successfully' });
        
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired verification token' });
    }
});

// Product Routes
app.get('/api/products', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 12,
            category,
            brand,
            minPrice,
            maxPrice,
            search,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            featured
        } = req.query;
        
        const query = { isActive: true };
        
        // Apply filters
        if (category) query.category = category;
        if (brand) query.brand = new RegExp(brand, 'i');
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        if (search) {
            query.$or = [
                { name: new RegExp(search, 'i') },
                { description: new RegExp(search, 'i') },
                { tags: new RegExp(search, 'i') }
            ];
        }
        if (featured === 'true') query.isFeatured = true;
        
        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        
        const products = await Product.find(query)
            .sort(sortOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        
        const total = await Product.countDocuments(query);
        
        res.json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
        
    } catch (error) {
        console.error('Products fetch error:', error);
        res.status(500).json({ message: 'Server error fetching products' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('reviews')
            .exec();
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json(product);
        
    } catch (error) {
        console.error('Product fetch error:', error);
        res.status(500).json({ message: 'Server error fetching product' });
    }
});

// Cart Routes
app.get('/api/cart', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .populate('cart.product')
            .exec();
        
        res.json(user.cart);
        
    } catch (error) {
        console.error('Cart fetch error:', error);
        res.status(500).json({ message: 'Server error fetching cart' });
    }
});

app.post('/api/cart/add', authenticateToken, async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        
        const user = await User.findById(req.user.userId);
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Check inventory
        if (product.inventory.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient inventory' });
        }
        
        const existingItem = user.cart.find(item => item.product.toString() === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity });
        }
        
        await user.save();
        
        const updatedUser = await User.findById(req.user.userId)
            .populate('cart.product')
            .exec();
        
        res.json(updatedUser.cart);
        
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: 'Server error adding to cart' });
    }
});

app.put('/api/cart/update', authenticateToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        const user = await User.findById(req.user.userId);
        const cartItem = user.cart.find(item => item.product.toString() === productId);
        
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        
        if (quantity <= 0) {
            user.cart = user.cart.filter(item => item.product.toString() !== productId);
        } else {
            cartItem.quantity = quantity;
        }
        
        await user.save();
        
        const updatedUser = await User.findById(req.user.userId)
            .populate('cart.product')
            .exec();
        
        res.json(updatedUser.cart);
        
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ message: 'Server error updating cart' });
    }
});

app.delete('/api/cart/remove/:productId', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.params;
        
        const user = await User.findById(req.user.userId);
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        
        await user.save();
        
        const updatedUser = await User.findById(req.user.userId)
            .populate('cart.product')
            .exec();
        
        res.json(updatedUser.cart);
        
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ message: 'Server error removing from cart' });
    }
});

// Order Routes
app.post('/api/orders', authenticateToken, async (req, res) => {
    try {
        const { shippingAddress, billingAddress, paymentMethod } = req.body;
        
        const user = await User.findById(req.user.userId).populate('cart.product');
        
        if (user.cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }
        
        // Calculate pricing
        const subtotal = user.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const shipping = calculateShipping(subtotal, user.cart);
        const tax = calculateTax(subtotal, shippingAddress.state);
        const total = subtotal + shipping + tax;
        
        // Create order
        const order = new Order({
            user: user._id,
            orderNumber: generateOrderNumber(),
            items: user.cart.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
                name: item.product.name,
                image: item.product.images[0]?.url
            })),
            shippingAddress,
            billingAddress,
            payment: {
                method: paymentMethod,
                status: 'pending'
            },
            pricing: {
                subtotal,
                tax,
                shipping,
                total
            }
        });
        
        await order.save();
        
        // Clear cart
        user.cart = [];
        user.orders.push(order._id);
        await user.save();
        
        // Update inventory
        for (const item of user.cart) {
            await Product.findByIdAndUpdate(item.product._id, {
                $inc: { 'inventory.quantity': -item.quantity }
            });
        }
        
        res.status(201).json(order);
        
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ message: 'Server error creating order' });
    }
});

app.get('/api/orders', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
            .populate('items.product')
            .sort({ createdAt: -1 })
            .exec();
        
        res.json(orders);
        
    } catch (error) {
        console.error('Orders fetch error:', error);
        res.status(500).json({ message: 'Server error fetching orders' });
    }
});

// Payment Routes
app.post('/api/payment/create-intent', authenticateToken, async (req, res) => {
    try {
        const { amount, currency = 'usd' } = req.body;
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            metadata: {
                userId: req.user.userId
            }
        });
        
        res.json({
            clientSecret: paymentIntent.client_secret
        });
        
    } catch (error) {
        console.error('Payment intent error:', error);
        res.status(500).json({ message: 'Server error creating payment intent' });
    }
});

// Admin Routes
app.post('/api/admin/products', authenticateToken, requireAdmin, upload.array('images', 5), async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData);
        
        const images = req.files.map((file, index) => ({
            url: `/uploads/${file.filename}`,
            alt: productData.name,
            isPrimary: index === 0
        }));
        
        const product = new Product({
            ...productData,
            images,
            seo: {
                slug: productData.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-')
            }
        });
        
        await product.save();
        
        res.status(201).json(product);
        
    } catch (error) {
        console.error('Product creation error:', error);
        res.status(500).json({ message: 'Server error creating product' });
    }
});

app.get('/api/admin/orders', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const { page = 1, limit = 20, status } = req.query;
        
        const query = {};
        if (status) query.status = status;
        
        const orders = await Order.find(query)
            .populate('user', 'firstName lastName email')
            .populate('items.product', 'name')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        
        const total = await Order.countDocuments(query);
        
        res.json({
            orders,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
        
    } catch (error) {
        console.error('Admin orders fetch error:', error);
        res.status(500).json({ message: 'Server error fetching orders' });
    }
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;