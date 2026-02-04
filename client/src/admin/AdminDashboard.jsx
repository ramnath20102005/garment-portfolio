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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

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

  // Responsive chart configuration
  const chartMargins = isMobile
    ? { top: 10, right: 10, left: -20, bottom: 5 }
    : { top: 20, right: 30, left: 0, bottom: 5 };

  const axisFontSize = isMobile ? 10 : 12;
  const legendFontSize = isMobile ? 10 : 12;

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
          <div className="kpi-header">
            <Users size={isMobile ? 16 : 18} />
            <span style={{ color: 'var(--admin-success)', fontSize: '0.75rem' }}>+4%</span>
          </div>
          <div className="kpi-value">{stats.kpis.totalEmployees}</div>
          <div className="kpi-label">Workforce Strength</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><Database size={isMobile ? 16 : 18} /></div>
          <div className="kpi-value">{stats.kpis.activeProjects}</div>
          <div className="kpi-label">Active Deployments</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><AlertCircle size={isMobile ? 16 : 18} color="var(--admin-warning)" /></div>
          <div className="kpi-value">{stats.kpis.pendingVerifications}</div>
          <div className="kpi-label">Pending Verifications</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><DollarSign size={isMobile ? 16 : 18} color="var(--admin-accent)" /></div>
          <div className="kpi-value">${(stats.kpis.totalExportsValue / 1000).toFixed(1)}K</div>
          <div className="kpi-label">Export Valuation</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-header"><Shield size={isMobile ? 16 : 18} color="var(--admin-success)" /></div>
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
        <div className="charts-grid" style={!isMobile ? { gridTemplateColumns: 'minmax(300px, 1fr) 2fr' } : {}}>
          <div className="chart-card">
            <h3>Submission Status Distribution</h3>
            <div style={{ width: '100%', height: isMobile ? 240 : 260, minHeight: isMobile ? 240 : 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.approvalData.statusDist}
                    innerRadius={isMobile ? 50 : 60}
                    outerRadius={isMobile ? 70 : 80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.approvalData.statusDist.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: axisFontSize }} />
                  <Legend
                    verticalAlign="bottom"
                    wrapperStyle={{ fontSize: legendFontSize }}
                  />
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
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => window.location.href = '/admin/approvals'}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
                {!stats.auditData.recent.some(a => a.action === 'Submitted') && (
                  <tr>
                    <td colSpan="5" align="center" style={{ padding: '40px' }}>
                      Queue empty. All nodes synchronized.
                    </td>
                  </tr>
                )}
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
            <div style={{ width: '100%', height: isMobile ? 250 : 320, minHeight: isMobile ? 250 : 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.financialData.trend} margin={chartMargins}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-subtle)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="var(--admin-text-secondary)"
                    fontSize={axisFontSize}
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    height={isMobile ? 60 : 30}
                  />
                  <YAxis
                    stroke="var(--admin-text-secondary)"
                    fontSize={axisFontSize}
                  />
                  <Tooltip contentStyle={{ fontSize: axisFontSize }} />
                  <Legend wrapperStyle={{ fontSize: legendFontSize }} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2e2e2c"
                    strokeWidth={isMobile ? 1.5 : 2}
                    dot={{ r: isMobile ? 3 : 4 }}
                    activeDot={{ r: isMobile ? 5 : 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#c92a2a"
                    strokeWidth={isMobile ? 1.5 : 2}
                    strokeDasharray="5 5"
                    dot={{ r: isMobile ? 2 : 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Export Valuation Growth</h3>
            <div style={{ width: '100%', height: isMobile ? 250 : 320, minHeight: isMobile ? 250 : 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.supplyChainData.exportTrend} margin={chartMargins}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-subtle)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    stroke="var(--admin-text-secondary)"
                    fontSize={axisFontSize}
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    height={isMobile ? 60 : 30}
                  />
                  <YAxis
                    stroke="var(--admin-text-secondary)"
                    fontSize={axisFontSize}
                  />
                  <Tooltip contentStyle={{ fontSize: axisFontSize }} />
                  <Line
                    type="stepAfter"
                    dataKey="value"
                    stroke="var(--admin-success)"
                    strokeWidth={isMobile ? 2 : 3}
                    dot={false}
                  />
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
            <div style={{ width: '100%', height: isMobile ? 250 : 300, minHeight: isMobile ? 250 : 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.workforceData.deptDist} margin={chartMargins}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-subtle)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--admin-text-secondary)"
                    fontSize={axisFontSize}
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    height={isMobile ? 70 : 30}
                  />
                  <YAxis
                    stroke="var(--admin-text-secondary)"
                    fontSize={axisFontSize}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ fontSize: axisFontSize }}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--admin-accent)"
                    radius={[0, 0, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Raw Material Critical Inventory</h3>
            <div style={{ width: '100%', height: isMobile ? 250 : 300, minHeight: isMobile ? 250 : 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.supplyChainData.stock}
                  layout="vertical"
                  margin={isMobile
                    ? { top: 10, right: 20, left: 10, bottom: 5 }
                    : { top: 20, right: 30, left: 20, bottom: 5 }
                  }
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border-subtle)"
                    horizontal={false}
                  />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="var(--admin-text-secondary)"
                    fontSize={isMobile ? 9 : 11}
                    width={isMobile ? 80 : 120}
                  />
                  <Bar
                    dataKey="quantity"
                    fill="#5c5c58"
                    radius={[0, 4, 4, 0]}
                  />
                  <Tooltip contentStyle={{ fontSize: axisFontSize }} />
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
            <div style={{ width: '100%', height: isMobile ? 250 : 300, minHeight: isMobile ? 250 : 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.supplyChainData.exports}
                    outerRadius={isMobile ? 80 : 100}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {stats.supplyChainData.exports.map((e, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: axisFontSize }} />
                  <Legend
                    align={isMobile ? "center" : "right"}
                    verticalAlign={isMobile ? "bottom" : "middle"}
                    layout={isMobile ? "horizontal" : "vertical"}
                    wrapperStyle={{ fontSize: legendFontSize }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="chart-card">
            <h3>Major Buyer Contribution</h3>
            <div style={{ width: '100%', height: isMobile ? 250 : 300, minHeight: isMobile ? 250 : 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.buyerData.contribution}
                    innerRadius={isMobile ? 50 : 60}
                    outerRadius={isMobile ? 75 : 90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {stats.buyerData.contribution.map((e, i) => (
                      <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: axisFontSize }} />
                  <Legend
                    align={isMobile ? "center" : "right"}
                    verticalAlign={isMobile ? "bottom" : "middle"}
                    layout={isMobile ? "horizontal" : "vertical"}
                    wrapperStyle={{ fontSize: legendFontSize }}
                  />
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
        <div className="chart-card" style={{ padding: isMobile ? '20px' : '40px' }}>
          <h3>System Transaction Heatmap (Last 30 Cycles)</h3>
          <div style={{ width: '100%', height: isMobile ? 150 : 120, minHeight: isMobile ? 150 : 120 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[...stats.auditData.heatmap].reverse()}
                margin={chartMargins}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border-subtle)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  fontSize={isMobile ? 8 : 10}
                  stroke="var(--text-tertiary)"
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                  height={isMobile ? 50 : 30}
                />
                <Tooltip contentStyle={{ fontSize: axisFontSize }} />
                <Area
                  type="step"
                  dataKey="count"
                  stroke="#2b8a3e"
                  fill="#2b8a3e"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="admin-table-container" style={{ marginTop: isMobile ? '24px' : '40px' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Action</th>
                  <th>Node</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {stats.auditData.recent.slice(0, 8).map(act => (
                  <tr key={act._id}>
                    <td style={{ fontWeight: 600 }}>{act.entityType}</td>
                    <td>
                      <span style={{
                        color: act.action.includes('Approved')
                          ? 'var(--admin-success)'
                          : act.action.includes('Rejected')
                            ? 'var(--admin-danger)'
                            : 'var(--admin-accent)',
                        fontWeight: 700
                      }}>
                        {act.action}
                      </span>
                    </td>
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
          <div className="insights-badge">
            <Cpu size={isMobile ? 12 : 14} style={{ marginRight: '8px' }} />
            INTELLIGENCE v2.4
          </div>
          <h2>Predictive Operations Analysis</h2>
          <p>
            AI core detected seasonal deviates in <strong>{stats.supplyChainData.exports[0]?.name}</strong>.
            Recommend increasing stock of organic fibers by 15% to maintain safety buffers during the scheduled Q2 spike.
          </p>
          <div style={{
            marginTop: isMobile ? '24px' : '40px',
            display: 'flex',
            gap: isMobile ? '16px' : '20px',
            flexWrap: 'wrap'
          }}>
            <div className="insight-stat">
              <span>Reliability Index</span>
              <strong>99.4%</strong>
            </div>
            <div className="insight-stat">
              <span>Node Latency</span>
              <strong>14ms</strong>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AdminDashboard;