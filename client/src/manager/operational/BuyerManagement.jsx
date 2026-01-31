import OperationalManager from "../OperationalManager";

const BuyerManagement = () => {
    const fields = [
        { name: "name", label: "Buyer Name", required: true },
        { name: "region", label: "Region", required: true },
        { name: "industry", label: "Industry Type", placeholder: "e.g. High-Street Fashion", required: true },
        { name: "relationshipDuration", label: "Relationship Duration", placeholder: "e.g. 5 Years" },
        { name: "orderFrequency", label: "Order Frequency", type: "select", options: ["Low", "Medium", "High"], defaultValue: "Medium", required: true },
    ];

    return <OperationalManager domain="buyers" title="Buyer / Client Data" fields={fields} />;
};

export default BuyerManagement;
