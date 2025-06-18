import React, { useState, useEffect } from 'react';
import HistoryPanel from './components/HistoryPanel';
import CharacterGrid from './components/CharacterGrid';
import TopicPanel from './components/TopicPanel';
import ChatPanel from './components/ChatPanel';
import './App.css';
import langoLogo from './assets/characters/lango.png';
import userIcon from './assets/characters/default.jpg';

const topics = [
  'Science',
  'Medicine',
  'Technology',
  'History',
  'Philosophy',
  'Mathematics',
  'Psychology',
  'Economics',
  'Environment',
  'Space'
];

const fakeHistory = [
  { id: 1, text: 'Welcome back!' },
  { id: 2, text: 'You chose Science' },
  { id: 3, text: 'You chatted with Messi' },
  { id: 4, text: 'You chose Technology' },
  { id: 5, text: 'You chatted with Ninja' },
  { id: 6, text: 'You explored Philosophy' },
  { id: 7, text: 'You chatted with Beethoven' },
  { id: 8, text: 'You chose Mathematics' },
  { id: 9, text: 'You chatted with Stephen Curry' },
  { id: 10, text: 'You explored Psychology' },
  { id: 11, text: 'You chatted with Van Gogh' },
  { id: 12, text: 'You chose Economics' },
  { id: 13, text: 'You chatted with MrBeast' },
  { id: 14, text: 'You explored Environment' },
  { id: 15, text: 'You chatted with Tekkz' },
  { id: 16, text: 'You chose Space' },
  { id: 17, text: 'You chatted with Leonardo DiCaprio' },
  { id: 18, text: 'You explored Medicine' },
  { id: 19, text: 'You chatted with Siyakolisi' },
  { id: 20, text: 'You chose History' }
];

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Check if mobile layout should be active
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Open chat when both are selected
  React.useEffect(() => {
    if (selectedCharacter && selectedTopic) {
      setShowChat(true);
    }
  }, [selectedCharacter, selectedTopic]);

  // Exit chat and reset
  const handleExitChat = () => {
    setShowChat(false);
    setSelectedCharacter(null);
    setSelectedTopic(null);
    setChatHistory([]);
  };

  // Refresh page when logo is clicked
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className="app-container">
      {/* Mobile Debug Indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          background: isMobile ? '#ff0000' : '#00ff00',
          color: 'white',
          padding: '5px 10px',
          fontSize: '12px',
          zIndex: 9999,
          fontWeight: 'bold'
        }}>
          {isMobile ? '�� MOBILE' : '🖥️ DESKTOP'} ({windowWidth}px)
        </div>
      )}
      
      <header className="lango-header">
        <img 
          src={langoLogo} 
          alt="Lango Logo" 
          className="lango-logo" 
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
        <div className="lango-header-spacer" />
        <img src={userIcon} alt="User" className="lango-user-icon" />
      </header>
      <div className="lango-3col-layout">
        <HistoryPanel history={fakeHistory} />
        <CharacterGrid selectedCharacter={selectedCharacter} onSelect={setSelectedCharacter} />
        <TopicPanel selectedCharacter={selectedCharacter} selectedTopic={selectedTopic} onSelect={setSelectedTopic} topics={topics} />
      </div>
      {showChat && (
        <div className="chat-modal-overlay chat-modal-fixed">
          <div className="chat-modal chat-modal-fullscreen">
            <button className="chat-exit-btn" onClick={handleExitChat}>Exit</button>
            <ChatPanel
              selectedCharacter={selectedCharacter}
              selectedTopic={selectedTopic}
              chatHistory={chatHistory}
              setChatHistory={setChatHistory}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
