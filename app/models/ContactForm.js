import mongoose from "mongoose";

const ContactsFormSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true }, email: { type: String, required: true },
    phone: { type: String }, website: { type: String },
    nachricht: { type: String }, companyStage: { type: String },
    deadline: { type: String }, budget: { type: String },
    referralSource: [{ type: String }], formType: { type: String }, 
  },
  { timestamps: true }
);

const ContactsForm = mongoose.models.ContactsForm || mongoose.model("ContactsForm", ContactsFormSchema);

export default ContactsForm;
