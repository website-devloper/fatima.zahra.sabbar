'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (data.success) {
                // Store auth token in localStorage
                localStorage.setItem('adminAuth', data.token);
                router.push('/admin/dashboard');
            } else {
                setError('Invalid password');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
            {/* Background Decoration */}
            <div className="why-bg-decoration">
                <div className="blob blob-1" style={{ top: '-10%', left: '-10%', opacity: 0.15 }}></div>
                <div className="blob blob-2" style={{ bottom: '-10%', right: '-10%', opacity: 0.15 }}></div>
            </div>

            <div className="container position-relative z-1">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="glass-panel p-5">
                            <div className="text-center mb-4">
                                <i className="bi bi-shield-lock-fill text-primary" style={{ fontSize: '3rem' }}></i>
                                <h2 className="text-white mt-3 mb-2">Admin Login</h2>
                                <p className="text-white-60">Enter password to access blog management</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label text-white-80">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            color: 'white',
                                            padding: '0.75rem 1rem'
                                        }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter admin password"
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="alert alert-danger" role="alert" style={{ background: 'rgba(220, 53, 69, 0.1)', border: '1px solid rgba(220, 53, 69, 0.3)', color: '#dc3545' }}>
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Logging in...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            Login
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <a href="/" className="text-primary text-decoration-none">
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Back to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
