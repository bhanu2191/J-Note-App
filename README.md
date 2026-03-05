# J-Note 📝

A modern, cross-platform Note-Taking application built with React Native and Expo Router. J-Note offers a seamless and intuitive experience for users to manage their daily notes, ideas, and tasks with a clean, professional user interface.

---

## 🚀 Features

- **User Authentication**: Secure Login and Registration system.
- **Session Management**: "Remember Me" functionality utilizing async local storage.
- **RESTful API Integration**: Connected to a robust backend service for real-time data syncing.
- **Modern UI/UX**: Clean aesthetic with consistent typography, spacing, and custom-styled components.
- **Cross-Platform**: Runs flawlessly on Android, iOS, and the Web.
- **File-based Routing**: Utilizes Expo Router for smooth screen transitions and navigation.

---

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/)
- **Toolchain/Routing**: [Expo](https://expo.dev/) & [Expo Router](https://docs.expo.dev/router/introduction/)
- **Network Requests**: [Axios](https://axios-http.com/)
- **Local Storage**: `@react-native-async-storage/async-storage`

---

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Expo Go app on your physical device OR an Android/iOS emulator

### Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repository-url>
   cd NoteTakingApp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   *or*
   ```bash
   yarn install
   ```

3. **Configure the API endpoint** (if necessary):
   Ensure your backend service (`note-api`) is running and accessible. Update the base URL in `src/services/api.ts` to match your local or production server.

### Running the App

Start the development server:

```bash
npx expo start
```

This will launch the Expo Metro bundler. From here, you can:
- **Press `a`** to open on an Android emulator.
- **Press `i`** to open on an iOS simulator.
- **Press `w`** to open in a web browser.
- **Scan the QR code** with the Expo Go app on your physical device.

---

## 📂 Project Structure

```text
NoteTakingApp/
├── app/                  # Expo Router screens (login, register, notes, etc.)
├── assets/               # Static assets (images, fonts)
├── components/           # Generic Expo UI components
├── src/
│   ├── components/       # Custom app-specific UI components (Buttons, TextFields)
│   ├── services/         # API configurations and network calls
│   └── utils/            # Shared utilities and global theme configurations
└── package.json          # Project metadata and dependencies
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/<your-username>/<your-repo-name>/issues).

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
