import mongoose from "mongoose";

const WellcomeNoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    massage: { type: String, required: true }, 
  },
  { timestamps: true }
);

const WellcomeNote =
  mongoose.models.WellcomeNote || mongoose.model("WellcomeNote", WellcomeNoteSchema);

export default WellcomeNote;
