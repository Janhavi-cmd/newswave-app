# 🌊 NewsWave v3 — Setup Guide

## ⚡ 5-Step Quick Start

### Step 1 — Extract
Right-click `newswave3.zip` → Extract All → open `newswave3` folder in VS Code

### Step 2 — Install
Open Terminal in VS Code (Terminal → New Terminal):
```
npm install
```

### Step 3 — Add YouTube API Key (optional but recommended)
Create a file named `.env` in the `newswave3` root folder:
```
VITE_YOUTUBE_API_KEY=paste_your_key_here
```
The app works without it — it shows smart mock video cards linked to YouTube search.

### Step 4 — Run
```
npm run dev
```

### Step 5 — Open
Go to http://localhost:5173

---

## ✅ Full Feature List

| Feature | Details |
|---|---|
| 🌍 12 Languages | EN, HI, ES, FR, AR, ZH, DE, PT, JA, KO, RU, IT |
| 📰 8 Categories | World, Tech, Business, Health, Sports, Culture, Science, Politics |
| 🎬 YouTube Videos | Real videos with API key, smart mock fallback without |
| 🎙️ Voice Search | Works in all 12 languages |
| 📺 Reader Mode | Full article reader popup with share + external link |
| 🔖 Bookmarks | Save articles, persisted in localStorage |
| ❤️ Like System | Like counter per article |
| 🔗 Share | Native share or clipboard copy |
| ⏰ Live Timestamps | "2h ago", "3d ago" etc |
| 📖 Read Time | Estimated read time on every card |
| 🔴 Live Ticker | Breaking news auto-scroll banner |
| 🔥 Trending Hero | Big featured top stories section |
| 🌙 Dark / Light | Auto-detects system preference |
| 📊 Reading Progress | Top bar shows scroll progress |
| 🎨 Animated BG | Three floating gradient orbs |
| 💎 Glassmorphism | Premium frosted glass on all cards |
| ✨ Shine Effects | Sweep highlight on card hover |
| 📱 Responsive | Works on all screen sizes |

## 🔑 Get YouTube API Key
1. Go to https://console.cloud.google.com
2. Create project → Enable "YouTube Data API v3"
3. Credentials → Create API Key
4. API restrictions → "Don't restrict key" → Save
5. Wait 2 minutes → paste in .env

## 🚀 Deploy to Netlify (Free)
```
npm run build
```
Drag the `dist` folder to https://app.netlify.com/drop
Add VITE_YOUTUBE_API_KEY in Site Settings → Environment Variables
