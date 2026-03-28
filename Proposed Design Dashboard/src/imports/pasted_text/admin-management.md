ADMIN
Story 1: Manage Exercise Library – CRUD Operations
As an administrator,
I want to create, read, update, and delete exercises in the library,
So that the AI Plan Creator and users have access to an up‑to‑date and accurate set of exercises.
Acceptance Criteria:
Each exercise entry includes: name, description, coaching cues, “feel” note, video URL (YouTube or self‑hosted), default duration, and default sets/reps.
Admin can browse the library with search and filter by body area, equipment, or difficulty.
Deleting an exercise shows a warning if it is currently used in any active plan; admin must confirm.
Story 2: Manage Exercise Substitution Rules
As an administrator,
I want to link exercises as interchangeable alternatives (e.g., “push‑ups” can be swapped with “dumbbell press” or “incline push‑ups”),
So that when a user uses the “swap exercise” feature, they see relevant, safe alternatives.
Acceptance Criteria:
Admin can add/remove alternative links for any exercise.
The system uses these links to populate the swap modal for both daily and program‑wide swaps.
Alternatives are automatically bidirectional or can be configured one‑way.
Story 3: Manage Plan Templates
As an administrator,
I want to create, edit, duplicate, and archive pre‑built plan templates (e.g., “Acute Neck”, “Chronic Lower Back”, “Beginner Strength”),
So that coaches can quickly assign a proven starting point to a client or use it as a base for AI generation.
Acceptance Criteria:
Templates are stored separately from AI‑generated plans.
Admin can copy a template and modify it before assigning.
Each template includes metadata: goal, difficulty level, estimated duration, and required equipment.
Story 4: Manage Movement Tips & Tricks Library
As an administrator,
I want to create and manage a library of tips, reminders, and quick exercises that can be displayed in the user’s in‑app feed,
So that I can deliver engaging wellness content to users on a schedule.
Acceptance Criteria:
Content can be text, GIF, or video (with thumbnail).
Admin can schedule release dates and times for each piece.
Content appears automatically in the user’s feed based on schedule and goal relevance (if tagged).
Story 5: Bulk Import/Export Exercise Library
As an administrator,
I want to import exercises via CSV/Excel and export the current library to a file,
So that I can efficiently seed the system with a large number of exercises or migrate data between environments.
Acceptance Criteria:
Import validates required fields and reports errors (e.g., duplicate names).
Export produces a CSV with all exercise fields.
Bulk operations are logged for audit.
Story 6: Version History for Exercises
As an administrator,
I want to see a history of changes made to each exercise and revert to a previous version if needed,
So that I can recover from accidental edits and track who made which change.
Acceptance Criteria:
Exercise detail page shows a “Version History” tab with timestamps, user, and change summary.
Admin can revert to any previous version with one click.
Story 7: Preview Exercise in User Context
As an administrator,
I want to preview how an exercise will appear to a user (including video, cues, and default sets/reps),
So that I can verify formatting and accuracy before making it available.
Acceptance Criteria:
A “Preview” button in the exercise editor shows a mockup of the user view.
The preview reflects the current draft of the exercise.
Story 8: Categorize Exercises for Filtering
As an administrator,
I want to assign exercises to categories (body area, movement type, equipment, difficulty) and manage those categories,
So that both admins and users can filter exercises effectively.
Acceptance Criteria:
Admin can create/edit categories for each type.
Exercises can be tagged with multiple categories.
Filters in the admin exercise list and user swap modal use these categories.

Admin & Backend Management – EPIC 2: User Management & Program Oversight
This epic equips administrators with tools to manage users, verify payments, review AI‑generated plans, oversee user‑initiated changes, and configure permissions for safe program customization.

Story 1: User Directory with Search and Filter
As an administrator,
I want to see a searchable, filterable list of all users,
So that I can quickly locate a specific user or browse users by status.
Acceptance Criteria:
Directory displays: user name, email, goal, onboarding completion status, plan status (active/inactive), payment status, and last activity date.
Search by name or email.
Filters: goal, payment status (active/pending/expired), plan status, onboarding completed, and date range.
Clicking a user navigates to their detailed view.

Story 2: Manual Payment Verification
As an administrator,
I want to view uploaded receipts and toggle a user’s payment status,
So that I can grant or revoke access based on payment verification.
Acceptance Criteria:
In user detail view, a “Payment” section shows receipt image(s) with timestamp.
Admin can toggle a “Paid” status (active/pending/expired).
Toggle updates the user’s access rights immediately and logs the change.
Payment status is reflected in the user directory.

Story 3: Plan Approval Queue
As an administrator,
I want to see a queue of AI‑generated plans awaiting approval, with user profile summaries and safety flags,
So that I can review, edit, and publish safe and appropriate plans.
Acceptance Criteria:
Queue shows: user name, goal, profile summary (age, pain areas if applicable), safety flags (if any), creation date, and plan preview.
Filter by status (pending, approved, rejected) and sort by date or priority.
Clicking a plan opens the plan preview and edit view.

Story 4: Plan Preview and Edit Before Publishing
As an administrator,
I want to click into a pending plan, view the full plan content, and make edits (swap exercises, modify sets/reps/cues, add/remove days),
So that I can refine a plan before it goes live to the user.
Acceptance Criteria:
Edits are saved as a draft without affecting the user’s current plan.
Admin can revert changes or discard draft.
A “Approve & Publish” button pushes the final plan to the user’s dashboard and updates the plan status to “active.”

Story 5: Safety Flag Override
As an administrator,
I want to see a warning banner when a plan has a safety flag and either approve it (with a note) or send it back to AI for regeneration,
So that I can make an informed decision about potentially risky plans.
Acceptance Criteria:
Override reason and admin note are required and logged.
If approved, the user receives a notification that their plan is ready.
If rejected, the plan is returned to the AI for regeneration, and the user is notified of a delay.

Story 6: User‑Initiated Change Log
As an administrator,
I want to see a detailed log of all changes made by a user to their plan (swap exercise, add activity, adjust sets, etc.),
So that I can monitor user behavior and identify patterns or potential issues.
Acceptance Criteria:
In the detailed client view, a “Change Log” tab shows: change type, original value, new value, date, and scope (daily vs. program‑wide).
Admin can filter by change type (e.g., swap, add, delete, rep adjustment).
Log entries are linked to the plan version at the time of change.

Story 7: Plan Modification Approval Queue
As an administrator,
I want to review user‑initiated changes that triggered a safety flag, with context (user profile, original plan, proposed change),
So that I can approve, reject, or modify them while maintaining user safety.
Acceptance Criteria:
A dedicated queue shows changes requiring approval, with the user’s profile and a side‑by‑side comparison of original vs. proposed.
Admin can approve, reject with a reason, or make modifications before approval.
Approved changes are applied automatically; rejected changes are discarded with a notification to the user.
Changes that do not trigger a safety flag are applied immediately without queue entry.

Story 8: Configure User Edit Permissions per Goal
As an administrator,
I want to set permissions per goal (and optionally per user) defining what edits are allowed,
So that I can control the level of customization offered based on risk or user needs.
Acceptance Criteria:
In goal configuration, admin can select: allow daily swaps only, allow program‑wide edits, allow full program editing, or disallow edits.
A user‑specific override is available in the client detail view.
Default setting is applied to all new users of that goal.

Story 9: Exercise Substitution Rule Management
As an administrator,
I want to define which exercises are considered interchangeable for swap suggestions (e.g., “push‑ups” ↔ “dumbbell press”),
So that the swap modal offers relevant, safe alternatives.
Acceptance Criteria:
In the exercise library, admin can link exercises as “alternatives” (bidirectional or one‑way).
The system uses these links to populate the swap modal for both daily and program‑wide swaps.
Admin can review and edit substitution rules at any time.

Story 10: Audit Trail of Admin Actions
As an administrator,
I want all admin actions (payment verification, plan approval, permission overrides, etc.) to be logged with timestamp and admin identity,
So that there is a complete audit trail for compliance and accountability.
Acceptance Criteria:
An admin_logs table records action type, target user, details, and admin user ID.
Logs are viewable in the admin interface with search and filter capabilities.
Logs cannot be deleted.

Story 11: Bulk Plan Approval
As an administrator,
I want to select multiple pending plans and approve them in bulk,
So that I can process a large volume of plans efficiently.
Acceptance Criteria:
In the Plan Approval Queue, checkboxes allow selecting multiple plans.
A “Bulk Approve” button is available (with confirmation).
Plans that have safety flags are excluded from bulk approval unless explicitly included with warning.

Story 12: Notify User on Plan Approval or Rejection
As an administrator,
I want the system to automatically notify users when their plan is approved, rejected, or requires action,
So that users are kept informed without manual outreach.
Acceptance Criteria:
Push notification and/or email (based on user preferences) are sent when:
Plan is approved and published.
Plan is rejected (with reason).
A user‑initiated change requires approval (pending).
Notifications include a direct link to the relevant section in the app.

Admin & Backend Management – EPIC 3: AI Agent Management
Description: This epic provides administrators with tools to monitor, configure, and control the AI agents that power plan generation, safety auditing, and follow‑up coaching. It includes observability, prompt versioning, LLM service abstraction, and cost governance.

Story 1: AI Agent Monitoring Dashboard
As an administrator,
I want to see a dashboard showing the status, last run time, success/failure rates, and recent errors for all AI agents,
So that I can quickly identify and address operational issues with the AI services.
Acceptance Criteria:
Dashboard lists all agents (Onboarding Profiler, Plan Creator, Safety Auditor, Follow‑up Coach, Nutrition Agent).
Each agent shows: current status (idle/running/error), last execution time, success rate over the past 24 hours, and total calls today.
Failed runs are listed with error messages and links to detailed logs.
Alerts are triggered when an agent’s failure rate exceeds a configurable threshold.

Story 2: Prompt Versioning & Configuration Interface
As an administrator,
I want to view, edit, and version prompts for all AI agents through a simple text interface,
So that I can iteratively improve agent behavior without requiring code changes or deployments.
Acceptance Criteria:
A “Prompt Management” section in the admin panel lists each agent and goal combination (e.g., Plan Creator – Pain Relief).
Prompts are stored in a database table with version history.
Admin can edit the prompt, add a change note, and publish a new version.
The system uses the latest published version for all new agent runs; older versions are retained for rollback.

Story 3: LLM Service Abstraction & Provider Configuration
As a developer/admin,
I want to configure which LLM provider (OpenAI, Anthropic, etc.) and which model (e.g., GPT‑4, Claude‑3) each agent uses, with the ability to set API keys via environment variables,
So that the system is flexible to provider changes, rate limits, and cost optimization.
Acceptance Criteria:
Environment variables define default provider and API keys.
Admin can override provider/model per agent in the configuration interface.
The abstraction layer handles retries, fallbacks, and response parsing consistently across providers.

Story 4: AI Call Logging & Audit Trail
As an administrator,
I want to view detailed logs of every AI agent invocation, including input prompt, output response, token usage, execution time, and any errors,
So that I can debug issues, audit decisions, and measure performance.
Acceptance Criteria:
All AI calls are stored in an ai_logs table with: timestamp, agent name, user_id (if applicable), goal, prompt version, input data, output JSON, tokens used, cost, and duration.
Admin can search logs by user, agent, date range, and status (success/error).
Logs are retained for a configurable period.

Story 5: Cost Control & Token Budgeting
As an administrator,
I want to set monthly token budgets per user and overall, and receive alerts when thresholds are approached,
So that I can prevent unexpected cost overruns.
Acceptance Criteria:
Admin can configure a global monthly budget and a per‑user soft limit.
The system tracks cumulative token usage per user and stops generating new plans for users who exceed the limit (with a notification).
Alerts are sent to admin when usage reaches 80%, 90%, and 100% of the global budget.

Story 6: Caching for Common AI Responses
As a developer,
I want to cache responses for identical or highly similar requests (e.g., generating a plan for the same user profile within a short window) to reduce token consumption,
So that costs are minimized and response times improved.
Acceptance Criteria:
Caching is implemented for Plan Creator and Nutrition Agent with a configurable TTL.
Admin can view cache hit/miss metrics on the AI monitoring dashboard.
Cache can be manually cleared per user or globally.

Story 7: Simulated AI Testing Mode
As an administrator,
I want to run AI agents in a “test mode” that uses mock responses or a sandboxed environment,
So that I can test new prompts or configurations without affecting real users or incurring costs.
Acceptance Criteria:
A toggle in the admin interface enables test mode for specific agents.
In test mode, the system either returns a predefined mock JSON or calls a test endpoint with dummy data.
Test runs are logged separately and do not count toward usage budgets.

Story 8: Agent Fallback & Error Handling Configuration
As an administrator,
I want to configure fallback behaviors for each agent when the LLM service fails (e.g., use a simpler template, notify admin, pause generation),
So that the system remains resilient and user experience is not disrupted.
Acceptance Criteria:
Admin can specify fallback action per agent: “use default template”, “retry up to 3 times”, “pause and alert admin”.
Fallback actions are logged and visible in the monitoring dashboard.
Manual retry or override is available from the admin interface.

Story 9: AI Performance Analytics
As an administrator,
I want to see analytics on AI agent performance over time: average response time, token consumption, cost per agent, and cost per user,
So that I can identify optimization opportunities and track cost trends.
Acceptance Criteria:
Graphs show cost and latency trends by agent over days/weeks/months.
Breakdown by goal to see which user segments incur higher costs.
Data can be exported for deeper analysis.

Story 10: Automated Retries with Exponential Backoff
As a developer,
I want the LLM service abstraction to automatically retry failed requests (e.g., due to rate limits or transient network issues) with exponential backoff,
So that temporary failures do not cause plan generation to fail.
Acceptance Criteria:
Retry logic is applied with configurable max retries (default 3) and backoff multipliers.
After all retries fail, the fallback behavior defined in Story 8 is triggered.
Retry attempts are logged for visibility.

Admin & Backend Management – EPIC 4: Client Management
Description: This epic provides administrators and coaches with a centralized, comprehensive view of individual clients, enabling efficient management of client data, notes, manual interventions, and goal adjustments.

Story 1: Detailed Client View – Unified Dashboard
As an administrator or coach,
I want to click into any user from the user directory and see a unified dashboard displaying their full profile, training logs, nutrition logs, communication history, and coach notes,
So that I have all the information needed to support that client without navigating multiple screens.
Acceptance Criteria:
The detailed view includes tabs or sections for:
Profile: Personal info, goal, onboarding data, payment status, plan status.
Training Logs: List of daily logs with completion, pain scores, difficulty, energy, and notes. Filterable by date.
Nutrition Logs: Meal logs, deviations, and feedback.
Communication History: Notifications sent, messages (if any), and user‑generated notes.
Coach Notes: Internal notes (see Story 2).
All data is displayed in a readable, scannable format.
Quick actions are available (e.g., “Regenerate Plan”, “Verify Payment”, “Change Goal”).

Story 2: Coach Notes – Internal Note‑Taking
As an administrator or coach,
I want to add, edit, and delete internal notes for a client, with each note being timestamped and attributed to the author,
So that I can track observations, interventions, and follow‑up actions privately.
Acceptance Criteria:
Notes are stored in a separate table linked to the user, visible only to admins/coaches.
Each note has a timestamp, author name, and content (rich text optional).
Notes can be pinned or flagged for follow‑up.
Search functionality across all notes for a client.

Story 3: Manual Plan Assignment
As an administrator or coach,
I want to assign a pre‑defined plan template (or a custom plan) to a user, overwriting any existing plan,
So that I can quickly provide a program without waiting for AI generation, or replace a plan that isn’t working.
Acceptance Criteria:
In the client detail view, a “Assign Plan” button opens a modal to select from:
Plan templates (by goal)
Previously generated plans for this user
Custom JSON upload
The assignment overwrites the user’s active plan and creates a new version.
A confirmation dialog warns that the previous plan will be archived.
The change is logged in the plan changes log.

Story 4: Goal Override with Regeneration Prompt
As an administrator or coach,
I want to change a user’s goal from the client detail screen, with the option to trigger a regeneration of the plan,
So that I can correct a user’s selection or pivot their program when clinical judgment indicates a different focus.
Acceptance Criteria:
Changing the goal updates the user’s profile and logs the change.
After saving, a prompt asks: “Regenerate plan based on new goal?” with options:
Yes, regenerate – triggers the AI agents to create a new plan.
No, keep current plan – leaves the existing plan but updates the goal.
If regeneration is chosen, the old plan is archived and the new plan goes through the approval queue.

Story 5: View and Export Client Logs
As an administrator or coach,
I want to export a client’s training logs, nutrition logs, and feedback to CSV/Excel,
So that I can perform offline analysis or share with other professionals.
Acceptance Criteria:
In each logs section (Training, Nutrition), there is an “Export” button.
Exports include all relevant fields for the date range selected.
Large exports are processed in the background and delivered via email.

Story 6: Client Communication History
As an administrator or coach,
I want to see a timeline of all communications sent to the client (push notifications, emails, in‑app messages) and any responses or feedback,
So that I can understand the client’s engagement and context of interactions.
Acceptance Criteria:
A “Communication” tab lists each message with timestamp, type (push, email), content preview, and delivery status.
User‑initiated actions (e.g., providing feedback, swapping exercises) are also shown as system events in the same timeline.
Admin can filter by communication type.

Story 7: Client Activity Summary Widget
As an administrator or coach,
I want to see a summary widget at the top of the client detail view showing key metrics: days since last login, routine completion rate over the last 30 days, and current streak,
So that I can quickly assess engagement without scrolling through logs.
Acceptance Criteria:
Completion rate is calculated as (completed routines / assigned routines) for the last 30 days.
Streak shows the number of consecutive days with completed routines.
Data is updated in near real‑time.

Story 8: Manual Payment Status Override (Reinforced)
As an administrator,
I want to manually override a client’s payment status (e.g., grant complimentary access, mark as expired) from the client detail view,
So that I can manage exceptions and special cases.
Acceptance Criteria:
A “Payment” card shows current status and a dropdown to change it.
An optional reason field is required for the override.
The change is logged in the audit log.
Access rights are updated immediately.

Story 9: Client Safety Alert Banner
As an administrator or coach,
I want a prominent banner at the top of the client detail view if the client has any outstanding safety flags (e.g., red‑flag responses, plan safety flag, or recent risky swaps),
So that I can prioritize high‑risk clients and take immediate action.
Acceptance Criteria:
The banner displays the type of alert and a link to the relevant section (e.g., “Review pending plan”, “Client reported red‑flag symptoms”).
Alerts can be dismissed only after review, with a reason.

Story 10: Quick Actions Menu
As an administrator or coach,
I want a “Quick Actions” menu in the client detail view with shortcuts to common tasks,
So that I can perform frequent operations efficiently.
Acceptance Criteria:
Actions include: “Regenerate Plan”, “Manually Add Log”, “Send Message”, “Adjust Program”, “Archive Client”, “Request Data Export”.
Each action opens the appropriate modal or workflow.
Actions that require confirmation have a warning.

Admin & Backend Management – EPIC 5: Programs, Nutrition, Blogs & Onboarding Configuration
Description: This epic covers the remaining backend management features: overseeing client programs (lifecycle, progress, manual adjustments), managing blog content, administering nutrition libraries and plans, and configuring the dynamic onboarding flow. These capabilities enable admins to control the full client journey from signup to program delivery.

Sub‑Epic 5.1: Client Programs Management (Creation and Follow‑up)
Story 5.1.1: Program Lifecycle Overview
As an administrator or coach,
I want to see an overview of all active, pending, and completed programs for clients, with the ability to filter by program type (training, nutrition) and status,
So that I can track program status and manage caseload effectively.
Acceptance Criteria:
Dashboard shows counts of active, pending approval, and completed programs.
List view includes client name, program type, start date, end date, current status, and completion percentage.
Clicking a program opens the detailed client view scoped to that program.
Story 5.1.2: Aggregated Progress Tracking (Admin View)
As an administrator or coach,
I want to view aggregated progress data for clients on a specific program, including adherence rates, pain score trends (if applicable), and feedback summaries,
So that I can evaluate program effectiveness at scale and identify clients who may need intervention.
Acceptance Criteria:
From the program list, admin can select a program (e.g., “Acute Lower Back v2”) and see:
Average adherence rate across all clients.
Graph of average pain score over time.
Distribution of difficulty feedback (easy, just right, hard).
Data can be filtered by date range and client segments.
Story 5.1.3: Manual Program Adjustments Mid‑Cycle
As an administrator or coach,
I want to manually adjust a client’s active program mid‑cycle (e.g., swap an exercise, change a meal, adjust progression) without regenerating the entire plan,
So that I can respond quickly to client feedback or clinical changes.
Acceptance Criteria:
From the client detail view, a “Adjust Program” button allows editing the current plan.
Changes are saved as a new version and logged.
Client receives a notification that their program has been updated.
If a change introduces a safety concern, the admin is warned before saving.
Story 5.1.4: Program Completion and Archiving
As an administrator,
I want to manually mark a client’s program as completed or archive it,
So that I can close out finished programs and keep the active list clean.
Acceptance Criteria:
Admin can change program status from “active” to “completed” or “archived”.
Archiving removes the program from the client’s active view but retains data for history.
A reason field is optional but encouraged.

Sub‑Epic 5.2: Blogs Management
Story 5.2.1: Blog Post CRUD with Rich Text Editor
As an administrator,
I want to create, edit, and delete blog posts using a rich text editor that supports formatting, images, and embedded videos,
So that I can produce high‑quality educational content for users.
Acceptance Criteria:
Rich text editor includes bold, italics, lists, headings, image upload, and video embed.
Fields for title, summary, featured image, author, tags, categories, and publish status.
Drafts are saved automatically.
Story 5.2.2: Category and Tag Management
As an administrator,
I want to create, edit, and delete blog categories and tags,
So that content can be organized and users can filter articles effectively.
Acceptance Criteria:
Dedicated interface to manage hierarchical categories and flat tags.
Categories and tags can be assigned to posts during creation/editing.
Deleting a category/tag prompts to reassign existing posts.
Story 5.2.3: Scheduled Publishing
As an administrator,
I want to set a future publish date for blog posts or save them as drafts,
So that content can be released on a planned cadence.
Acceptance Criteria:
Admin can set “Publish at” date and time.
Posts with a future date appear as “scheduled” and become visible automatically at the designated time.
Immediate publish option is also available.
Story 5.2.4: Blog Preview and User View Simulation
As an administrator,
I want to preview a blog post as it will appear to users before publishing,
So that I can verify formatting and layout.
Acceptance Criteria:
A “Preview” button shows the post in the user‑facing layout.
Preview respects mobile viewport.
Story 5.2.5: Blog Analytics
As an administrator,
I want to see views, average read time, and engagement metrics (likes, shares) for each blog post,
So that I can understand what content resonates with users.
Acceptance Criteria:
Each post’s detail page shows view count, unique readers, and average time on page.
Aggregated views by category/tag are available.

Sub‑Epic 5.3: Nutrition Management
Story 5.3.1: Meal Library CRUD
As an administrator or nutritionist,
I want to create, edit, and delete meals and recipes, including name, description, ingredients, macronutrients (carbs, protein, fat), calories, and meal type,
So that the Nutrition Agent and coaches have an up‑to‑date library to generate and assign plans.
Acceptance Criteria:
Each meal entry includes fields for name, description, ingredients list, macros, calories, and meal type (breakfast, lunch, dinner, snack).
Admin can upload an image for the meal.
Library can be searched and filtered by meal type, dietary restrictions (e.g., vegetarian, gluten‑free), and macros.
Story 5.3.2: Nutrition Plan Templates
As an administrator,
I want to create, duplicate, and modify pre‑built nutrition plan templates for common goals (e.g., “Weight Loss”, “Muscle Gain”, “General Wellness”),
So that they can be used as starting points for AI generation or manually assigned.
Acceptance Criteria:
Templates are structured as a weekly plan with daily meal slots.
Admin can copy a template and edit it.
Templates are stored separately from AI‑generated plans.
Story 5.3.3: Nutritionist Tools – Meal Log Review and Feedback
As an administrator or nutritionist,
I want to view a client’s logged meals and feedback, and add comments or suggestions visible to the client,
So that I can provide manual nutrition oversight and guidance.
Acceptance Criteria:
From the client detail view, a “Nutrition” tab shows daily meal logs and any user notes.
A comment box allows adding a message (e.g., “Try swapping this snack for a protein‑rich option”).
Client sees the comment in their app under the nutrition section.
Story 5.3.4: Nutritional Goal Tracking (Admin View)
As an administrator or nutritionist,
I want to see a client’s progress toward nutritional goals (e.g., weight change, calorie adherence) over time,
So that I can assess whether the nutrition plan is effective.
Acceptance Criteria:
Graphs show trends for logged weight, average daily calories, and macro adherence.
Data can be filtered by date range.
Story 5.3.5: Bulk Import/Export Meal Library
As an administrator,
I want to import meals via CSV/Excel and export the current library,
So that I can efficiently seed the system with a large number of meals.
Acceptance Criteria:
Import validates required fields and reports errors.
Export produces a CSV with all meal fields.
Bulk operations are logged.

Sub‑Epic 5.4: Onboarding Flow Management
Story 5.4.1: Goal Management
As an administrator,
I want to create, edit, and archive goals (e.g., “Pain Relief”, “Improve Fitness”, “Overall Health”),
So that the onboarding goal list stays aligned with the product offerings.
Acceptance Criteria:
Each goal has a name, description, internal key, and an active/inactive toggle.
Goals can be ordered for display in the user interface.
Archiving a goal hides it from new users but preserves data for existing users.
Story 5.4.2: Step Library Management
As an administrator,
I want to define reusable onboarding steps (e.g., “Pain Map”, “Nutritional Assessment”) with configurable input fields and validation rules,
So that I can build consistent building blocks for flows.
Acceptance Criteria:
Each step has a title, description, and one or more input fields (text, slider, checkbox, radio, multi‑select).
Validation rules (required, min/max, regex) can be attached.
Steps can be tagged with categories (e.g., pain, nutrition, lifestyle).
Story 5.4.3: Flow Builder (Drag‑and‑Drop)
As an administrator,
I want to select which steps are included in a goal’s onboarding flow and arrange them in order using a drag‑and‑drop interface,
So that I can easily configure the user experience for each goal.
Acceptance Criteria:
Admin chooses a goal and sees a list of available steps.
Steps can be added, removed, and reordered.
Steps can be marked as mandatory or optional.
Changes are saved and versioned.
Story 5.4.4: Conditional Logic (Field Visibility)
As an administrator,
I want to define conditional rules that show or hide fields within a step based on previous answers,
So that the onboarding flow adapts dynamically to user inputs.
Acceptance Criteria:
Rule editor supports simple if‑then conditions (e.g., “If goal = Weight Management, show detailed diet questions”).
Conditions can be based on any previous question.
Admin can test the flow in a preview mode.
Story 5.4.5: Profile Schema Versioning
As an administrator,
I want to see a version history of onboarding flow changes and preview schema differences before publishing,
So that I can manage backward compatibility and avoid breaking existing user profiles.
Acceptance Criteria:
Each time an onboarding flow is saved, a new version is created.
Admin can view differences between versions (JSON diff).
Existing users continue with their original flow version; new users get the latest.
Story 5.4.6: Preview and Test Onboarding Flow
As an administrator,
I want to simulate the onboarding flow as a new user would experience it, including conditional branching,
So that I can validate the flow before it goes live.
Acceptance Criteria:
A “Preview Flow” button opens a simulation that steps through the configured screens.
Admin can input test data and see how subsequent steps behave.
The preview does not save to the actual user database.
Story 5.4.7: Goal Assignment Override (Reinforced)
As an administrator,
I want to change a user’s goal from the client detail screen, with the option to trigger re‑onboarding or plan regeneration,
So that I can correct user selections or pivot their program.
Acceptance Criteria:
Changing goal updates the user’s profile and logs the change.
Admin is prompted: “Regenerate plan? Re‑collect onboarding data? Keep current plan?”
Regeneration uses the new goal’s flow to collect any missing data.

Admin & Backend Management – EPIC 6: Reporting, Analytics & Business Intelligence
Description: This epic provides administrators and stakeholders with comprehensive insights into platform performance, user engagement, plan effectiveness, AI operations, and business metrics. It enables data‑driven decision making and proactive management.

Sub‑Epic 6.1: Operational Dashboards
Story 6.1.1: Platform Overview Dashboard
As an administrator,
I want to see a high‑level dashboard showing key metrics: total users, new users (today, week, month), active plans, payment conversion rate, and system health,
So that I can quickly assess the overall health and growth of the platform.
Acceptance Criteria:
Metrics are updated in near real‑time.
Graphs show trends over configurable time ranges (day, week, month, custom).
Data can be exported as CSV or PDF.
Story 6.1.2: User Engagement Dashboard
As an administrator,
I want to view engagement metrics: Daily Active Users (DAU), Monthly Active Users (MAU), routine completion rate, average session duration, and retention cohorts,
So that I can understand how effectively users adopt and stick with the platform.
Acceptance Criteria:
Metrics are segmented by goal, plan type, and user segment.
Retention table shows percentage of users active at week 1, 2, 4, 8, etc.
Completion rate is calculated as (routines completed / routines assigned) over a period.
Story 6.1.3: Payment & Revenue Dashboard
As an administrator,
I want to see revenue metrics: Monthly Recurring Revenue (MRR), number of paid users, pending verifications, churn rate, and average revenue per user (ARPU),
So that I can track the financial performance of the platform.
Acceptance Criteria:
MRR is calculated from users with active payment status.
Churn rate shows percentage of paid users who become inactive.
A list of pending payment verifications with direct links to user profiles.
Graphs of revenue over time.

Sub‑Epic 6.2: Plan & Program Effectiveness
Story 6.2.1: Plan Quality Dashboard
As an administrator,
I want to see aggregated metrics on AI‑generated plans: approval rate, rejection rate, safety flags by type, and average time from generation to approval,
So that I can assess the quality of AI outputs and identify areas for prompt improvement.
Acceptance Criteria:
Metrics are filterable by goal, date range, and plan version.
Drill‑down to view individual plans with reviewer notes.
Trend graph shows approval rate over time.
Story 6.2.2: User Outcome Trends
As an administrator,
I want to see aggregated user feedback over time: average pain score (for pain goals), energy level, perceived difficulty, and satisfaction ratings,
So that I can evaluate whether plans are leading to positive outcomes.
Acceptance Criteria:
Graphs show average metrics over time for cohorts.
Data can be filtered by goal, plan version, and user segment.
Compare outcomes across different plan templates.
Story 6.2.3: Exercise Usage & Effectiveness Analytics
As an administrator,
I want to see which exercises are most frequently included in plans, most swapped out, and most often flagged as “too easy” or “too hard”,
So that I can curate the exercise library and improve substitution rules.
Acceptance Criteria:
Dashboard shows top exercises by inclusion count, swap‑out rate, and difficulty feedback distribution.
Drill‑down to see exercise performance by goal.
Export data for deeper analysis.

Sub‑Epic 6.3: AI Agent Performance & Cost Analytics
Story 6.3.1: AI Usage & Cost Dashboard
As an administrator,
I want to see detailed metrics on AI agent usage: number of calls, token consumption, cost per agent, cost per user, and total monthly cost,
So that I can manage operational costs and optimize prompts.
Acceptance Criteria:
Dashboard shows total cost today, this week, this month.
Breakdown by agent (Onboarding Profiler, Plan Creator, Safety Auditor, Follow‑up Coach, Nutrition Agent).
Cost per user with ability to sort and filter.
Alerts when budget thresholds are approached.
Story 6.3.2: AI Latency & Error Monitoring
As an administrator,
I want to monitor average response time and error rate for each AI agent,
So that I can identify performance issues with the LLM service or prompt complexity.
Acceptance Criteria:
Graphs show response time percentiles (p50, p95, p99) over time.
Error rate trends are displayed.
Drill‑down to individual failed requests with error details.

Sub‑Epic 6.4: Content & Engagement Analytics
Story 6.4.1: Movement Tips & Tricks Performance
As an administrator,
I want to see engagement metrics for movement tips, including views, likes, and tap‑through rate,
So that I can create content that resonates with users.
Acceptance Criteria:
Each tip shows view count and engagement rate.
Trends show which categories perform best.
Data can be exported.
Story 6.4.2: Blog Analytics
As an administrator,
I want to see views, average read time, and engagement (likes, shares) for each blog post,
So that I can understand what content resonates and plan future topics.
Acceptance Criteria:
Each post’s detail page shows view count, unique readers, and average time on page.
Aggregated views by category/tag are available.

Sub‑Epic 6.5: Data Export & Scheduled Reporting
Story 6.5.1: Export Reports to CSV/Excel
As an administrator,
I want to export any dashboard or report data to CSV or Excel format,
So that I can perform deeper analysis in external tools.
Acceptance Criteria:
Export option is available on all reporting screens.
Exports include the current filtered view with all relevant columns.
Large exports are processed in the background and delivered via email.
Story 6.5.2: Scheduled Report Delivery
As an administrator,
I want to schedule daily, weekly, or monthly reports (e.g., user growth, payment summary, AI costs) to be sent to my email,
So that I stay informed without needing to log in.
Acceptance Criteria:
Admin can select report type, frequency, recipients, and format (CSV, PDF).
Reports are generated automatically and emailed.
Story 6.5.3: Custom Report Builder (Advanced)
As an administrator,
I want to build custom reports by selecting metrics, filters, and date ranges,
So that I can answer specific business questions not covered by standard dashboards.
Acceptance Criteria:
A query‑like interface allows selection of tables and fields.
Saved custom reports can be run on demand or scheduled.
Results are previewed and exportable.

Sub‑Epic 6.6: User Segmentation & Cohort Analysis
Story 6.6.1: User Segmentation by Attributes
As an administrator,
I want to create and save segments of users based on goal, plan type, activity level, payment status, and engagement,
So that I can analyze behavior patterns and target communications.
Acceptance Criteria:
Segment builder with multiple filters (goal, days active, routine completion, etc.).
Segments can be saved for reuse.
Show user counts and summary metrics for each segment.
Story 6.6.2: Cohort Retention Analysis
As an administrator,
I want to view retention rates for cohorts defined by signup date, goal, or onboarding flow version,
So that I can understand which onboarding paths lead to higher long‑term engagement.
Acceptance Criteria:
Retention table shows percentage of users active at week 1, 2, 4, 8, etc.
Compare multiple cohorts side‑by‑side.
Export retention data for further analysis.

Sub‑Epic 6.7: Webhook & Data Integration
Story 6.7.1: Webhook Integration for BI Tools
As a developer,
I want to configure webhooks that send user events (onboarding complete, plan generated, routine completed, payment verified) to a data warehouse or analytics platform,
So that external BI tools can consume real‑time data.
Acceptance Criteria:
Webhook endpoint is configurable per event type.
Payload includes relevant user and event data.
Retries and error logging are implemented.
Story 6.7.2: Data Warehouse Sync
As a developer,
I want to implement a daily export of anonymized user, plan, and log data to a cloud storage bucket for use in external analytics,
So that data analysts can run complex queries without impacting production.
Acceptance Criteria:
Scheduled job exports data in JSON or Parquet format.
Data is anonymized (PII removed) for privacy.
Export logs are available for monitoring.

Admin & Backend Management – EPIC 7: System Configuration, Security & Administration
Description: This epic covers the foundational system administration features that enable secure, configurable, and maintainable operation of the platform. It includes role‑based access control, system settings, notification management, audit logs, and maintenance tools.

Sub‑Epic 7.1: Role‑Based Access Control (RBAC)
Story 7.1.1: Define Admin Roles and Permissions
As an super administrator,
I want to create and manage roles (e.g., Super Admin, Content Manager, Coach, Nutritionist, Viewer) with granular permissions,
So that team members can access only the features they need, improving security and accountability.
Acceptance Criteria:
Predefined roles are seeded with default permissions.
Admin can create custom roles and assign specific permissions (e.g., “can approve plans”, “can edit exercise library”, “can view reports”).
Permissions are enforced on all admin routes and API endpoints.
Story 7.1.2: Assign Roles to Admin Users
As an super administrator,
I want to assign one or more roles to each admin user,
So that I can tailor access levels to individual responsibilities.
Acceptance Criteria:
Admin user management interface shows current roles.
Roles can be added or removed.
Changes take effect immediately on next login.
Story 7.1.3: Admin Audit Trail for Actions
As an super administrator,
I want to see a log of all admin actions (who did what, when, and on which resource),
So that I can monitor activity and investigate any unauthorized or erroneous changes.
Acceptance Criteria:
Every admin action (plan approval, payment toggle, exercise edit, etc.) is logged with admin ID, action type, target, timestamp, and IP address.
Logs are viewable and searchable by admin user, date, and action type.
Logs cannot be deleted or altered.

Sub‑Epic 7.2: System Configuration & Settings
Story 7.2.1: Global System Settings Interface
As an administrator,
I want to configure global system settings (e.g., app name, contact email, notification sender name, default notification timing) through a central interface,
So that I can manage the platform without code changes.
Acceptance Criteria:
Settings are stored in a database table key‑value.
Admin can edit values via a form.
Settings are cached to avoid repeated database queries.
Story 7.2.2: Configure Plan Generation Defaults
As an administrator,
I want to set default values for plan generation (e.g., default duration in weeks, default exercise duration, fallback templates),
So that the AI Plan Creator has sensible defaults.
Acceptance Criteria:
Admin can edit defaults via a configuration screen.
Newly generated plans use these defaults unless overridden by user profile.
Story 7.2.3: Configure Notification Timing and Templates
As an administrator,
I want to set default timings for reminder notifications (e.g., missed day reminder at 7 PM) and edit push/email notification templates,
So that communication can be customized without engineering involvement.
Acceptance Criteria:
Admin can edit notification templates with placeholders (e.g., {{user_name}}, {{goal}}).
Default times for reminders are configurable per notification type.
Changes apply to future notifications.

Sub‑Epic 7.4: Notification Management
Story 7.4.1: View and Resend Failed Notifications
As an administrator,
I want to see a list of failed push or email notifications and manually retry them,
So that I can ensure important communications are delivered.
Acceptance Criteria:
A “Notification Failures” queue shows timestamp, user, notification type, and error reason.
Admin can retry individual or bulk notifications.
Retry success/failure is recorded.
Story 7.4.2: Broadcast Notification to User Segments
As an administrator,
I want to compose and send a broadcast notification (push and/or email) to a saved user segment (e.g., all active pain‑relief users),
So that I can communicate promotions, tips, or announcements.
Acceptance Criteria:
Admin can select a segment (from EPIC 6.6.1) or upload a list of user IDs.
Message can include text, image, and link.
Broadcast is scheduled or sent immediately.
Delivery stats are shown.

Sub‑Epic 7.6: API Key & Webhook Management
Story 7.6.1: Generate and Revoke API Keys for External Integrations
As an administrator,
I want to create and manage API keys for third‑party integrations (e.g., mobile app, external BI tools),
So that I can control access to the platform’s APIs.
Acceptance Criteria:
Admin can generate a new API key with expiration date and permissions scope.
Keys can be revoked at any time.
Usage logs show which key was used and when.
Story 7.6.2: Webhook Configuration
As an administrator,
I want to configure webhook endpoints for external services (e.g., Zapier, custom analytics) and select which events trigger them,
So that the platform can integrate with external tools.
Acceptance Criteria:
Admin can add webhook URLs, select event types (user.created, plan.approved, etc.), and set up authentication.
Delivery logs show attempts, successes, and failures.
Failed webhooks can be retried.

Admin & Backend Management – EPIC 8: Advanced Integrations, Support Tools & Platform Extensibility
Description: This epic covers advanced capabilities that extend the platform’s functionality beyond core operations. It includes integration with support and helpdesk tools, multi‑language management, white‑labeling for partners, an API developer portal, compliance reporting, and feature flag management for gradual rollouts.

Sub‑Epic 8.2: Multi‑language & Localization Management
Story 8.2.1: Language Management
As an administrator,
I want to enable one or more languages for the platform and set the default,
So that users can use the app in their preferred language.
Acceptance Criteria:
Admin can add/remove languages from a supported list.
A language selector is available to users.
All UI text is externalized and can be translated.
Story 8.2.2: Translation Management Interface
As an administrator,
I want to manage translations for all UI text strings through a central interface,
So that translations can be updated without code changes.
Acceptance Criteria:
Admin can view all text keys with translations for each language.
Missing translations are highlighted.
Export/import translations via CSV/JSON.
Story 8.2.3: Localized Content (Exercises, Tips, Blogs)
As an administrator,
I want to provide localized versions of exercises, movement tips, and blog posts,
So that content is culturally appropriate and accessible in multiple languages.
Acceptance Criteria:
Each content item can have per‑language versions (title, description, cues).
The system shows the appropriate version based on user language.
Fallback to default language if translation is missing.

Sub‑Epic 8.3: White‑labeling & Branding Configuration
Story 8.3.1: Custom Branding (Logo, Colors, Domain)
As an administrator,
I want to upload a custom logo, define primary/secondary brand colors, and optionally use a custom subdomain,
So that the platform can be white‑labeled for corporate clients or partners.
Acceptance Criteria:
Admin can upload logo (light/dark variants) and set color palette.
Branding is applied to all user‑facing pages and emails.
Option to use a custom domain (e.g., app.partner.com) with SSL.

Sub‑Epic 8.5: Compliance & Audit Reporting
Story 8.5.1: Comprehensive Audit Log Viewer
As an administrator,
I want to view a detailed audit log of all system‑level events (user data access, admin actions, AI agent runs, payment changes),
So that I can demonstrate compliance with regulations like HIPAA, GDPR, or SOC2.
Acceptance Criteria:
Audit log includes timestamp, actor (user/admin/system), action, resource, details, and IP.
Logs are searchable, filterable, and exportable.
Logs are immutable and stored for a configurable retention period.

Story 7.5.1: Backup & Restore Management
As an administrator,
I want to trigger on‑demand backups of the database and view backup history,
So that I can ensure data can be recovered in case of disaster.
Acceptance Criteria:
Admin can initiate a manual backup via UI.
Scheduled backups (daily/weekly) are configured via system settings.
Backup list shows date, size, and status; restore function is available (with confirmation).
Story 7.5.4: Scheduled Job Management
As an administrator,
I want to view and manually trigger scheduled jobs (e.g., AI agent runs, notification dispatches, report generation),
So that I can monitor background processes and retry failed ones.
Acceptance Criteria:
List of all recurring jobs with last run time, next run, and status.
Admin can trigger a job immediately.
Failed jobs show error details and allow retry.

