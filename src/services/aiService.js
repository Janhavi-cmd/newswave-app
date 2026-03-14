import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function summarizeArticle(title, description) {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    console.warn('No Gemini API key - using fallback summary');
    return generateFallbackSummary(description);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Summarize this news article in exactly 3 concise bullet points (each max 15 words):

Title: ${title}
Description: ${description}

Format as:
- [First key point]
- [Second key point]
- [Third key point]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text.trim();
  } catch (error) {
    console.error('Gemini API error:', error);
    return generateFallbackSummary(description);
  }
}

export async function analyzeSentiment(text) {
  if (!text) return { sentiment: 'neutral', score: 0 };

  try {
    // Simple keyword-based sentiment (upgrade with TextBlob later)
    const positiveWords = ['success', 'win', 'gain', 'up', 'growth', 'positive', 'breakthrough', 'achievement', 'victory', 'advance'];
    const negativeWords = ['crisis', 'fail', 'loss', 'down', 'decline', 'negative', 'crash', 'disaster', 'death', 'war'];
    
    const lowerText = text.toLowerCase();
    let score = 0;
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) score += 1;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) score -= 1;
    });
    
    let sentiment = 'neutral';
    if (score > 1) sentiment = 'positive';
    if (score < -1) sentiment = 'negative';
    
    return { sentiment, score };
  } catch (error) {
    console.error('Sentiment analysis error:', error);
    return { sentiment: 'neutral', score: 0 };
  }
}

export async function detectBias(title, description, source) {
  // Simple bias detection based on language patterns
  const text = `${title} ${description}`.toLowerCase();
  
  const opinionWords = ['believe', 'think', 'should', 'must', 'need to', 'allegedly', 'claims'];
  const emotionalWords = ['shocking', 'outrageous', 'terrible', 'amazing', 'incredible'];
  
  let biasScore = 0;
  
  opinionWords.forEach(word => {
    if (text.includes(word)) biasScore += 0.5;
  });
  
  emotionalWords.forEach(word => {
    if (text.includes(word)) biasScore += 0.3;
  });
  
  let biasLevel = 'low';
  if (biasScore > 1.5) biasLevel = 'high';
  else if (biasScore > 0.8) biasLevel = 'medium';
  
  return { level: biasLevel, score: biasScore };
}

function generateFallbackSummary(description) {
  if (!description) return '• No summary available\n• Please check the full article\n• For more details';
  
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const points = sentences.slice(0, 3).map(s => `• ${s.trim()}`);
  
  while (points.length < 3) {
    points.push('• Read the full article for more details');
  }
  
  return points.join('\n');
}