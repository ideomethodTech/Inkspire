import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: String,
    variant: String,
    variantIndex: Number,
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    itemTotal: {
        type: Number,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        email: String,
        name: String
    },
    items: [orderItemSchema],
    shippingAddress: {
        name: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        country: {
            type: String,
            default: 'India'
        }
    },
    paymentMethod: {
        method: {
            type: String,
            enum: ['cod', 'card', 'upi', 'netbanking'],
            default: 'cod'
        },
        status: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending'
        },
        transactionId: String
    },
    totals: {
        subtotal: {
            type: Number,
            required: true
        },
        shipping: {
            type: Number,
            default: 0
        },
        tax: {
            type: Number,
            default: 0
        },
        discount: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            required: true
        }
    },
    coupon: {
        code: String,
        discount: Number
    },
    tracking: {
        trackingId: String,
        carrier: String,
        currentStatus: {
            type: String,
            enum: ['processing', 'shipped', 'out_for_delivery', 'delivered'],
            default: 'processing'
        },
        history: [{
            status: String,
            timestamp: { type: Date, default: Date.now },
            location: String,
            note: String
        }]
    },
    status: {
        current: {
            type: String,
            enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        history: [{
            status: String,
            timestamp: {
                type: Date,
                default: Date.now
            },
            note: String
        }]
    },
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp before saving
orderSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Indexes for efficient querying
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ 'user.userId': 1 });
orderSchema.index({ 'status.current': 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;
