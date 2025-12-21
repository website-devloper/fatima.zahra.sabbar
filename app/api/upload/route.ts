import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const folder = data.get('folder') as string || 'blog';

        if (!file) {
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }

        // Ensure unique filename
        const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '');
        const filename = `${Date.now()}-${sanitizedFilename}`;

        // Check if we have the Vercel Blob token
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            // Upload to Vercel Blob
            const blob = await put(`${folder}/${filename}`, file, {
                access: 'public',
            });

            return NextResponse.json({
                success: true,
                url: blob.url
            });
        } else {
            // Local fallback for development
            console.warn('BLOB_READ_WRITE_TOKEN not found. Falling back to local upload.');

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Define the directory path within public
            const publicDir = path.join(process.cwd(), 'public', folder);

            // Ensure directory exists
            await mkdir(publicDir, { recursive: true });

            // Full file path
            const filePath = path.join(publicDir, filename);

            // Write file to local disk
            await writeFile(filePath, buffer);

            // Return the local URL
            return NextResponse.json({
                success: true,
                url: `/${folder}/${filename}`
            });
        }
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Upload failed"
        }, { status: 500 });
    }
}

