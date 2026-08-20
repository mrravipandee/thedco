import mongoose, { Schema, Document } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  company?: string;
  phone: string;
  serviceType?: string;
  projectType?: string;
  location?: string;
  projectStage?: string;
  businessStatus?: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: false },
    phone: { type: String, required: true },
    serviceType: { type: String, required: false },
    projectType: { type: String, required: false },
    location: { type: String, required: false },
    projectStage: { type: String, required: false },
    businessStatus: { type: String, required: false },
    message: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["new", "contacted", "in-progress", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Enquiry = mongoose.models.Enquiry || mongoose.model<IEnquiry>("Enquiry", EnquirySchema);

export default Enquiry;
