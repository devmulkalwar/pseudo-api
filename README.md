# -MockLabs

## Frontend
``` bash
-MockLabs/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── assets/                  # Static assets (images, icons, etc.)
│   ├── components/              # Reusable components
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard/
│   │   │   ├── ApiList.jsx
│   │   │   └── ApiForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx   # Component for protected routes
│   ├── context/                 # React Context for state management
│   │   └── AuthContext.jsx
│   ├── pages/                   # Main pages
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── About.jsx
│   │   └── Documentation.jsx
│   ├── services/                # API service functions
│   │   ├── authService.js       # Functions for login/register
│   │   └── apiService.js        # Functions for API generation
│   ├── utils/                   # Utility functions
│   │   └── helpers.js           # Helper functions (e.g., copy to clipboard)
│   ├── App.jsx                  # Main App component
│   ├── index.js                 # Entry point
│   └── styles/                  # Global styles
│       ├── global.css
│       └── theme.js             # Material UI theme configuration
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Frontend dependencies
└── README.md                    # Project documentation

```
---

## Backend
```bash
fake-api-backend/
├── config/                      # Configuration files
│   ├── db.js                    # MongoDB connection setup
│   └── jwt.js                   # JWT configuration
├── controllers/                 # Route handlers
│   ├── authController.js        # Handles login/register
│   ├── apiController.js         # Handles API generation
│   └── userController.js        # Handles user-specific APIs
├── middleware/                  # Custom middleware
│   ├── authMiddleware.js        # JWT authentication middleware
│   └── errorHandler.js          # Global error handler
├── models/                      # MongoDB models
│   ├── User.js                  # User schema
│   └── Api.js                   # API schema
├── routes/                      # API routes
│   ├── authRoutes.js            # Routes for authentication
│   ├── apiRoutes.js             # Routes for API generation
│   └── userRoutes.js            # Routes for user-specific APIs
├── services/                    # Business logic
│   ├── authService.js           # Logic for login/register
│   ├── apiService.js            # Logic for API generation
│   └── userService.js           # Logic for user-specific APIs
├── utils/                       # Utility functions
│   ├── fakerUtils.js            # Faker.js data generation logic
│   └── validation.js            # Input validation
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── app.js                       # Main Express app
├── server.js                    # Server entry point
├── package.json                 # Backend dependencies
└── README.md                    # Project documentation
```
---
