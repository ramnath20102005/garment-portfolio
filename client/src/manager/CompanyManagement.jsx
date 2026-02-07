import { useState, useEffect } from "react";
import "./mang_css/ManagerCommon.css";

const CompanyManagement = () => {
    const [companyInfo, setCompanyInfo] = useState({
        name: '',
        description: '',
        establishedYear: '',
        location: '',
    });
    const [loading, setLoading] = useState(true);
    const [currentRecord, setCurrentRecord] = useState(null);

    useEffect(() => {
        fetchCompany();
    }, []);

    const fetchCompany = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/company/all", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.length > 0) {
                const latest = data[0];
                setCurrentRecord(latest);
                setCompanyInfo({
                    name: latest.name || '',
                    description: latest.description || '',
                    establishedYear: latest.establishedYear || '',
                    location: latest.location || ''
                });
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCompanyInfo({ ...companyInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (submit = false) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/company", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ ...companyInfo, submit }),
            });
            if (res.ok) {
                alert(submit ? "Profile submitted for approval." : "Draft saved successfully.");
                fetchCompany();
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading Profile Data...</div>;

    return (
        <div className="manager-page-content">
            <header className="header-flex page-title-block">
                <div>
                    <h2>Company Profile</h2>
                    <p>Manage the identity and overview of the organization</p>
                </div>
                {currentRecord && (
                    <div className="status-badge-container">
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: currentRecord.submissionStatus === 'Approved' ? '#2b8a3e' : currentRecord.submissionStatus === 'PendingApproval' ? '#f08c00' : '#1f1f1d' }}>
                            Status: {currentRecord.submissionStatus}
                        </span>
                    </div>
                )}
            </header>

            {currentRecord?.submissionStatus === 'Rejected' && (
                <div style={{ backgroundColor: '#fff5f5', border: '1px solid #ffc9c9', padding: '16px', marginBottom: '24px', color: '#e03131', fontSize: '0.9rem' }}>
                    <strong>Rejection Reason:</strong> {currentRecord.verificationMetadata?.rejectionReason}
                </div>
            )}

            <form className="mgmt-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(false); }}>
                <div className="form-row">
                    <label>Company Name</label>
                    <input name="name" value={companyInfo.name} onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <label>Core Narrative / Description</label>
                    <textarea name="description" rows="5" value={companyInfo.description} onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <label>Established Year</label>
                    <input name="establishedYear" type="number" value={companyInfo.establishedYear} onChange={handleChange} required />
                </div>
                <div className="form-row">
                    <label>Base Location</label>
                    <input name="location" value={companyInfo.location} onChange={handleChange} required />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save">Update Draft</button>
                    <button type="button" className="btn-secondary" onClick={() => handleSubmit(true)}>Finalize & Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CompanyManagement;
