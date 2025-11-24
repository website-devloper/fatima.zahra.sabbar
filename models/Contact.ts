import mongoose, { Schema, model, models } from 'mongoose';

export interface IContact {
    _id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    createdAt?: Date;
    updatedAt?: Date;
}

const ContactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            trim: true,
            lowercase: true,
        },
        subject: {
            type: String,
            required: [true, 'Please provide a subject'],
            trim: true,
        },
        message: {
            type: String,
            required: [true, 'Please provide a message'],
        },
        status: {
            type: String,
            enum: ['new', 'read', 'replied', 'archived'],
            default: 'new',
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes for faster queries
ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ email: 1 });

export default models.Contact || model<IContact>('Contact', ContactSchema);
