import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';

// GET all projects
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const limit = searchParams.get('limit');

        const query: Record<string, string | boolean> = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (featured === 'true') {
            query.featured = true;
        }

        let projects = Project.find(query).sort({ order: 1, createdAt: -1 });

        if (limit) {
            projects = projects.limit(parseInt(limit));
        }

        const result = await projects.exec();

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('Projects API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch projects',
                data: []
            },
            { status: 500 }
        );
    }
}

// POST create a new project
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
        const project = await Project.create(body);

        return NextResponse.json(
            {
                success: true,
                data: project,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create project',
            },
            { status: 400 }
        );
    }
}
