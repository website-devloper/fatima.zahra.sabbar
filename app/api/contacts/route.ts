import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

// GET all contacts
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = searchParams.get('limit');

        let query: any = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        let contacts = Contact.find(query).sort({ createdAt: -1 });

        if (limit) {
            contacts = contacts.limit(parseInt(limit));
        }

        const result = await contacts.exec();

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch contacts',
            },
            { status: 400 }
        );
    }
}

// POST create a new contact submission
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const contact = await Contact.create(body);

        return NextResponse.json(
            {
                success: true,
                data: contact,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create contact',
            },
            { status: 400 }
        );
    }
}
