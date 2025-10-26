# TODO for Adding Login and Register Pages with Full Frontend and Backend

## Backend
- [ ] Add bcryptjs and jsonwebtoken dependencies to backend/package.json
- [ ] Update backend/models/User.js to hash passwords before saving and add password verification method
- [ ] Add register and login routes in backend/routes/authRoutes.js
- [ ] Update backend/server.js to include authRoutes and JWT middleware for protected routes

## Frontend
- [ ] Add react-router-dom dependency to frontend/package.json
- [ ] Create frontend/src/components/Login.jsx component
- [ ] Create frontend/src/components/Register.jsx component
- [ ] Update frontend/src/App.jsx to use react-router-dom for routing and manage authentication state
- [ ] Update frontend/src/components/Navbar.jsx to show login/logout buttons and user info
- [ ] Protect dashboard and chatbot routes to require login

## Testing
- [ ] Test registration, login, logout flows
- [ ] Test access control to protected routes
- [ ] Ensure existing dashboard and chatbot functionality is not broken
