import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

// GET a single contact
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;

        const contact = await Contact.findById(id);

        if (!contact) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Contact not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: contact,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch contact',
            },
            { status: 400 }
        );
    }
}

// PUT update a contact (change status, etc.)
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        const contact = await Contact.findByIdAndUpdate(
            id,
            body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!contact) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Contact not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: contact,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to update contact',
            },
            { status: 400 }
        );
    }
}

// DELETE a contact
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        await dbConnect();
        const { id } = await params;

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Contact not found',
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
                error: error instanceof Error ? error.message : 'Failed to delete contact',
            },
            { status: 400 }
        );
    }
}
