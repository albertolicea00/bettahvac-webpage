# ❄️ BettaHVAC Landing 🏠

[![Framework](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev/)
[![Build Tool](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Style](https://img.shields.io/badge/Style-Vanilla_CSS-1572B6?logo=css3&logoColor=white)](#)

> **The ultimate digital experience for modern HVAC services.**

This repository hosts the **BettaHVAC** landing page—a high-performance, visually stunning web application designed to showcase premium heating and cooling solutions. Built with a focus on speed, modularity, and aesthetic excellence.

---

## ✨ Features

- 🚀 **Hypersonic Performance**: Powered by **Svelte 5** and **Vite** for near-instant load times and seamless transitions.
- 🎨 **Premium Aesthetics**: A custom-crafted UI using HVAC-themed gradients (Ice Blue ❄️, Heat Red 🔥, and Gold 👑).
- ⚙️ **Dynamic Content Engine**: Manage the entire site's copy, contact info, and services via a single JSON file (`src/lib/content.json`).
- 🔥 **Climate-Responsive UI**: Integrated animations that shift based on the selected mode (Cool/Hot).
- ⭐ **Trusted Reviews**: Modular integration system for Google Reviews and internal feedback synchronization.
- 📱 **Mobile First**: Fully responsive design that looks incredible on every device.

---

## 🛠️ Tech Stack

- **Kernel**: [Svelte 5](https://svelte.dev/) (Runes & Snippets)
- **Bundler**: [Vite 7](https://vitejs.dev/)
- **Style**: Custom CSS variables & CSS Modules
- **Data**: JSON-driven architecture
- **Animations**: Custom Svelte transitions & Background FX components

---

## 🚀 Quick Start

Get the project up and running in seconds.

### 1. Requirements

- **Node.js**: v18.0.0 or higher
- **npm** (or pnpm/yarn)

### 2. Setup

```bash
# Clone the repository
git clone https://github.com/your-username/bettahvac-landing.git

# Enter the project directory
cd "bettahvac landing"

# Install dependencies
npm install
```

### 3. Launch Development Mode

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser and watch the magic happen.

---

## 📂 Project Structure

```bash
├── src/
│   ├── lib/
│   │   ├── components/    # Reusable UI modules (Nav, FAQ, Reviews)
│   │   ├── content.json   # 🧩 The "Brain": Edit this to change site content
│   │   └── ReviewService.js # Review sync logic
│   ├── App.svelte         # Main Application Entry
│   └── app.css            # Global design tokens & themes
├── public/                # Static assets
└── vite.config.js         # Build configuration
```

---

## 🛠️ Customization

To update the website content (text, phone numbers, services), you don't need to touch a single line of Svelte code. Just modify:

📍 `src/lib/content.json`

---

## 📜 Commands

| Command           | Description                                  |
| :---------------- | :------------------------------------------- |
| `npm run dev`     | Start development server with HMR.           |
| `npm run build`   | Generate production-ready bundle in `/dist`. |
| `npm run preview` | Locally preview the production build.        |

---

## 📄 License

This project is licensed under the **MIT License**. Check the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ for <b>BettaHVAC</b>
</p>
