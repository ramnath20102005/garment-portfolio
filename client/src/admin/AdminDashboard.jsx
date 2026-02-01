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
      if (!res.ok) throw new Error("Synchronization failure with core node.");

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

      {/* HEADER */}
      <header className="dashboard-control-bar">
        <div className="control-info">
          <h1>Universal Intelligence Dashboard</h1>
          <p>Global node status: <span style={{ color: 'var(--admin-success)' }}>Operational</span></p>
        </div>
      </header>

      {/* 1. TOP SUMMARY (KPI CARDS) */}
      <div className="admin-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header"><Users size={18} /><span style={{ color: 'var(--admin-success)', fontSize: '0.75rem' }}>+4%</span></div>
          <div className="kpi-value">{stats.kpis.totalEmployees}</div>
          <div className="kpi-label">Workforce Strength</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><Database size={18} /></div>
          <div className="kpi-value">{stats.kpis.activeProjects}</div>
          <div className="kpi-label">Active Deployments</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><AlertCircle size={18} color="var(--admin-warning)" /></div>
          <div className="kpi-value">{stats.kpis.pendingVerifications}</div>
          <div className="kpi-label">Pending Verifications</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><DollarSign size={18} color="var(--admin-accent)" /></div>
          <div className="kpi-value">${(stats.kpis.totalExportsValue / 1000).toFixed(1)}K</div>
          <div className="kpi-label">Export Valuation</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><Shield size={18} color="var(--admin-success)" /></div>
          <div className="kpi-value">{stats.kpis.accuracyRate}</div>
          <div className="kpi-label">System Integrity</div>
        </div>
      </div>

      {/* 2. GOVERNANCE & APPROVALS (DONUT) */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Governance & Submission Protocol</h2>
          <p>Verification distribution across the management hierarchy.</p>
        </div>
        <div className="charts-grid" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr' }}>
          <div className="chart-card">
            <h3>Submission Status Distribution</h3>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={stats.approvalData.statusDist}
                    innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value"
                  >
                    {stats.approvalData.statusDist.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead><tr><th>Manager</th><th>Domain</th><th>Date</th><th>Status</th><th>Protocol</th></tr></thead>
              <tbody>
                {stats.auditData.recent.filter(a => a.action === 'Submitted').slice(0, 5).map(sub => (
                  <tr key={sub._id}>
                    <td>{sub.userId?.username}</td><td>{sub.entityType}</td><td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td><span className="status-badge status-pending">Pending</span></td>
                    <td><button className="view-btn" onClick={() => window.location.href = '/admin/approvals'}>Review</button></td>
                  </tr>
                ))}
                {!stats.auditData.recent.some(a => a.action === 'Submitted') && <tr><td colSpan="5" align="center" style={{ padding: '40px' }}>Queue empty. All nodes synchronized.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS PERFORMANCE (LINE CHARTS) */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Strategic Performance Trend</h2>
        </div>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Revenue vs Expenses (USD)</h3>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <LineChart data={stats.financialData.trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--admin-text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--admin-text-secondary)" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#2e2e2c" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="expenses" stroke="#c92a2a" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Export Valuation Growth</h3>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <LineChart data={stats.supplyChainData.exportTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--admin-text-secondary)" fontSize={12} />
                  <YAxis stroke="var(--admin-text-secondary)" fontSize={12} />
                  <Tooltip />
                  <Line type="stepAfter" dataKey="value" stroke="var(--admin-success)" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKFORCE & SUPPLY CHAIN (BARS) */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Operational Capacity</h2>
        </div>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Human Capital by Department</h3>
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
            <h3>Raw Material Critical Inventory</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={stats.supplyChainData.stock} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="var(--admin-text-secondary)" fontSize={11} width={120} />
                  <Bar dataKey="quantity" fill="#5c5c58" radius={[0, 4, 4, 0]} />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BUYERS & DESTINATIONS (PIE/DONUT) */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Global Connectivity</h2>
        </div>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>Regional Export Distribution</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={stats.supplyChainData.exports} outerRadius={100} paddingAngle={2} dataKey="value" stroke="none">
                    {stats.supplyChainData.exports.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend align="right" verticalAlign="middle" layout="vertical" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Major Buyer Contribution</h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={stats.buyerData.contribution} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                    {stats.buyerData.contribution.map((e, i) => <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend align="right" verticalAlign="middle" layout="vertical" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEURAL ACTIVITY HEATMAP */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Neural Node Audit</h2>
        </div>
        <div className="chart-card" style={{ padding: '40px' }}>
          <h3>System Transaction Heatmap (Last 30 Cycles)</h3>
          <div style={{ width: '100%', height: 120 }}>
            <ResponsiveContainer>
              <AreaChart data={[...stats.auditData.heatmap].reverse()}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                <XAxis dataKey="date" fontSize={10} stroke="var(--text-tertiary)" />
                <Tooltip />
                <Area type="step" dataKey="count" stroke="#2b8a3e" fill="#2b8a3e" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="admin-table-container" style={{ marginTop: '40px' }}>
            <table className="admin-table">
              <thead><tr><th>Entity</th><th>Action</th><th>Node</th><th>Timestamp</th></tr></thead>
              <tbody>
                {stats.auditData.recent.slice(0, 8).map(act => (
                  <tr key={act._id}>
                    <td style={{ fontWeight: 600 }}>{act.entityType}</td>
                    <td><span style={{ color: act.action.includes('Approved') ? 'var(--admin-success)' : act.action.includes('Rejected') ? 'var(--admin-danger)' : 'var(--admin-accent)', fontWeight: 700 }}>{act.action}</span></td>
                    <td>{act.userId?.username}</td>
                    <td>{new Date(act.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. AI INSIGHTS */}
      <section className="dashboard-section">
        <div className="insights-panel">
          <div className="insights-badge"><Cpu size={14} style={{ marginRight: '8px' }} />INTELLIGENCE v2.4</div>
          <h2>Predictive Operations Analysis</h2>
          <p>
            AI core detected seasonal deviates in <strong>{stats.supplyChainData.exports[0]?.name}</strong>.
            Recommend increasing stock of organic fibers by 15% to maintain safety buffers during the scheduled Q2 spike.
          </p>
          <div style={{ marginTop: '40px', display: 'flex', gap: '20px' }}>
            <div className="insight-stat"><span>Reliability Index</span><strong>99.4%</strong></div>
            <div className="insight-stat"><span>Node Latency</span><strong>14ms</strong></div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AdminDashboard;
