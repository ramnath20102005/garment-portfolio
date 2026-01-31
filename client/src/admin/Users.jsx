import { useState, useEffect } from "react";
import { Search, MoreVertical, Shield, CheckCircle } from "lucide-react";
import "./admin_css/AdminMaster.css";

const Users = () => {
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch employees
        const empRes = await fetch("http://localhost:5000/api/employees", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const empData = await empRes.json();
        setEmployees(empData.filter(e => e.submissionStatus === 'Approved'));

        // Fetch managers (we'll fetch users and filter)
        const userRes = await fetch("http://localhost:5000/api/admin/stats", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        // We'll use the stats endpoint to get the count or if we had a full user list...
        // For now, let's use the employees list and stats to mock the managers if a full user list 
        // isn't available, but I'll assume we can fetch all users as Admin.

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="admin-loading">Mapping Personnel Directory...</div>;

  return (
    <div className="admin-content-wrapper">
      <div className="chart-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Access Control</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Manage internal system identities and role assignments</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-light)', padding: '8px 16px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
              <Search size={16} color="var(--text-secondary)" />
              <input type="text" placeholder="Search accounts..." style={{ background: 'none', border: 'none', padding: '4px 8px', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }} />
            </div>
            <button style={{ background: 'var(--text-primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>
              + Create User
            </button>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Identity</th>
                <th>Access Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp._id}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{emp.employeeId}</td>
                  <td>{emp.fullName}</td>
                  <td>{emp.email}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={14} color="var(--admin-success)" />
                      Verified {emp.department} Personnel
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: 'var(--admin-success)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                      Verified
                    </span>
                  </td>
                  <td>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>No verified personnel records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
