import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

// GET all blog posts
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const limit = searchParams.get('limit');
        const publishedParam = searchParams.get('published');

        const query: Record<string, string | boolean> = {};

        if (publishedParam !== 'all') {
            query.published = publishedParam !== 'false';
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        let posts = BlogPost.find(query).sort({ createdAt: -1 });

        if (limit) {
            posts = posts.limit(parseInt(limit));
        }

        const result = await posts.exec();

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('Blog API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch posts',
                data: []
            },
            { status: 500 }
        );
    }
}

// POST create a new blog post
export async function POST(request: NextRequest) {
    try {
        if (!process.env.MONGODB_URI) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Database not configured',
                },
                { status: 500 }
            );
        }

        await dbConnect();

        const body = await request.json();
        const post = await BlogPost.create(body);

        return NextResponse.json(
            {
                success: true,
                data: post,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create post',
            },
            { status: 400 }
        );
    }
}
