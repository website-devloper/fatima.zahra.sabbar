import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';

interface RouteParams {
    params: Promise<{
        slug: string;
    }>;
}

// GET a single blog post by slug
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { slug } = await params;

        const post = await BlogPost.findOne({ slug, published: true });

        if (!post) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Post not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: post,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch post',
            },
            { status: 400 }
        );
    }
}

// PUT update a blog post
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { slug } = await params;
        const body = await request.json();

        const post = await BlogPost.findOneAndUpdate(
            { slug },
            body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!post) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Post not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: post,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to update post',
            },
            { status: 400 }
        );
    }
}

// DELETE a blog post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { slug } = await params;

        const deletedPost = await BlogPost.findOneAndDelete({ slug });

        if (!deletedPost) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Post not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {},
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to delete post',
            },
            { status: 400 }
        );
    }
}
