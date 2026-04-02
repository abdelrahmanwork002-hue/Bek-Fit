# Software Requirements Specification (SRS) - Bek Fit Platform v1.0

## 1. System-Level Overview

The Bek Fit Platform is an outcome-driven health and fitness ecosystem designed specifically for professionals aged 25–40. The system leverages AI-driven movement protocols to address posture-related pain, strength deficits, and general wellness. It consists of a high-performance **Client Mobile Web Interface** and a comprehensive **Admin Command Dashboard**.

### Core Epics
| ID | Epic Name | Description |
| :--- | :--- | :--- |
| **EPIC 0** | **Authentication & Identity** | Secure access control and session management for both clients and administrators. |
| **EPIC 1** | **Client Onboarding & Intake** | A goal-driven dynamic flow to collect biological markers, pain maps, and health history. |
| **EPIC 2** | **Protocol Execution (Training & Nutrition)** | The primary user interface for viewing and tracking daily movement and nutrition routines. |
| **EPIC 3** | **Admin: User & Program Oversight** | Centralized management of users, payment verification, and plan auditing. |
| **EPIC 4** | **Admin: AI & Content Management** | Configuration of AI agents, exercise libraries, blog content, and onboarding flows. |
| **EPIC 5** | **Reporting & Analytics** | Data-driven insights into platform performance, user retention, and plan effectiveness. |

---

## 2. EPIC 1: Client Onboarding & Intake (User Stories)

### Story 1.1: Goal-Driven Onboarding Selection
**As a new user, I want to select my primary goal so that the system can tailor my journey.**

#### **Acceptance Criteria**

**1. Business Validation & Roles**
- **Roles**: Anonymous (New User).
- **Rules**: A user MUST select exactly one primary goal to proceed.
- **Validation**: Goal data must be fetched from the `goals` table in the backend.

**2. UI/UX Specifications**
- **List View**: A grid of goal cards with high-contrast icons and clear descriptions.
- **Item Details**: Hover/tap effect showing a brief "What to expect" for each goal.
- **Fields**:
  - `goal_id`: (Mandatory) Internal identifier.
  - `user_notes`: (Optional) Text field for additional context.

**3. User Journey / Scenario Flow**
- **Flow**: Welcome Screen -> Goal Selection -> Dynamic Questionnaire based on selection.
- **Scenario**: User selects "Pain Relief" -> System triggers the Body Map and Red-Flag screening.

**4. Edge Cases & Errors**
- **Network Error**: If goals fail to load, show a "Reconnect" button with a graceful fallback.
- **No Selection**: The "Continue" button remains disabled until a selection is made.

**5. GWT (Given-When-Then)**
- **Given**: The user is on the first onboarding screen.
- **When**: They select "Posture Correction" and click "Next."
- **Then**: The system stores the selection and navigates to the mobility assessment.

---

### Story 1.2: Interactive Pain & Body Map
**As a user with a pain-related goal, I want to tap a body diagram to highlight my focus areas.**

#### **Acceptance Criteria**

**1. Business Validation & Roles**
- **Roles**: Authenticated User (Onboarding state).
- **Validation**: At least one area must be selected if the goal is "Pain Relief."

**2. UI/UX Specifications**
- **View Details**: An anatomical SVG/Image model (Front/Back) with interactive hit-zones.
- **Interactive**: Minimum 44x44px tap targets for mobile accessibility.
- **Visuals**: Selected areas change color to red/highlighted state.

**3. User Journey / Scenario Flow**
- **Scenario**: User taps "Lower Back" and "Neck." Selections are updated in real-time.
- **Persistence**: Selections must survive a "Back" button click without reset.

**4. Edge Cases & Errors**
- **Multiple Areas**: Support for up to 5 concurrent pain areas.
- **Reset**: A "Clear All" button must be available.

---

## 3. EPIC 3: Admin User & Program Oversight (User Stories)

### Story 3.1: Centralized User Directory
**As an administrator, I want to search and filter the entire user base by their operational status.**

#### **Acceptance Criteria**

**1. Business Validation & Roles**
- **Roles**: Super Admin, Coach.
- **Rules**: Access allowed only with active admin session token.

**2. UI/UX Specifications (List View)**
- **Columns**: Identity Signature (Name/Email), Strategic Goal, Onboarding Status, Deployment (Plan Status), Credit (Payment), Last Interaction.
- **Visuals**: Use premium dark-mode tokens (`bg-card`, `text-primary`). Pulse animations for active plans.
- **Search**: Real-time filtering by name or email.

**3. User Journey / Scenario Flow**
- **Flow**: Admin logs in -> Clicks "Users" tab -> Filters by "Pending Credits" -> Opens a specific Dossier.

**4. Edge Cases & Errors**
- **No Results**: Show "No matching identities found in current segment."
- **Supabase Timeout**: Display a "Synchronization Error" alert with a refresh trigger.

**5. GWT (Given-When-Then)**
- **Given**: I am on the User Management tab.
- **When**: I type "John" in the search bar.
- **Then**: Only user records containing "John" in name or email are displayed.

---

### Story 3.2: Manual Payment Protocol Verification
**As an admin, I want to validate user payments or suspend access based on financial verification.**

#### **Acceptance Criteria**

**1. Business Validation & Roles**
- **Roles**: Super Admin, Finance Manager.
- **Validation**: Toggling payment must update the `payments` and `users` tables concurrently.

**2. UI/UX Specifications (Item View - Dossier)**
- **View Details**: A "Financial Protocols" section within the User Dossier.
- **Actions**: "Validate Payment" (Primary Action), "Suspend Access" (Destructive Action).
- **Status Indicators**: `active` (Green highlight), `pending` (Yellow glow), `expired` (Red muted).

**3. User Journey / Scenario Flow**
- **Scenario**: Admin clicks "Validate Payment" -> System updates Supabase -> Success Toast appears -> Button becomes disabled/marked "Verified."

**4. Edge Cases & Errors**
- **Duplicate Action**: Prevent rapid double-clicking via loading states.

**5. GWT (Given-When-Then)**
- **Given**: A user has a 'pending' payment status.
- **When**: I click "Validate Payment" in their Dossier.
- **Then**: Their status changes to 'active' and a success notification is triggered.

---

## 4. EPIC 5: Reporting & Analytics

### Story 5.1: Performance Analytics Dashboard
**As an admin, I want to view platform growth and user engagement metrics in a high-fidelity visual format.**

#### **Acceptance Criteria**

**1. Business Validation & Roles**
- **Roles**: Super Admin, Product Manager.

**2. UI/UX Specifications**
- **Layout**: Grid-based dashboard with:
  - **Key Performance Indicators (KPIs)**: Total Personnel, Active Plans, Completion Rate, Retention.
  - **Growth Trajectory**: A gradient bar chart showing month-over-month growth.
  - **Distribution**: Progress bars for anatomical goal distribution.
- **Aesthetics**: Premium dark-themed charts with hover tooltips for raw data.

**3. User Journey / Scenario Flow**
- **Flow**: Admin navigates to "Analytics" -> Views current month stats -> Hovers over chart bars to see specific user counts.

**4. GWT (Given-When-Then)**
- **Given**: I am on the Analytics tab.
- **When**: I view the "Operational Performance Indicators."
- **Then**: I see summarized data points fetched from the platform's execution logs.

---

## 5. Non-Functional Requirements (Hybrid Rules)

| Area | Rule / Specification |
| :--- | :--- |
| **Performance** | Dashboard tabs must load in < 500ms under standard network conditions. |
| **Security** | All administrative endpoints require valid Supabase JWT with `role=admin`. |
| **Responsiveness** | Client UI must be 100% functional on mobile viewports (minimum 320px width). |
| **Accessibility** | All interactive elements must maintain a 4.5:1 color contrast ratio. |
| **Logging** | Every administrative action must be recorded in the `admin_logs` table for audit. |
| **Errors** | Global "Toaster" system must provide actionable feedback for every async operation. |

---

## 6. Edge Case & Error Standards

1.  **Session Expiry**: When an admin session expires, the system must force-redirect to `/admin/login` and clear all sensitive local storage.
2.  **Concurrency**: If two admins attempt to approve the same plan, the first operation succeeds and the second receives a "Module already processed" conflict warning.
3.  **Data Integrity**: Deleting an exercise that is part of an active plan must be blocked with a "Dependency Error" listing the affected users.

---
**Document Status**: *Draft v1.0*
**Prepared By**: *Systems Analyst Lead*
**Reference**: [Implementation Status v1.1](file:///d:/Development%20Projects/Bek%20Fit%20V1.0/Requirements.md#Implementation-Status)
