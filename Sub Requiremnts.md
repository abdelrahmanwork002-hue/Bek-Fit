1. Agent Creation & Configuration
As an admin, I want to create a new AI agent so that I can define a specific purpose or use case.
## User Story Name
**Agent Creation – Define New AI Agent**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can create a new AI agent).
- **Business validation rules:**
  - An agent’s name must be unique across the system (case‑insensitive).
  - An agent must have at least one **role** assigned (from the existing role catalog).
  - An agent must have exactly one **AI provider** selected (must be active and properly configured).
  - If the selected provider requires an API key, the system must verify that a valid, non‑expired key exists before allowing creation.
  - The combination `(name, purpose)` is logged for audit, but `purpose` is free text (not unique).

### 2. List View, Item View, Create Fields

#### List View (entry point for creation)
- From the **Agent Management** list view, an `Admin` sees a **“Create New Agent”** button.
- The list view displays all existing agents (name, role, provider, status) – but the detailed list view is covered by another US. Only the existence of the create action is required here.

#### Create View – Fields

| Field | Mandatory | Type / Validation |
|-------|-----------|-------------------|
| Agent Name | Yes | Text, max 100 chars, unique, no leading/trailing spaces |
| Description | No | Text, max 500 chars |
| Purpose / Use Case | Yes | Text, max 200 chars (e.g., “Customer support for refunds”) |
| Assigned Role | Yes | Dropdown (from existing roles) – single selection |
| AI Provider | Yes | Dropdown (only active providers) – single selection |
| System Prompt (initial) | No | Text area, max 5000 chars (can be left empty and defined later) |
| Response Parameters | No | Group: Temperature (0.0–1.0, default 0.7), Max tokens (1–4096, default 1024) |
| Status | Auto‑set | `Draft` (new agents are always created in `Draft` state) |

### 3. User Journey / Scenario
**Scenario:** Admin creates a new AI agent for handling product return queries.

1. Admin logs in and navigates to **Agent Management** → **Agents** list.
2. Clicks **“Create New Agent”**.
3. Fills in:
   - Agent Name: `ReturnAgent_v1`
   - Purpose: `Handle customer return requests and refund eligibility`
   - Assigned Role: `Returns Specialist`
   - AI Provider: `OpenAI GPT-4`
   - System Prompt: `You are a helpful returns assistant...`
   - Temperature: `0.3`, Max tokens: `512`
4. Clicks **“Save & Create”**.
5. System validates all mandatory fields, uniqueness, and provider availability.
6. On success: Agent is saved with status `Draft`. Admin sees a success message and is redirected to the agent’s **Item View** (read‑only summary + edit option).

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Duplicate agent name | Display error: “Agent name already exists. Please choose a unique name.” Prevent save. |
| No role selected | Show validation: “At least one role must be assigned.” |
| Selected provider is inactive or missing API key | Show error: “Provider ‘X’ is not ready. Please configure a valid API key or choose another provider.” |
| Required fields missing | Highlight missing fields, show “Mandatory fields cannot be empty.” |
| Special characters or excessive length in name/purpose | Trim spaces, enforce length limits; show inline validation. |
| Concurrent creation of same name by two admins | Use database unique constraint – second save fails with duplicate error. |
| Creation fails due to network / DB error | Rollback, show generic “Creation failed. Please try again.” Log full error for support. |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Create a new AI agent
  As an Admin
  I want to create a new AI agent
  so that I can define a specific purpose or use case

  Background:
    Given the system has a role "Returns Specialist"
    And the system has an active provider "OpenAI GPT-4" with a valid API key

  Scenario: Successfully create a new agent
    Given I am logged in as an Admin
    And I am on the Agent Management list view
    When I click "Create New Agent"
    And I fill in the name "ReturnAgent_v1"
    And I select purpose "Handle customer return requests"
    And I assign role "Returns Specialist"
    And I choose provider "OpenAI GPT-4"
    And I enter a system prompt "You are a helpful returns assistant"
    And I click "Save & Create"
    Then the agent should be saved with status "Draft"
    And I should see a success message "Agent 'ReturnAgent_v1' created"
    And I should be redirected to the agent's item view

  Scenario: Attempt to create with duplicate name
    Given an agent named "ReturnAgent_v1" already exists
    When I try to create a new agent with the same name
    Then I should see an error "Agent name already exists"
    And the agent should not be created
```

### 6. Example (Illustrative)

**Input:**
- Agent Name: `HR_PolicyBot`
- Description: `Answers employee questions about leave policy`
- Purpose: `HR policy Q&A`
- Assigned Role: `HR Assistant`
- AI Provider: `Anthropic Claude 3`
- System Prompt: `You answer only based on uploaded HR documents.`
- Response Parameters: Temp `0.2`, Max tokens `400`

**Output after creation:**
- Agent ID: `agt_123`
- Status: `Draft`
- Created At: `2026-04-02T10:00:00Z`
- Created By: `admin@example.com`
- The agent is immediately available for **testing** (simulation) but not yet for production use.

As an admin, I want to edit existing AI agents so that I can update their behavior or configuration.
## User Story Name
**Agent Editing – Modify Existing Agent Configuration**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can edit an AI agent).
- **Business validation rules:**
  - An agent’s name must remain unique across the system, excluding the agent itself (self‑update allowed).
  - The `status` field cannot be edited directly; it changes only via lifecycle actions (activate, deactivate, archive) – covered by another US.
  - If the agent is currently **active** (in production) and an admin tries to modify critical fields (provider, role, system prompt), the system must require an **explicit confirmation** about potential runtime impact.
  - The `agent ID`, `created by`, `created date` are **read‑only**.
  - Editing must preserve **version history** (a new draft version is created if the agent is active; otherwise, in‑place update is allowed) – but versioning is another US; for this AC, simply logging the change is mandatory, and the system must record `last_modified_by` and `last_modified_date`.

### 2. List View, Item View, Edit Fields

#### List View (entry point)
- From the **Agent Management** list view, each agent row has an **“Edit”** icon/button (visible only to `Admin`).
- Clicking “Edit” opens the **Edit Agent** screen (pre‑filled with current values).

#### Item View (read‑only summary)
- When an admin clicks on an agent name from the list, the **Item View** displays all agent details in read‑only mode, with an **“Edit”** button at the top.

#### Edit View – Fields (Mandatory / Optional)

| Field | Mandatory in Edit? | Editable? | Notes |
|-------|--------------------|-----------|-------|
| Agent Name | Yes | Yes | Must be unique (except self) |
| Description | No | Yes | Free text |
| Purpose / Use Case | Yes | Yes | Can be refined |
| Assigned Role | Yes | Yes | Dropdown – must be an existing role |
| AI Provider | Yes | Yes | Dropdown – only active providers |
| System Prompt | No | Yes | Text area |
| Response Parameters (Temperature, Max tokens) | No (group has defaults) | Yes | Both fields editable independently |
| Status | N/A | **No** | Read‑only (display only) |
| Agent ID | N/A | **No** | Read‑only |
| Created By / Created Date | N/A | **No** | Read‑only |

### 3. User Journey / Scenario
**Scenario:** Admin updates an existing `ReturnAgent_v1` from `Draft` to adjust its temperature and role.

1. Admin logs in and navigates to **Agent Management** → **Agents** list.
2. Finds `ReturnAgent_v1` (status = `Draft`) and clicks the **Edit** icon.
3. Changes:
   - Assigned Role: from `Returns Specialist` to `Senior Returns Specialist`
   - Temperature: from `0.3` to `0.5`
   - System Prompt: adds “Always apologize first for any inconvenience.”
4. Clicks **“Save Changes”**.
5. System validates: name unchanged (so no uniqueness conflict), role exists, provider active.
6. On success: Agent is updated in place (since `Draft`). Admin sees “Agent updated successfully” and is redirected to the Item View with refreshed data.
7. `last_modified_by` and `last_modified_date` are recorded.

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Changing agent name to an existing different agent’s name | Show error: “Agent name ‘X’ is already used by another agent. Please choose a different name.” Prevent save. |
| Editing an agent that was deleted by another admin concurrently | Display: “This agent no longer exists. Please refresh the list.” |
| Removing the only assigned role | Prevent save with error: “Agent must have at least one role assigned.” |
| Changing provider to one that is inactive or missing API key | Show warning: “Provider ‘Y’ is not ready. Either configure its API key or choose another provider.” Block save unless a valid provider is selected. |
| Leaving mandatory fields empty (name, purpose, role, provider) | Highlight missing fields, show “Mandatory fields cannot be empty.” |
| Editing an **active** agent’s system prompt or provider | Show confirmation dialog: “This agent is live. Changing its provider/prompt may affect ongoing conversations. Do you want to proceed?” with “Confirm” / “Cancel”. After confirmation, save normally. |
| User tries to edit without `Admin` role | 403 error, “Access denied. Only admins can edit agents.” |
| Network failure during save | Show “Update failed. Please try again.” Preserve form data locally (client-side cache) to avoid re‑typing. |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Edit an existing AI agent
  As an Admin
  I want to edit an existing AI agent
  so that I can update its behavior or configuration

  Background:
    Given an agent named "ReturnAgent_v1" exists with status "Draft"
    And the agent has role "Returns Specialist" and provider "OpenAI GPT-4"

  Scenario: Successfully edit a draft agent
    Given I am logged in as an Admin
    And I am on the Agent Management list view
    When I click "Edit" for "ReturnAgent_v1"
    And I change the Assigned Role to "Senior Returns Specialist"
    And I change Temperature to "0.5"
    And I click "Save Changes"
    Then the agent should be updated with the new role and temperature
    And I should see a success message "Agent updated successfully"
    And the "last_modified_by" should be my username

  Scenario: Attempt to rename to an existing agent's name
    Given another agent "HR_PolicyBot" exists
    When I edit "ReturnAgent_v1"
    And I change the name to "HR_PolicyBot"
    And I click "Save Changes"
    Then I should see an error "Agent name 'HR_PolicyBot' is already used by another agent"
    And the agent name should remain unchanged

  Scenario: Edit an active agent with critical changes
    Given an agent "LiveSupportBot" with status "Active"
    When I edit "LiveSupportBot"
    And I change the System Prompt
    And I click "Save Changes"
    Then a confirmation dialog appears: "This agent is live. Changing its provider/prompt may affect ongoing conversations. Do you want to proceed?"
    When I click "Confirm"
    Then the changes are saved
```

### 6. Example

**Before edit:**
- Agent Name: `ReturnAgent_v1`
- Role: `Returns Specialist`
- Provider: `OpenAI GPT-4`
- System Prompt: `You are a returns assistant.`
- Temperature: `0.3`

**After edit (admin makes changes):**
- Agent Name: `ReturnAgent_v2` (name changed to reflect version)
- Role: `Returns & Refunds Specialist` (role updated)
- Provider: `Anthropic Claude 3` (provider switched)
- System Prompt: `You are a returns and refunds expert. Always verify order ID first.`
- Temperature: `0.2`
- Last modified: `2026-04-02 14:30:00` by `admin@example.com`
- Status remains `Draft` (unchanged)

As an admin, I want to delete or deactivate agents so that unused agents do not affect the system.
## User Story Name
**Agent Removal & Deactivation – Remove or Disable Unused Agents**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can delete or deactivate an AI agent).
- **Business validation rules:**
  - **Deactivate** – Changes agent `status` from `Active` → `Inactive`. Inactive agents:
    - Are not invoked by any orchestration or end‑user facing workflow.
    - Remain visible in the agent list (with filter option to show/hide inactive).
    - Can be **reactivated** (covered by another US – lifecycle management).
  - **Delete** – Permanently removes the agent from the system **only if**:
    - Agent status is `Inactive` or `Draft` (never active, or already deactivated).
    - Agent has **no pending or in‑flight interactions** (no unresolved conversation threads or scheduled jobs referencing it).
    - Agent is **not referenced** as a fallback or dependency by any active workflow/orchestration.
  - **Soft delete** is not required; actual deletion is irreversible but protected by the above rules.
  - Deletion must be logged in audit trail (who, when, which agent).
  - Deactivation does **not** delete any historical logs or analytics data – those remain for reporting.

### 2. List View, Item View, Action Fields

#### List View (actions per agent)
- Each agent row in the list view has:
  - **Deactivate** button (visible only if `status = Active`)
  - **Activate** button (visible only if `status = Inactive`) – activation is part of another US; for this US, only deactivation is required, but UI may show both.
  - **Delete** button (visible only if `status = Draft` or `Inactive`)
- **Bulk actions** (select multiple) → “Deactivate selected” or “Delete selected” – with appropriate confirmation and validation per agent.

#### Item View (detailed view)
- At the bottom of the item view, action buttons:
  - **Deactivate Agent** (if `Active`)
  - **Delete Agent** (if `Draft` or `Inactive`)
- After deactivation, the item view shows `status: Inactive` and buttons change (Activate appears, Delete becomes available).

#### No “create fields” – this US is about removal/deactivation only.

### 3. User Journey / Scenario
**Scenario 1 (Deactivate an active agent)**
1. Admin navigates to agent list, finds `LiveSupportBot` (status `Active`).
2. Clicks **“Deactivate”** button.
3. System shows confirmation: *“Agent ‘LiveSupportBot’ is currently active. Deactivating will stop all new requests. Existing conversations may continue. Confirm?”*
4. Admin clicks **Confirm**.
5. Agent status changes to `Inactive`. List view updates. Admin sees success toast: *“Agent deactivated.”*

**Scenario 2 (Delete a draft agent)**
1. Admin finds `TestAgent_v3` (status `Draft`) in list.
2. Clicks **“Delete”**.
3. System checks dependencies – none found. Shows confirmation: *“Permanently delete ‘TestAgent_v3’? This cannot be undone.”*
4. Admin confirms.
5. Agent removed from database. List refreshes. Audit log entry created.

**Scenario 3 (Attempt to delete an active agent)**
1. Admin tries to delete `LiveSupportBot` while status = `Active`.
2. Delete button is disabled/greyed out. Tooltip: *“Deactivate before deleting.”*

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Attempt to delete an `Active` agent | Delete button hidden or disabled. If attempted via API, return 400: “Cannot delete active agent. Deactivate first.” |
| Attempt to delete an agent with active references (orchestration, fallback, knowledge base dependency) | Show error: “Agent is referenced by [workflow name / fallback config]. Remove references before deletion.” Block deletion. |
| Concurrent deletion – two admins try to delete same agent | First succeeds, second receives “Agent already deleted.” |
| Deactivation of an agent that is currently processing a long‑running request | System allows deactivation, but marks agent as `Inactive` for new requests. In‑flight requests complete normally. Log a warning. |
| Delete an agent that has historical logs/analytics | Do not delete logs – foreign key set to `NULL` or mark agent as `[deleted]` in logs. Show warning: “Analytics data will be retained but anonymized.” |
| User without Admin role tries to deactivate/delete | 403 error, button not rendered. |
| Network failure during delete | Rollback transaction, show “Delete failed. Please try again.” |
| Bulk delete includes an agent that cannot be deleted (active or referenced) | System skips that agent, deletes only eligible ones, shows summary: “Deleted 3 of 5 agents. 2 skipped (active or referenced).” |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Delete or deactivate AI agents
  As an Admin
  I want to delete or deactivate agents
  so that unused agents do not affect the system

  Background:
    Given I am logged in as an Admin
    And an agent "LiveSupportBot" exists with status "Active"
    And an agent "TestAgent" exists with status "Draft"

  Scenario: Deactivate an active agent
    When I navigate to the agent list
    And I click "Deactivate" for "LiveSupportBot"
    And I confirm the deactivation dialog
    Then the status of "LiveSupportBot" becomes "Inactive"
    And the agent is not invoked in any new requests
    And I see a success message "Agent deactivated"

  Scenario: Delete a draft agent successfully
    When I click "Delete" for "TestAgent"
    And I confirm permanent deletion
    Then "TestAgent" is removed from the list
    And an audit log entry is created with my username and timestamp

  Scenario: Prevent deletion of an active agent
    When I view the actions for "LiveSupportBot"
    Then the "Delete" button is disabled (or not visible)
    And a tooltip says "Deactivate before deleting"

  Scenario: Block deletion due to workflow reference
    Given "TestAgent" is referenced as fallback in workflow "SupportFlow"
    When I try to delete "TestAgent"
    Then I see an error "Agent is referenced by workflow 'SupportFlow'"
    And the agent remains in the system
```

### 6. Example

**Deactivation example:**
- Before: `RefundBot` – status `Active`, handling 5 requests/minute.
- Admin deactivates.
- After: status `Inactive`. New requests are routed to fallback or rejected. Existing sessions finish. List view shows greyed‑out row or badge “Inactive”.

**Delete example:**
- Before: `OldTestAgent` – status `Draft`, created 3 months ago, no references.
- Admin deletes.
- After: Agent gone from database. Audit log: `{"action":"delete","agent_id":"agt_999","agent_name":"OldTestAgent","deleted_by":"admin@example.com","timestamp":"2026-04-02T15:00:00Z"}`

As an admin, I want to view a list of all agents so that I can manage them efficiently.
## User Story Name
**Agent List View – Browse and Filter All Agents**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Roles:**
  - `Admin` – full access to list view, including all agents, statuses, and action buttons (Edit, Deactivate, Delete, etc.).
  - `User` (non‑admin) – can only see agents that are **explicitly permitted** via access control (covered by Access Control US). For this US, the list view must respect permissions: non‑admins see a filtered subset.
- **Business rules:**
  - The list view must load efficiently even with **1000+ agents** (pagination or virtual scrolling required).
  - Agents with status `Deleted` (hard deleted) are **never** shown. Only `Draft`, `Active`, `Inactive` are visible.
  - The list must reflect **real‑time** updates (no manual refresh needed for changes made by other admins – polling or WebSocket is acceptable, but eventual consistency within 5 seconds is fine for MVP).
  - Each row must provide quick access to common actions without entering item view (e.g., inline Deactivate/Activate icon) – but detailed action behavior is covered by other US; here only the presence of action shortcuts is required.

### 2. List View, Item View, Create Fields

#### List View – Components

| Component | Description |
|-----------|-------------|
| **Search bar** | Free‑text search across `Agent Name`, `Purpose`, `Description`. Debounced (300ms). |
| **Filters** | Dropdowns / multi‑select for: `Status` (Draft, Active, Inactive), `Role` (any existing role), `AI Provider` (any active provider). Clear filters button. |
| **Sorting** | Sort by: `Name` (A‑Z / Z‑A), `Status`, `Last Modified Date` (newest first default), `Created Date`. |
| **Columns** | Name, Status (badge), Assigned Role, AI Provider, Last Modified, Actions (icons). |
| **Pagination** | Default 25 rows per page, options: 25, 50, 100. Show total count (e.g., “Showing 1–25 of 342 agents”). |
| **Bulk selection** | Checkbox per row + “Select all on page”. Bulk actions: “Deactivate”, “Activate”, “Delete” (permissions respected). Bulk action results show summary toast. |
| **Export** (optional but recommended) | Button to export filtered list as CSV (max 10,000 rows). |

#### Item View
- Clicking on an agent **name** in the list navigates to the **Item View** (detailed read‑only view with Edit button). This is the same item view from the Edit US – no duplication, just navigation.

#### Create Fields
- **Not applicable** – creation is a separate US. However, the list view contains a **“Create New Agent”** button (already defined in Creation US) that opens the creation form.

### 3. User Journey / Scenario
**Scenario:** Admin wants to find all active agents using a specific provider, then quickly deactivate one.

1. Admin logs in, goes to **Agent Management** → **Agents**.
2. List loads with default sorting: newest last modified first.
3. Admin uses filter: `Status = Active`, `AI Provider = OpenAI GPT-4`.
4. List refreshes to show only 12 agents.
5. Admin scans the list, finds `SalesBot` (status Active).
6. Clicks the **Deactivate** icon in the Actions column.
7. Confirmation dialog appears (covered by Deactivate US). After confirmation, the row updates to status `Inactive` without reloading the whole list.
8. Admin clears filters, sees all agents again.

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| No agents match search/filters | Show empty state: “No agents found. Try adjusting filters or create a new agent.” with link to creation form. |
| Search query with special characters (regex) | Escape properly – treat as literal string. |
| Pagination beyond available pages | Disable “Next” button when on last page. Show “Page not found” if user manually navigates to invalid page – redirect to page 1. |
| Slow loading due to large dataset | Show skeleton loaders (3 rows animated). Implement server‑side pagination (not client‑side). Timeout after 10 seconds – show error “Failed to load agents. Retry?” |
| Concurrent modification while viewing | No locking needed. If an agent status changes after the list loaded, the next refresh (poll every 30 seconds or manual refresh) shows updated data. Provide “Refresh” button. |
| Non‑admin user tries to view agents without permissions | List shows only agents where `user_id` is in allowed list. If none, show “No accessible agents.” |
| Export exceeds 10,000 rows | Warn: “Export limited to 10,000 rows. Please refine filters.” and truncate. |
| Bulk action partially fails (e.g., some agents cannot be deleted) | Show detailed summary: “5 agents deactivated, 2 skipped (active or referenced).” |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: View list of all AI agents
  As an Admin
  I want to view a list of all agents
  so that I can manage them efficiently

  Background:
    Given I am logged in as an Admin
    And there are at least 50 agents with various statuses, roles, and providers

  Scenario: Default list view loads with pagination
    When I navigate to the Agent Management list
    Then I see a table with columns: Name, Status, Role, Provider, Last Modified, Actions
    And the table shows 25 agents per page
    And the agents are sorted by Last Modified Date descending (newest first)
    And I see a pagination control with total count

  Scenario: Filter by status and provider
    When I select filter "Status = Active"
    And I select filter "AI Provider = OpenAI GPT-4"
    Then only active agents using OpenAI GPT-4 are displayed
    And the filter badges are shown above the table

  Scenario: Search by agent name partial match
    When I type "Return" in the search box
    Then only agents with "Return" in Name, Purpose, or Description appear
    And the search term is highlighted in the results (optional)

  Scenario: Sort by name ascending
    When I click the "Name" column header
    Then the list is sorted A-Z by agent name
    And the column header shows an ascending arrow

  Scenario: Empty state when no results
    Given I apply a filter that matches zero agents
    Then I see a message "No agents found. Try adjusting filters or create a new agent."
    And a "Create New Agent" button is visible

  Scenario: Non-admin user sees only permitted agents
    Given I am logged in as a regular User with permission to only 3 agents
    When I navigate to the agent list
    Then I see exactly those 3 agents
    And I do not see Edit/Delete actions (only view)
```

### 6. Example

**List View UI Example (textual representation):**

```
[ Create New Agent ]  [ Export CSV ]

Search: [_________________]  [Clear]

Filters: Status ▼ [Active]  Role ▼ [All]  Provider ▼ [All]

Showing 1–25 of 342 agents

☐ | Name           | Status  | Role                | Provider      | Last Modified       | Actions
☐ | ReturnAgent_v1 | Active  | Returns Specialist  | OpenAI GPT-4  | 2026-04-02 14:30   | [Edit] [Deactivate]
☐ | HR_PolicyBot   | Draft   | HR Assistant        | Claude 3      | 2026-04-01 09:15   | [Edit] [Delete]
☐ | SalesBot       | Inactive| Sales Rep           | OpenAI GPT-4  | 2026-03-30 11:20   | [Edit] [Activate] [Delete]

[Select all on page] [Bulk Deactivate] [Bulk Delete]

< Prev  Page 1 of 14  Next >


2. Role Management
As an admin, I want to assign roles to AI agents so that each agent has a clearly defined responsibility.
## User Story Name
**Role Assignment – Attach Roles to Agents**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can assign or unassign roles to/from agents).
- **Business validation rules:**
  - An agent can have **one or more** roles (many‑to‑many relationship). This extends the previous “single role” assumption in creation – the system must support multiple roles per agent.
  - A role must already exist in the role catalog before it can be assigned.
  - The same role cannot be assigned twice to the same agent (no duplicates).
  - At least **one role** must remain assigned to an agent at all times (an agent cannot have zero roles).
  - Assigning a role does **not** automatically change the agent’s behavior logic – the orchestration layer uses the **set of roles** to determine capabilities (e.g., union of permissions, or role‑based routing). The exact behavioral impact is defined elsewhere; this US only ensures the assignment is recorded.
  - Unassigning a role is allowed only if the agent has at least one other role left (or if the admin assigns a replacement role in the same transaction).

### 2. List View, Item View, Create Fields

#### List View (entry point for role assignment)
- Each agent row may have a **“Manage Roles”** button/icon (or a “Roles” column showing assigned role names as badges, with an edit icon).
- Clicking “Manage Roles” opens a **role assignment modal** for that agent.

#### Item View (detailed)
- Within the agent’s item view, a **“Roles”** section lists all currently assigned roles (badges) with:
  - **“Assign Role”** button (opens role picker)
  - **“Remove”** icon next to each assigned role (except the last one)

#### No “create fields” – this is about assignment, not creation.

#### Role Assignment Modal / Interface
| Component | Description |
|-----------|-------------|
| Available roles list | All existing roles (from role catalog), with checkboxes or multi‑select. Roles already assigned are pre‑checked and disabled? Or shown as selected but can be deselected (subject to minimum one rule). |
| Search/filter | Filter available roles by name/description. |
| Confirm buttons | “Save” (applies changes), “Cancel”. |
| Validation feedback | Show error if trying to remove the last role. |

### 3. User Journey / Scenario
**Scenario:** Admin wants to assign the “Fraud Detector” role to an existing agent `TransactionBot` that already has the “Payment Processor” role.

1. Admin navigates to **Agent Management** → list view.
2. Finds `TransactionBot` and clicks **“Manage Roles”**.
3. Modal opens: assigned roles show `Payment Processor` (checked). Available roles list shows `Fraud Detector`, `Customer Support`, etc.
4. Admin checks `Fraud Detector`.
5. Clicks **Save**.
6. System validates: role exists, no duplicate. Agent now has two roles.
7. Modal closes, success toast: “Roles updated for TransactionBot.”
8. In the agent’s item view, the Roles section now shows both badges.

**Scenario:** Admin tries to remove the only role from an agent.
1. Admin opens role assignment modal for `TestAgent` which has only `QA Tester` role.
2. Unchecks `QA Tester`.
3. Clicks Save.
4. System shows error: “Agent must have at least one role. Assign another role before removing the last one.”
5. Modal remains open, no changes saved.

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Attempt to assign a non‑existent role | UI only shows existing roles – impossible via UI. If API receives invalid role ID, return 400 “Role not found”. |
| Duplicate assignment | If admin checks already assigned role, either disable it in UI or ignore on save. System must not create duplicate entries. |
| Removing last role (as above) | Block with error message. |
| Concurrent assignment changes by two admins | Use optimistic locking or last‑write‑wins with warning. Simpler: show “Roles were modified by another admin. Please refresh.” on conflict. |
| Agent is deleted while admin is managing roles | After deletion, modal close with “Agent no longer exists.” |
| Role is deleted from catalog while still assigned to agents | System behavior: keep the assignment but mark role as `[deleted]` in display, or prevent deletion of role if assigned (role deletion US handles this). For this US, assignment interface should show a warning badge “(deleted)” for orphaned roles and allow unassignment. |
| Performance with hundreds of roles | Load available roles with pagination or virtual scroll. Search/filter on client or server. |
| User without Admin role tries to access assignment UI | 403 error, button not rendered. |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Assign roles to AI agents
  As an Admin
  I want to assign roles to AI agents
  so that each agent has a clearly defined responsibility

  Background:
    Given I am logged in as an Admin
    And the role catalog contains "Payment Processor", "Fraud Detector", "QA Tester"
    And an agent "TransactionBot" exists with role "Payment Processor"

  Scenario: Assign an additional role to an agent
    When I go to the agent list and click "Manage Roles" for "TransactionBot"
    Then I see "Payment Processor" as already assigned (checked)
    When I check "Fraud Detector" from available roles
    And I click "Save"
    Then "TransactionBot" now has both "Payment Processor" and "Fraud Detector"
    And I see a success message "Roles updated"

  Scenario: Prevent removal of the last role
    Given "TransactionBot" has only "Payment Processor" assigned
    When I open the role assignment modal
    And I uncheck "Payment Processor"
    And I click "Save"
    Then I see an error "Agent must have at least one role"
    And the role remains assigned

  Scenario: Bulk role assignment via agent edit (optional integration)
    Given I am editing an agent's configuration
    When I see a multi‑select dropdown for "Assigned Roles"
    Then I can select multiple roles
    And the same validation (at least one role) applies
```

### 6. Example

**Before assignment:**
- Agent: `TransactionBot`
- Roles: `[Payment Processor]`

**After assigning `Fraud Detector`:**
- Agent: `TransactionBot`
- Roles: `[Payment Processor, Fraud Detector]`

**UI representation in agent item view:**
```
Roles:
  [Payment Processor] ✕  [Fraud Detector] ✕  [+ Assign Role]

As an admin, I want to create and manage roles so that roles can be reused across multiple agents.
## User Story Name
**Role Catalog Management – Create, Edit, Delete Roles**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can create, edit, or delete roles).
- **Business validation rules:**
  - **Role name** must be unique across the system (case‑insensitive).
  - Role description is optional but recommended.
  - A role can be deleted **only if** it is not currently assigned to any agent. If assigned, deletion is blocked unless the admin first removes the role from all agents (or forces unassignment via a warning flow – but for safety, block deletion).
  - Editing a role (name or description) is allowed even if assigned to agents. The change propagates to all agents referencing that role (no need to update each agent individually).
  - A role has no built‑in permissions or capabilities – it is purely a label/tag for agent responsibility. The meaning is enforced by orchestration logic externally.
  - Soft delete is not required; hard delete is acceptable with the above guardrails.

### 2. List View, Item View, Create/Edit Fields

#### List View (Roles catalog)
- Accessible via **Agent Management** → **Roles** (separate tab or page).
- Table columns: `Role Name`, `Description`, `Assigned Agents Count` (number of agents using this role), `Last Modified`, `Actions` (Edit, Delete).
- Sorting: by name, by assigned count, by last modified.
- Search: free‑text search on name and description.
- Pagination: default 25 per page.
- **“Create New Role”** button at the top.

#### Create / Edit View (modal or dedicated page)

| Field | Mandatory | Type / Validation |
|-------|-----------|-------------------|
| Role Name | Yes | Text, max 100 chars, unique, no leading/trailing spaces, allowed characters: letters, numbers, underscore, hyphen. |
| Description | No | Text, max 500 chars. |

#### Item View (role details)
- Clicking on a role name shows a read‑only detail view with:
  - Role name, description, creation date, last modified by.
  - List of agents that currently have this role assigned (with links to those agents).
  - Buttons: **Edit**, **Delete** (if no agents assigned).

### 3. User Journey / Scenario
**Scenario:** Admin creates a new role “Compliance Officer” and later edits its description.

1. Admin navigates to **Agent Management** → **Roles**.
2. Clicks **“Create New Role”**.
3. Enters:
   - Role Name: `Compliance Officer`
   - Description: `Handles regulatory and audit-related queries`
4. Clicks **Save**.
5. Role appears in the list with assigned count 0.
6. Later, admin clicks **Edit** on that role, changes description to `Handles GDPR, SOX, and audit queries.`, saves.
7. List updates with new description.

**Scenario:** Admin tries to delete a role that is assigned to agents.
1. Role `Returns Specialist` is assigned to 3 agents.
2. Admin clicks **Delete** on that role.
3. System shows error: `Cannot delete role 'Returns Specialist' because it is assigned to 3 agents. Remove the role from all agents first.`
4. Deletion is blocked.

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Duplicate role name on create/edit | Show error: “Role name already exists. Please choose a unique name.” Prevent save. |
| Editing role name that already exists (different role) | Same as duplicate check – block if new name conflicts with another role. |
| Deleting role with zero assigned agents | Allow deletion with confirmation: “Permanently delete role ‘X’? This cannot be undone.” |
| Deleting role that is assigned to agents (as above) | Block with clear error message and list of affected agents (or link to filter). |
| Concurrent edit/delete by two admins | Optimistic locking – if role was deleted by another, show “Role no longer exists.” If edited concurrently, last save wins with warning. |
| Role name with leading/trailing spaces | Trim automatically before validation. |
| Special characters in role name | Allowed only alphanumeric, underscore, hyphen; reject others with error message. |
| Long list of roles (1000+) | Pagination + server‑side search. |
| Non‑admin tries to access role management | 403 error, button/menu hidden. |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Create and manage roles for AI agents
  As an Admin
  I want to create and manage roles
  so that roles can be reused across multiple agents

  Background:
    Given I am logged in as an Admin
    And the role "Returns Specialist" exists with 3 assigned agents

  Scenario: Create a new role successfully
    When I go to the Roles list
    And I click "Create New Role"
    And I fill in Name "Fraud Analyst" and Description "Detects fraudulent patterns"
    And I click Save
    Then the role "Fraud Analyst" appears in the list
    And the assigned agents count is 0

  Scenario: Edit an existing role's description
    When I click Edit for "Returns Specialist"
    And I change the Description to "Handles returns and refunds"
    And I click Save
    Then the role's description is updated
    And all agents with that role reflect the change (no additional action needed)

  Scenario: Prevent deletion of a role that is in use
    When I click Delete for "Returns Specialist"
    Then I see an error "Cannot delete role 'Returns Specialist' because it is assigned to 3 agents"
    And the role remains in the list

  Scenario: Delete an unused role
    Given a role "ObsoleteRole" exists with 0 assigned agents
    When I click Delete for "ObsoleteRole"
    And I confirm deletion
    Then "ObsoleteRole" is removed from the list
```

### 6. Example

**Create Role – Input:**
- Role Name: `Security Auditor`
- Description: `Reviews security logs and compliance alerts`

**After creation – Role list entry:**
| Role Name | Description | Assigned Agents | Last Modified | Actions |
|-----------|-------------|----------------|---------------|---------|
| Security Auditor | Reviews security logs and compliance alerts | 0 | 2026-04-02 by admin | Edit Delete |

**Role detail view (item view):**
```
Role: Security Auditor
Description: Reviews security logs and compliance alerts
Created: 2026-04-02 10:00:00 by admin@example.com
Last Modified: 2026-04-02 10:00:00 by admin@example.com

Assigned Agents (0):
  None

As an admin, I want to modify role definitions so that I can refine agent behavior over time.
## User Story Name
**Role Definition Refinement – Modify Role Behavior & Track Changes**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can modify role definitions).
- **Business validation rules:**
  - Modifying a role definition means changing any of its configurable attributes: `name`, `description`, `behavior_profile` (a JSON/YAML structure defining tone, response style, allowed actions, or default prompt snippets), and `metadata` (e.g., version tags, department ownership).
  - Role name must remain unique (excluding the role itself when renamed).
  - When a role definition is modified, all agents that currently have this role assigned **automatically inherit** the new definition at runtime (no manual agent update required). This enables centralized behavior refinement.
  - **Optional:** The system may support **role versioning** – each modification creates a new version number, and previous versions can be viewed/restored (if versioning is enabled). For MVP, simple audit logging of changes is mandatory; versioning is a nice‑to‑have.
  - A modification that changes the role’s `behavior_profile` must be validated against a schema (e.g., ensure required fields like `tone` enum or `allowed_tools` array are correctly typed).
  - The system must log each modification: `who`, `when`, `old_value`, `new_value` (at least for critical fields like behavior_profile).

### 2. List View, Item View, Create Fields

#### List View (Roles catalog – same as previous US)
- Accessible via **Agent Management** → **Roles**.
- Each role row has an **“Edit”** button that opens the **Modify Role Definition** screen.
- A column “Last Modified” shows the timestamp of the most recent modification.

#### Modify Role Definition View (Edit screen – enhanced)

| Field | Mandatory | Editable? | Notes |
|-------|-----------|-----------|-------|
| Role Name | Yes | Yes | Uniqueness validation (self‑excluded) |
| Description | No | Yes | Free text |
| Behavior Profile | No (but recommended) | Yes | Structured JSON/YAML editor or form fields (see Example). Defines how agents with this role should behave. |
| Metadata (e.g., owner, tags) | No | Yes | Key‑value pairs or tags |

#### Item View (Role details)
- Shows current definition plus **“View Change History”** button (if versioning/audit is implemented) – displays a log of modifications with timestamps and authors.

#### No “create fields” – modification is about editing existing roles.

### 3. User Journey / Scenario
**Scenario:** Admin wants to refine the “Customer Support” role to be more empathetic and to avoid giving refund amounts.

1. Admin navigates to **Roles** → finds `Customer Support` → clicks **Edit**.
2. Current Behavior Profile:
   ```json
   { "tone": "neutral", "max_responses": 3, "allowed_actions": ["answer_faq"] }
   ```
3. Admin changes to:
   ```json
   { "tone": "empathetic", "max_responses": 5, "allowed_actions": ["answer_faq", "escalate"], "forbidden": ["refund_amount"] }
   ```
4. Clicks **Save Changes**.
5. System validates JSON schema, logs the change (`old` and `new`).
6. Success message: “Role ‘Customer Support’ updated. All agents using this role will now use the new behavior profile.”
7. Later, admin views change history and sees the modification with timestamp and author.

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Renaming role to an existing role name | Block with error: “Role name already exists.” |
| Invalid Behavior Profile JSON / schema violation | Show inline validation error with specific field failure (e.g., “tone must be one of: neutral, empathetic, formal”). Prevent save. |
| Concurrent modification by two admins | Optimistic locking – if role was modified since load, show warning: “Role was modified by another admin. Please refresh and reapply your changes.” |
| Modifying a role that is deleted by another admin concurrently | Show “Role no longer exists.” |
| Behavior Profile contains malicious scripts (if stored as text) | Sanitize / strip executable content; store as safe structured data. |
| Large number of agents using the role – performance impact of propagating changes | Propagation is logical (no physical update to agents). Runtime reads the latest role definition each time. No performance issue. |
| Non‑admin tries to modify | 403 error, edit button hidden. |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Modify role definitions to refine agent behavior
  As an Admin
  I want to modify role definitions
  so that I can refine agent behavior over time

  Background:
    Given I am logged in as an Admin
    And a role "Customer Support" exists with behavior profile {"tone":"neutral"}
    And 5 agents are assigned this role

  Scenario: Modify behavior profile successfully
    When I edit the role "Customer Support"
    And I change the behavior profile to {"tone":"empathetic"}
    And I click Save
    Then the role's behavior profile is updated
    And an audit log entry is created with old and new values
    And the system confirms that all 5 agents will use the new profile

  Scenario: Attempt invalid behavior profile
    When I edit the role "Customer Support"
    And I change the behavior profile to {"tone":"aggressive"} (not allowed)
    And I click Save
    Then I see an error "tone must be one of: neutral, empathetic, formal"
    And the role remains unchanged

  Scenario: Rename role without affecting agent assignment
    When I edit the role "Customer Support"
    And I change the name to "Customer Care"
    And I click Save
    Then the role name is updated
    And all agents previously assigned "Customer Support" now show "Customer Care" in their role list
```

### 6. Example

**Before modification:**
- Role: `Returns Specialist`
- Behavior Profile:
  ```yaml
  tone: procedural
  max_tokens: 300
  allowed_actions:
    - check_eligibility
    - create_return_label
  ```

**After modification (refinement):**
- Role: `Returns Specialist`
- Behavior Profile:
  ```yaml
  tone: helpful_and_concise
  max_tokens: 500
  allowed_actions:
    - check_eligibility
    - create_return_label
    - offer_exchange
  disallowed_topics:
    - refund_amount_disputes
  ```

**Audit log entry:**
```
{
  "timestamp": "2026-04-02T11:00:00Z",
  "admin": "admin@example.com",
  "role_id": "role_123",
  "role_name": "Returns Specialist",
  "field": "behavior_profile",
  "old_value": "{\"tone\":\"procedural\",...}",
  "new_value": "{\"tone\":\"helpful_and_concise\",...}"
}


3. AI Provider Integration
As an admin, I want to configure multiple AI providers so that I can switch between models/vendors.
## User Story Name
**AI Provider Configuration – Register and Manage Multiple Providers**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can configure AI providers).
- **Business validation rules:**
  - Each provider must have a **unique name** (e.g., “OpenAI GPT-4”, “Anthropic Claude 3”, “Azure OpenAI”).
  - Each provider requires:
    - `type` (e.g., `openai`, `anthropic`, `azure`, `custom_openai_compatible`)
    - `endpoint_url` (must be a valid HTTPS URL, except for well‑known defaults)
    - `api_key` (encrypted at rest – never stored in plain text)
    - `default_model` (e.g., `gpt-4`, `claude-3-opus`)
    - `is_active` flag (only active providers appear in agent creation/editing dropdowns)
  - A provider can be marked `inactive` only if no **active** agent is currently using it. If agents exist that reference this provider, the system must either:
    - Block deactivation, or
    - Warn and allow deactivation only after reassigning those agents to another provider (handled by a separate US; for this US, blocking is simpler).
  - The system must support at least the following provider types out‑of‑the‑box: `openai`, `anthropic`, `azure`, `local` (e.g., Ollama). Additional types can be added via configuration.
  - API keys must never be exposed in logs, UI (except masked: `sk-...xxxx`), or API responses.

### 2. List View, Item View, Create/Edit Fields

#### List View (Provider Management)
- Accessible via **Agent Management** → **AI Providers** (separate tab/page).
- Table columns:
  - `Provider Name`, `Type`, `Default Model`, `Status` (Active/Inactive), `Last Tested` (timestamp of last successful connection test), `Actions` (Edit, Test Connection, Deactivate/Activate, Delete)
- Search: by name or type.
- Pagination: default 25 per row.
- **“Add New Provider”** button at the top.

#### Create / Edit View (modal or dedicated page)

| Field | Mandatory | Type / Validation |
|-------|-----------|-------------------|
| Provider Name | Yes | Text, max 100 chars, unique, no special chars except underscore/hyphen |
| Provider Type | Yes | Dropdown: `openai`, `anthropic`, `azure`, `local`, `custom_openai_compatible` |
| Endpoint URL | Conditional | Required for `custom_openai_compatible`, `azure`, `local`. Defaults may be pre‑filled for `openai` (`https://api.openai.com`) and `anthropic`. Must be valid HTTPS URL. |
| API Key | Yes (except `local` where key can be optional) | Text field, masked. Encrypted on save. |
| Default Model | Yes | Text, e.g., `gpt-4-turbo`, `claude-3-sonnet-20240229`. Free‑text but validated during connection test. |
| Max Tokens Limit (optional) | No | Integer, per‑provider rate limit cap (enforced by system, not just provider). |
| Is Active | Yes (default true) | Checkbox / toggle. Only active providers appear in agent dropdowns. |
| Additional Headers (optional) | No | JSON key‑value pairs for custom providers (e.g., `{"api-version":"2023-12-01"}`). |

#### Item View (Provider details)
- Click provider name to see read‑only details (masked API key, full endpoint, metadata).
- Buttons: **Edit**, **Test Connection**, **Deactivate** (if active), **Delete** (if no agents reference it).

### 3. User Journey / Scenario
**Scenario:** Admin configures a new OpenAI provider, tests it, and then makes it active.

1. Admin navigates to **AI Providers** list.
2. Clicks **“Add New Provider”**.
3. Selects type `openai`.
4. Endpoint URL auto‑populates with `https://api.openai.com` (editable).
5. Enters API key `sk-...`.
6. Sets Default Model `gpt-4-turbo`.
7. Leaves `Is Active` checked (default).
8. Clicks **Save**.
9. System validates uniqueness, encrypts API key, saves provider with status `Active`.
10. Admin clicks **Test Connection** on the new provider row.
11. System makes a lightweight API call (e.g., `models` endpoint or a dummy completion with 1 token). Shows success: “Connection successful. Model ‘gpt-4-turbo’ is available.”
12. Provider is now ready to be selected when creating/editing agents.

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Duplicate provider name | Show error: “Provider name already exists. Choose a unique name.” |
| Invalid endpoint URL (malformed, HTTP instead of HTTPS) | Validate on save: “URL must be valid and use HTTPS.” |
| API key encryption failure | Rollback save, log error, show “Failed to secure API key. Contact support.” |
| Test connection fails (invalid key, wrong model, network error) | Show clear error: “Connection failed. Reason: [timeout / 401 Unauthorized / model not found]. Please check API key and model name.” |
| Deactivating a provider used by active agents | Show error: “Cannot deactivate ‘OpenAI GPT-4’ because it is used by 3 active agents (list names). Reassign those agents first.” |
| Deleting a provider with any agents (even inactive) | Block with error: “Cannot delete provider referenced by agents. Remove provider assignment from agents first.” |
| Concurrent modification (two admins edit same provider) | Optimistic locking: show warning “Provider was modified by another admin. Please refresh.” |
| API key exposed in browser network tab | Never send API key in plain text from server to client. On edit, client sends new key only if changed; otherwise, send placeholder `__MASKED__`. |
| Custom provider type without required headers | Show validation: “Additional headers must be valid JSON.” |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Configure multiple AI providers
  As an Admin
  I want to configure multiple AI providers
  so that I can switch between models/vendors

  Background:
    Given I am logged in as an Admin
    And I am on the AI Providers management page

  Scenario: Add a new OpenAI provider successfully
    When I click "Add New Provider"
    And I select type "openai"
    And I enter name "OpenAI GPT-4 Turbo"
    And I enter API key "sk-test123"
    And I enter default model "gpt-4-turbo"
    And I click Save
    Then the provider appears in the list with status "Active"
    And the API key is encrypted in the database

  Scenario: Test connection for a provider
    Given a provider "Anthropic Claude" exists
    When I click "Test Connection" for that provider
    Then the system calls the provider's API with a minimal request
    And I see a success message "Connection successful"

  Scenario: Prevent deactivation of provider used by active agents
    Given "OpenAI GPT-4" is used by 2 active agents
    When I try to deactivate "OpenAI GPT-4"
    Then I see an error "Cannot deactivate: used by 2 active agents"
    And the provider remains active

  Scenario: Delete a provider with no references
    Given a provider "Old Test Provider" exists with zero agents using it
    When I click Delete and confirm
    Then the provider is removed from the list
```

### 6. Example

**Provider configuration (OpenAI):**
```json
{
  "name": "OpenAI GPT-4",
  "type": "openai",
  "endpoint_url": "https://api.openai.com/v1",
  "api_key": "encrypted:abc123...",
  "default_model": "gpt-4-turbo",
  "is_active": true,
  "max_tokens_limit": 8000,
  "last_tested": "2026-04-02T12:00:00Z"
}
```

**Provider configuration (local Ollama):**
```json
{
  "name": "Local Llama 3",
  "type": "local",
  "endpoint_url": "http://localhost:11434",
  "api_key": null,
  "default_model": "llama3",
  "is_active": true
}

As an admin, I want to assign a provider to an agent so that the agent uses the desired AI backend.
## User Story Name
**Provider Assignment – Link AI Provider to an Agent**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can assign a provider to an agent).
- **Business validation rules:**
  - An agent must have exactly **one** AI provider assigned at any time (no multi‑provider per agent in this scope; fallback providers are handled by orchestration US).
  - The provider must exist in the system and have `is_active = true` (only active providers are selectable).
  - The provider must have a valid, tested API key (or be a local provider that doesn’t require a key). The system should warn if the provider’s last test failed or the key is expired, but assignment can still be allowed (with a warning).
  - When a provider is assigned, the agent’s runtime uses that provider’s `default_model` unless overridden at agent level (model override is part of agent configuration, not this US – but assignment includes the provider reference).
  - Changing a provider on an **active** agent requires confirmation (runtime impact warning) – similar to editing US, but here it’s the assignment action specifically.

### 2. List View, Item View, Assignment Fields

#### List View (entry points)
- From the **Agent List** view, an admin can click an agent’s row to see its current provider in a column.
- An **“Assign Provider”** action may be present as an inline icon (pencil next to provider name) or via the Edit screen.

#### Item View (agent details)
- Within the agent’s **Item View**, a section “AI Provider” shows the currently assigned provider name, model (if overridden), and a **“Change Provider”** button.
- Clicking the button opens a **provider selection modal** (or redirects to the Edit screen – but to avoid duplication with Edit US, this US assumes a dedicated assignment flow, though implementation may reuse Edit). The key is that the assignment action is explicitly supported.

#### Assignment Modal / Interface (if dedicated)

| Component | Description |
|-----------|-------------|
| Provider dropdown | Lists all active providers (name, type, default model). Shows warning icon if provider’s last connection test failed. |
| Model override (optional) | Text field to override the provider’s default model (e.g., `gpt-4` instead of default `gpt-3.5-turbo`). Must be valid for that provider (validated on save or at runtime). |
| “Test with this provider” button (optional) | Allows admin to send a test prompt before assigning, to ensure the provider+model works. |
| Save / Cancel | Apply assignment or discard. |

### 3. User Journey / Scenario
**Scenario:** Admin wants to assign the newly configured “Anthropic Claude 3” provider to an existing agent `LegalBot` that currently uses “OpenAI GPT-4”.

1. Admin navigates to **Agent Management** → **Agents** list.
2. Finds `LegalBot`, clicks its name to open **Item View**.
3. Sees current provider: `OpenAI GPT-4`. Clicks **“Change Provider”** button.
4. Modal opens: dropdown shows active providers. Selects `Anthropic Claude 3`.
5. Optionally overrides model to `claude-3-opus-20240229`.
6. Clicks **Save**.
7. System validates provider exists and is active. If `LegalBot` is active (`status = Active`), shows confirmation: “Agent is live. Changing provider may affect ongoing conversations. Confirm?” Admin confirms.
8. Assignment saved. Agent now uses Anthropic Claude 3 for all new requests.

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Attempt to assign an inactive provider | Provider not shown in dropdown; if attempted via API, return 400 “Provider is inactive”. |
| Provider has invalid/missing API key | Show warning in dropdown: “⚠️ Provider ‘X’ has not been tested successfully. Assigning may cause runtime errors.” Allow assignment but log warning. |
| Model override invalid (e.g., model not supported by provider) | When saving, optionally validate by calling provider’s models endpoint. If validation fails, show error: “Model ‘xyz’ is not supported by this provider. Please check the model name.” |
| Agent is deleted while admin is assigning provider | Close modal, show “Agent no longer exists.” |
| Concurrent assignment change by another admin | Use optimistic locking – if agent’s provider changed since load, show “Agent configuration changed. Please refresh and try again.” |
| Provider is deactivated after assignment but before save | Validate on save – if provider no longer active, show error and prompt to select another. |
| Non‑admin attempts to assign | 403 error, button hidden. |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Assign an AI provider to an agent
  As an Admin
  I want to assign a provider to an agent
  so that the agent uses the desired AI backend

  Background:
    Given I am logged in as an Admin
    And an agent "LegalBot" exists with status "Draft"
    And active providers "OpenAI GPT-4" and "Anthropic Claude 3" exist
    And "LegalBot" currently has provider "OpenAI GPT-4"

  Scenario: Assign a different provider to a draft agent
    When I go to LegalBot's item view
    And I click "Change Provider"
    And I select "Anthropic Claude 3" from the dropdown
    And I click Save
    Then LegalBot's provider becomes "Anthropic Claude 3"
    And no confirmation dialog appears (agent is draft)

  Scenario: Assign provider to an active agent (requires confirmation)
    Given LegalBot has status "Active"
    When I change its provider to "Anthropic Claude 3"
    Then a confirmation dialog appears: "Agent is live. Changing provider may affect ongoing conversations. Confirm?"
    When I confirm
    Then the provider is updated

  Scenario: Prevent assignment of inactive provider
    Given "OpenAI GPT-4" is set to inactive
    When I open the provider dropdown for LegalBot
    Then "OpenAI GPT-4" is not visible
    And only active providers are shown

  Scenario: Warn when provider has untested API key
    Given "Anthropic Claude 3" has a last_test_status = "failed"
    When I open the provider dropdown
    Then I see a warning icon next to "Anthropic Claude 3"
    And I can still assign it, but a tooltip says "Provider last test failed. Runtime errors may occur."
```

### 6. Example

**Before assignment:**
- Agent: `LegalBot`
- Provider: `OpenAI GPT-4` (default model `gpt-4-turbo`)

**After assignment:**
- Agent: `LegalBot`
- Provider: `Anthropic Claude 3` (model override: `claude-3-opus-20240229`)

**API representation (partial):**
```json
{
  "agent_id": "agt_legalbot",
  "name": "LegalBot",
  "provider": {
    "provider_id": "prov_anthropic",
    "name": "Anthropic Claude 3",
    "assigned_model": "claude-3-opus-20240229"
  }
}

As an admin, I want to manage API keys securely so that provider access is protected.
## User Story Name
**Secure API Key Management – Store, Rotate, and Revoke Provider Keys**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can manage API keys for AI providers).
- **Business validation rules:**
  - API keys are always stored **encrypted at rest** (AES‑256 or equivalent). Never in plain text in the database, logs, or backups.
  - Keys are **masked** in UI: only first 6 and last 4 characters visible (e.g., `sk-123...xyz9`). Full key is never exposed via API responses.
  - Each provider can have **multiple API keys** (for rotation, different environments, or quota management), but only one **active** key per provider at a time.
  - An API key can be **rotated** (replaced with a new key) without downtime – the old key remains valid for a configurable grace period (default 24 hours) to allow in‑flight requests to complete.
  - Keys can be **revoked** immediately, which blocks all new requests using that key.
  - The system must log every key management action: `create`, `rotate`, `revoke`, `test_success`, `test_failure` – with timestamp and admin identity.
  - Keys must have an optional **expiration date** – if set, the system warns admins 7 days before expiry via notification (email or in‑app).
  - API keys must never appear in request logs, error traces, or browser developer tools.

### 2. List View, Item View, Create/Edit Fields

#### List View (API Keys per Provider)
- Accessible via **Agent Management** → **AI Providers** → select a provider → **“API Keys”** tab.
- Table columns:
  - `Key Label` (user‑defined, e.g., “Production key”)
  - `Masked Key` (e.g., `sk-123...xyz9`)
  - `Status` (Active, Expired, Revoked, Grace Period)
  - `Created At`, `Expires At` (if set)
  - `Last Tested`, `Last Used` (approx timestamp)
  - `Actions` (Test, Rotate, Revoke, Delete – depending on status)

#### Create / Edit Key View (modal)

| Field | Mandatory | Type / Validation |
|-------|-----------|-------------------|
| Key Label | Yes | Text, max 100 chars, unique per provider |
| API Key (plain text) | Yes | Textarea, masked after save. Must not be empty. |
| Expiration Date | No | Date picker – must be future date if provided. |
| Set as Active | Yes (default true) | Checkbox – if checked, becomes the active key for this provider (deactivates previous active key). |

#### Item View (Key details)
- Clicking a key shows masked value, metadata, and history of actions (test results, rotations, revocations).

### 3. User Journey / Scenario
**Scenario:** Admin rotates an API key for OpenAI provider because the old key is about to expire.

1. Admin goes to **AI Providers** → selects `OpenAI GPT-4` → **API Keys** tab.
2. Sees currently active key `Prod Key 2024` with expiry in 2 days.
3. Clicks **Rotate** (or **Add New Key** with “Set as Active”).
4. Modal opens: enters new key `sk-new...`, label `Prod Key 2025`, sets expiration 1 year from now.
5. Clicks **Save**.
6. System:
   - Encrypts new key.
   - Sets it as active.
   - Old key transitions to `Grace Period` status (24h).
   - Logs the rotation.
7. Admin sees confirmation: “New key activated. Old key will be automatically revoked after 24 hours (or you can revoke now).”

**Scenario:** Admin revokes a compromised key immediately.
1. Admin sees alert or suspects breach.
2. Goes to API Keys list, finds the key, clicks **Revoke**.
3. Confirmation: “Revoke this key immediately? All agents using this provider will fail until a new active key is set.”
4. Confirms.
5. Key status becomes `Revoked`. System logs action. Agents using this provider start failing (handled by fallback or alert).

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Adding duplicate key (same plain text) | Warn: “This key already exists (as ‘Label X’). Are you sure?” Allow save but log warning. |
| Setting a new active key when no other active key exists | Allowed. Old active key (if any) moves to grace period. |
| Rotating key while old key is already in grace period | Normal rotation – old key revoked immediately, new key active. |
| Revoking the last active key without adding a new one | Block with error: “Cannot revoke the only active key. Add a new key or mark another as active first.” |
| Expired key (past expiration date) | System automatically marks status as `Expired`. Agents using this provider will fail; admin must rotate. |
| Testing a key (manual test) | Admin clicks “Test” – system sends minimal API call. Shows success/failure with reason (invalid key, quota exceeded, etc.). |
| Key storage encryption failure | Transaction rollback, show “Failed to secure API key. Contact support.” |
| Export of keys (e.g., backup) | Never allowed via UI. Keys are not exportable in plain text. |
| Non‑admin tries to view or manage keys | 403 error, tab hidden. |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Manage API keys securely for AI providers
  As an Admin
  I want to manage API keys securely
  so that provider access is protected

  Background:
    Given I am logged in as an Admin
    And a provider "OpenAI GPT-4" exists
    And an active API key "Prod Key 2024" is stored for it

  Scenario: Add a new API key and rotate active key
    When I go to the provider's API Keys tab
    And I click "Add New Key"
    And I enter label "Prod Key 2025" and a new valid key
    And I check "Set as Active"
    And I click Save
    Then the new key becomes active
    And the old key status changes to "Grace Period" for 24 hours
    And an audit log entry is created for the rotation

  Scenario: Revoke a compromised key
    Given a key "Compromised Key" exists
    When I click "Revoke" for that key
    And I confirm revocation
    Then the key status becomes "Revoked"
    And agents using this provider immediately fail (no new requests succeed)

  Scenario: Prevent revocation of the last active key
    When I try to revoke the only active key for a provider
    Then I see an error "Cannot revoke the only active key. Add a new active key first."
    And the key remains active

  Scenario: Auto‑expiration warning
    Given a key expires in 5 days
    When an admin logs in
    Then a notification appears: "API key 'Prod Key 2024' for provider 'OpenAI' expires in 5 days"
```

### 6. Example

**API Key List View (UI representation):**

```
Provider: OpenAI GPT-4

[Add New Key]  [Test All]

Label            | Masked Key        | Status       | Expires At        | Last Used    | Actions
-----------------|-------------------|--------------|-------------------|--------------|-----------------
Prod Key 2024    | sk-123...xyz9     | Grace Period | 2026-04-05        | 2026-04-02   | [Revoke] [Test]
Prod Key 2025    | sk-abc...def2     | Active       | 2027-04-01        | Never        | [Test] [Rotate]
Old Test Key     | sk-aaa...bbb1     | Revoked      | 2025-12-01        | 2026-01-15   | [Delete]
```

**Audit Log Entry (key rotation):**
```json
{
  "timestamp": "2026-04-02T13:00:00Z",
  "admin": "admin@example.com",
  "action": "rotate_key",
  "provider_id": "prov_openai",
  "old_key_label": "Prod Key 2024",
  "new_key_label": "Prod Key 2025",
  "grace_period_hours": 24
}


4. Prompt Management
As an admin, I want to define system prompts for each agent so that I can control tone and behavior.
## User Story Name
**System Prompt Definition – Set and Customize Agent Instructions**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can define or modify system prompts for an agent).
- **Business validation rules:**
  - Every agent can have **exactly one active system prompt** at a time. (Prompt versioning is a separate US; this US handles the current/latest prompt.)
  - The system prompt is a text field with a **maximum length of 10,000 characters** (configurable per installation).
  - System prompt may contain **placeholders/variables** (e.g., `{{agent_name}}`, `{{current_date}}`, `{{user_timezone}}`) that the runtime will substitute. The definition interface must support these variables.
  - The prompt must not contain any **executable code** or **unsafe markup** – the system will sanitize on save (strip script tags, etc.).
  - An agent can function without a system prompt (empty allowed) – the provider’s default behavior applies.
  - Changes to the system prompt take effect **immediately** for all new conversations. Ongoing conversations may continue with the old prompt (implementation‑dependent; for this US, the admin is informed of this behavior).

### 2. List View, Item View, Create/Edit Fields

#### List View (entry point)
- From the **Agent List** view, clicking on an agent leads to its **Item View** (see below). No direct prompt list view; prompts are tied to an agent.

#### Item View (agent detail – prompt section)
- Within the agent’s **Item View**, there is a dedicated **“System Prompt”** section.
- Displays:
  - Current system prompt (truncated if long, with “Show more” expander).
  - Last modified timestamp and author.
  - **“Edit Prompt”** button.

#### Edit Prompt View (modal or inline editor)

| Field | Mandatory | Type / Validation |
|-------|-----------|-------------------|
| System Prompt Text | No (can be empty) | Textarea, max 10,000 characters. Supports variables via `{{...}}`. |
| Character Count | N/A | Live counter showing current / max (e.g., 2,345 / 10,000). |
| Variable Helper | N/A | Dropdown or list of available variables (e.g., `{{agent_name}}`, `{{user_name}}`, `{{current_date}}`) that inserts into textarea. |
| Save / Cancel | N/A | Buttons to apply or discard changes. |

### 3. User Journey / Scenario
**Scenario:** Admin wants to define a professional, concise system prompt for a support agent.

1. Admin navigates to **Agent Management** → **Agents** → clicks on `SupportBot`.
2. In the **Item View**, scrolls to **“System Prompt”** section.
3. Clicks **“Edit Prompt”**.
4. Enters:
   ```
   You are {{agent_name}}, a customer support assistant for Acme Inc.
   - Always be polite and professional.
   - Keep answers under 100 words.
   - Today's date is {{current_date}}.
   ```
5. Sees character count: 156 / 10,000.
6. Clicks **Save**.
7. System validates no malicious content, saves prompt, updates `last_modified_by` and timestamp.
8. Admin sees success message: “System prompt updated. New conversations will use this prompt.”
9. The Item View now shows the new prompt (truncated preview).

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Prompt exceeds 10,000 characters | Prevent save, show error: “System prompt exceeds maximum length of 10,000 characters. Current length: X.” |
| Malicious content (e.g., `<script>`) | Sanitize on save – remove or escape HTML/script tags. Show warning: “Potentially unsafe content was removed.” |
| Empty prompt | Allowed – agent uses provider’s default behavior. Show info message: “No system prompt defined. The AI will use provider defaults.” |
| Very long prompt (near limit) | Character counter turns yellow at 9,500, red at 10,000. |
| Invalid variable syntax (e.g., `{{invalid` without closing) | Warning (not error): “Variable `{{invalid` may not be recognized. Use `{{variable_name}}` format.” Allow save. |
| Concurrent edit by two admins | Optimistic locking: if prompt changed since load, show “Another admin modified this prompt. Please refresh and try again.” |
| Agent deleted while editing prompt | Close modal, show “Agent no longer exists.” |
| Non‑admin tries to edit | 403 error, edit button hidden. |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Define system prompts for AI agents
  As an Admin
  I want to define system prompts for each agent
  so that I can control tone and behavior

  Background:
    Given I am logged in as an Admin
    And an agent "SupportBot" exists

  Scenario: Define a new system prompt
    When I go to SupportBot's item view
    And I click "Edit Prompt"
    And I enter "You are a helpful assistant. Be concise."
    And I click Save
    Then the system prompt is saved
    And I see "System prompt updated. New conversations will use this prompt."
    And the last modified timestamp is updated

  Scenario: Attempt to exceed character limit
    When I edit the prompt and enter 10,001 characters
    Then I see an error "System prompt exceeds maximum length of 10,000 characters"
    And the prompt is not saved

  Scenario: Use a variable placeholder
    When I enter "Hello {{user_name}}, today is {{current_date}}"
    And I save
    Then the variable syntax is preserved
    And at runtime, the placeholders are substituted with actual values

  Scenario: Leave prompt empty
    When I clear the prompt field and save
    Then the prompt becomes empty
    And an info message appears: "No system prompt defined. The AI will use provider defaults."

5. Knowledge Base Management
As an admin, I want to attach knowledge bases to agents so that responses are context-aware.
## User Story Name
**Knowledge Base Attachment – Connect Knowledge Sources to Agents**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can attach or detach knowledge bases to/from agents).
- **Business validation rules:**
  - A knowledge base must already exist in the system (created via “Upload and manage documents” US – separate). This US only handles **attachment**.
  - An agent can have **zero or more** knowledge bases attached.
  - Attaching a knowledge base makes its content available to the agent at runtime (via retrieval‑augmented generation, RAG). The exact retrieval mechanism is defined elsewhere; this US ensures the linkage is recorded.
  - The same knowledge base can be attached to multiple agents.
  - When a knowledge base is attached, the admin can optionally specify a **priority order** (if multiple KBs are attached, the system may query them in order or merge results).
  - Detaching a knowledge base removes its content from the agent’s context immediately (affects new requests; ongoing conversations may still have cached context – admin is notified).
  - An agent cannot function with a knowledge base that is **deleted** or **unavailable** – the system will log a warning at runtime but not prevent agent execution (graceful degradation).

### 2. List View, Item View, Attachment Fields

#### List View (entry point)
- From the **Agent List**, clicking an agent leads to its **Item View** (see below). No separate attachment list view.

#### Item View (agent detail – “Knowledge Bases” section)
- Within the agent’s **Item View**, a dedicated section lists all currently attached knowledge bases:
  - Each entry shows: KB name, description, priority (if set), attachment date.
  - Actions: **Change Priority**, **Detach**.
  - **“Attach Knowledge Base”** button.

#### Attach Knowledge Base Interface (modal)

| Component | Description |
|-----------|-------------|
| Available KBs list | All knowledge bases in the system that are **not already attached** to this agent, with search/filter. |
| Priority (optional) | Numeric field (1 = highest, higher numbers = lower priority). If not set, system uses attachment order. |
| **Attach** button | Confirms attachment. |

#### Edit Attachment (priority change)
- Inline editing of priority (drag‑and‑drop or numeric input).

### 3. User Journey / Scenario
**Scenario:** Admin attaches two knowledge bases to `SupportBot` – “Product Manual” (priority 1) and “Return Policy” (priority 2).

1. Admin goes to **Agent Management** → selects `SupportBot` → **Item View**.
2. Scrolls to **“Knowledge Bases”** section – currently empty.
3. Clicks **“Attach Knowledge Base”**.
4. Modal shows available KBs: “Product Manual”, “Return Policy”, “FAQ 2024”.
5. Checks “Product Manual”, sets priority 1. Checks “Return Policy”, sets priority 2.
6. Clicks **Attach**.
7. System validates that KBs exist and are not already attached.
8. Modal closes; the KBs section now shows both with their priorities.
9. Runtime: When a user asks a question, `SupportBot` retrieves from Product Manual first, then Return Policy.

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Attempt to attach same KB twice to same agent | Prevent – KB already attached, show error “Knowledge base already attached to this agent.” |
| Attach a KB that is being deleted concurrently | If deletion happens after attachment but before save, show “Knowledge base no longer exists.” |
| Priority conflict (two KBs with same priority) | Allowed – system may break ties by attachment order or alphabetically. Admin can adjust. |
| Detach a KB that is in use by active conversations | Show warning: “Detaching will remove this knowledge base from new requests. Ongoing conversations may still use cached content. Confirm?” |
| Agent has no KB attached – runtime behavior | System still works (no context augmentation). No error. |
| KB content is empty or corrupted | Runtime logs warning, agent continues without that KB’s content. Admin receives notification. |
| Very large number of KBs attached (e.g., 50+) | Performance warning in UI: “Attaching many knowledge bases may impact retrieval latency. Consider consolidating.” But allow. |
| Non‑admin attempts to attach/detach | 403 error, buttons hidden. |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Attach knowledge bases to agents for context‑aware responses
  As an Admin
  I want to attach knowledge bases to agents
  so that responses are context‑aware

  Background:
    Given I am logged in as an Admin
    And an agent "SupportBot" exists
    And knowledge bases "Product Manual" and "Return Policy" exist

  Scenario: Attach a single knowledge base
    When I go to SupportBot's item view
    And I click "Attach Knowledge Base"
    And I select "Product Manual"
    And I click Attach
    Then "Product Manual" appears in the agent's KB list
    And the attachment date is recorded

  Scenario: Attach multiple knowledge bases with priorities
    When I attach "Product Manual" with priority 1
    And I attach "Return Policy" with priority 2
    Then both KBs are listed
    And the priority values are saved

  Scenario: Prevent duplicate attachment
    Given "Product Manual" is already attached
    When I try to attach it again
    Then I see an error "Knowledge base already attached to this agent"

  Scenario: Detach a knowledge base
    When I click "Detach" next to "Product Manual"
    And I confirm the warning
    Then "Product Manual" is removed from the agent's KB list
    And new requests no longer use that KB

  Scenario: Change priority of attached KB
    When I change priority of "Return Policy" from 2 to 1
    Then the priority is updated
    And retrieval order reflects the change


6. Agent Behavior & Orchestration
As an admin, I want to define agent workflows so that agents can perform multi-step tasks.
## User Story Name
**Workflow Definition – Design Multi‑Step Agent Tasks**

## Acceptance Criteria (Hybrid: Scenario‑oriented & Rule‑oriented)

### 1. Business Validation & Business Roles
- **Role:** `Admin` (only users with the `Admin` role can define, edit, or delete agent workflows).
- **Business validation rules:**
  - A **workflow** is a sequence of steps (nodes) that the agent executes to accomplish a multi‑step task (e.g., “check order status → validate refund eligibility → create return label → send email”).
  - Workflows are defined **per agent** (an agent can have zero or more workflows). However, an agent can only have **one active workflow** at a time (or none). The active workflow is triggered when the user’s intent matches a defined trigger.
  - Each workflow consists of:
    - `name` (unique per agent)
    - `trigger` (e.g., keyword, intent, or explicit user command)
    - `steps` (ordered list of actions, conditions, or sub‑workflows)
    - `input_variables` (data expected from user or previous steps)
    - `output` (final response or action)
  - Supported step types:
    - `llm_call` – send prompt to AI (may use agent’s system prompt + context)
    - `condition` – if/else branching based on variable values
    - `tool_call` – call an external API (e.g., check order, create ticket)
    - `wait_for_user` – pause and ask for additional input
    - `set_variable` – store data for later steps
    - `notify` – send notification (email, Slack, etc.)
  - Workflow definitions are stored as **JSON** or **YAML** (visual editor or code editor). Validation must ensure:
    - No circular dependencies (e.g., step A jumps to step B which jumps back to A).
    - All referenced variables are defined before use.
    - Each step has a valid `type` and required fields for that type.
  - A workflow can be **tested** (dry run) without affecting production (see Testing US, but basic test simulation is allowed here).
  - Workflows can be **versioned** (optional, but recommended as part of agent versioning US – for this US, only current active workflow is managed).

### 2. List View, Item View, Create/Edit Fields

#### List View (Workflows per agent)
- Accessible via **Agent Management** → select an agent → **Workflows** tab.
- Table columns:
  - `Workflow Name`, `Trigger`, `Steps Count`, `Status` (Active/Inactive), `Last Modified`, `Actions` (Edit, Duplicate, Delete, Set Active)
- **“Create New Workflow”** button.

#### Create / Edit Workflow Interface (visual or code editor)

| Component | Description |
|-----------|-------------|
| Workflow Name | Mandatory, text, max 100 chars, unique per agent |
| Trigger | Dropdown or text: `Keyword: refund`, `Intent: cancel_order`, `Always` (for default), `Regex: /return.*/` |
| Steps Editor | Drag‑and‑drop or JSON/YAML editor. Each step has type and configuration. |
| Test Button | Runs simulation with sample input (optional). |
| Save / Cancel | Save validates and stores workflow. |

#### Step Configuration (example fields per type)

| Step Type | Mandatory Fields |
|-----------|------------------|
| `llm_call` | `prompt` (instruction for this step, optional – uses agent prompt), `output_variable` |
| `condition` | `expression` (e.g., `{{refund_eligible}} == true`), `true_step_id`, `false_step_id` |
| `tool_call` | `tool_name` (from registered tools), `parameters` (JSON), `output_variable` |
| `wait_for_user` | `question` (text), `timeout_seconds` (optional), `output_variable` |
| `set_variable` | `variable_name`, `value` (literal or from another variable) |
| `notify` | `channel` (email/slack/webhook), `message` (template) |

### 3. User Journey / Scenario
**Scenario:** Admin defines a “Return Request” workflow for `ReturnsBot` that checks order, validates refund, and creates a label.

1. Admin goes to `ReturnsBot` → **Workflows** tab → **Create New Workflow**.
2. Names it `Process Return`.
3. Sets trigger: `Keyword: "return my order"`.
4. Adds steps in visual editor:
   - Step 1: `wait_for_user` – ask “What is your order ID?” → store as `order_id`.
   - Step 2: `tool_call` – call `check_order_status` with `order_id` → output `order_details`.
   - Step 3: `condition` – if `order_details.is_returnable == true` go to step 4, else step 5.
   - Step 4: `llm_call` – prompt “Generate a friendly approval message and ask for return reason” → output `approval_message`.
   - Step 5: `llm_call` – prompt “Explain why order is not returnable and suggest support” → output `rejection_message`.
   - Step 6: `notify` – send email to returns team with `order_id`.
5. Clicks **Save**. Validation passes.
6. Sets workflow as **Active**.
7. When user says “I want to return my order”, the agent executes the workflow.

### 4. Edge Cases / Errors and Handling

| Edge Case | Handling |
|-----------|----------|
| Workflow name duplicate within agent | Show error: “Workflow name already exists for this agent.” |
| Invalid step configuration (e.g., missing required field) | Highlight step with error, prevent save. |
| Circular reference in conditional jumps | Detect during validation, show error with cycle details. |
| Variable used before assignment | Validation error: “Variable ‘{{order_id}}’ used in step 3 but not defined earlier.” |
| Tool call fails at runtime (API down) | Workflow should have error handling – either a default error step or fallback message. Admin can define an `on_error` step (optional). For this US, basic error logging and user‑friendly message is required. |
| Workflow takes too long (e.g., multiple tool calls) | Enforce timeout (default 30 seconds). If exceeded, abort and return timeout message. |
| Trigger conflict (two workflows with same trigger) | Prevent save – “Trigger already used by active workflow ‘X’.” |
| No active workflow defined | Agent falls back to single‑turn behavior (no multi‑step). |
| Non‑admin attempts to edit | 403 error. |

### 5. Gherkin (GWT) – Example

```gherkin
Feature: Define agent workflows for multi‑step tasks
  As an Admin
  I want to define agent workflows
  so that agents can perform multi‑step tasks

  Background:
    Given I am logged in as an Admin
    And an agent "ReturnsBot" exists
    And a tool "check_order_status" is registered in the system

  Scenario: Create a new workflow with multiple steps
    When I go to ReturnsBot's Workflows tab
    And I click "Create New Workflow"
    And I enter name "Return Processing"
    And I set trigger keyword "return"
    And I add a "wait_for_user" step asking for order ID
    And I add a "tool_call" step to check order status
    And I add a condition step based on return eligibility
    And I click Save
    Then the workflow is saved successfully
    And it appears in the workflows list

  Scenario: Set workflow as active
    When I click "Set Active" on the workflow
    Then its status becomes "Active"
    And any previous active workflow is deactivated

  Scenario: Validation prevents circular reference
    Given I create a condition step that jumps to a previous step creating a loop
    When I try to save
    Then I see an error "Circular reference detected in workflow steps"

  Scenario: Test workflow (simulation)
    When I click "Test" on the workflow
    And I provide a sample user message "I want to return order #123"
    Then the system simulates execution step by step
    And shows the final output without affecting production


