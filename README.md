# DevNotes

A full-stack note-taking and knowledge management application built to deeply understand backend architecture, authentication systems, database design, and scalable web application development.

This project is not intended to be a perfect production-ready application from day one.  
Its primary goal is learning through building, debugging, optimization, experimentation, and developer feedback.

---

# Project Philosophy

Instead of heavily relying on tutorials or abstractions, this project focuses on understanding how things work internally:

- Authentication flow
- JWT handling
- Cookies and sessions
- PostgreSQL database structure
- API architecture
- Input validation
- Frontend/backend communication
- Performance optimization
- Security considerations
- Scalable project organization

A large part of this project is intentionally being built manually to better understand the fundamentals of full-stack development.

---

# Current Features

## Authentication
- User signup
- User login
- JWT token generation
- Cookie-based authentication
- Protected route preparation
- Password hashing using bcrypt

## Validation System
- Email validation
- Username validation
- Password strength validation
- Phone number validation
- Debounced frontend validation requests
- Duplicate user checking through PostgreSQL

## Backend
- Express.js server
- REST-style API routes
- PostgreSQL integration
- Environment variable configuration
- Cookie parsing middleware

## Frontend
- Vanilla JavaScript frontend
- Dynamic validation feedback
- Debounced API calls
- Form validation logic
- Basic responsive UI structure

---

# Tech Stack

## Frontend
- HTML
- CSS
- Vanilla JavaScript

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

## Authentication & Security
- JWT
- bcrypt
- cookie-parser

## Tooling
- Webpack
- dotenv

---

# Folder Structure

```bash
DevNotes/
│
├── Public/
│   ├── bundle.js
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   └── style.css
│
├── src/
│   ├── index.js
│   └── signup-login.js
│
├── server.js
├── webpack.config.js
├── package.json
└── .gitignore
```

---

# Learning Goals

This project exists mainly to improve my understanding of:

- Backend architecture
- Database optimization
- Authentication systems
- Secure API design
- HTTP fundamentals
- PostgreSQL relationships
- Full-stack debugging
- Application scalability
- Project organization
- Clean code structure

---

# Planned Features

## Notes System
- Create notes
- Edit notes
- Delete notes
- View individual notes
- View all notes

## Organization
- Tags
- Categories/Folders
- Filtering system

## Search
- Search by title
- Search by content
- Advanced filtering

## Dashboard
- Grid-based notes UI
- Card previews
- List/grid toggle

## Advanced Features
- Real-time updates
- Performance optimization
- Caching
- Security improvements
- Pagination
- Favorites system
- Archive system

---

# Current Technical Debt / Known Issues

This project is still under active development and intentionally experimental in some areas.

Known areas that need improvement:

- Better authentication middleware
- Improved cookie security settings
- More scalable backend structure
- Better frontend modularization
- Cleaner validation architecture
- Improved error handling
- Route protection system
- Better state management
- Rate limiting
- CSRF protection
- Refresh token system

---

# Feedback & Criticism Welcome

One of the primary goals of this project is learning through real developer feedback.

I highly encourage criticism and suggestions regarding:

- Backend architecture
- Security flaws
- Authentication flow
- Database design
- Validation logic
- API structure
- Naming conventions
- Code quality
- Scalability concerns
- Optimization opportunities

If you notice bad practices or beginner mistakes, please point them out openly.  
That feedback is extremely valuable for improving both the project and my understanding of software engineering.

---

# Why Vanilla JavaScript?

This project intentionally uses Vanilla JavaScript for many core features before moving into larger frontend frameworks.

The goal is to first understand:
- DOM manipulation
- Event handling
- HTTP requests
- Application flow
- State handling
- Frontend architecture fundamentals

before abstracting those concepts through frameworks.

---

# Setup Instructions

## Clone Repository

```bash
git clone <your-repository-url>
cd DevNotes
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
JWT_SECRET=your_secret_key
```

## Start Server

```bash
node server.js
```

---

# Future Direction

This project will continue evolving into a more complete knowledge management system while maintaining focus on learning backend engineering principles and scalable architecture.

Future improvements may include:
- TypeScript migration
- Better project structure
- Docker support
- Testing infrastructure
- CI/CD pipelines
- Better deployment workflow
- Advanced PostgreSQL optimization
- Realtime collaboration

---

# Disclaimer

This project is currently a learning-focused application and should not yet be considered production-ready.

Security, scalability, and architecture are continuously being improved as I learn more throughout the development process.

---

# License

Open for learning, experimentation, and feedback.