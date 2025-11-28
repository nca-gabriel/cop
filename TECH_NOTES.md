## 1. What Was Built

- A minimal Customer Portal POC built with Next.js (frontend) and Express.js (backend).
- Users can:
  - Log in via email and phone number
  - View a list of their bookings
  - Access details of a specific booking
  - View associated file attachments (mocked)
  - Send messages related to a booking (persisted in MongoDB)
- Integration with ServiceM8 API for real booking data.
- MongoDB used for storing messages.

---

## 2. Reasoning Behind the Approach

- **Next.js**: Rapid frontend development, SSR where needed, easy routing.
- **Express.js**: Simple, lightweight backend to handle API requests and messaging endpoints.
- **MongoDB**: Lightweight persistence, easy to set up locally, works well with JSON data.
- **Tailwind CSS**: Minimal and fast styling for UI components.
- **Axios**: For API calls to both ServiceM8 and internal backend endpoints.
- **JWT**: Simple token-based authentication structure.

---

## 3. Assumptions Made

- Users are pre-registered; login is simplified to email and phone.
- Attachments are mocked; no real file upload/download implemented.
- Messages are persisted in MongoDB, while bookings are fetched live from ServiceM8 API.
- ServiceM8 API key is provided via environment variables.
- No full authentication flow was required for MVP.

---

## 4. Potential Improvements

- Add full authentication and JWT-based session management.
- Persist attachments with real file storage.
- Add pagination, search, and filtering for bookings and messages.
- Enhance error handling, notifications, and validation.
- Improve UI/UX design and responsive behavior.
- Add unit/integration tests for backend and frontend components.

---

## 5. How AI Assisted Workflow

- Debugged frontend issues (`useEffect`, state handling).
- Generated boilerplate code for backend routes and frontend components.
- Suggested best practices for integrating ServiceM8 API.
- Drafted README and TECH_NOTES content for submission clarity.
- Provided guidance on MongoDB setup instructions.
