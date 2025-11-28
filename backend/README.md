# Portfolio & Blog API

A secure, robust, and scalable RESTful API built with Node.js, Express, and MongoDB. This API serves as the backend for a Personal Portfolio website with a full-featured Blog system.

## Features

- User authentication with JWT
- Password hashing with bcrypt
- CRUD operations for Projects, Blog Posts, and Comments
- Contact form message handling
- Protected routes with authorization
- Security middleware (Helmet)
- Central error handling

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- bcryptjs for password hashing
- Helmet for security headers

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register a new user | Public |
| POST | `/api/users/login` | Login and get JWT token | Public |
| GET | `/api/users/profile` | Get user profile | Protected |

### Projects

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create new project | Protected |
| PUT | `/api/projects/:id` | Update project | Protected |
| DELETE | `/api/projects/:id` | Delete project | Protected |

### Blog Posts

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all blog posts | Public |
| GET | `/api/blog/:id` | Get single post with comments | Public |
| POST | `/api/blog` | Create new blog post | Protected |
| PUT | `/api/blog/:id` | Update blog post | Protected (Author only) |
| DELETE | `/api/blog/:id` | Delete blog post | Protected (Author only) |

### Comments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get comments for a post | Public |
| POST | `/api/blog/:postId/comments` | Create a comment | Protected |
| DELETE | `/api/blog/:postId/comments/:commentId` | Delete a comment | Protected (Author only) |

### Contact

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Submit contact message | Public |
| GET | `/api/contact` | Get all messages | Protected |
| DELETE | `/api/contact/:id` | Delete a message | Protected |

## Request Body Examples

### Register User
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Project
```json
{
  "title": "My Project",
  "description": "A description of the project",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://project.example.com"
}
```

### Create Blog Post
```json
{
  "title": "My Blog Post",
  "content": "The content of the blog post..."
}
```

### Create Comment
```json
{
  "body": "This is a comment"
}
```

### Submit Contact Message
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to get in touch!"
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns consistent JSON error responses:
```json
{
  "message": "Error description",
  "stack": "Stack trace (development only)"
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT signing |
| NODE_ENV | Environment (development/production) |
| FRONTEND_URL | Frontend URL for CORS (production) |

## Models

### User
- username (String, required, unique)
- email (String, required, unique)
- password (String, required, min 6 chars)

### Project
- title (String, required)
- description (String, required)
- imageUrl (String, optional)
- repoUrl (String, optional)
- liveUrl (String, optional)
- user (ObjectId, ref: User)

### BlogPost
- title (String, required)
- content (String, required)
- author (ObjectId, ref: User)
- timestamps (auto-generated)

### Comment
- body (String, required)
- author (ObjectId, ref: User)
- post (ObjectId, ref: BlogPost)
- timestamps (auto-generated)

### Message
- name (String, required)
- email (String, required)
- message (String, required)
- timestamps (auto-generated)

## Deployment

This API is designed to be deployed on platforms like Render, Heroku, or Railway.

### Render Deployment
1. Create a new Web Service
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add environment variables

## License

MIT
