import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4.5mb',
        },
    },
};

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const folder = data.get('folder') as string || 'blog';

        if (!file) {
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }

        // Vercel Serverless Body Limit check (approx 4.5MB)
        if (file.size > 4.5 * 1024 * 1024) {
            return NextResponse.json({
                success: false,
                error: "File too large. Vercel limited to 4.5MB. Please compress your image."
            }, { status: 413 });
        }

        // Ensure unique filename
        const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const filename = `${Date.now()}-${sanitizedFilename}`;

        // 1. Try Vercel Blob (Primary for production)
        // Check for standard and custom token name from your screenshot
        const token = process.env.BLOB_READ_WRITE_TOKEN || process.env.fatimazahra_READ_WRITE_TOKEN;

        if (token) {
            try {
                const blob = await put(`${folder}/${filename}`, file, {
                    access: 'public',
                    token: token, // Explicitly pass the token
                });

                return NextResponse.json({
                    success: true,
                    url: blob.url
                });
            } catch (blobError) {
                console.error('Vercel Blob storage failed:', blobError);
                // Fall through to Base64 if Blob fails
            }
        }

        // 2. Try Local File System (Development fallback)
        if (process.env.NODE_ENV === 'development') {
            try {
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);

                const publicDir = path.join(process.cwd(), 'public', folder);
                await mkdir(publicDir, { recursive: true });

                const filePath = path.join(publicDir, filename);
                await writeFile(filePath, buffer);

                return NextResponse.json({
                    success: true,
                    url: `/${folder}/${filename}`
                });
            } catch (fsError) {
                console.error('Local upload failed:', fsError);
            }
        }

        // 3. Final Fallback: Base64 Data URI
        // Guaranteed to work on Vercel even without any storage setup
        try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64 = buffer.toString('base64');
            const dataUrl = `data:${file.type || 'image/jpeg'};base64,${base64}`;

            return NextResponse.json({
                success: true,
                url: dataUrl
            });
        } catch (base64Error) {
            console.error('Base64 conversion failed:', base64Error);
            throw new Error("All upload methods failed.");
        }

    } catch (error) {
        console.error('Global Upload error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Upload failed unexpectedly"
        }, { status: 500 });
    }
}
