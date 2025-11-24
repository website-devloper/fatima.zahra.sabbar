'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Contact {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied' | 'archived';
    createdAt: string;
    updatedAt: string;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const router = useRouter();

    useEffect(() => {
        const adminAuth = localStorage.getItem('adminAuth');
        if (!adminAuth) {
            router.push('/admin');
            return;
        }

        fetchContacts();
    }, [router]);

    const fetchContacts = async () => {
        try {
            const response = await fetch('/api/contacts');
            const data = await response.json();
            if (data.success) {
                setContacts(data.data);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: Contact['status']) => {
        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                fetchContacts();
                if (selectedContact?._id === id) {
                    setSelectedContact({ ...selectedContact, status });
                }
            }
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this contact?')) return;

        try {
            const response = await fetch(`/api/contacts/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchContacts();
                if (selectedContact?._id === id) {
                    setSelectedContact(null);
                }
                alert('Contact deleted successfully!');
            }
        } catch (error) {
            alert('Failed to delete contact');
        }
    };

    const filteredContacts = contacts.filter(contact =>
        filter === 'all' ? true : contact.status === filter
    );

    const getStatusBadge = (status: Contact['status']) => {
        const styles = {
            new: { bg: '#10b981', icon: 'bi-envelope' },
            read: { bg: '#3b82f6', icon: 'bi-envelope-open' },
            replied: { bg: '#8b5cf6', icon: 'bi-reply' },
            archived: { bg: '#6b7280', icon: 'bi-archive' }
        };

        const style = styles[status];
        return (
            <span className="badge" style={{ background: style.bg }}>
                <i className={`bi ${style.icon} me-1`}></i>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
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
                            <i className="bi bi-envelope me-2"></i>
                            Contact Messages
                        </h1>
                        <Link href="/admin/dashboard" className="btn btn-outline-primary">
                            <i className="bi bi-arrow-left me-2"></i>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </header>

            <div className="container py-5">
                {/* Stats */}
                <div className="row g-4 mb-5">
                    <div className="col-md-3">
                        <div className="glass-panel p-4">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box" style={{ background: '#3b82f6', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="bi bi-envelope text-white fs-4"></i>
                                </div>
                                <div>
                                    <h3 className="h2 text-white mb-0">{contacts.length}</h3>
                                    <p className="text-white-60 mb-0 small">Total</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="glass-panel p-4">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box" style={{ background: '#10b981', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="bi bi-envelope-exclamation text-white fs-4"></i>
                                </div>
                                <div>
                                    <h3 className="h2 text-white mb-0">{contacts.filter(c => c.status === 'new').length}</h3>
                                    <p className="text-white-60 mb-0 small">New</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="glass-panel p-4">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box" style={{ background: '#8b5cf6', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="bi bi-reply text-white fs-4"></i>
                                </div>
                                <div>
                                    <h3 className="h2 text-white mb-0">{contacts.filter(c => c.status === 'replied').length}</h3>
                                    <p className="text-white-60 mb-0 small">Replied</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="glass-panel p-4">
                            <div className="d-flex align-items-center gap-3">
                                <div className="icon-box" style={{ background: '#6b7280', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <i className="bi bi-archive text-white fs-4"></i>
                                </div>
                                <div>
                                    <h3 className="h2 text-white mb-0">{contacts.filter(c => c.status === 'archived').length}</h3>
                                    <p className="text-white-60 mb-0 small">Archived</p>
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
                            All ({contacts.length})
                        </button>
                        <button
                            className={`btn ${filter === 'new' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setFilter('new')}
                        >
                            New ({contacts.filter(c => c.status === 'new').length})
                        </button>
                        <button
                            className={`btn ${filter === 'read' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setFilter('read')}
                        >
                            Read ({contacts.filter(c => c.status === 'read').length})
                        </button>
                        <button
                            className={`btn ${filter === 'replied' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setFilter('replied')}
                        >
                            Replied ({contacts.filter(c => c.status === 'replied').length})
                        </button>
                        <button
                            className={`btn ${filter === 'archived' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setFilter('archived')}
                        >
                            Archived ({contacts.filter(c => c.status === 'archived').length})
                        </button>
                    </div>
                </div>

                {/* Contacts List */}
                <div className="row g-4">
                    <div className="col-lg-5">
                        <div className="glass-panel p-3">
                            <div className="list-group list-group-flush">
                                {filteredContacts.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="bi bi-inbox text-white-60" style={{ fontSize: '3rem' }}></i>
                                        <p className="text-white-60 mt-3">No messages found</p>
                                    </div>
                                ) : (
                                    filteredContacts.map(contact => (
                                        <div
                                            key={contact._id}
                                            className={`list-group-item list-group-item-action cursor-pointer ${selectedContact?._id === contact._id ? 'active' : ''}`}
                                            onClick={() => {
                                                setSelectedContact(contact);
                                                if (contact.status === 'new') {
                                                    updateStatus(contact._id, 'read');
                                                }
                                            }}
                                            style={{
                                                background: selectedContact?._id === contact._id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                                border: 'none',
                                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <div className="d-flex w-100 justify-content-between align-items-start">
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-1 text-white fw-bold">
                                                        {contact.name}
                                                        {contact.status === 'new' && <span className="badge bg-danger ms-2 small">New</span>}
                                                    </h6>
                                                    <p className="mb-1 text-white-80 small">{contact.subject}</p>
                                                    <small className="text-white-60">
                                                        {new Date(contact.createdAt).toLocaleDateString()} - {contact.email}
                                                    </small>
                                                </div>
                                                {getStatusBadge(contact.status)}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Detail */}
                    <div className="col-lg-7">
                        {selectedContact ? (
                            <div className="glass-panel p-4">
                                <div className="d-flex justify-content-between align-items-start mb-4">
                                    <div>
                                        <h4 className="text-white mb-2">{selectedContact.subject}</h4>
                                        <div className="text-white-60 small">
                                            <p className="mb-1">
                                                <i className="bi bi-person me-2"></i>
                                                {selectedContact.name}
                                            </p>
                                            <p className="mb-1">
                                                <i className="bi bi-envelope me-2"></i>
                                                <a href={`mailto:${selectedContact.email}`} className="text-primary">{selectedContact.email}</a>
                                            </p>
                                            <p className="mb-0">
                                                <i className="bi bi-calendar me-2"></i>
                                                {new Date(selectedContact.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button
                                            onClick={() => handleDelete(selectedContact._id)}
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>

                                <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                                <div className="mb-4">
                                    <p className="text-white" style={{ whiteSpace: 'pre-wrap' }}>
                                        {selectedContact.message}
                                    </p>
                                </div>

                                <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                                <div>
                                    <label className="text-white-80 small mb-2">Update Status:</label>
                                    <div className="btn-group w-100" role="group">
                                        <button
                                            className={`btn ${selectedContact.status === 'new' ? 'btn-success' : 'btn-outline-success'} btn-sm`}
                                            onClick={() => updateStatus(selectedContact._id, 'new')}
                                        >
                                            <i className="bi bi-envelope me-1"></i> New
                                        </button>
                                        <button
                                            className={`btn ${selectedContact.status === 'read' ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                                            onClick={() => updateStatus(selectedContact._id, 'read')}
                                        >
                                            <i className="bi bi-envelope-open me-1"></i> Read
                                        </button>
                                        <button
                                            className={`btn ${selectedContact.status === 'replied' ? 'btn-info' : 'btn-outline-info'} btn-sm`}
                                            onClick={() => updateStatus(selectedContact._id, 'replied')}
                                        >
                                            <i className="bi bi-reply me-1"></i> Replied
                                        </button>
                                        <button
                                            className={`btn ${selectedContact.status === 'archived' ? 'btn-secondary' : 'btn-outline-secondary'} btn-sm`}
                                            onClick={() => updateStatus(selectedContact._id, 'archived')}
                                        >
                                            <i className="bi bi-archive me-1"></i> Archive
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="glass-panel p-5 text-center">
                                <i className="bi bi-envelope-open text-white-60" style={{ fontSize: '4rem' }}></i>
                                <p className="text-white-60 mt-3">Select a message to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
