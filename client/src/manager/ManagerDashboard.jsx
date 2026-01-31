import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./mang_css/ManagerDashboard.css";

const ManagerDashboard = ({ managerHeader }) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Manager";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [recentItems, setRecentItems] = useState([]);
  const [stats, setStats] = useState({ employees: 0, projects: 0, pending: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { "Authorization": `Bearer ${token}` };

      // Fetch Activity
      const activityRes = await fetch("http://localhost:5000/api/dashboard/activity", { headers });
      if (activityRes.ok) {
        const activityData = await activityRes.json();
        setRecentItems(activityData);
      } else {
        console.error("Failed to fetch activity:", activityRes.status);
      }

      // Fetch Stats
      const statsRes = await fetch("http://localhost:5000/api/dashboard/stats", { headers });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  const getStatusColor = (action) => {
    if (action === 'Approved') return 'published';
    if (action === 'Submitted') return 'pendingapproval'; // mapping to CSS class
    if (action === 'Rejected') return 'rejected';
    return 'draft';
  };

  return (
    <div className="manager-dashboard">
      <header className="manager-header">
        <div>
          <h1>{managerHeader || "V R FASHIONS OPERATIONS"}</h1>
        </div>
        <div className="user-info">
          <span className="role-badge">Content Manager</span>
          <span className="username">Welcome, {username}</span>
        </div>
      </header>

      <div className="overview-grid">
        <div className="stat-card">
          <span className="label">Employees Under Manager</span>
          <span className="value">{stats.employees}</span>
        </div>
        <div className="stat-card">
          <span className="label">Active Projects</span>
          <span className="value">{stats.projects}</span>
        </div>
        <div className="stat-card">
          <span className="label">Pending Submissions</span>
          <span className="value">{stats.pending}</span>
        </div>
        <div className="stat-card">
          <span className="label">System Date</span>
          <span className="value">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="content-section">
          <h2>Recent Activity</h2>
          <div className="recent-list">
            {recentItems.length === 0 ? (
              <div style={{ padding: '20px', color: '#666', fontStyle: 'italic' }}>No recent activity found.</div>
            ) : (
              recentItems.map(item => (
                <div key={item._id} className="recent-item">
                  <div className="item-info">
                    <span className="name">{item.details}</span>
                    <span className="meta">{item.entityType} • {new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                  <span className={`status-badge status-${getStatusColor(item.action)}`}>
                    {item.action}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        <aside className="quick-actions">
          <h2>Management</h2>
          <Link to="/manager/company" className="action-btn">Company Profile</Link>
          <Link to="/manager/employees" className="action-btn">Employee Directory</Link>
          <Link to="/manager/projects" className="action-btn">Project Operations</Link>
          <Link to="/manager/reports" className="action-btn">Performance Reports</Link>
          <Link to="/manager/media" className="action-btn">Media Gallery</Link>
          <Link to="/manager/updates" className="action-btn">News & Updates</Link>

          <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Operational Data</h2>
          <Link to="/manager/exports" className="action-btn">Exports</Link>
          <Link to="/manager/raw-materials" className="action-btn">Raw Materials</Link>
          <Link to="/manager/workforce" className="action-btn">Workforce</Link>
          <Link to="/manager/buyers" className="action-btn">Buyers</Link>
          <Link to="/manager/financials" className="action-btn">Financials</Link>

          <button className="action-btn logout" onClick={handleLogout}>Terminate Session</button>
        </aside>
      </div>
    </div>
  );
};

export default ManagerDashboard;
