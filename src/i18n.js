import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: "NewsWave",
      tagline: "AI-Powered News Intelligence Hub",
      search: "Search news across the world...",
      searchBtn: "Search",
      trending: "Trending Now",
      breaking: "Breaking News",
      latest: "Latest News",
      videos: "Related Videos",
      readMore: "Read More",
      share: "Share",
      bookmark: "Bookmark",
      noArticles: "No articles found",
      noVideos: "No videos available",
      loading: "Loading amazing content...",
      selectLanguage: "Language",
      categories: {
        general: "World",
        technology: "Technology",
        business: "Business",
        health: "Health",
        sports: "Sports",
        entertainment: "Entertainment",
      }
    }
  },
  hi: {
    translation: {
      appName: "न्यूज़वेव",
      tagline: "एआई-संचालित समाचार केंद्र",
      search: "दुनिया भर में समाचार खोजें...",
      searchBtn: "खोजें",
      trending: "ट्रेंडिंग",
      breaking: "ब्रेकिंग न्यूज़",
      latest: "ताज़ा खबरें",
      videos: "संबंधित वीडियो",
      readMore: "और पढ़ें",
      share: "साझा करें",
      bookmark: "सहेजें",
      noArticles: "कोई लेख नहीं मिला",
      noVideos: "कोई वीडियो उपलब्ध नहीं",
      loading: "शानदार सामग्री लोड हो रही है...",
      selectLanguage: "भाषा",
      categories: {
        general: "विश्व",
        technology: "तकनीक",
        business: "व्यापार",
        health: "स्वास्थ्य",
        sports: "खेल",
        entertainment: "मनोरंजन",
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;