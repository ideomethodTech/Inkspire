import mongoose from 'mongoose';

const heroContentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subtitle: String,
    description: String,
    image: {
        type: String,
        required: true
    },
    mobileImage: String,
    link: String,
    linkText: {
        type: String,
        default: 'Shop Now'
    },
    type: {
        type: String,
        enum: ['main', 'promo', 'category', 'seasonal', 'sale'],
        default: 'main'
    },
    category: String,
    active: {
        type: Boolean,
        default: true
    },
    priority: {
        type: Number,
        default: 0
    },
    startDate: Date,
    endDate: Date,
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
heroContentSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Indexes
heroContentSchema.index({ active: 1, priority: -1 });
heroContentSchema.index({ type: 1 });
heroContentSchema.index({ startDate: 1, endDate: 1 });

const HeroContent = mongoose.model('HeroContent', heroContentSchema);
export default HeroContent;
