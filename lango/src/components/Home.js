import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const categories = [
  {
    id: 'sport',
    name: '🔴 Sport',
    characters: [
      { id: 'messi', name: 'Lionel Messi', description: 'Footballer' },
      { id: 'curry', name: 'Stephen Curry', description: 'Basketballer' },
      { id: 'kolisi', name: 'Siya Kolisi', description: 'Rugby Player' }
    ]
  },
  {
    id: 'art',
    name: '🟣 Art',
    characters: [
      { id: 'vangogh', name: 'Vincent van Gogh', description: 'Painter' },
      { id: 'dicaprio', name: 'Leonardo DiCaprio', description: 'Actor' },
      { id: 'beethoven', name: 'Ludwig van Beethoven', description: 'Music Composer' }
    ]
  },
  {
    id: 'gamer',
    name: '🟢 Gamer',
    characters: [
      { id: 'ninja', name: 'Ninja', description: 'Fortnite Streamer' },
      { id: 'tekkz', name: 'Tekkz', description: 'FIFA Player' },
      { id: 'mrbeast', name: 'MrBeast', description: 'Civilization / Strategy' }
    ]
  }
];

const topics = [
  'Science',
  'Medicine',
  'Technology',
  'History',
  'Mathematics',
  'Philosophy',
  'Psychology',
  'Economics',
  'Environment',
  'Space'
];

function Home() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleCharacterSelect = (characterId) => {
    if (!selectedTopic) {
      alert('Please select a topic first!');
      return;
    }
    navigate(`/chat/${characterId}?topic=${selectedTopic}`);
  };

  return (
    <div className="home">
      <h1>Choose a Character and Topic</h1>
      
      <div className="topic-selection">
        <h2>Select a Topic</h2>
        <div className="topic-grid">
          {topics.map((topic) => (
            <button
              key={topic}
              className={`topic-button ${selectedTopic === topic ? 'selected' : ''}`}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="category-selection">
        <h2>Select a Category</h2>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="character-grid">
          {categories
            .find(cat => cat.id === selectedCategory)
            ?.characters.map((character) => (
              <div
                key={character.id}
                className="character-card"
                onClick={() => handleCharacterSelect(character.id)}
              >
                <h2>{character.name}</h2>
                <p>{character.description}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Home; 