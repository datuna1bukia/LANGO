import React from 'react';
import './CharacterGrid.css';
import messiImg from '../assets/characters/messi.jpg';
import stephencurryImg from '../assets/characters/stephencurry.png';
import siyakolisiImg from '../assets/characters/siyakolisi.png';
import vangoghImg from '../assets/characters/vangogh.png';
import dicaprioImg from '../assets/characters/dicaprio.png';
import beethovenImg from '../assets/characters/beethoven.png';
import ninjaImg from '../assets/characters/ninja.png';
import tekkzImg from '../assets/characters/tekkz.png';
import mrbeastImg from '../assets/characters/mrbeast.png';

const allCharacters = [
  { id: 'messi', name: 'Lionel Messi', description: 'Footballer', img: messiImg, category: 'Sports' },
  { id: 'stephencurry', name: 'Stephen Curry', description: 'Basketballer', img: stephencurryImg, category: 'Sports' },
  { id: 'siyakolisi', name: 'Siya Kolisi', description: 'Rugby Player', img: siyakolisiImg, category: 'Sports' },
  { id: 'vangogh', name: 'Vincent van Gogh', description: 'Painter', img: vangoghImg, category: 'Art' },
  { id: 'dicaprio', name: 'Leonardo DiCaprio', description: 'Actor', img: dicaprioImg, category: 'Art' },
  { id: 'beethoven', name: 'Beethoven', description: 'Composer', img: beethovenImg, category: 'Art' },
  { id: 'ninja', name: 'Ninja', description: 'Fortnite Streamer', img: ninjaImg, category: 'Gaming' },
  { id: 'tekkz', name: 'Tekkz', description: 'FIFA Player', img: tekkzImg, category: 'Gaming' },
  { id: 'mrbeast', name: 'MrBeast', description: 'Civilization', img: mrbeastImg, category: 'Gaming' }
];

const categories = [
  { id: 'sports', name: 'Sports', color: '#f5b041' },
  { id: 'art', name: 'Art', color: '#f5b041' },
  { id: 'gaming', name: 'Gaming', color: '#f5b041' }
];

const CharacterGrid = ({ selectedCharacter, onSelect }) => {
  return (
    <div className="character-grid-center">
      <div className="character-grid-layout">
        {/* Left Column - Categories */}
        <div className="categories-column">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              style={{ backgroundColor: category.color }}
            >
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
        
        {/* Right Column - Characters */}
        <div className="characters-column">
          {allCharacters.map((char) => (
            <div
              key={char.id}
              className={`character-card${selectedCharacter && selectedCharacter.id === char.id ? ' selected' : ''}`}
              onClick={() => onSelect(char)}
              tabIndex={0}
              role="button"
              style={{ cursor: 'pointer' }}
            >
              <img
                src={char.img}
                alt={char.name}
                className="character-img"
                onError={e => { e.target.onerror = null; e.target.src = require('../assets/characters/default.jpg'); }}
              />
              <div className="character-name">{char.name}</div>
              <div className="character-desc">{char.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterGrid; 