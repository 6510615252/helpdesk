import { useState, useEffect } from 'react';
import { createTicket, updateTicket } from '../services/ticketService';

const STATUSES = ['pending', 'accepted', 'resolved', 'rejected'];

function TicketModal({ ticket, onClose, onSuccess }) {
    const isEditMode = !!ticket;  

    const [form, setForm] = useState({
        title:       '',
        description: '',
        contact:     '',
        status:      'pending',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState(null);

    useEffect(() => {
        if (ticket) {
            setForm({
                title:       ticket.title,
                description: ticket.description,
                contact:     ticket.contact,
                status:      ticket.status,
            });
        }
    }, [ticket]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // กัน page reload
        try {
            setLoading(true);
            setError(null);
            if (isEditMode) {
                await updateTicket(ticket.id, form);
            } else {
                await createTicket(form);
            }
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000,
            }}
        >
            {/* Modal Box — หยุด click ไม่ให้ปิด modal */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '480px',
                }}
            >
                <h2 style={{ margin: '0 0 16px 0' }}>
                    {isEditMode ? `Edit Ticket #${ticket.id}` : 'New Ticket'}
                </h2>

                {error && (
                    <p style={{ color: '#ef4444', marginBottom: '12px' }}>{error}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '8px' }}
                    />

                    <label>Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows={3}
                        style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '8px' }}
                    />

                    <label>Contact</label>
                    <input
                        name="contact"
                        value={form.contact}
                        onChange={handleChange}
                        required
                        style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '8px' }}
                    />

                    {/* Status — แสดงแค่ตอน edit */}
                    {isEditMode && (
                        <>
                            <label>Status</label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                style={{ display: 'block', width: '100%', marginBottom: '12px', padding: '8px' }}
                            >
                                {STATUSES.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : isEditMode ? 'Save' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TicketModal;