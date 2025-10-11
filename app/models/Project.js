import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  projectNumber: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true, maxlength: 200 },
  fullDescription: { type: String, required: true, trim: true, maxlength: 1000 },
  imageUrl: { type: String, trim: true },
  videoUrl: { type: String, trim: true },
  technologies: [{ type: String, required: true, trim: true }],
  liveUrl: { type: String, trim: true },
  githubUrl: { type: String, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile Development', 'AI/ML', 'Desktop Application', 'Other'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active',
  },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

ProjectSchema.index({ category: 1, status: 1 });
ProjectSchema.index({ featured: -1, order: 1 });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
