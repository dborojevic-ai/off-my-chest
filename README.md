# Off My Chest

A Next.js application for sharing and browsing anonymous posts. A safe space where people can express their thoughts, feelings, and experiences without judgment.

## 🌟 Features

- **Beautiful Landing Page**: Welcoming interface with three main action buttons
- **Anonymous Posting**: Share thoughts without any identifying information
- **Search Functionality**: Find posts by keywords, topics, or emotions
- **Browse Posts**: Explore community posts with responsive design
- **Real-time API**: Fast PostgreSQL-backed REST API
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Works beautifully on desktop and mobile

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 16 with pg client
- **Styling**: Tailwind CSS with dark mode support
- **Development**: ESLint, TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9
- PostgreSQL >= 14

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd off-my-chest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   ```bash
   # Create database
   sudo -u postgres createdb offmychest
   
   # Create user (replace with your credentials)
   sudo -u postgres psql -c "CREATE USER tinky WITH PASSWORD 'your_password';"
   
   # Grant privileges
   sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE offmychest TO tinky;"
   
   # Create posts table
   sudo -u postgres psql -d offmychest -c "CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, title TEXT NOT NULL, body TEXT NOT NULL, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW());"
   
   # Grant table privileges
   sudo -u postgres psql -d offmychest -c "GRANT ALL PRIVILEGES ON TABLE posts TO tinky; GRANT USAGE, SELECT ON SEQUENCE posts_id_seq TO tinky;"
   ```

4. **Configure environment variables**
   Create a `.env.local` file in the project root:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=tinky
   DB_PASSWORD=your_password
   DB_NAME=offmychest
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page with three action buttons
│   ├── search/page.tsx       # Search posts page
│   ├── browse/page.tsx       # Browse all posts page
│   ├── new/page.tsx          # Create new post page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       ├── content/route.ts  # GET/POST for posts
│       └── search/route.ts   # GET for searching posts
├── components/
│   ├── ui/                   # Reusable UI components
│   └── forms/                # Form components
├── database/
│   └── config.ts             # PostgreSQL connection setup
├── types/
│   └── post.ts               # TypeScript type definitions
├── lib/                      # Server-side utilities
└── utils/                    # Client-side utilities
```

## 🔌 API Endpoints

### Content API (`/api/content`)
- **GET**: Retrieve posts with pagination
  - Query params: `limit` (default: 10), `offset` (default: 0)
  - Response: `{ success: boolean, data: { posts: Post[], count: number } }`

- **POST**: Create new post
  - Body: `{ title: string, body: string }`
  - Response: `{ success: boolean, data: Post }`

### Search API (`/api/search`)
- **GET**: Search posts by title or content
  - Query params: `q` (required), `limit`, `offset`
  - Response: `{ success: boolean, data: { posts: Post[], count: number } }`

## 🗄 Database Schema

### Posts Table
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎨 Design Features

- **Modern UI**: Clean, accessible design with Tailwind CSS
- **Dark Mode**: Automatic dark/light mode support
- **Responsive**: Works on all screen sizes
- **Hover Effects**: Interactive buttons with smooth animations
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Comprehensive error messages

## 🔧 Development

### Available Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Code Style
- ESLint configuration included
- TypeScript strict mode enabled
- Import aliases: `@/*` maps to `src/*`

## 🚦 Testing the Application

1. **Test Database Connection**:
   ```bash
   # The app will automatically test the connection on startup
   npm run dev
   ```

2. **Test API Endpoints**:
   ```bash
   # Get all posts
   curl http://localhost:3000/api/content
   
   # Create a new post
   curl -X POST http://localhost:3000/api/content \
     -H "Content-Type: application/json" \
     -d '{"title":"Test Post","body":"This is a test message"}'
   
   # Search posts
   curl "http://localhost:3000/api/search?q=test"
   ```

## 🔐 Security & Privacy

- **Anonymous Posts**: No user identification or tracking
- **Environment Variables**: Sensitive data stored securely
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries

## 📝 License

TBD - To be determined based on project requirements
