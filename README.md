# Inventory & Order Management Dashboard

## Overview
This project is a mid-scale React application built as part of a Senior Software Engineer
technical assessment. It demonstrates real-world frontend architecture, state management,
API integration, and testing practices commonly used in production React applications.

The application allows managing products and orders through a clean, responsive dashboard
with filtering, pagination, and status management features.

---

## Key Features

### Product Management
- Product list displayed using Material UI DataGrid
- Search by product name
- Filter by category
- Filter by price range
- Client-side pagination with justification for mid-scale datasets
- Product detail page with:
  - Full product information
  - Stock quantity update
  - Active / inactive status toggle
  - PATCH-based update flow

### Order Management
- Orders fetched from a separate API endpoint
- Table view with sorting and filtering
- Status badges for:
  - Pending
  - Shipped
  - Delivered
  - Cancelled

### UI / UX
- Consistent layout with top navigation bar
- Reusable UI components
- Dark / light mode toggle
- Snackbar notifications for success and error states

---

## Tech Stack

- **React 18 + TypeScript**
- **Redux Toolkit** (state management)
- **Redux Async Thunks** (API calls)
- **Material UI (MUI)** for UI components
- **React Router v6**
- **MSW (Mock Service Worker)** for API mocking
- **Jest + React Testing Library** for testing

---

## Project Structure

The project follows a clear and maintainable structure designed for scalability:

src/
├── app/              # Application bootstrap and routing
├── redux/            # Redux store configuration only
├── features/         # Domain-based Redux logic
├── services/         # API layer and HTTP clients
├── pages/            # Route-level screens
├── components/       # Reusable presentational components
├── hooks/            # Reusable hooks and typed Redux hooks
├── layout/           # Application shell (sidebar, topbar)
├── theme/            # MUI theme and dark/light mode
├── mocks/            # MSW mock server and handlers
├── tests/            # Unit and integration tests
└── assets/           # Static assets


## State Management

- Redux Toolkit slices manage **products** and **orders**
- Async thunks handle all API communication
- Selectors are used for derived state (filters, pagination)
- UI components remain mostly stateless and declarative

---

## API Strategy

- Axios is used through a centralized API client
- All network calls are isolated in the `services/` layer
- MSW simulates backend APIs during development and testing
- This allows realistic async behavior without relying on a real backend

---

## Testing Strategy

The project includes both unit and integration tests:

- Redux slice logic tests
- Async thunk behavior tests
- Page-level integration tests with MSW
- User interaction tests using React Testing Library

Testing focuses on **behavior**, not implementation details.

---

## Running the Project

```bash
npm install
npm run dev
npm test
