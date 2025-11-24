'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface EditPostProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function EditPost({ params }: EditPostProps) {
    const { slug } = use(params);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: '',
        category: '',
        tags: '',
        readTime: '',
        published: true,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (!adminAuth) {
            router.push('/admin');
            return;
        }

        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/blog/${slug}`);
            const data = await response.json();

            if (data.success) {
                const post = data.data;
                setFormData({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    image: post.image,
                    category: post.category,
                    tags: post.tags.join(', '),
                    readTime: post.readTime,
                    published: post.published,
                });
            }
        } catch (error) {
            console.error('Error fetching post:', error);
            alert('Failed to load post');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);

            const response = await fetch(`/api/blog/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    tags: tagsArray,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Post updated successfully!');
                router.push('/admin/dashboard');
            } else {
                alert('Failed to update post: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            alert('Failed to update post');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'var(--bg-dark)' }}>
                <p className="text-white-60">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-vh-100" style={{ background: 'var(--bg-dark)' }}>
            {/* Header */}
            <header className="glass-panel mb-0" style={{ borderRadius: 0, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="container py-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h3 text-white mb-0">
                            <i className="bi bi-pencil me-2"></i>
                            Edit Post
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
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                                            Published
                                        </label>
                                    </div>
                                </div>

                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={saving}
                                    >
                                        {saving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-circle me-2"></i>
                                                Update Post
                                            </>
                                        )}
                                    </button>

                                    <Link
                                        href={`/blog/${slug}`}
                                        className="btn btn-outline-primary"
                                        target="_blank"
                                    >
                                        <i className="bi bi-eye me-2"></i>
                                        Preview
                                    </Link>
                                </div>
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
