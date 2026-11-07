# Nestle Congress App

**Nestle Congress** is a demo medical congress mobile application built with **React Native 0.88.1** and **TypeScript**, following **Clean Architecture** with **modularization** by feature layers (domain, data, presentation).

The app provides attendees with quick access to congress tools including live voting, Q&A, resources, agenda, speakers, name tag, and venue information — all localized in English (LTR) and Arabic (RTL).

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Run on Android](#run-on-android)
  - [Run on iOS](#run-on-ios)
- [Android Production Keystore](#android-production-keystore)
- [Features by Screen](#features-by-screen)
- [Authentication](#authentication)
- [Localization (i18n)](#localization-i18n)
- [Environment & Logging](#environment--logging)
- [Obfuscation](#obfuscation)
- [Data Disclaimer](#data-disclaimer)
- [Additional Notes](#additional-notes)
- [Scripts](#scripts)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React Native | 0.88.1 |
| Language | TypeScript | ^6.0.3 |
| React | React | 19.3.0 |
| Navigation | React Navigation (Native Stack + Bottom Tabs) | ^7.x |
| State | React Context + hooks | — |
| HTTP Client | Axios | ^1.21.0 |
| Localization | i18next + react-i18next + react-native-localize | ^26.7 / ^17.1 / ^3.7 |
| Secure Storage | react-native-encrypted-storage | ^4.0.3 |
| Async Storage | @react-native-async-storage/async-storage | ^3.1.1 |
| Icons | lucide-react-native | ^1.69.0 |
| Styling | react-native-linear-gradient | ^2.8.3 |
| Maps / Web | react-native-webview | ^14.0.1 |
| File Download | react-native-blob-util | ^0.25.1 |
| Share | react-native-share | ^12.3.1 |
| Testing | Jest | ^29.6.3 |
| Lint | ESLint | ^8.19.0 |
| Code Formatter | Prettier | 2.8.8 |

---

## Architecture

The project follows **Clean Architecture** with **modularization** organized by feature domains under `src/features/`, with shared core utilities under `src/core/`.

```
src/
├── core/
│   ├── auth/
│   ├── components/
│   ├── config/
│   ├── localization/
│   ├── network/
│   ├── storage/
│   ├── theme/
│   └── utils/
└── features/
    ├── auth/
    ├── home/
    └── quickAccess/
        ├── data/
        ├── domain/
        └── presentation/
```

Each feature is self-contained with its own data, domain, and presentation layers, promoting separation of concerns and scalability.

---

## Getting Started

### Prerequisites

- **Node.js** >= 22.11.0
- **Yarn** or **npm**
- **Watchman** (macOS)
- **Xcode** (for iOS development, macOS only)
- **Android Studio** with Android SDK (for Android development)
- **JDK 17** (for Android)
- **CocoaPods** (for iOS dependency installation)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/HoorAOA/NestleCongressApp.git
cd NestleCongressApp
npm install
# or
yarn install
```

For iOS, install CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

### Run on Android

```bash
npm run android
# or
yarn android
```

Ensure an Android emulator is running or a physical device is connected with USB debugging enabled.

### Run on iOS

```bash
npm run ios
# or
yarn ios
```

Ensure you have an iOS simulator configured in Xcode or a physical device connected.

---

## Android Production Keystore

To build a signed production APK/AAB for Android, you need to create and configure a keystore.

### 1. Generate a Keystore

Run the following command (replace `nestlecongress` with your preferred alias/keystore name):

```bash
keytool -genkey -v -keystore nestlecongress-upload-key.keystore \\
  -alias nestlecongress-upload-key -keyalg RSA -keysize 2048 -validity 10000
```

This will prompt you for keystore password, key password, name, organizational unit, organization, city, state, and country code.

### 2. Add Keystore to the Android Project

Place the generated `.keystore` file inside:

```
android/app/nestlecongress-upload-key.keystore
```

### 3. Configure Signing in `android/app/build.gradle`

Add the following to your `android/app/build.gradle` inside the `android` block:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file("nestlecongress-upload-key.keystore")
            storePassword "your-store-password"
            keyAlias "nestlecongress-upload-key"
            keyPassword "your-key-password"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

> ⚠️ **Security:** Do not commit passwords directly to version control. Use environment variables or a `gradle.properties` file (added to `.gitignore`) to inject `storePassword` and `keyPassword`.

### 4. `android/gradle.properties`

```gradle
# Memory: this is what fixes the OutOfMemoryError
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

# Gradle behavior
org.gradle.daemon=true
org.gradle.parallel=false

# AndroidX (required by React Native)
android.useAndroidX=true
android.enableJetifier=true

# Architectures to build (remove ones you don't need to speed up the build)
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64

# New Architecture (set to false if you haven't migrated)
newArchEnabled=true

# Hermes
hermesEnabled=true

# Your existing lines
android.builtInKotlin=false
android.newDsl=false
```

### 5. Build the Release APK / AAB

```bash
cd android
./gradlew assembleRelease        # APK
# or
./gradlew bundleRelease          # AAB (for Play Store)
cd ..
```

Output artifacts will be in `android/app/build/outputs/`.

---

## Features by Screen

### Authentication
- **Splash** — Branding, language/direction init, auth check, auto-route
- **Login** — Interactive validation, dummy Axios API login with status-code error handling, demo creds `emilys` / `emilyspass`, social login
- **Register** — Name, email, org, password, consent checkbox, social sign-up

### Home & Navigation
- **MainTabs** — Bottom tabs: Home, Profile
- **Home** — Welcome, search, quick-access tool cards, upcoming sessions, featured event banner
- **Profile** — Settings, language (EN/AR), email/phone/location, sessions, saved, certificates

### Quick Access Tools
- **Quick Access** — Searchable tool cards by category; route to Agenda, Speakers, Name Tag, Venue, Voting, Ask Q&A, Resources
- **Agenda** — Day tabs, session cards, category filters
- **Speakers** — Expert cards (name, role, country, topic), category filters, search
- **Name Tag** — Digital badge with name, initials, badge ID, location, dates; share/save
- **Venue** — HTML map view, external map redirection, venue details, facility cards (Wi-Fi, Parking, Catering, Accessible)

### Interactive Tools (Added Screens)
- **Live Voting** — Live polls with paging, LIVE/VOTED status, vote percentages & counts, prev/next navigation, submit + review, RTL-aware
- **Ask Q&A** — Submit questions (min 10 chars), categories (General/Nutrition/Research/Clinical), sort (Popular/Recent/Answered), upvote/reply, answered badge
- **Resources** — Congress library (PDF/Slides/Videos), search, filter chips, download (idle/downloading/done), save/bookmark, empty states

---

## Authentication

- **Demo credentials:** `emilys` / `emilyspass`
- **Validation:** Interactive real-time field validation (username ≥ 3 chars, password ≥ 6 chars)
- **API:** Dummy API login call via Axios with centralized error handling by HTTP status code (`getApiErrorMessage`)
- **Token storage:** Access & refresh tokens stored in **Encrypted Storage** (`react-native-encrypted-storage`)
- **User data:** User profile stored in **Async Storage** (`@react-native-async-storage/async-storage`)
- **Auth state:** Persisted login status in AsyncStorage; app resumes to Home if already logged in

## Localization (i18n)

- **Languages:** English (`en`) and Arabic (`ar`)
- **Direction:** Automatic RTL for Arabic, LTR for English via `I18nManager.forceRTL()`
- **Language persistence:** Selected language stored in AsyncStorage (`LanguageStorage`)
- **Device detection:** Falls back to device locale if supported; defaults to English
- **Direction key:** Navigation keys include direction version to force remount on language switch
- **All UI text** is externalized into `src/core/localization/locals/en.ts` and `ar.ts`
- **Live Voting, Ask Q&A, and Resources screens** are fully translated including status pills, buttons, and accessibility labels

## Environment & Logging

- **Environment config:** `src/core/config/environment.ts`
- **Modes:** `development` and `production` (detected via `__DEV__`)
- **API base URL:** `https://dummyjson.com`
- **Custom logger:** `src/core/utils/logger.ts`
  - Logs API requests/responses and errors in **development** only
  - Logging is **disabled in production** (`enableLogs: false`)
- **Console output** is gated behind `environment.enableLogs`

## Obfuscation

- **Android production builds** have `minifyEnabled true` with ProGuard/R8 obfuscation enabled
- ProGuard rules configured in `android/app/proguard-rules.pro`
- This obfuscates Java/Kotlin bytecode and shrinks resources for release builds

## Data Disclaimer

> ⚠️ **All data in this application is dummy/mock data.**

- Polls, questions, speakers, resources, and agenda items are static placeholder content
- Login uses hardcoded demo credentials (`emilys` / `emilyspass`) against a dummy API base URL
- No real user data, medical information, or congress data is stored or transmitted
- Intended for demonstration and development purposes only

## Additional Notes

- **React Native version:** 0.88.1 (New Architecture enabled by default)
- **TypeScript:** Strict type checking enabled via `@react-native/typescript-config`
- **RTL support:** Full right-to-left layout support for Arabic; app direction toggles on language change
- **Safe areas:** `react-native-safe-area-context` used for notch/home-indicator handling
- **Linear gradients:** `react-native-linear-gradient` used for branded buttons and backgrounds
- **File download:** `react-native-blob-util` for resource downloads with progress/state tracking
- **WebView:** `react-native-webview` used for venue map HTML rendering
- **Share:** `react-native-share` for sharing resources and name tag
- **QR Code:** `react-native-qrcode-svg` available for badge/ ticket QR generation
- **View Shot:** `react-native-view-shot` for capturing screen images
- **Network info:** `@react-native-community/netinfo` for connectivity checks
- **Restart:** `react-native-restart` used when language/direction changes require app restart

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `android` | `react-native run-android` | Run on Android emulator/device |
| `ios` | `react-native run-ios` | Run on iOS simulator/device |
| `start` | `react-native start` | Start Metro bundler |
| `lint` | `eslint .` | Run ESLint |
| `test` | `jest` | Run Jest tests |

---

Project — Nestle Congress App.
