# 🌤️ React Native Weather App

A simple weather app built using **React Native CLI** that fetches weather data from **OpenWeatherMap API**. It allows users to search for a city and view current weather conditions.

---

## 🚀 Features

- City search with auto suggestions
- Real-time weather data display
- Redux Toolkit for state management
- AsyncStorage to persist last searched city
- Unit tested with Jest

---

## 📦 Installation

```bash
git clone https://github.com/RajwantKaur6/WeatherApp.git
cd WeatherApp
npm install
cd ios && pod install && cd ..
```

---

## 🔐 Environment Variables (.env)

- This project uses an .env file to securely store OpenWeatherMap API key.
- The .env file is excluded from the repository for security reasons. Please ask the developer for the file if it's not already provided.
- Make sure this line exists in babel.config.js (already set up if using this project)
- Restart Metro bundler after setting up the .env using command npx react-native start --reset-cache

---

## 🧠 Architectural Decisions

- **React Native CLI** was chosen to allow full access to native modules and real-world development workflows.
- **Redux Toolkit** is used for clean and scalable state management with `createSlice` and `createAsyncThunk`.
- **AsyncStorage** is used to persist the last searched city, improving user experience.
- A modular folder structure was adopted to separate UI components, screens, redux logic, and context:
