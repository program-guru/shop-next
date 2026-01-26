# ShopNext - E-Commerce Frontend

ShopNext is a modern, production-ready e-commerce frontend built with **React**, **TypeScript**, and **Vite**. It features a scalable architecture using **Redux Toolkit** for complex state management, **Context API** for theming, and a fully responsive design.

## 🚀 Tech Stack

* **Core:** React 19, TypeScript, Vite
* **State Management:** Redux Toolkit (Cart, Products, Notifications), React Context (Theme)
* **Routing:** React Router v7
* **Styling:** Tailwind CSS 
* **Icons:** Lucide React
* **Code Quality:** ESLint, Prettier

---

## 🛠️ Steps to Run Locally

Follow these steps to get the project running on your local machine:

1.  **Prerequisites:** Ensure you have Node.js (v18+) and npm installed.
2.  **Clone the repository:**
    ```bash
    git clone https://github.com/program-guru/shop-next.git
    cd shopnext
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
5.  **Build for production:**
    ```bash
    npm run build
    ```
6.  **Lint & Format:**
    ```bash
    npm run lint
    npm run format
    ```

---

## 📂 Folder Structure Explanation

The project follows a **Feature-Based** and **Domain-Driven** directory structure to ensure maintainability and scalability.

```text
src/
├── assets/          # Static assets imported within components (Logos)
├── components/      # Reusable UI components (Presentational & Smart components)
│   ├── Cart.tsx     # Cart UI logic
│   ├── NavBar.tsx   # Responsive Navigation
│   └── ...          # Other UI blocks (Carousel, Forms, Cards)
├── context/         # React Context definitions (ThemeContext)
├── data/            # Local JSON data mocking API responses (products.json)
├── pages/           # Route-level components (Page Controllers)
│   ├── Home.tsx
│   ├── Products.tsx
│   └── ...
├── store/           # Redux Toolkit configuration
│   ├── features/    # Redux Slices grouped by domain (Cart, Filter, Products)
│   ├── hooks.ts     # Typed useAppDispatch and useAppSelector
│   └── store.ts     # Main store configuration
├── types/           # TypeScript interfaces (Product, Cart, Theme, etc.)
└── main.tsx         # Application Entry Point
```

---

## 📊 Component Heirarchy Diagram

```
main.tsx
  │
  ▼
App.tsx (Router Provider)
  │
  ▼
Layout.tsx ──────────────────────────────────────────┐
  │                                                  │
  ├── NotificationContainer.tsx                      │
  ├── Navbar.tsx                                     │
  ├── Footer.tsx                                     │
  │                                                  │
  ▼                                                  │
[Outlet] (Dynamic Page Rendering)                    │
  │                                                  │
  ├─ Home.tsx                                        │
  │    ├── Carousel.tsx                              │
  │    ├── Features.tsx                              │
  │    └── ProductFAQ.tsx                            │
  │                                                  │
  ├─ Products.tsx                                    │
  │    ├── FilterSideBar.tsx                         │
  │    └── ProductCard.tsx (Iterated)                │
  │                                                  │
  ├─ ProductDetails.tsx (Page Controller)            │                    
  │    └── components/ProductDetails.tsx (View)      │
  │                                                  │
  ├─ Cart.tsx (Page Controller)                      │
  │    └── components/Cart.tsx (View)                │
  │                                                  │
  ├─ AboutUs.tsx                                     │
  │    ├── Information.tsx                           │
  │    └── TeamSection.tsx                           │
  │                                                  │
  ├─ ContactUs.tsx                                   │
  │    └── ContactForm.tsx                           │
  │                                                  │
  └─ NotFound.tsx (404 Page)                         │                     
                                                     │
─────────────────────────────────────────────────────┘
```