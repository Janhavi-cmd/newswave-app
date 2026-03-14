import { db, auth } from './firebase';
import { doc, setDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export async function saveUserPreferences(preferences) {
  const userId = auth.currentUser?.uid || 'guest';
  
  try {
    await setDoc(doc(db, 'userPreferences', userId), {
      ...preferences,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    // Also save to localStorage for offline access
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Error saving preferences:', error);
    // Fallback to localStorage only
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    return false;
  }
}

export async function getUserPreferences() {
  const userId = auth.currentUser?.uid || 'guest';
  
  try {
    const docRef = doc(db, 'userPreferences', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.error('Error getting preferences:', error);
  }
  
  // Fallback to localStorage
  const stored = localStorage.getItem('userPreferences');
  return stored ? JSON.parse(stored) : getDefaultPreferences();
}

export async function addToReadingHistory(article) {
  const userId = auth.currentUser?.uid || 'guest';
  
  try {
    const historyRef = doc(db, 'readingHistory', userId);
await setDoc(historyRef, {             
  articles: arrayUnion({
    id: article.id,
    title: article.title,
    category: article.category,
    source: article.source,
    readAt: new Date().toISOString()
  })
}, { merge: true });
    
    // Also update localStorage
    const history = JSON.parse(localStorage.getItem('readingHistory') || '[]');
    history.unshift(article);
    localStorage.setItem('readingHistory', JSON.stringify(history.slice(0, 50))); // Keep last 50
  } catch (error) {
    console.error('Error saving reading history:', error);
  }
}

export async function toggleFavoriteSource(source) {
  const prefs = await getUserPreferences();
  const favSources = prefs.favoriteSources || [];
  
  const updated = favSources.includes(source)
    ? favSources.filter(s => s !== source)
    : [...favSources, source];
  
  await saveUserPreferences({ ...prefs, favoriteSources: updated });
  return updated;
}

export async function toggleFavoriteCategory(category) {
  const prefs = await getUserPreferences();
  const favCategories = prefs.favoriteCategories || [];
  
  const updated = favCategories.includes(category)
    ? favCategories.filter(c => c !== category)
    : [...favCategories, category];
  
  await saveUserPreferences({ ...prefs, favoriteCategories: updated });
  return updated;
}

export function getDefaultPreferences() {
  return {
    favoriteCategories: ['general', 'technology'],
    favoriteSources: [],
    language: 'en',
    theme: 'light',
    notificationsEnabled: false,
    autoSummarize: false,
    showSentiment: true,
    showBias: true,
  };
}

export async function getRecommendations() {
  const history = JSON.parse(localStorage.getItem('readingHistory') || '[]');
  
  // Analyze reading patterns
  const categoryCount = {};
  const sourceCount = {};
  
  history.forEach(article => {
    categoryCount[article.category] = (categoryCount[article.category] || 0) + 1;
    sourceCount[article.source] = (sourceCount[article.source] || 0) + 1;
  });
  
  // Get top categories and sources
  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cat]) => cat);
  
  const topSources = Object.entries(sourceCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([src]) => src);
  
  return { topCategories, topSources };
}