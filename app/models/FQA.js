import mongoose from "mongoose";

const FQASchema = new mongoose.Schema(
  {
    question: { 
      type: String, 
      required: [true, 'Question is required'],
      trim: true,
      maxlength: [500, 'Question cannot exceed 500 characters']
    },
    answer: { 
      type: String, 
      required: [true, 'Answer is required'],
      trim: true,
      maxlength: [2000, 'Answer cannot exceed 2000 characters']
    },
    category: {
      type: String,
      required: false,
      trim: true,
      default: 'General',
      enum: ['General', 'Technical', 'Services', 'Portfolio', 'Contact', 'Pricing']
    },
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    viewCount: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for better query performance
FQASchema.index({ category: 1, order: 1 });
FQASchema.index({ isActive: 1 });
FQASchema.index({ tags: 1 });

// Virtual for question preview
FQASchema.virtual('questionPreview').get(function() {
  return this.question.length > 100 ? 
    this.question.substring(0, 100) + '...' : 
    this.question;
});

// Method to increment view count
FQASchema.methods.incrementViewCount = function() {
  this.viewCount += 1;
  return this.save();
};

// Static method to get FAQs by category
FQASchema.statics.findByCategory = function(category) {
  return this.find({ 
    category: category, 
    isActive: true 
  }).sort({ order: 1, createdAt: -1 });
};

// Static method to search FAQs
FQASchema.statics.search = function(searchTerm) {
  return this.find({
    isActive: true,
    $or: [
      { question: { $regex: searchTerm, $options: 'i' } },
      { answer: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ]
  }).sort({ order: 1, createdAt: -1 });
};

const FQA = mongoose.models.FQA || mongoose.model("FQA", FQASchema);

export default FQA;