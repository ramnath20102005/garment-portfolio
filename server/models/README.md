# Data Models Documentation

This directory contains the Mongoose schemas defining the data structure for the V R Fashions application. The system uses MongoDB as its primary data store.

## Core System Models

| Model | Description | Key Fields |
|-------|-------------|------------|
| **User** | Authentication & Role Management | `username`, `password` (hashed), `role` (ADMIN/MANAGER) |
| **Activity** | Audit Logging | `userId`, `action`, `entityType`, `entityId`, `details` |
| **Company** | Corporate Profile | `name`, `description`, `establishedYear`, `location` |

## Approval Workflow Models

The application implements a strict Manager-to-Admin approval workflow.

| Model | Description | Key Fields |
|-------|-------------|------------|
| **Submission** | Temporary holding for verification | `managerId`, `entityType`, `entityId`, `dataSnapshot`, `status` |
| **Approval** | Admin decision records | `submissionId`, `adminId`, `action` (Approved/Rejected), `comments` |

## Operational Models

All operational models share a standard set of fields to support the approval workflow:
- `managerId`: Reference to the Manager who owns the record.
- `submissionStatus`: Tracks the lifecycle (`Draft` -> `PendingApproval` -> `Approved` / `Rejected`).
- `verificationMetadata`: Stores admin sign-off details (`verifiedBy`, `verifiedAt`, `rejectionReason`).

### 1. Workforce & Human Resources
- **Employee**: Employee details, department, role, assigned projects.
- **Workforce**: Aggregated workforce metrics (e.g., total count per department).

### 2. Project Management
- **Project**: Project tracking, department, timeline (`startDate`, `endDate`), status.
- **OperationalReport**: Monthly/Quarterly performance reports, team size, task completion rates.

### 3. Supply Chain & Operations
- **RawMaterial**: Material inventory, sourcing info, stock levels.
- **Export**: Export shipment logs, destination, value.
- **Buyer**: Buyer/Client profiles, contact info, status.

### 4. Financial & Content
- **Financial**: Financial records, revenue/expense tracking.
- **Media**: Digital assets, images, video links.
- **Update**: News announcements and internal updates.
- **Product**: Product catalog items (legacy/simple model).

## Entity Type Enum
The `Submission` model supports the following `entityType` values:
`['Employee', 'Project', 'OperationalReport', 'Export', 'RawMaterial', 'Workforce', 'Buyer', 'Financial', 'Media', 'Update', 'Company']`

## Usage Guidelines
1. **Migrations**: There is no built-in migration tool; schema changes must be handled carefully.
2. **Validation**: Mongoose validation is used for required fields and enums.
3. **Indexing**: Unique indexes are applied to `username`, `email`, and IDs where appropriate.
