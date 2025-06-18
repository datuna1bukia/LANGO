import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    if (!process.env.REACT_APP_OPENAI_API_KEY) {
      setApiKeyMissing(true);
    }
  }, []);

  if (apiKeyMissing) {
    return (
      <div className="error-container">
        <h1>Error: OpenAI API Key Missing</h1>
        <p>Please create a .env.local file in the root directory and add your OpenAI API key:</p>
        <pre>REACT_APP_OPENAI_API_KEY=your_api_key_here</pre>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:characterId" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 