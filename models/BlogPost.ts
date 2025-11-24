import mongoose, { Schema, model, models } from 'mongoose';

export interface IBlogPost {
    _id?: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    category: string;
    tags: string[];
    readTime: string;
    published: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
    {
        slug: {
            type: String,
            required: [true, 'Please provide a slug for this post'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        title: {
            type: String,
            required: [true, 'Please provide a title for this post'],
            trim: true,
        },
        excerpt: {
            type: String,
            required: [true, 'Please provide an excerpt for this post'],
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Please provide content for this post'],
        },
        image: {
            type: String,
            required: [true, 'Please provide an image URL for this post'],
        },
        author: {
            type: String,
            required: [true, 'Please provide an author name'],
            default: 'Fatima Zahra Sabbar',
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
            trim: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        readTime: {
            type: String,
            default: '5 min read',
        },
        published: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create index for faster queries
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ published: 1 });
BlogPostSchema.index({ createdAt: -1 });

export default models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema);
