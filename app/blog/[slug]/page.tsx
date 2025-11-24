'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { LocaleProvider } from '../../components/LocaleProvider';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

interface BlogPost {
    _id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    createdAt: string;
    author: string;
    category: string;
    tags: string[];
    readTime: string;
}

export default function BlogPost({ params }: BlogPostPageProps) {
    const { slug } = use(params);
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Fetch the main post
                const response = await fetch(`/api/blog/${slug}`);
                const data = await response.json();

                if (data.success) {
                    setPost(data.data);

                    // Fetch related posts
                    const relatedResponse = await fetch('/api/blog?limit=3');
                    const relatedData = await relatedResponse.json();
                    if (relatedData.success) {
                        // Filter out current post
                        const filtered = relatedData.data.filter((p: BlogPost) => p.slug !== slug);
                        setRelatedPosts(filtered.slice(0, 3));
                    }
                }
            } catch (error) {
                console.error('Error fetching blog post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <LocaleProvider>
                <div>
                    <Navbar />
                    <main className="pt-5 mt-5">
                        <div className="container text-center py-5">
                            <p className="text-white-60">Loading...</p>
                        </div>
                    </main>
                    <Footer />
                </div>
            </LocaleProvider>
        );
    }

    if (!post) {
        return (
            <LocaleProvider>
                <div>
                    <Navbar />
                    <main className="pt-5 mt-5">
                        <div className="container text-center py-5">
                            <h1 className="display-4 fw-bold text-white mb-4">Post Not Found</h1>
                            <Link href="/blog" className="btn btn-primary">
                                Back to Blog
                            </Link>
                        </div>
                    </main>
                    <Footer />
                </div>
            </LocaleProvider>
        );
    }

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

                        <div className="container position-relative z-1">
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <div className="mb-4" data-aos="fade-up">
                                        <Link href="/blog" className="text-primary text-decoration-none">
                                            <i className="bi bi-arrow-left me-2"></i>
                                            Back to Blog
                                        </Link>
                                    </div>

                                    <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
                                        <span className="badge bg-primary me-2">{post.category}</span>
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="badge badge-tag me-2">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h1 className="display-4 fw-bold text-white mb-4" data-aos="fade-up" data-aos-delay="200">
                                        {post.title}
                                    </h1>

                                    <div className="d-flex align-items-center gap-4 text-white-60 mb-4" data-aos="fade-up" data-aos-delay="300">
                                        <span>
                                            <i className="bi bi-person-circle me-2"></i>
                                            {post.author}
                                        </span>
                                        <span>
                                            <i className="bi bi-calendar3 me-2"></i>
                                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                        <span>
                                            <i className="bi bi-clock me-2"></i>
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <div
                                        className="blog-featured-image mb-5"
                                        data-aos="fade-up"
                                        data-aos-delay="400"
                                        style={{
                                            backgroundImage: `url(${post.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            height: '400px',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(255, 255, 255, 0.1)'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Article Content */}
                    <section className="py-5">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div
                                        className="blog-content glass-panel p-4 p-md-5"
                                        data-aos="fade-up"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />

                                    {/* Share Section */}
                                    <div className="glass-panel p-4 mt-4" data-aos="fade-up">
                                        <h5 className="text-white mb-3">Share this article</h5>
                                        <div className="d-flex gap-3">
                                            <a
                                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-primary"
                                            >
                                                <i className="bi bi-twitter me-2"></i>
                                                Twitter
                                            </a>
                                            <a
                                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-primary"
                                            >
                                                <i className="bi bi-linkedin me-2"></i>
                                                LinkedIn
                                            </a>
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-primary"
                                            >
                                                <i className="bi bi-facebook me-2"></i>
                                                Facebook
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="py-5">
                            <div className="container">
                                <h3 className="h2 fw-bold text-white mb-4" data-aos="fade-up">
                                    More Articles
                                </h3>
                                <div className="row g-4">
                                    {relatedPosts.map((relatedPost, index) => (
                                        <div
                                            key={relatedPost._id}
                                            className="col-lg-4 col-md-6"
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                        >
                                            <Link href={`/blog/${relatedPost.slug}`} className="text-decoration-none">
                                                <div className="blog-card glass-panel h-100 p-0 overflow-hidden">
                                                    <div className="blog-image-wrapper position-relative overflow-hidden">
                                                        <div
                                                            className="blog-image"
                                                            style={{
                                                                backgroundImage: `url(${relatedPost.image})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                height: '200px'
                                                            }}
                                                        >
                                                            <div className="blog-category-badge position-absolute top-0 start-0 m-3">
                                                                <span className="badge bg-primary">{relatedPost.category}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="p-4">
                                                        <h4 className="h6 fw-bold text-white mb-2">
                                                            {relatedPost.title}
                                                        </h4>
                                                        <p className="text-white-70 small mb-3">
                                                            {relatedPost.excerpt.substring(0, 100)}...
                                                        </p>
                                                        <div className="text-primary small">
                                                            Read more <i className="bi bi-arrow-right ms-1"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                <Footer />
            </div>
        </LocaleProvider>
    );
}
