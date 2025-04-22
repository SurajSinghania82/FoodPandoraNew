# Food Safety API

A comprehensive API for food safety and nutritional data management.

## Prerequisites

- Node.js (v18 or higher)
- Microsoft SQL Server (2019 or higher)
- npm or yarn

## Setup

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/food-safety-api.git
   cd food-safety-api
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the database connection details and other settings

4. Run database migrations:
   \`\`\`bash
   npm run migrate
   \`\`\`

5. Seed the database with initial data:
   \`\`\`bash
   npm run seed
   \`\`\`

6. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

   For development with auto-reload:
   \`\`\`bash
   npm run dev
   \`\`\`

## Database Setup

### Microsoft SQL Server

1. Create a new database:
   \`\`\`sql
   CREATE DATABASE [food-pandora];
   \`\`\`

2. Make sure your SQL Server user has appropriate permissions to create tables and indexes.

3. Update the `.env` file with your SQL Server connection details.

## API Documentation

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/api-key` - Generate API key
- `GET /api/auth/verify` - Verify JWT token

### Ingredients

- `GET /api/ingredients` - Get all ingredients (paginated)
- `GET /api/ingredients/:id` - Get ingredient by ID
- `GET /api/ingredients/:id/nutrition` - Get detailed nutrition data
- `POST /api/ingredients` - Create new ingredient (admin only)
- `PUT /api/ingredients/:id` - Update ingredient (admin only)
- `DELETE /api/ingredients/:id` - Delete ingredient (admin only)
- `POST /api/ingredients/batch` - Batch get ingredients
- `POST /api/ingredients/bulk` - Bulk upload ingredients (admin only)

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin or self)
- `POST /api/users` - Create new user (admin only)
- `PUT /api/users/:id` - Update user (admin or self)
- `DELETE /api/users/:id` - Delete user (admin only)
- `POST /api/users/:id/reset-tokens` - Reset user's token usage (admin only)
- `POST /api/users/:id/token-limit` - Update user's token limit (admin only)

### Token Usage

- `GET /api/token-usage/me` - Get token usage for current user
- `GET /api/token-usage/all` - Get token usage for all users (admin only)
- `GET /api/token-usage/user/:userId` - Get token usage for specific user (admin only)

## Default Admin Account

- Email: admin@foodpandora.com
- Password: admin123

## License

MIT

# Food Safety Frontend

This is the frontend application for the Food Safety API. It's built with Next.js and provides a user interface for managing food safety data.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Food Safety API running on http://localhost:5000

## Setup

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/food-safety-frontend.git
   cd food-safety-frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env.local` file with the following content:
   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Routes

- `/` - Home page
- `/login` - Login and registration page
- `/dashboard` - User dashboard
- `/admin/dashboard` - Admin dashboard
- `/admin/ingredients` - Ingredient management

## Default Admin Account

- Email: admin@foodpandora.com
- Password: admin123

## License

MIT
