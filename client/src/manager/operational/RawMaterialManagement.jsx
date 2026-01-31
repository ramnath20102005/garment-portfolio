import OperationalManager from "../OperationalManager";

const RawMaterialManagement = () => {
    const fields = [
        { name: "materialType", label: "Material Type", placeholder: "e.g. Organic Cotton", required: true },
        { name: "source", label: "Source Location", placeholder: "e.g. Egypt", required: true },
        { name: "supplier", label: "Supplier Name", required: true },
        { name: "quantity", label: "Quantity", type: "number", required: true },
        { name: "unit", label: "Unit", defaultValue: "kg" },
        { name: "costRange", label: "Cost Range", placeholder: "e.g. $10 - $15 / kg", required: true },
        { name: "year", label: "Year", type: "number", defaultValue: 2026, required: true },
    ];

    return <OperationalManager domain="raw-materials" title="Raw Materials Data" fields={fields} />;
};

export default RawMaterialManagement;
