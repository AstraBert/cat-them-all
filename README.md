# Cat Them All 🐱

A Pokémon GO-style AR game where you catch adorable cats instead of Pokémon. Built with Expo and React Native.

## About

Cat Them All is an offline-first mobile game that uses your device's camera to display the world around you while cats briefly appear on screen. Test your reflexes and catch all 20 unique cats, each with their own personality and story!

### Features

- **AR Hunt Mode**: Uses your camera to show cats appearing in your surroundings
- **20 Unique Cats**: Catch charming cats like Amelia the sorceress, Michael the heartthrob, Arthur the loaf, and more
- **Catdex**: Track your collection and learn about each cat's unique personality
- **Offline First**: No internet required - all assets are bundled and data is stored locally with SQLite
- **Quick Reflexes**: Cats appear for only 100-400ms - tap fast to catch them!
- **Cross Platform**: Runs on iOS, Android, and web

### The Cats

The game features 20 unique cats with distinct personalities:
- **Amelia** - A paw-erful sorceress who only comes out at night
- **Michael** - The stereotypical gray cat, mysterious and irresistible
- **Arthur** - A shy, scaredy cat with unmeasured loafing powers
- **Thalia** - A rare orange-and-white princess from a faraway planet
- **Ethan** - A French gentleman artist from the Paris underground scene
- **Amber** - A secret agent for the cat paw-lice and Karate black belt
- **Ernesto** - A cat behind bars for orchestrating a cat food factory robbery
- **Patricia** - Also known as Science Cat, tells puns periodically
- **Bianca** - A tiny ghost hunter who is terrified of ghosts
- **Walter** - A gray acrobat who only performs when held up
- And 10 more unique characters!

Each cat has a unique personality description and funny catch phrase stored in a local SQLite database.

## Tech Stack

- **Framework**: [Expo](https://expo.dev) ~57.0
- **UI**: React Native 0.86 with React 19
- **Navigation**: Expo Router with typed routes
- **Camera**: expo-camera for AR functionality
- **Database**: expo-sqlite for local storage
- **Animations**: React Native Reanimated
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- pnpm (or npm/yarn)
- For iOS: Xcode and iOS Simulator
- For Android: Android Studio and Android Emulator
- For physical devices: Expo Go app

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/AstraBert/cat-them-all
   cd cat-them-all
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the development server

   ```bash
   pnpm start
   ```

4. Open the app

   - **Physical Device**: Scan the QR code with Expo Go (Android) or Camera app (iOS)
   - **Android Emulator**: Press `a` in the terminal
   - **iOS Simulator**: Press `i` in the terminal
   - **Web**: Press `w` in the terminal

### Development Commands

```bash
# Start development server
pnpm start

# Run on Android
pnpm android

# Run on iOS
pnpm ios

# Run on web
pnpm web

# Lint code
pnpm lint
```

## How to Play

1. **Grant Camera Permission**: The app needs camera access to show cats in AR
2. **Wait for Cats**: Cats appear randomly on screen for 100-400ms
3. **Tap Fast**: Tap the cat before it disappears to catch it
4. **View Collection**: Check the Catdex tab to see your caught cats
5. **Catch All 20**: Complete your collection to win!

## Game Mechanics

- **Spawn Timing**: Cats appear every 2-5 seconds (testing mode)
- **Visibility Window**: Each cat stays visible for 100-400ms
- **Collection**: Caught cats are saved to SQLite and persist between sessions
- **Progress**: Track your progress with the "X / 20 caught" counter

## Database Schema

The app uses SQLite with two tables:

**cats** - Catalog of all available cats
- `id` (TEXT): Unique identifier
- `name` (TEXT): Cat name
- `asset_path` (TEXT): Path to image asset
- `meme` (TEXT): Cat personality/lore description
- `funny_line` (TEXT): Catch phrase

**caught_cats** - Player's collection
- `cat_id` (TEXT): Reference to cat
- `caught_at` (INTEGER): Timestamp

## Customization

### Adding New Cats

1. Add the cat image to `assets/cats/`
2. Update `src/constants/cats.ts` with the new cat definition
3. The database will automatically seed the new cat on next launch

### Adjusting Difficulty

Edit `src/components/cat-spawner.tsx`:

```typescript
// How long cats stay visible (milliseconds)
const MIN_VISIBLE_MS = 100;
const MAX_VISIBLE_MS = 400;

// Time between spawns (milliseconds)
const MIN_HIDDEN_MS = 2 * 1000;  // 2 seconds
const MAX_HIDDEN_MS = 5 * 1000;  // 5 seconds
```
