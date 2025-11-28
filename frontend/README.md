# Portfolio & Blog Frontend

A modern, responsive Personal Portfolio website built with React. Features a clean Apple-inspired design with green and red accents.

## Live Demo

- Frontend: [Your Vercel/Netlify URL]
- Backend API: [Your Render/Heroku URL]

## Features

- Responsive Apple-inspired design
- User authentication (Register/Login/Logout)
- Public pages: Home, Projects, Blog, Contact
- Protected Admin Dashboard
- CRUD operations for Projects and Blog Posts
- Comment system on blog posts
- Contact form
- JWT-based authentication
- Context API for global state management

## Tech Stack

- React 18
- React Router v6
- Axios for API calls
- Context API for state management
- CSS with Apple Design System

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProtectedRoute.jsx
│   ├── ProjectCard.jsx
│   └── BlogPostCard.jsx
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── Blog.jsx
│   ├── BlogDetail.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Admin.jsx
├── services/
│   └── api.js
├── App.jsx
├── App.css
└── main.jsx
```

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Pages

### Public Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero section and about |
| `/projects` | Project gallery |
| `/blog` | Blog posts list |
| `/blog/:id` | Single blog post with comments |
| `/contact` | Contact form |
| `/login` | User login |
| `/register` | User registration |

### Protected Routes

| Route | Description |
|-------|-------------|
| `/admin` | Admin dashboard for managing content |

## Features by Page

### Home (/)
- Hero section with animated gradient shape
- About me section
- Skills showcase
- Call-to-action section

### Projects (/projects)
- Grid layout of project cards
- Project images, descriptions, and links
- Responsive design

### Blog (/blog)
- List of blog posts with excerpts
- Author and date information
- Click to read full post

### Blog Detail (/blog/:id)
- Full blog post content
- Comment section
- Add comments (authenticated users)

### Contact (/contact)
- Contact form with validation
- Success/error messages
- Contact information cards

### Admin Dashboard (/admin)
- Tabbed interface (Projects, Blog, Messages)
- Create, edit, delete projects
- Create, edit, delete blog posts
- View and delete contact messages
- Modal forms for editing

## Authentication Flow

1. User registers/logs in
2. JWT token stored in localStorage
3. Token sent with protected API requests
4. Auth context manages user state
5. Header updates based on auth status
6. Protected routes redirect to login

## API Integration

The frontend communicates with the backend API using Axios. All API calls are centralized in `src/services/api.js`.

## Styling

The design follows Apple's Human Interface Guidelines with:
- Clean, minimal aesthetic
- SF Pro Display font family
- Green (#34c759) as primary color
- Red (#ff3b30) as accent color
- Subtle shadows and animations
- Responsive breakpoints

## Environment Variables

| Variable | Description |
|----------|-------------|
| VITE_API_URL | Backend API base URL |

## Deployment

### Vercel
1. Connect your GitHub repository
2. Set the root directory to `frontend`
3. Framework preset: Vite
4. Add environment variables
5. Deploy

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

### Production Environment Variable
```
VITE_API_URL=https://your-backend-url.com/api
```

## Connecting to Backend

Make sure your backend is running and accessible. Update the `VITE_API_URL` environment variable to point to your backend API:

- Development: `http://localhost:5000/api`
- Production: `https://your-deployed-backend.com/api`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
