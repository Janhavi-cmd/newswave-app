import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

const VoiceSearch = ({ onSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        if (event.results[current].isFinal) {
          onSearch(transcriptText);
          setIsListening(false);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onSearch]);

  const toggleListening = () => {
    if (!recognition) {
      alert('Voice search not supported in your browser. Try Chrome!');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleListening}
        className={`p-3 rounded-xl transition-all ${
          isListening
            ? 'bg-red-500 text-white animate-pulse'
            : 'bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20'
        }`}
        title="Voice Search"
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-primary" />}
      </button>
      
      {isListening && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-dark-card rounded-lg shadow-xl p-4 min-w-[200px] z-50">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Listening...</p>
          <p className="text-sm text-gray-900 dark:text-white">{transcript || 'Speak now...'}</p>
          <div className="flex justify-center mt-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;