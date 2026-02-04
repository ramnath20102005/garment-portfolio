import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    TrendingUp,
    AlertTriangle,
    Clock,
    Globe,
    ExternalLink,
    Info
} from 'lucide-react';
import './admin_css/Insights.css';

const InsightCard = ({ title, subtitle, icon: Icon, children }) => (
    <section className="insights-section">
        <div className="section-info">
            <h2><Icon size={24} /> {title}</h2>
            <p>{subtitle}</p>
        </div>
        <div className="insights-list">
            {children}
        </div>
    </section>
);

const RiskItem = ({ title, description, risk, to }) => (
    <Link to={to} className="insight-item">
        <div className="item-main">
            <div className="item-title">{title}</div>
            <div className="item-desc">{description}</div>
        </div>
        <span className={`risk-badge risk-${risk.toLowerCase()}`}>
            {risk} Risk
        </span>
    </Link>
);

const AnomalyItem = ({ title, description, count, to }) => (
    <Link to={to} className="insight-item">
        <div className="item-main">
            <div className="item-title">{title}</div>
            <div className="item-desc">{description}</div>
        </div>
        <span className="anomaly-count">
            {count} Records
        </span>
    </Link>
);

const Insights = ({
    paymentData = [
        { id: 1, title: "Euro-zone Collections", description: "Delayed payment observed in 15% of recent shipments to France.", risk: "Medium", to: "/admin/invoices?region=EU" },
        { id: 2, title: "North American Bulk Orders", description: "High consistency in payment cycles. Predicted on-time arrival.", risk: "Low", to: "/admin/invoices?region=NA" },
        { id: 3, title: "Domestic Apparel Chains", description: "Recent liquidity alerts in target sector. Monitor closely.", risk: "High", to: "/admin/invoices?category=chain" }
    ],
    anomalyData = [
        { id: 1, title: "Freight Cost Deviation", description: "3 shipments showed costs 40% above historical average for Tirupur-Le Havre route.", count: 3, to: "/admin/exports?filter=high-freight" },
        { id: 2, title: "Documentation Lag", description: "Unexpected delay in Bill of Lading processing for Sahinler contracts.", count: 5, to: "/admin/approvals?filter=docs" },
        { id: 3, title: "Unusual Export Volume", description: "Sudden spike in T-shirt exports beyond seasonal forecast for Q1.", count: 2, to: "/admin/exports?filter=spike" }
    ]
}) => {
    return (
        <div className="insights-page">
            <header className="insights-header">
                <h1>Operational Insights</h1>
                <p className="subtitle">Decision support data derived from historical export patterns and market behavior.</p>
            </header>

            <div className="insights-content">
                {/* Section 1: Payment Delay Prediction */}
                <InsightCard
                    title="Payment Delay Prediction"
                    subtitle="Invoices with higher risk of delayed payment based on buyer history, regional patterns, and seasonal cycles."
                    icon={Clock}
                >
                    {paymentData.map(item => (
                        <RiskItem
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            risk={item.risk}
                            to={item.to}
                        />
                    ))}
                </InsightCard>

                {/* Section 2: Anomaly Detection */}
                <InsightCard
                    title="Anomaly Detection"
                    subtitle="Recent records exhibiting statistically significant deviations from historical baselines."
                    icon={AlertTriangle}
                >
                    {anomalyData.map(item => (
                        <AnomalyItem
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            count={item.count}
                            to={item.to}
                        />
                    ))}
                </InsightCard>
            </div>
        </div>
    );
};

export default Insights;
