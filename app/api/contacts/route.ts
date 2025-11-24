import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';
import nodemailer from 'nodemailer';

// GET all contacts
export async function GET(request: NextRequest) {
    try {
        if (!process.env.MONGODB_URI) {
            return NextResponse.json({
                success: true,
                error: 'Database not configured yet',
                data: []
            });
        }

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
        console.error('Contacts API Error:', error);
        return NextResponse.json(
            {
                success: true,
                error: error instanceof Error ? error.message : 'Failed to fetch contacts',
                data: []
            },
            { status: 200 }
        );
    }
}

// POST create a new contact submission  
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        let contact;

        // 1. Try to save to Database (if configured)
        if (process.env.MONGODB_URI) {
            try {
                await dbConnect();
                contact = await Contact.create(body);
            } catch (dbError) {
                console.error('Database save failed:', dbError);
                // Continue to send email even if DB fails
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
                    to: 'fatimazahra20033@gmail.com', // Destination email
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
                // If email fails and DB failed/not configured, then it's a real error
                if (!contact) {
                    throw new Error('Failed to send message');
                }
            }
        } else {
            console.warn('Email credentials not found in environment variables');
        }

        return NextResponse.json(
            {
                success: true,
                data: contact,
                message: 'Message processed'
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
