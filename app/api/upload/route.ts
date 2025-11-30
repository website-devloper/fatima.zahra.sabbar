import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;
        const folder = data.get('folder') as string || 'blog';

        if (!file) {
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }

        // Ensure unique filename with folder prefix
        const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: 'public',
        });

        return NextResponse.json({
            success: true,
            url: blob.url
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Upload failed"
        }, { status: 500 });
    }
}
