# Star Wars AI Agent

An AI-powered Star Wars data explorer built with Next.js 16, Vercel AI SDK, and SWAPI (Star Wars API). Explore characters, planets, starships, and vehicles with an intelligent AI assistant that can answer questions about the Star Wars universe.

## ✨ Features

- **AI-Powered Chat Assistant** - Ask natural language questions about Star Wars data
- **Characters Explorer** - Browse and view detailed information about Star Wars characters
- **Planets Explorer** - Explore planets with climate, terrain, and population data
- **Vehicles & Starships Explorer** - Discover starships and vehicles with technical specifications
- **Dashboard** - Overview with galaxy statistics and top-ranked vehicles
- **Context-Aware AI** - AI responses adapt based on the current page you're viewing
- **Real-Time Streaming** - AI responses stream in real-time for better UX

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **AI SDK**: Vercel AI SDK with OpenAI
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Data Source**: [SWAPI (Star Wars API)](https://swapi.dev/)

## 📋 Prerequisites

- Node.js 24.8.0 or higher
- npm, yarn, pnpm, or bun
- OpenAI API key

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/arielvainstein/swapi-agent
cd swapi-agent
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
```

**Note**: Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
swapi-agent/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Dashboard
│   │   ├── characters/   # Characters explorer
│   │   ├── planets/      # Planets explorer
│   │   └── vehicles/     # Vehicles & starships explorer
│   ├── components/
│   │   ├── ui/           # shadcn/ui components
│   │   ├── chat/         # AI chat components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── explorers/    # Explorer page components
│   │   └── shared/       # Shared components
│   ├── lib/
│   │   ├── api/          # SWAPI client and services
│   │   ├── ai/           # AI agent configuration and tools
│   │   └── types/        # TypeScript type definitions
│   └── actions/          # Server actions
└── components.json       # shadcn/ui configuration
```

## 🎯 Key Features Explained

### AI Chat Assistant

The floating chat bubble (accessible from any page) allows you to:
- Ask questions in natural language
- Get responses powered by real SWAPI data
- Receive context-aware answers based on your current page
- See streaming responses in real-time

### Data Explorers

Each explorer (Characters, Planets, Vehicles) provides:
- List view with cards showing key information
- Detail pages with comprehensive data
- Click-to-navigate functionality
- Responsive grid layouts

### Dashboard

The main dashboard displays:
- Total character count
- Total planet count
- Top 3 ranked vehicles/starships
- Quick actions to explore data

## 🔧 Configuration

### AI Model

The default AI model is `gpt-4o-mini`. You can change this in `src/lib/ai/config.ts`:

```typescript
export const AI_CONFIG = {
  model: openai("gpt-4o-mini"), // Change to gpt-4o for more power
  temperature: 0.7,
  maxTokens: 2000,
};
```

### Caching

SWAPI responses are cached in-memory for 5 minutes to reduce API calls. Cache duration can be adjusted in `src/lib/api/swapi-client.ts`.

## 📚 API Information

This app uses the [SWAPI (Star Wars API)](https://swapi.dev/), a free, open API that provides:
- Characters (People)
- Planets
- Starships
- Vehicles
- Films
- Species

All data is fetched from `https://swapi.dev/api/`

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your `OPENAI_API_KEY` as an environment variable
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/swapi-agent)

## 📝 Notes

- The AI chat requires a valid OpenAI API key to function
- SWAPI is a free API with no authentication required
- All AI responses are generated using real-time data from SWAPI
- The app uses in-memory caching to optimize performance
