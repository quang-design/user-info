# User Agent Poetry Generator

A sophisticated visitor information collection system that transforms user data into beautiful poetry using AI. Built with SvelteKit 5, TypeScript, and OpenAI integration.

## 🎭 What It Does

This application collects comprehensive visitor information from both server-side and client-side sources, then uses AI (styled as David Whyte) to transform that technical data into poetic verse. Each piece of user information becomes a line of poetry, creating a unique artistic interpretation of digital presence.

## ✨ Features

### Server-Side Data Collection

- **IP Geolocation**: Location data using ipapi.co service
- **Browser & OS Detection**: Parsed from user agent strings
- **Request Headers**: Referer, language preferences, encoding
- **Session Management**: Secure cookie-based session tracking
- **URL Analysis**: Full URL, pathname, and search parameters
- **Security Headers**: DNT (Do Not Track), cache control, etc.

### Client-Side Data Collection

- **Screen Information**: Dimensions, color depth, device pixel ratio
- **Viewport Data**: Size and responsive breakpoint detection
- **Browser Capabilities**: Feature detection and performance metrics
- **Memory Usage**: Available system memory information
- **Connection Details**: Network connection type (when available)
- **Device Classification**: Mobile, tablet, or desktop detection
- **Time Tracking**: Session duration and page visibility changes
- **Locale Information**: Timezone and language preferences

### AI Poetry Generation

- **OpenAI Integration**: Uses GPT-4.1 for content generation
- **David Whyte Style**: Emulates the renowned poet's voice
- **Markdown Output**: Formatted with title (h1) and structured content
- **Real-time Rendering**: Streaming text effects with custom attachments

## 🛠 Tech Stack

- **Framework**: SvelteKit 5 with TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: OpenAI GPT-4.1
- **Package Manager**: pnpm
- **Additional Libraries**:
  - `marked` for Markdown parsing
  - `animejs` for animations
  - Custom text streaming attachments

## 🚀 Getting Started

### Prerequisites

- Node.js (latest LTS version)
- pnpm package manager
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd user-agent
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:5173`

### Production Build

```bash
pnpm build
pnpm preview
```

## 📁 Project Structure

```
src/
├── hooks.server.ts          # Server-side visitor data collection
├── routes/
│   ├── +page.svelte         # Main poetry display page
│   ├── +page.server.ts      # AI poetry generation logic
│   └── test/                # Testing routes
├── lib/
│   ├── ai/
│   │   └── openai.ts        # OpenAI integration
│   └── attachments/
│       └── text-streaming.ts # Custom text rendering effects
└── app.html                 # Root HTML template
```

## 🔧 Configuration

### Server-Side Hooks

The `hooks.server.ts` file in the `src/` directory (not `src/routes/`) contains the main visitor information collection logic. It:

- Collects IP addresses and performs geolocation lookups
- Parses user agent strings for browser/OS detection
- Manages secure session cookies
- Extracts request headers and URL parameters
- Sets `event.locals.user` for page load functions

### AI Integration

The system uses OpenAI's GPT-4.1 model with a specific prompt that:

- Adopts David Whyte's poetic style
- Transforms each line of user data into poetry
- Returns structured Markdown with title and content
- Maintains artistic coherence while being informative

## 🎨 Features in Detail

### Data Collection Architecture

The application uses a two-tier data collection system:

1. **Server-Side** (`hooks.server.ts`): Collects data available during the HTTP request
2. **Client-Side** (`client-info.svelte`): Gathers browser-specific information after page load

### Privacy & Security

- Session management with secure, HTTP-only cookies
- Respects Do Not Track (DNT) headers
- IP geolocation with fallback for development environments
- No persistent storage of personal data

### Text Streaming Effects

Custom Svelte 5 attachments provide smooth text rendering effects, creating an engaging user experience as the AI-generated poetry appears on screen.

## 🚦 Development

### Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm preview` - Preview production build
- `pnpm check` - Run TypeScript checks
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Code Quality

The project uses:

- **ESLint** with TypeScript and Svelte plugins
- **Prettier** with Svelte and Tailwind plugins
- **TypeScript** for type safety
- **Svelte 5** with modern reactivity patterns

## 🌐 Deployment

The application uses `@sveltejs/adapter-auto` which automatically selects the appropriate adapter for your deployment platform. Popular options include:

- **Vercel**: Zero-config deployment
- **Netlify**: Static site generation
- **Node.js**: Server-side rendering
- **Cloudflare Pages**: Edge deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the existing code style
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and not licensed for public use.

## 🔮 Future Enhancements

- Real-time visitor analytics dashboard
- Multiple AI poet personalities
- Interactive poetry customization
- Enhanced client-side data collection
- Performance monitoring integration

---

_Transform your digital footprint into art. Every visitor becomes a verse._
