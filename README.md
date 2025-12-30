---
title: Health Inclusion Coach
emoji: 🏥
colorFrom: blue
colorTo: green
sdk: docker
pinned: false
---

# Health Inclusion Coach

<div align="center">

![Health Inclusion Coach Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite)](https://vitejs.dev/)
[![Powered by Gemini](https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?logo=google)](https://ai.google.dev/)

**An AI-powered educational tool for Equality, Diversity, and Inclusion (EDI) in Health & Social Care**

[Features](#features) • [Getting Started](#getting-started) • [Tech Stack](#tech-stack) • [Contributing](#contributing)

</div>

---

## 🎯 Purpose

The **Health Inclusion Coach** is a reflective AI assistant designed to support:

- 🩺 **Nursing and medical students** learning about EDI principles
- 👨‍⚕️ **Qualified nurses and allied health professionals** reflecting on workplace scenarios
- 🏥 **Social care staff** developing cultural competence and "Relational Intelligence"

> **Note:** This is an educational tool, not an official NHS service. It does not provide legal, HR, or clinical advice.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 💬 **Reflective Dialogue** | Probing questions to help explore biases and experiences |
| 📚 **EDI Education** | Explanations of concepts like intersectionality and microaggressions |
| 🔗 **Resource Signposting** | References to NHS People Plan, WRES, WDES, and more |
| 🔍 **Deep Dive Mode** | Extended thinking for complex scenario analysis |
| 📄 **Document Analysis** | Upload documents for AI-powered review |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A [Google Gemini API Key](https://ai.google.dev/)

### Installation

```bash
# Clone the repository
git clone https://github.com/ClinyQAi/NHS-Inclusion-Coach.git
cd NHS-Inclusion-Coach

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your Gemini API key to .env.local
# GEMINI_API_KEY=your_api_key_here

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **AI:** Google Gemini API (`@google/genai`)
- **Styling:** Tailwind CSS

## 📁 Project Structure

```
├── components/          # React UI components
│   ├── ChatWindow.tsx   # Main chat interface
│   ├── Header.tsx       # Application header
│   └── ...
├── services/            # API and service logic
│   └── geminiService.ts # Gemini AI integration
├── specs/               # Specification documents
│   └── inclusion-coach.md  # AI persona specification
├── App.tsx              # Main application component
├── constants.tsx        # System prompt and constants
└── index.html           # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Foundation of Nursing Studies (FoNS)](https://www.fons.org/) for EDI research and frameworks
- [NHS England](https://www.england.nhs.uk/) for WRES, WDES, and inclusion resources
- [Civility Saves Lives](https://www.civilitysaveslives.com/) campaign

---

<div align="center">

**Made with ❤️ for Health & Social Care Education**

</div>
