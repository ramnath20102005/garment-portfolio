import { useState, useEffect } from "react";
import "./admin_css/Approvals.css";
import { CheckCircle, XCircle, Eye, MessageSquare } from "lucide-react";

const Approvals = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/approvals", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      setSubmissions(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/approvals/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ action, comments })
      });

      if (res.ok) {
        setSelectedSubmission(null);
        setComments("");
        fetchSubmissions();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="approvals-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Initializing Approval Queue...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="approvals-container">
      <header className="approvals-header">
        <h1>Verification Queue</h1>
        <p>Verify data integrity across all operational nodes</p>
      </header>

      <div className="approvals-grid">
        {/* Submissions List */}
        <div className="submissions-list">
          {submissions.length === 0 ? (
            <div className="no-submissions">
              <MessageSquare size={32} strokeWidth={1.5} />
              <p>No pending verifications.</p>
            </div>
          ) : (
            submissions.map(sub => (
              <div
                key={sub._id}
                className={`submission-card ${selectedSubmission?._id === sub._id ? 'active' : ''}`}
                onClick={() => setSelectedSubmission(sub)}
              >
                <div className="sub-meta">
                  <span className="sub-type">{sub.entityType}</span>
                  <span className="sub-date">
                    {new Date(sub.submittedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3>{sub.managerId?.username || 'Unknown User'}</h3>
                <p className="sub-description">Submitted for global alignment</p>
                <div className="sub-actions">
                  <button
                    className="view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSubmission(sub);
                    }}
                  >
                    <Eye size={14} /> <span>Review</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Submission Detail */}
        <div className="submission-detail">
          {selectedSubmission ? (
            <div className="detail-content">
              <h2>Review: {selectedSubmission.entityType}</h2>

              {/* Data Snapshot */}
              <div className="data-snapshot">
                <h3>Submission Data</h3>
                {Object.entries(selectedSubmission.dataSnapshot)
                  .filter(([key]) => !['_id', 'createdAt', 'updatedAt', '__v', 'managerId', 'submissionStatus'].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="snapshot-row">
                      <span className="key">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="value">
                        {typeof value === 'object' && value !== null
                          ? JSON.stringify(value, null, 2)
                          : String(value)}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Approval Form */}
              <div className="approval-form">
                <label htmlFor="comments">Verification Comments</label>
                <textarea
                  id="comments"
                  placeholder="Add rationale for approval or rejection..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                />
                <div className="form-buttons">
                  <button
                    className="approve-btn"
                    onClick={() => handleAction(selectedSubmission._id, 'Approved')}
                  >
                    <CheckCircle size={18} /> <span>Approve</span>
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleAction(selectedSubmission._id, 'Rejected')}
                  >
                    <XCircle size={18} /> <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="select-prompt">
              <MessageSquare size={48} strokeWidth={1.5} />
              <p>Select a submission to begin verification protocol</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Approvals;