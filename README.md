# Medi-line
ONE unique ID for your health, like your phone number. Any doctor, anywhere, gets your complete medical history in under 60 seconds. Your email works everywhere; so should your health records.

## Getting Started

### Prerequisites

This project uses [pnpm](https://pnpm.io/) as the package manager.

### Installation

1. Clone the repository.
2. Install the dependencies:
   ```bash
   pnpm install
   ```

### Running the Application

To run the application in development mode with hot-reloading:
```bash
pnpm dev

```
'''''''''''''''''
Project Structure
'''''''''''''''''

/
├── dist/                # Build output directory (auto-generated)
├── public/              # Static assets served directly
├── src/                 # Main source code for your application
│   ├── client/          # Frontend React application
│   └── server/          # Backend Express.js server
├── .env                 # Environment variables (not committed to git)
├── package.json         # Project dependencies and scripts
├── vite.config.ts       # Vite configuration for the client
└── vite.config.server.ts # Vite configuration for the server
