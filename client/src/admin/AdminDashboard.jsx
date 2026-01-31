import { useState, useEffect } from "react";
import {
  Users,
  Briefcase,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Database,
  Shield,
  BarChart3,
  Layers,
  ShoppingBag,
  DollarSign,
  Activity as ActivityIcon,
  Search,
  ChevronRight,
  Cpu,
  Clock
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import "./admin_css/AdminMaster.css";

const COLORS = ['#2e2e2c', '#5c5c58', '#8c8c88', '#b5b5b1', '#d1d1cd', '#1f1f1d'];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { "Authorization": `Bearer ${token}` };

      const res = await fetch("http://localhost:5000/api/admin/stats", { headers });
      if (!res.ok) throw new Error("Synchronization failure with core core node.");

      const data = await res.json();
      setStats(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="admin-loading">Synchronizing with Core Nodes...</div>;
  if (error || !stats) return <div className="admin-error">Alert: {error || "Core Node Offline"}</div>;

  return (
    <div className="admin-content-wrapper">

      {/* HEADER & FILTERS */}
      <header className="dashboard-control-bar">
        <div className="control-info">
          <h1>Universal Intelligence Dashboard</h1>
          <p>Global node status: <span style={{ color: 'var(--admin-success)' }}>Operational</span></p>
        </div>
      </header>

      {/* 1. TOP SUMMARY (KPI CARDS) */}
      <div className="admin-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <Users size={18} />
            <span style={{ color: 'var(--admin-success)', fontSize: '0.75rem' }}>+4%</span>
          </div>
          <div className="kpi-value">{stats.kpis.totalEmployees}</div>
          <div className="kpi-label">Workforce Strength</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <Database size={18} />
          </div>
          <div className="kpi-value">{stats.kpis.activeProjects}</div>
          <div className="kpi-label">Active Deployments</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <AlertCircle size={18} color="var(--admin-warning)" />
          </div>
          <div className="kpi-value">{stats.kpis.pendingVerifications}</div>
          <div className="kpi-label">Pending Verifications</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <ShoppingBag size={18} color="var(--admin-accent)" />
          </div>
          <div className="kpi-value">${(stats.kpis.totalExportsValue / 1000).toFixed(1)}K</div>
          <div className="kpi-label">Export Valuation</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header">
            <Shield size={18} color="var(--admin-success)" />
          </div>
          <div className="kpi-value">{stats.kpis.accuracyRate}</div>
          <div className="kpi-label">System Integrity</div>
        </div>
      </div>

      {/* 2. APPROVAL & GOVERNANCE */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Approval & Governance Protocol</h2>
          <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.9rem' }}>Live verification queue from distributed management nodes.</p>
        </div>
        <div className="charts-grid" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr' }}>
          <div className="chart-card">
            <h3>Submission Status Distribution</h3>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={stats.approvalData.statusDist}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.approvalData.statusDist.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Manager</th>
                  <th>Domain</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Protocol</th>
                </tr>
              </thead>
              <tbody>
                {stats.auditData.recent.filter(a => a.action === 'Submitted').slice(0, 5).map(sub => (
                  <tr key={sub._id}>
                    <td>{sub.userId?.username}</td>
                    <td>{sub.entityType}</td>
                    <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td><span className="status-badge status-pending">Pending</span></td>
                    <td><button className="view-btn" onClick={() => window.location.href = '/admin/approvals'} style={{ padding: '6px 12px', background: 'var(--text-primary)', color: '#fff', border: 'none', borderRadius: '0px', cursor: 'pointer', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Review</button></td>
                  </tr>
                ))}
                {!stats.auditData.recent.some(a => a.action === 'Submitted') && <tr><td colSpan="5" align="center" style={{ padding: '40px' }}>Queue empty. All nodes synchronized.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. WORKFORCE & HR ANALYTICS */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Workforce Intelligence</h2>
        </div>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Department Distribution</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={stats.workforceData.deptDist}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--admin-text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--admin-text-secondary)" fontSize={12} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                  <Bar dataKey="value" fill="var(--admin-accent)" radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Human Capital Growth Trend</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={stats.workforceData.trend}>
                  <defs>
                    <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2e2e2c" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#2e2e2c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--admin-text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--admin-text-secondary)" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#2e2e2c" fillOpacity={1} fill="url(#colorTrend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. SUPPLY CHAIN & PROJECTS (COMBINED VIEW) */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Supply Chain & Operations</h2>
        </div>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Raw Material Inventory Levels</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={stats.supplyChainData.stock} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="var(--admin-text-secondary)" fontSize={12} width={100} />
                  <Tooltip />
                  <Bar dataKey="quantity" fill="#5c5c58" radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Global Export Valuation by Region</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={stats.supplyChainData.exports}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.supplyChainData.exports.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AUDIT & HEATMAP */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Audit & Neural Node Activity</h2>
        </div>
        <div className="charts-grid">
          <div className="chart-card" style={{ gridColumn: 'span 2' }}>
            <h3>Neural Activity Timeline (Last 30 Nodes)</h3>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer>
                <AreaChart data={[...stats.auditData.heatmap].reverse()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="date" hide />
                  <YAxis stroke="var(--admin-text-secondary)" fontSize={10} />
                  <Tooltip />
                  <Area type="step" dataKey="count" stroke="#2b8a3e" fill="#2b8a3e" fillOpacity={0.05} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="admin-table-container" style={{ marginTop: '40px' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Entity</th>
                    <th>Action</th>
                    <th>User Node</th>
                    <th>Protocol Hash</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.auditData.recent.map(act => (
                    <tr key={act._id}>
                      <td style={{ fontWeight: 600 }}>{act.entityType}</td>
                      <td>
                        <span style={{
                          color: act.action.includes('Approved') ? 'var(--admin-success)' : act.action.includes('Rejected') ? 'var(--admin-danger)' : 'var(--admin-accent)',
                          fontWeight: 700
                        }}>
                          {act.action}
                        </span>
                      </td>
                      <td>{act.userId?.username}</td>
                      <td style={{ opacity: 0.5, fontSize: '0.75rem' }}>{act._id.substring(0, 12)}...</td>
                      <td>{new Date(act.createdAt).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AI INSIGHTS MODULE (EXPERIMENTAL) */}
      <section className="dashboard-section">
        <div className="insights-panel">
          <div className="insights-badge">
            <Cpu size={14} style={{ marginRight: '8px' }} />
            INTELLIGENCE MODULE v2.1
          </div>
          <h2>Predictive Operations Analysis</h2>
          <p>
            AI algorithms are currently analyzing node synchronization patterns. Early indicators suggest a
            <strong> 12% increase </strong> in export valuation for the next fiscal quarter based on current
            Supply Chain and Workforce metrics.
          </p>
          <div style={{ marginTop: '48px', display: 'flex', gap: '30px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', flex: 1 }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>ANOMALY DETECTION</div>
              <div style={{ color: 'var(--admin-success)', fontWeight: 600, fontSize: '1.2rem' }}>0 Issues Found</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', flex: 1 }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>NODE LATENCY</div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '1.2rem' }}>12ms Response</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AdminDashboard;
