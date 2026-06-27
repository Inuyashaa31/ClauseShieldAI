# 🛡️ ClauseShield AI - Legal Contract Risk Analyzer

ClauseShield AI is a demonstration full-stack web application designed for freelancers, independent consultants, and small agencies to instantly scan business contracts for unfair terms. Leveraging a schema-constrained LLM pipeline and an automated credit transaction layout, it isolates hidden liability risks, auto-renewals, and non-compete bounds before signing.

---

## 🚀 Core Architectural Pipeline

1. **Secure Authentication:** Built on Firebase Auth with an integrated dual-panel responsive interface matching strict database parameters.
2. **Dynamic Token Accounting:** Every profile document is bound atomically by its User UID within a real-time Cloud Firestore subscription stream.
3. **Automated Provisioning:** Brand-new registrations are automatically provisioned with **4 Free Credits** via an unprompted background hook.
4. **Structured LLM Parsing:** Interacts with the `gemini-2.5-flash` engine using programmatic parsing rules to safely construct standardized risk profile JSON sets.

---

## 🛠️ Tech Stack & Layout Engine

*   **Frontend:** React.js, Tailwind CSS (Custom extra-small layout metrics targeted down to `320px`), Lucide Icons
*   **Routing & Lifecycle:** React Router DOM (With active tracking context via `useLocation`)
*   **Backend & DB Layers:** Firebase Authentication, Cloud Firestore (Active socket listener tracking with `onSnapshot`)
*   **Intelligence Layer:** Google Gemini 2.5 API (Configured with automated fallback retry delays for `429` rate limits)

---

## ⚙️ Environment Configuration

To deploy this project locally, create an environment variable file named `.env` in the root folder of your project (right next to your `package.json` file) and include the following properties:

```text
VITE_GEMINI_API_KEY=your_google_gemini_api_key

VITE_FIREBASE_API_KEY=your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

⚠️ Important Vite Constraint: In Vite development setups, frontend environment parameters must be prefixed with VITE_ to avoid being blocked by system security frameworks.

📄 Database Structure (Cloud Firestore)
The application structures the client state mapping schema using the following document tree configuration:
/users
  └── {User_Auth_UID}
        ├── username (string): "Mohit"
        ├── email (string): "user@example.com"
        └── credits (number): 4

⚡ Quick Start & Deployment
Follow these quick commands to spin up your local environment setup:

Install required dependencies:
npm install


Run the local development server:
npm run dev


Open the browser engine: Navigate to http://localhost:5173 to test the integrated flows.