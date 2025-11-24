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

        let query: any = {};

        // If published param is not 'all', filter by published status
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
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch posts',
            },
            { status: 400 }
        );
    }
}

// POST create a new blog post
export async function POST(request: NextRequest) {
    try {
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
