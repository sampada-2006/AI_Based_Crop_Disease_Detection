# 🌱 AI-Based Crop Disease Detection & Farmer Advisory System

An HCI-focused frontend prototype that helps smallholder farmers identify crop diseases from leaf photos and receive simple, actionable, regional-language advisory guidance — built for a college-level ML + HCI evaluation.

> **Current Phase:** Frontend Architecture, UI/UX & HCI Evaluation (Desktop Viva)
> Backend and ML inference are simulated using local mock data. Real model integration is planned for a future phase.

---

## 📖 Overview

Smallholder farmers often lack quick, affordable access to expert diagnosis when their crops show signs of disease. This project prototypes a **camera-first, language-accessible advisory tool**: a farmer photographs an affected leaf, the system (currently mocked) analyzes it, and the farmer receives an honest, visual, and actionable diagnosis — in their own language.

The project deliberately prioritizes **trust, clarity, and accessibility** over flashy AI claims — see [HCI Principles](#-hci-principles-demonstrated) below.

---

## ✨ Features

| Feature                                | Description                                                                                                                               |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 🌐 **Bilingual UI**                    | Full interface in Marathi and English, switchable instantly                                                                               |
| 📸 **Image Upload & Quality Check**    | Drag/drop or file picker with automatic blur detection before analysis                                                                    |
| 🔍 **Simulated AI Analysis**           | Animated scanning feedback mimicking real inference delay                                                                                 |
| 🎯 **Confidence-Aware Results**        | Three-tier response (High / Medium / Low confidence) — low-confidence cases show multiple possibilities instead of a false-certain answer |
| 🔥 **Explainable AI (Grad-CAM)**       | Toggleable heatmap overlay **plus** a plain-language "why this diagnosis" panel                                                           |
| 🌿🧪 **Organic vs. Chemical Advisory** | Treatment steps split into accessible tabs based on what the farmer can access                                                            |
| 🌦️ **Weather-Aware Advisory**          | Mock weather banner warns against spraying before rain or in high wind                                                                    |
| 📢 **Outbreak Alerts**                 | Mock district-level community alerts for social proof and preventive awareness                                                            |
| 📡 **Offline Indicator**               | Simulated offline/online state with "saved locally, will sync" messaging                                                                  |
| 🗂️ **Scan History / Farm Journal**     | Local log of past scans, reopenable anytime                                                                                               |
| 📊 **Progression Comparison**          | Compare two past scans side-by-side to see if a disease is improving or worsening                                                         |
| 🚶 **Onboarding Walkthrough**          | Skippable first-time tutorial for low digital-literacy users                                                                              |
| 🔤 **Font Size Control (A+/A-)**       | Global text scaling for accessibility, independent of layout                                                                              |

---

## 🛠️ Tech Stack

- **Framework:** React (Vite) + JavaScript
- **Styling:** Tailwind CSS v4 with custom `:root` CSS variables for high-contrast, outdoor-readable UI
- **Icons:** [lucide-react](https://lucide.dev/)
- **Localization:** `i18next` + `react-i18next` (Marathi ↔ English)
- **Layout:** 12-column desktop split-screen grid, optimized for laptop/projector viva presentation

---

## 📁 Project Structure

```
crop-disease-detection/
├── src/
│   ├── components/
│   │   └── DesktopLayout.jsx   # Full UI: layout, mock states, all feature logic
│   ├── App.jsx                 # Root rendering
│   ├── main.jsx                 # Entry point with i18n import
│   ├── index.css                # Tailwind directives & CSS root variables
│   └── i18n.js                  # Marathi & English translation dictionaries
├── vite.config.js               # Configured with @tailwindcss/vite plugin
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd crop-disease-detection

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite assigns).

### Build for production

```bash
npm run build
```

---

## 🎮 Using the Demo Controls

Since backend/ML is mocked for this phase, the app includes **Evaluation Demo Controls** (left panel, below the upload zone) to trigger different states on demand — useful for live viva demonstration:

- **Load Sample Leaf** — standard high-confidence disease result
- **Test Blurry Image** — triggers the pre-analysis quality warning
- **Test Medium Confidence** — shows the cautionary confidence note
- **Test Low Confidence** — shows the "not fully sure" fallback view with alternate possibilities
- **☀️ / 🌧️ / 💨 Weather buttons** — switch the mock weather advisory state
- **Online/Offline toggle** (header) — simulates connectivity loss
- **"?" button** (header) — replays the onboarding walkthrough

---

## 🧠 HCI Principles Demonstrated

This project is evaluated primarily on Human-Computer Interaction fundamentals, deliberately applied throughout:

- **User-Centered Design (UCD):** Simplified Marathi vocabulary, high-contrast cards, non-technical language throughout.
- **Mental Model Alignment:** Follows the "Photo → Inspection → Actionable Advice" flow, mirroring a real-world expert visit.
- **Affordances & Constraints:** Icon-labeled buttons; the Analyze button is disabled when an image is flagged as blurry.
- **Visibility of System State:** Real-time feedback at every step — upload validation, scanning loader, confidence level, offline/online status.
- **Error Prevention:** Pre-analysis quality inspector prevents wasted analysis on unusable photos.
- **Recognition Over Recall:** Visual icons (🍅), direct regional text, and Scan History eliminate the need to remember past results or type manually.
- **Explainable AI (XAI):** Grad-CAM heatmap **and** a plain-language explanation give two independent trust channels.
- **Trust Calibration:** Confidence-tiered results avoid presenting uncertain diagnoses as falsely confident — a common failure mode in consumer AI tools.
- **Accessibility & Inclusive Design:** Global font-scaling control and icon-first navigation support varying digital literacy and vision needs.
- **Feedback Loops:** Progression comparison closes the gap between advice given and outcomes observed over time.

---

## 🗺️ Roadmap / Future Scope

- [ ] Real ML model integration for disease classification
- [ ] Real backend for user accounts, cloud-synced scan history
- [ ] Voice input and Text-to-Speech (TTS) output for non-literate users
- [ ] Live weather API integration
- [ ] Real community/outbreak data pipeline
- [ ] Mobile-first responsive layout (current layout targets desktop/viva presentation)
- [ ] Live expert-connect feature (currently a mock CTA)

---

## 👥 Team

_(Add your names and roles here)_

- Sampada - Frontend Architecture & UI/UX
- Pratham - Backend
- Krishna - ML
- Krish - Deployment and bugs
- Teammate Name — _(role)_

---

## 📄 License

_(Add license info if required by your institution, or remove this section)_
