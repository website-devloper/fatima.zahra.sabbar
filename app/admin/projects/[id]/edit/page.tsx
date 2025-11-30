'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface EditProjectProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditProject({ params }: EditProjectProps) {
    const { id } = use(params);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        tech: '',
        link: '',
        category: '',
        featured: false,
        order: 0,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (!adminAuth) {
            router.push('/admin');
            return;
        }

        fetchProject();
    }, []);

    const fetchProject = async () => {
        try {
            const response = await fetch(`/api/projects/${id}`);
            const data = await response.json();

            if (data.success) {
                const project = data.data;
                setFormData({
                    title: project.title,
                    description: project.description,
                    image: project.image,
                    tech: project.tech.join(', '),
                    link: project.link,
                    category: project.category,
                    featured: project.featured,
                    order: project.order,
                });
            }
        } catch (error) {
            console.error('Error fetching project:', error);
            alert('Failed to load project');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'projects'); // Specify folder for projects

        setUploading(true);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setFormData(prev => ({ ...prev, image: data.url }));
            } else {
                alert('Failed to upload image: ' + data.error);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const techArray = formData.tech.split(',').map(t => t.trim()).filter(t => t);

            const response = await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    tech: techArray,
                    order: parseInt(formData.order.toString()),
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Project updated successfully!');
                router.push('/admin/projects');
            } else {
                alert('Failed to update project: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            alert('Failed to update project');
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
                            Edit Project
                        </h1>
                        <Link href="/admin/projects" className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Projects
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container py-5">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="glass-panel p-4 mb-4">
                                <h5 className="text-white mb-4">Project Details</h5>

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
                                    <label className="form-label text-white-80">Description *</label>
                                    <textarea
                                        className="form-control"
                                        style={inputStyle}
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Technologies *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.tech}
                                        onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                                        placeholder="React, Next.js, TypeScript"
                                        required
                                    />
                                    <small className="text-white-60">Separate with commas</small>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Project Link</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="glass-panel p-4 mb-4">
                                <h5 className="text-white mb-4">Metadata</h5>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Category *</label>
                                    <select
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    >
                                        <option value="Web Development">Web Development</option>
                                        <option value="Mobile App">Mobile App</option>
                                        <option value="Automation">Automation</option>
                                        <option value="AI/ML">AI/ML</option>
                                        <option value="WordPress">WordPress</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Project Image *</label>

                                    {/* File Upload */}
                                    <div className="mb-3">
                                        <input
                                            type="file"
                                            className="form-control"
                                            style={inputStyle}
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            disabled={uploading}
                                        />
                                        {uploading && <div className="text-info mt-1"><small>Uploading image...</small></div>}
                                    </div>

                                    {/* URL Input */}
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="/images/project.jpg"
                                        required
                                    />

                                    {/* Preview */}
                                    {formData.image && (
                                        <div className="mt-3 p-2 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                            <label className="form-label text-white-60 small mb-2">Preview:</label>
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="img-fluid rounded"
                                                style={{ maxHeight: '150px', width: '100%', objectFit: 'cover' }}
                                                onError={(e) => (e.currentTarget.style.display = 'none')}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="form-label text-white-80">Display Order</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        style={inputStyle}
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                        placeholder="0"
                                    />
                                    <small className="text-white-60">Lower numbers appear first</small>
                                </div>

                                <div className="mb-4">
                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="featured"
                                            checked={formData.featured}
                                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                            style={{ width: '3rem', height: '1.5rem', cursor: 'pointer' }}
                                        />
                                        <label className="form-check-label text-white-80 ms-2" htmlFor="featured">
                                            Featured Project
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
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
                                            Update Project
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
