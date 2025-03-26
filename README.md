# PseudoAPI - Instant Mock API Generator

A powerful tool for frontend developers to create instant, customizable mock APIs for testing and development.

## Features

- 🚀 Instant Mock APIs: Generate dynamic GET endpoints with custom JSON responses
- 🎯 Dynamic Data Generation: Utilize FakerJS to simulate realistic data
- 👥 Easy Collaboration: Shareable endpoints for team testing
- 📊 Scalable Storage: MongoDB for efficient API configuration management
- 🔐 User Authentication: Secure access via Clerk integration
- ⚡ Performance Optimized: Rate limiting and response delay simulation
- 📝 Schema Management: Flexible and powerful schema definition system

## Tech Stack

### Frontend
- ReactJS (Vite)
- ShadCN UI
- TailwindCSS
- Clerk Authentication

### Backend
- NodeJS
- ExpressJS
- FakerJS
- MongoDB with Mongoose ODM

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Clerk Account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pseudoapi.git
cd pseudoapi
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables:

Backend (.env):
```env
PORT=3000
MONGO_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
SERVER_URL=http://localhost:3000
```

Frontend (.env):
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application at `http://localhost:5173`

## API Documentation

### Endpoints

#### Public Endpoints
- `GET /api/:apiId` - Get mock data from an API

#### Protected Endpoints (Requires Authentication)
- `POST /api/create` - Create a new API
- `PUT /api/:apiId/edit` - Edit an existing API
- `DELETE /api/:apiId/delete` - Delete an API
- `POST /api/:apiId/schema` - Define API schema
- `GET /api/:apiId/get-schema` - Get API schema
- `PUT /api/:apiId/edit-schema` - Edit API schema

### Schema Definition

Example schema:
```json
{
  "schema": [
    {
      "fieldName": "name",
      "fieldType": "faker.person.fullName",
      "description": "Full name of the person",
      "isRequired": true
    },
    {
      "fieldName": "email",
      "fieldType": "faker.internet.email",
      "description": "Email address",
      "isRequired": true
    }
  ],
  "entries": 50
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [FakerJS](https://fakerjs.dev/) for data generation
- [Clerk](https://clerk.dev/) for authentication
- [MongoDB](https://www.mongodb.com/) for database
- [ExpressJS](https://expressjs.com/) for the backend framework
- [React](https://reactjs.org/) for the frontend framework
