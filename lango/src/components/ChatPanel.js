import React, { useState, useRef, useEffect } from 'react';
import './ChatPanel.css';
import defaultUser from '../assets/characters/default.jpg';
import messiImg from '../assets/characters/messi.jpg';
import stephencurryImg from '../assets/characters/stephencurry.png';
import siyakolisiImg from '../assets/characters/siyakolisi.png';
import vangoghImg from '../assets/characters/vangogh.png';
import dicaprioImg from '../assets/characters/dicaprio.png';
import beethovenImg from '../assets/characters/beethoven.png';
import ninjaImg from '../assets/characters/ninja.png';
import tekkzImg from '../assets/characters/tekkz.png';
import mrbeastImg from '../assets/characters/mrbeast.png';
import { sendMessage } from '../utils/openai';

const characterImages = {
  messi: messiImg,
  stephencurry: stephencurryImg,
  siyakolisi: siyakolisiImg,
  vangogh: vangoghImg,
  dicaprio: dicaprioImg,
  beethoven: beethovenImg,
  ninja: ninjaImg,
  tekkz: tekkzImg,
  mrbeast: mrbeastImg,
};

const ChatPanel = ({ selectedCharacter, selectedTopic, chatHistory, setChatHistory }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  if (!selectedCharacter || !selectedTopic) {
    return (
      <div className="chat-panel">
        <div className="panel-title">Chat</div>
        <div className="chat-placeholder">Select a character and topic to start chatting.</div>
      </div>
    );
  }

  const getCharacterImg = () => {
    return characterImages[selectedCharacter.id] || defaultUser;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);
    setIsLoading(true);
    const userMsg = { role: 'user', content: input.trim() };
    const updatedHistory = [...chatHistory, userMsg];
    setChatHistory(updatedHistory);
    setInput('');
    try {
      const prompt = `Explain ${input.trim()} as if you are ${selectedCharacter.name}, in a way that connects to ${selectedTopic}. Use their personality and style.`;
      const aiMsg = { role: 'assistant', content: await sendMessage(selectedCharacter.name, updatedHistory, selectedTopic, prompt) };
      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      setError('Failed to get response.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-panel">
      <div className="panel-title">Chat with {selectedCharacter.name} about {selectedTopic}</div>
      <div className="chat-history">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.role}`}>
            <img
              src={msg.role === 'user' ? defaultUser : getCharacterImg()}
              alt={msg.role === 'user' ? 'You' : selectedCharacter.name}
              className="chat-avatar"
            />
            <div className="chat-content">{msg.content}</div>
          </div>
        ))}
        {isLoading && <div className="chat-bubble assistant"><img src={getCharacterImg()} alt={selectedCharacter.name} className="chat-avatar" /><div className="chat-content">Thinking...</div></div>}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-row" onSubmit={handleSend}>
        <div className="chat-input-icons">
          <button type="button" className="chat-icon-btn" title="Upload Document">
            📄
          </button>
          <button type="button" className="chat-icon-btn camera-btn" title="Video Call">
            📷
            <span className="camera-red-dot"></span>
          </button>
          <button type="button" className="chat-icon-btn" title="Share Link">
            🔗
          </button>
          <button type="button" className="chat-icon-btn" title="Voice Message">
            🎤
          </button>
        </div>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`Ask ${selectedCharacter.name} about ${selectedTopic}...`}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>Send</button>
      </form>
      {error && <div className="chat-error">{error}</div>}
    </div>
  );
};

export default ChatPanel; 