import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import nodemailer from 'nodemailer';

// GET all contacts
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const limit = searchParams.get('limit');

        const query: Record<string, string> = {};

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
        console.error('Contacts API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch contacts',
                data: []
            },
            { status: 500 }
        );
    }
}

// POST create a new contact submission  
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        let contact;

        // 1. Try to save to Database
        try {
            await dbConnect();
            contact = await Contact.create(body);
        } catch (dbError) {
            console.error('Database save failed:', dbError);
            // Continue if email is configured, otherwise fail
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                throw new Error('Could not save contact or send email');
            }
        }

        // 2. Send Email using Nodemailer
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_RECEIVER || 'fatimazahra20033@gmail.com', // Fallback to original
                    subject: `New Portfolio Contact: ${body.subject}`,
                    text: `
                        Name: ${body.name}
                        Email: ${body.email}
                        Subject: ${body.subject}
                        Message: ${body.message}
                    `,
                    html: `
                        <h3>New Contact Form Submission</h3>
                        <p><strong>Name:</strong> ${body.name}</p>
                        <p><strong>Email:</strong> ${body.email}</p>
                        <p><strong>Subject:</strong> ${body.subject}</p>
                        <p><strong>Message:</strong></p>
                        <p>${body.message}</p>
                    `,
                };

                await transporter.sendMail(mailOptions);
            } catch (emailError) {
                console.error('Email send failed:', emailError);
                // If email fails and DB failed, then it's a real error
                if (!contact) {
                    throw new Error('Failed to process message (DB and Email failed)');
                }
            }
        }

        return NextResponse.json(
            {
                success: true,
                data: contact,
                message: 'Message processed successfully'
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to create contact',
            },
            { status: 500 }
        );
    }
}
