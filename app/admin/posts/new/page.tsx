'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPost() {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: '/blog/placeholder.jpg',
        category: '',
        tags: '',
        readTime: '5 min read',
        published: true,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (!adminAuth) {
            router.push('/admin');
        }
    }, [router]);

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (title: string) => {
        setFormData(prev => ({
            ...prev,
            title,
            slug: generateSlug(title),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

            const response = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    tags: tagsArray,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Post created successfully!');
                router.push('/admin/dashboard');
            } else {
                alert('Failed to create post: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            alert('Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100" style={{ background: 'var(--bg-dark)' }}>
            {/* Header */}
            <header className="glass-panel mb-0" style={{ borderRadius: 0, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="container py-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h3 text-white mb-0">
                            <i className="bi bi-plus-circle me-2"></i>
                            Create New Post
                        </h1>
                        <Link href="/admin/dashboard" className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container py-5">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="glass-panel p-4 mb-4">
                                <h5 className="text-white mb-4">Post Details</h5>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Title *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Slug *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        required
                                    />
                                    <small className="text-white-60">URL: /blog/{formData.slug}</small>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Excerpt *</label>
                                    <textarea
                                        className="form-control"
                                        style={inputStyle}
                                        rows={3}
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Content * (HTML)</label>
                                    <textarea
                                        className="form-control"
                                        style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.9rem' }}
                                        rows={15}
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        placeholder="<h2>Your content here...</h2><p>Write your blog post content in HTML format.</p>"
                                        required
                                    />
                                    <small className="text-white-60">Use HTML tags for formatting</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="glass-panel p-4 mb-4">
                                <h5 className="text-white mb-4">Metadata</h5>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Category *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g., Development, Design"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Tags</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="React, Next.js, TypeScript"
                                    />
                                    <small className="text-white-60">Separate with commas</small>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Featured Image URL *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="/blog/my-image.jpg"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Read Time</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                        placeholder="5 min read"
                                    />
                                </div>

                                <div className="mb-4">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="published"
                                            checked={formData.published}
                                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                            style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                                        />
                                        <label className="form-check-label text-white-80 ms-2" htmlFor="published">
                                            Publish immediately
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-circle me-2"></i>
                                            Create Post
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const inputStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: 'white',
    padding: '0.75rem 1rem',
};
