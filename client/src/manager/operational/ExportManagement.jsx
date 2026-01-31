import OperationalManager from "../OperationalManager";

const ExportManagement = () => {
    const fields = [
        { name: "region", label: "Region", placeholder: "e.g. EU, NA, ASIA", required: true },
        { name: "country", label: "Country", placeholder: "e.g. Germany", required: true },
        { name: "category", label: "Category", placeholder: "e.g. Knitwear", required: true },
        { name: "volume", label: "Volume (pcs)", type: "number", required: true },
        { name: "value", label: "Value (USD)", type: "number" },
        { name: "year", label: "Year", type: "number", defaultValue: 2026, required: true },
    ];

    return <OperationalManager domain="exports" title="Exports Data" fields={fields} />;
};

export default ExportManagement;
