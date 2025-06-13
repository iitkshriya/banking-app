# 💳 Banking App

A **simple, responsive banking app** built with **Vue 3**, **Vite**, and **Tailwind CSS** to help you **manage all your credit cards in one place**. This app allows you to view, add, categorize, and manage multiple credit card entries with a smooth and intuitive interface.

---

## 🚀 Features

- 📋 List of all your credit cards grouped by category  
- ➕ Add new cards via modal form with validations  
- 🔐 Input masking & security for card details  
- 🧠 Smart category suggestions (e.g., Travel, Food, Bills)  
- 📱 Fully responsive layout (mobile & desktop designs)  
- ⚡️ Fast development and build with Vite  
- ✅ Unit and E2E testing with Vitest & Playwright  
- 🎨 Utility-first styling with Tailwind CSS  
- 🧪 Mock data support using Faker.js

---

## 🛠 Tech Stack

| Layer         | Tools / Libraries                      |
|--------------|----------------------------------------|
| **Framework**| Vue 3 (Composition API)                |
| **Build Tool**| Vite                                   |
| **Language** | TypeScript                             |
| **Styling**  | Tailwind CSS 4                         |
| **Mock Data**| @faker-js/faker                        |
| **Testing**  | Vitest, Playwright, Vue Test Utils     |
| **Linting**  | ESLint, Prettier                       |
| **Type Checking**| vue-tsc                             |
| **Dev Tools**| vite-plugin-vue-devtools               |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/banking-app.git
cd banking-app

# Install dependencies
npm install


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Folder Structure

src/ <br>
├── assets/             # Static assets <br>
├── components/         # Reusable components (Card, Modal, etc.) <br>
├── data/               # Mocked data (Faker) <br>
├── styles/             # Tailwind <br>
├── App.vue             # Main app file <br>
└── main.ts             # Entry point <br>

## License
This project is licensed under the **MIT License**.

## Todo / Ideas

1. Add persistent storage (e.g., IndexedDB or LocalStorage)
2. Dark mode toggle
3. Complete testing (unit + end-to-end)
4. Add animations to transitions and modal
5. Accessibility improvements and screen reader support
6. Mobile view support
