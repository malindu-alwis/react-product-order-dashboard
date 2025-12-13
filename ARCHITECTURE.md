**Architecture Document**

Inventory & Order Management Dashboard

**1. State Management Choice**

Redux Toolkit was selected as the state management solution due to its suitability for
mid-scale applications that require predictable and centralized state handling.
The application manages shared domain data such as products, orders, and UI
states (loading, errors) across multiple pages. Redux Toolkit provides:
    • Clear separation between UI and business logic
    • Built-in support for async workflows using createAsyncThunk
    • Reduced boilerplate compared to traditional Redux
    • Strong testability for reducers and async logic
Two primary slices are used:
    • Product Slice: Handles product list, filters, pagination, and update operations
    • Order Slice: Manages order data, status filtering, and sorting
Selectors are used to compute derived state (filtered and paginated data), ensuring that
components remain declarative and easy to maintain.


**2. Component Architecture**

The component structure follows a layered approach:

**Page Components**
Page-level components (e.g., ProductListPage, ProductDetailPage, OrderListPage) are
responsible for:
    • Triggering data fetching
    • Connecting to Redux state
    • Composing reusable UI components
They intentionally avoid complex business logic.

**Reusable Components**
Reusable components such as ProductCard, OrderStatusBadge, FilterPanel, and
ConfirmationDialog are:
    • Stateless where possible
    • Designed for reusability across features
    • Easy to test in isolation
    
**Layout & Context**
A consistent layout is provided using a top navigation bar and shared layout wrappers.
Theme-related state (dark/light mode) is managed via a dedicated Theme Context to avoid
polluting the global Redux store with purely UI concerns.


**3. API Integration Strategy**

API communication is handled through a centralized service layer using Axios.
Key design decisions include:
    • All HTTP logic is isolated in the services/ layer
    • Redux async thunks orchestrate API calls and state updates
    • Error handling is standardized and surfaced to the UI via Snackbar notifications
For development and testing, Mock Service Worker (MSW) is used to simulate backend APIs.
This allows:
    • Realistic async behavior
    • Independent frontend development
    • Reliable integration testing without a real backend
The architecture allows a real backend to be introduced with minimal changes.

**4. UI / UX Decisions**
Material UI (MUI) was chosen to ensure a consistent, accessible, and professional user
interface.
Key UI/UX considerations include:
    • DataGrid and Table components for efficient data presentation
    • Clear visual indicators for order statuses using color-coded badges
    • Filter panels grouped logically to reduce cognitive load
    • Snackbar feedback for success and error states
    • Optional dark/light mode to improve usability and demonstrate UI state handling
The UI prioritizes clarity, responsiveness, and ease of use, aligning with real-world
dashboard requirements.

**Summary**

This architecture emphasizes maintainability, scalability, and testability while avoiding
over-engineering. The chosen patterns and tools reflect common practices in production
React applications and support future growth with minimal refactoring.
