'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { LocaleProvider } from '../components/LocaleProvider';

interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    createdAt: string;
    category: string;
    tags: string[];
    readTime: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<string[]>(['All']);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/blog');
                const data = await response.json();
                if (data.success) {
                    setPosts(data.data);
                    // Extract unique categories
                    const categorySet = new Set<string>(data.data.map((post: BlogPost) => post.category));
                    const uniqueCategories: string[] = ['All', ...Array.from(categorySet)];
                    setCategories(uniqueCategories);
                }
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Filter posts by category
    const filteredPosts = selectedCategory === 'All'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    return (
        <LocaleProvider>
            <div>
                <Navbar />

                <main className="pt-5 mt-5">
                    {/* Hero Section */}
                    <section className="py-5 position-relative overflow-hidden">
                        <div className="why-bg-decoration">
                            <div className="blob blob-1" style={{ top: '-10%', left: '-10%', opacity: 0.15 }}></div>
                            <div className="blob blob-2" style={{ bottom: '-10%', right: '-10%', opacity: 0.15 }}></div>
                        </div>

                        <div className="container position-relative z-1 text-center">
                            <p className="text-uppercase text-primary fw-bold mb-2 letter-spacing-1" data-aos="fade-up">
                                Latest Articles
                            </p>
                            <h1 className="display-3 fw-bold mb-4" data-aos="fade-up" data-aos-delay="100">
                                Blog & <span className="text-gradient">Insights</span>
                            </h1>
                            <p className="lead text-white-80 mx-auto mb-5" style={{ maxWidth: '700px' }} data-aos="fade-up" data-aos-delay="200">
                                Explore articles about web development, productivity, design, and technology insights from my journey as a developer.
                            </p>
                        </div>
                    </section>

                    {/* Category Filter */}
                    <section className="py-4">
                        <div className="container">
                            <div className="d-flex justify-content-center gap-3 flex-wrap" data-aos="fade-up">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Blog Posts Grid */}
                    <section className="py-5">
                        <div className="container">
                            {loading ? (
                                <div className="text-center py-5">
                                    <p className="text-white-60">Loading blog posts...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="row g-4">
                                        {filteredPosts.map((post, index) => (
                                            <div
                                                key={post._id}
                                                className="col-lg-4 col-md-6"
                                                data-aos="fade-up"
                                                data-aos-delay={index * 50}
                                            >
                                                <Link href={`/blog/${post.slug}`} className="text-decoration-none">
                                                    <div className="blog-card glass-panel h-100 p-0 overflow-hidden">
                                                        <div className="blog-image-wrapper position-relative overflow-hidden">
                                                            <div
                                                                className="blog-image"
                                                                style={{
                                                                    backgroundImage: `url(${post.image})`,
                                                                    backgroundSize: 'cover',
                                                                    backgroundPosition: 'center',
                                                                    height: '220px',
                                                                    transition: 'transform 0.3s ease'
                                                                }}
                                                            >
                                                                <div className="blog-category-badge position-absolute top-0 start-0 m-3">
                                                                    <span className="badge bg-primary">{post.category}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="p-4">
                                                            <div className="d-flex align-items-center gap-3 mb-3 text-white-60 small">
                                                                <span>
                                                                    <i className="bi bi-calendar3 me-2"></i>
                                                                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric'
                                                                    })}
                                                                </span>
                                                                <span>
                                                                    <i className="bi bi-clock me-2"></i>
                                                                    {post.readTime}
                                                                </span>
                                                            </div>

                                                            <h3 className="h5 fw-bold text-white mb-3">
                                                                {post.title}
                                                            </h3>

                                                            <p className="text-white-70 mb-4">
                                                                {post.excerpt}
                                                            </p>

                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div className="d-flex gap-2 flex-wrap">
                                                                    {post.tags.slice(0, 3).map((tag, i) => (
                                                                        <span key={i} className="badge badge-tag">
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                                <div className="blog-read-more">
                                                                    <i className="bi bi-arrow-right fs-5 text-primary"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>

                                    {filteredPosts.length === 0 && (
                                        <div className="text-center py-5">
                                            <p className="text-white-60 fs-5">No posts found in this category.</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </LocaleProvider>
    );
}
