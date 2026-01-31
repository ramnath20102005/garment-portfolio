import OperationalManager from "../OperationalManager";

const WorkforceManagement = () => {
    const fields = [
        { name: "department", label: "Department", placeholder: "e.g. Cutting", required: true },
        { name: "totalWorkers", label: "Total Workers", type: "number", required: true },
        { name: "skillCategory", label: "Skill Category", placeholder: "e.g. Skilled / Semi-Skilled", required: true },
        { name: "employmentType", label: "Employment Type", type: "select", options: ["Permanent", "Contract"], defaultValue: "Permanent", required: true },
        { name: "year", label: "Year", type: "number", defaultValue: 2026, required: true },
    ];

    return <OperationalManager domain="workforce" title="Workforce Data" fields={fields} />;
};

export default WorkforceManagement;
