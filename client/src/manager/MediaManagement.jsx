import { useState, useEffect } from "react";
import "./mang_css/ManagerCommon.css";

const MediaManagement = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ title: '', url: '', type: 'image', category: 'Collection' });

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/media/all", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            setMediaItems(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e, submit = false) => {
        if (e) e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/media", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ ...formData, submit }),
            });
            if (res.ok) {
                setIsAdding(false);
                setFormData({ title: '', url: '', type: 'image', category: 'Collection' });
                fetchMedia();
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading Media...</div>;

    return (
        <div className="manager-page-content">
            <header className="page-title-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Media & Assets</h2>
                    <p>Central vault for all portfolio imagery and video content</p>
                </div>
                <button className="btn-save" onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? "Cancel" : "Add Asset"}
                </button>
            </header>

            {isAdding && (
                <div style={{ marginBottom: '60px', padding: '40px', border: '1px solid var(--text-primary)', background: 'var(--bg-muted)' }}>
                    <h3>Add New Media Asset</h3>
                    <form className="mgmt-form" style={{ marginTop: '24px' }} onSubmit={(e) => handleSubmit(e, false)}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div className="form-row">
                                <label>Title</label>
                                <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                            </div>
                            <div className="form-row">
                                <label>Asset URL (Placeholder or Google Drive Link)</label>
                                <input value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} required />
                            </div>
                            <div className="form-row">
                                <label>Type</label>
                                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                    <option value="image">Image</option>
                                    <option value="video">Video</option>
                                </select>
                            </div>
                            <div className="form-row">
                                <label>Category</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    <option value="Collection">Collection</option>
                                    <option value="Facility">Facility</option>
                                    <option value="Personnel">Personnel</option>
                                    <option value="Event">Event</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-actions" style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                            <button type="submit" className="btn-save">Save as Draft</button>
                            <button type="button" className="btn-secondary" onClick={() => handleSubmit(null, true)}>Submit for Approval</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="media-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '32px' }}>
                {mediaItems.map(item => (
                    <div key={item._id} style={{ backgroundColor: 'var(--bg-muted)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                        <div style={{ aspectRatio: '16/9', backgroundColor: '#eee', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: '#999' }}>
                            {item.type === 'video' ? 'Video Asset' : 'Image Asset'}<br />
                            {item.url}
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <strong style={{ textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>{item.title}</strong>
                                <span style={{
                                    fontSize: '0.6rem',
                                    fontWeight: 'bold',
                                    color: item.submissionStatus === 'Approved' ? '#2b8a3e' : item.submissionStatus === 'PendingApproval' ? '#f08c00' : '#1f1f1d'
                                }}>
                                    {item.submissionStatus}
                                </span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                {item.category} • {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
                {mediaItems.length === 0 && !isAdding && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px', opacity: 0.5 }}>
                        No media assets found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaManagement;
