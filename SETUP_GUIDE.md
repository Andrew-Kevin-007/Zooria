# Zooria - Setup & Build Guide

## Prerequisites

- Node.js 16+ 
- npm 8+
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on mobile device (iOS App Store or Google Play Store)

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your Firebase credentials
# Get values from: https://console.firebase.google.com
```

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or use existing one
3. Add Web app in Project Settings
4. Copy the configuration values
5. Update `.env` file with your credentials

### Firebase CLI (Rules Deploy)

```bash
# Login once
npm run firebase:login

# Deploy Firestore rules and indexes (works on free plan)
npm run firebase:deploy:core

# Deploy Storage rules (requires Storage to be enabled in Firebase Console)
npm run firebase:deploy:storage
```

### Important: Firebase Storage Billing

If Firebase shows "To use Storage, upgrade your project's pricing plan", it means
Cloud Storage is not available on your current plan for this project.

You can continue development with Auth + Firestore and skip Storage deploy until you upgrade.

To enable Storage later:
1. Upgrade project to Blaze plan (billing account required)
2. Open Firebase Console → Storage → Get Started
3. Run `npm run firebase:deploy:storage`

## Development

```bash
# Start Expo dev server
npm start

# In the terminal, press:
# - 'w' for web browser
# - 'a' for Android emulator
# - 'i' for iOS simulator
# - Scan QR code with Expo Go app

# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

## Project Architecture

```
src/
├── components/        # Reusable UI components
│   ├── common/       # Shared components (ErrorBoundary, etc)
│   ├── cards/        # Card components
│   └── forms/        # Form components
├── screens/          # Screen components for navigation
├── services/         # External services (Firebase, APIs)
├── store/            # Redux state management
├── types/            # TypeScript type definitions
├── constants/        # App constants, theme colors
├── config/           # Configuration files
├── hooks/            # Custom React hooks
└── utils/            # Utility functions
```

## Build & Deploy

```bash
# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Publish to Expo
eas submit
```

## Important Notes

- **Firebase Keys**: Never commit `.env` file. Always use environment variables.
- **Error Handling**: App includes ErrorBoundary to catch runtime errors gracefully.
- **TypeScript**: Strict mode enabled for type safety.
- **Code Quality**: ESLint and Prettier enforce code standards automatically.

## Troubleshooting

### Port 8081 already in use
```bash
# On Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# On macOS/Linux
lsof -ti:8081 | xargs kill -9
```

### Cache issues
```bash
npm start -- -c  # Clear cache and rebuild
```

### Dependencies not found
```bash
rm -rf node_modules package-lock.json
npm install
```

## Resources

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Firebase Docs](https://firebase.google.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
