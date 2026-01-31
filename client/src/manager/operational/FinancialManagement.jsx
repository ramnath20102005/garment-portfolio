import OperationalManager from "../OperationalManager";

const FinancialManagement = () => {
    const fields = [
        { name: "revenueRange", label: "Revenue Range", placeholder: "e.g. $1M - $2M", required: true },
        { name: "profitRange", label: "Profit Range", placeholder: "e.g. $200k - $300k", required: true },
        { name: "growthIndicator", label: "Growth Indicator (%)", type: "number" },
        { name: "year", label: "Year", type: "number", defaultValue: 2026, required: true },
    ];

    return <OperationalManager domain="financials" title="Financial Indicators" fields={fields} />;
};

export default FinancialManagement;
