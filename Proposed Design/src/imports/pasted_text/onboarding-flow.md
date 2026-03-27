EPIC 1: Client Interface
Sub-Epic 1.1: Goal-Driven Onboarding
Description: A dynamic, configurable onboarding flow that collects user-specific data based on their primary goal, ensuring a tailored start.
Story 1.1.1: Goal Selection
As a new user,
I want to see a list of primary goals (e.g., Pain Relief, Improve Fitness) fetched from the admin configuration,
So that I can select the one that best matches my needs, which will determine the subsequent questions I see.
Acceptance Criteria:
Goal list is fetched from a backend configuration table.
The selected goal is stored in the user profile.
The next steps in the flow are determined by this selection.
Story 1.1.2: Dynamic Step Sequence
As a new user,
I want to see only the onboarding screens relevant to my selected goal,
So that I don't have to answer irrelevant questions and the process feels personalized and efficient.
Acceptance Criteria:
The flow displays steps based on admin-defined rules for the chosen goal (e.g., Pain Map only for "Pain Relief").
I can navigate back to previous steps to review or change my answers.
Input validation occurs before progressing to the next step.
Story 1.1.3: Pain & Body Map Input
As a user who selected a pain-related goal,
I want to tap on a body diagram to select my primary areas of pain, with support for multiple selections,
So that I can accurately communicate where I'm experiencing discomfort.
Acceptance Criteria:
A touch-friendly body diagram with tap targets of at least 44x44px.
Selected areas are visually highlighted.
Selections persist when navigating between steps.
Data is stored in a structured JSON format.
Story 1.1.4: General Health & Lifestyle Intake
As a user with a non-pain goal (e.g., Fitness, Overall Health),
I want to answer a modular questionnaire about my fitness level, habits, and health history,
So that the system can understand my baseline health to create a safe and appropriate plan.
Acceptance Criteria:
Questions are displayed based on admin assignment to the selected goal.
Input types include sliders, text, and multiple-choice.
All data is saved in a JSON structure that matches the expected profile schema.
Story 1.1.5: Mobility Self-Test Guides
As a new user,
I want to be guided through simple mobility tests with clear instructions (text + GIF/video) and options to answer "Yes / No / With difficulty",
So that my functional limitations can be assessed and factored into my AI-generated plan.
Acceptance Criteria:
Each test includes clear instructions and a visual guide.
User selection is recorded.
Data is saved as part of the user profile for the AI to analyze.
Story 1.1.6: Nutritional Assessment
As a user with a goal related to Weight Management or Overall Health,
I want to complete screens about my dietary preferences, restrictions, and eating habits,
So that the Nutrition Agent can generate a personalized meal plan for me.
Acceptance Criteria:
The assessment screen is only shown if the selected goal has a nutrition component.
Data is stored in the user profile for the Nutrition Agent.
Story 1.1.7: Red-Flag Screening
As a user who selected a pain-related goal,
I want to go through a mandatory checklist of red-flag symptoms,
So that I can be made aware if my symptoms require medical consultation before starting an exercise program.
Acceptance Criteria:
If any red flag is checked, onboarding ends immediately.
A clear message instructs the user to consult a doctor.
Plan generation is disabled for the user.
Story 1.1.8: Consent & Disclaimer
As a new user,
I want to review and accept a disclaimer stating the app is not medical advice and consent to AI-generated plans,
So that I can proceed with full understanding and compliance.
Acceptance Criteria:
A checkbox agreement is required to proceed.
The acceptance is stored with a timestamp in the user's record.

Sub-Epic 1.2: Wellness & Training Plan Execution
Description: The core user experience for viewing, performing, and customizing their daily wellness and training routines.
Story 1.2.1: View Today's Routine
As a user with an active plan,
I want to see a "Today's Routine" card on my dashboard that shows my day's activities and estimated duration,
So that I can quickly understand what I need to do and get started with one tap.
Acceptance Criteria:
The card loads content from the user's active plan.
A "Start Routine" button is present.
If no plan exists, a prompt to complete onboarding is shown.
Story 1.2.2: Perform Activity with Set Tracking
As a user performing a routine,
I want to view each activity with its sets, reps, and a demonstration video, and then track my progress per set,
So that I can follow along correctly and record my performance for future AI insights.
Acceptance Criteria:
Each set has a checkbox or manual rep input for tracking.
Each activity views:
EXERCISE
SETS
REPS
REST
WU.S
TEMPO
Image/gif/very short video
Clickable DEMO Video
MUSCLES\GOAL
NOTES 	
After all sets are completed, the activity is marked as "Done."
Progress is saved per set and viewable in the history.
Story 1.2.3: Log Exercise Feedback
As a user after completing an exercise,
I want to add optional notes (e.g., "felt a twinge") and rate the perceived difficulty,
So that the AI can use my feedback to suggest future modifications or adjustments to my plan.
Acceptance Criteria:
A note field and difficulty rating slider are presented.
Notes are saved with the daily log for that specific exercise.
Story 1.2.4: Swap an Exercise for Today
As a user viewing my daily routine,
I want to replace an exercise with an alternative one from the library for the current day only,
So that I can work around temporary limitations, equipment unavailability, or personal preference without affecting my long-term plan.
Acceptance Criteria:
A "Swap Exercise" option is available.
A modal displays alternative exercises filtered by movement type and body area.
If the new exercise has a safety concern, a warning is shown and confirmation is required.
Story 1.2.5: Swap an Exercise Program-Wide
As a user who consistently dislikes or cannot perform a specific exercise,
I want to replace that exercise for all future occurrences in my program,
So that I can permanently customize my plan to better suit my needs.
Acceptance Criteria:
The swap modal includes an option to "apply to all future days."
The system updates the active plan's JSON accordingly.
The change is logged for admin review.
Story 1.2.6: Edit the Full Program
As a user who wants more control over my plan,
I want to access a dedicated "Edit Program" view where I can swap exercises, adjust sets/reps, and add rest days,
So that I can make multiple, complex customizations to my entire 4+ week program.
Acceptance Criteria:
An "Edit Program" or "Customize Plan" option is accessible from the dashboard.
Changes are saved as a new version of the plan.
If a change triggers a safety flag, it is held for admin approval (per config).
Story 1.2.7: View and Revert Plan History
As a user who has made changes to my plan,
I want to view a list of previous versions of my program and revert to an older one if needed,
So that I can undo a set of changes or recover a preferred version of my plan.
Acceptance Criteria:
A "Plan Version History" view is accessible.
Versions are listed with timestamps and change summaries.
A "Revert" action is available and is logged.
Story 1.2.8: Provide Post-Routine Feedback
As a user after completing my day's activities,
I want to use sliders and a text field to log my energy level, perceived difficulty, and pain level (if applicable),
So that I can close out my day and provide essential data for the AI to track my progress.
Acceptance Criteria:
The feedback screen appears after marking the last activity as done.
Feedback must be completed to officially mark the routine as "Done."
Data is saved to the daily log.
Story 1.2.9: Receive Missed Day Notifications
As a user with an active plan,
I want to receive a push reminder if I haven't completed my routine by a certain time,
So that I can stay on track with my fitness goals.
Acceptance Criteria:
The user can opt-in/out of these reminders.
The reminder is sent at a configurable time if the day's routine is not marked complete.

Sub-Epic 1.3: Nutrition Plan and Follow-up
Description: Tools for viewing, logging, and providing feedback on a personalized nutrition plan.
Story 1.3.1: View Nutrition Plan
As a user with a goal that includes nutrition,
I want to see my personalized meal plan in a clear, easy-to-follow format with a macronutrient breakdown,
So that I can understand what and how much to eat to achieve my goals.
Acceptance Criteria:
The plan is displayed with daily meals.
Macronutrient information (carbs, protein, fat) is visible.
The plan is generated based on the onboarding assessment.
Story 1.3.2: Log Meals
As a user following a nutrition plan,
I want to log the meals I've eaten, check off completed items, or note deviations,
So that I can track my adherence and provide data for progress tracking and future AI adjustments.
Acceptance Criteria:
A simple interface for logging meals is available.
Data is saved daily.
I can add notes for the coach/admin.
Story 1.3.3: Provide Nutritional Feedback
As a user logging my meals,
I want to provide feedback on my meal satisfaction and energy levels,
So that the AI can learn my preferences and adjust future suggestions accordingly.
Acceptance Criteria:
A feedback interface is presented after meal logging.
Feedback is stored and linked to the daily log.
Story 1.3.4: Track Progress on Nutritional Goals
As a user with a nutrition plan,
I want to see visual indicators (graphs/summaries) of my progress toward goals like weight or energy levels,
So that I can stay motivated and see the impact of my adherence over time.
Acceptance Criteria:
Graphs show trends based on logged data (e.g., weight, meals, feedback).
Data is presented clearly on a progress dashboard.

Sub-Epic 1.4: Movement Reminders & Tips
Description: A system for delivering bite-sized wellness advice, reminders, and motivational content to the user.
Story 1.4.1: Receive Movement Reminder Notifications
As a user,
I want to schedule and receive push notifications for posture breaks, stretches, or micro-exercises,
So that I can incorporate healthy movement habits into my day.
Acceptance Criteria:
I can customize the frequency and timing of notifications.
Tapping the notification links to a specific movement tip or stretch within the app.
Story 1.4.2: Browse In-App Tips Feed
As a user,
I want to access a feed of short articles, GIFs, and tips about ergonomics and quick stretches,
So that I can learn new ways to improve my wellbeing in small, manageable steps.
Acceptance Criteria:
The feed pulls content from a managed library.
New content is visually highlighted.
Story 1.4.3: Receive Motivational Messages
As a user who has missed two consecutive training days,
I want to receive a custom motivational push notification from the Follow-up Coach Agent,
So that I feel encouraged to get back on track with my program.
Acceptance Criteria:
The message is generated by an AI agent.
The message appears as a push notification and in the app's notification center.

Sub-Epic 1.5: Profile Management
Description: Tools for the user to manage their account, payment, and notification preferences.
Story 1.5.1: Manage My Profile
As a user,
I want to view and edit my personal information and, if allowed, update my goal,
So that my profile remains accurate and my plan stays aligned with my objectives.
Acceptance Criteria:
I can edit standard profile fields (name, email, etc.).
Changing my goal may trigger a re-onboarding flow to collect missing data.
Story 1.5.2: View Payment Status and Upload Receipt
As a user with a pending subscription,
I want to see my payment status (Active/Pending/Expired) and upload a receipt for manual verification,
So that I can get my plan access activated.
Acceptance Criteria:
A clear indication of payment status is shown.
A function to upload an image receipt is available.
I see a confirmation after a successful upload.
Story 1.5.3: Configure Notification Settings
As a user,
I want to have granular controls to opt-in or out of different types of push and email notifications,
So that I only receive the communications that are important to me.
Acceptance Criteria:
Settings exist for reminders, weekly summaries, and motivational messages.
Preferences are saved and respected by the notification system.

Sub-Epic 1.6: Blogs
Description: A content management system to deliver articles and educational content to the user.
Story 1.6.1: Search and Filter Blog Articles
As a user,
I want to view a list of blog articles that I can search and filter,
So that I can easily find content relevant to my interests.
Acceptance Criteria:
Articles are displayed with title, summary, thumbnail, and date.
Search and filtering (by category/tag) functionality is available.
Story 1.6.2: Read a Full Blog Article
As a user,
I want to tap on an article and view its full content with rich text formatting, images, and embedded videos,
So that I can have a clean, immersive reading experience on my mobile device.
Acceptance Criteria:
The view is optimized for mobile reading.
All media loads correctly.
Story 1.6.3: See Related Articles
As a user reading a blog post,
I want to see suggestions for similar articles at the end of the post,
So that I can easily discover more content on topics I care about.
Acceptance Criteria:
Suggestions are based on tags or categories.

Sub-Epic 1.7: Payment & Access Control
Description: The core logic for handling payment uploads and managing access to the app's primary features.
Story 1.7.1: Upload Payment Receipt
As a user,
I want to upload a receipt for my InstaPay/Vodafone Cash transaction from within the app,
So that an admin can verify my payment and grant me access to the full platform.
Acceptance Criteria:
The receipt image is stored securely.
A confirmation message is shown to the user upon successful upload.
Story 1.7.2: Access Plan Based on Payment Status
As a user,
I want to be shown my training and nutrition plans only if my payment status is "active,"
So that I have full access to the content I've paid for.
Acceptance Criteria:
If payment_status is true, the user can view their plan.
If payment_status is false, the user sees a "Payment Pending" screen with instructions.
Access checks are performed on all protected routes.
Story 1.7.3: Gain Plan Access After Verification
As a user who has uploaded a receipt,
I want my access to be granted automatically after an admin verifies my payment and toggles my status,
So that I can start my program as soon as possible.
Acceptance Criteria:
The user's interface updates to show their plan immediately after the admin toggles the "Paid" status.
