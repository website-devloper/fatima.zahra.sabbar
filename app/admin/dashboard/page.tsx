'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

export default function AdminDashboard() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
    const router = useRouter();

    useEffect(() => {
        // Check authentication
        const adminAuth = localStorage.getItem('adminAuth');
        if (!adminAuth) {
            router.push('/admin');
            return;
        }

        fetchPosts();
    }, [router]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/blog?published=all');
            const data = await response.json();
            if (data.success) {
                setPosts(data.data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const response = await fetch(`/api/blog/${slug}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchPosts();
                alert('Post deleted successfully!');
            }
        } catch (error) {
            alert('Failed to delete post');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        router.push('/admin');
    };

    const filteredPosts = posts.filter(post => {
        if (filter === 'published') return post.published;
        if (filter === 'draft') return !post.published;
        return true;
    });

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
                        <div>
                            <h1 className="h3 text-white mb-0">
                                <i className="bi bi-speedometer2 me-2"></i>
                                Blog Dashboard
                            </h1>
                        </div>
                        <div className="d-flex gap-3">
                            <Link href="/" className="btn btn-outline-primary">
                                <i className="bi bi-house me-2"></i>
                                View Site
                            </Link>
                            <Link href="/admin/posts/new" className="btn btn-primary">
                                <i className="bi bi-plus-circle me-2"></i>
                                New Post
                            </Link>
                            <button onClick={handleLogout} className="btn btn-outline-danger">
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container py-5">
                {/* Stats */}
                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="glass-panel p-4">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box" style={{ background: 'var(--primary-color)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="bi bi-file-text text-white fs-4"></i>
                                </div>
                                <div>
                                    <h3 className="h2 text-white mb-0">{posts.length}</h3>
                                    <p className="text-white-60 mb-0">Total Posts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-panel p-4">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box" style={{ background: '#10b981', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="bi bi-check-circle text-white fs-4"></i>
                                </div>
                                <div>
                                    <h3 className="h2 text-white mb-0">{posts.filter(p => p.published).length}</h3>
                                    <p className="text-white-60 mb-0">Published</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-panel p-4">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box" style={{ background: '#f59e0b', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="bi bi-pencil text-white fs-4"></i>
                                </div>
                                <div>
                                    <h3 className="h2 text-white mb-0">{posts.filter(p => !p.published).length}</h3>
                                    <p className="text-white-60 mb-0">Drafts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter */}
                <div className="mb-4">
                    <div className="btn-group">
                        <button
                            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setFilter('all')}
                        >
                            All ({posts.length})
                        </button>
                        <button
                            className={`btn ${filter === 'published' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setFilter('published')}
                        >
                            Published ({posts.filter(p => p.published).length})
                        </button>
                        <button
                            className={`btn ${filter === 'draft' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setFilter('draft')}
                        >
                            Drafts ({posts.filter(p => !p.published).length})
                        </button>
                    </div>
                </div>

                {/* Posts Table */}
                <div className="glass-panel p-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-dark table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center text-white-60 py-5">
                                            No posts found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPosts.map(post => (
                                        <tr key={post._id}>
                                            <td>
                                                <div className="text-white fw-bold">{post.title}</div>
                                                <div className="text-white-60 small">{post.excerpt.substring(0, 60)}...</div>
                                            </td>
                                            <td>
                                                <span className="badge bg-primary">{post.category}</span>
                                            </td>
                                            <td>
                                                {post.published ? (
                                                    <span className="badge" style={{ background: '#10b981' }}>
                                                        <i className="bi bi-check-circle me-1"></i>
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="badge" style={{ background: '#6b7280' }}>
                                                        <i className="bi bi-pencil me-1"></i>
                                                        Draft
                                                    </span>
                                                )}
                                            </td>
                                            <td className="text-white-60">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        className="btn btn-sm btn-outline-primary"
                                                        target="_blank"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </Link>
                                                    <Link
                                                        href={`/admin/posts/${post.slug}/edit`}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.slug)}
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
