import React from 'react';
import './CharacterPanel.css';
import messiImg from '../assets/characters/messi.jpg';
import stephencurryImg from '../assets/characters/stephencurry.png';
import siyakolisiImg from '../assets/characters/siyakolisi.png';
import vangoghImg from '../assets/characters/vangogh.png';
import dicaprioImg from '../assets/characters/dicaprio.png';
import beethovenImg from '../assets/characters/beethoven.png';
import ninjaImg from '../assets/characters/ninja.png';
import tekkzImg from '../assets/characters/tekkz.png';
import mrbeastImg from '../assets/characters/mrbeast.png';

const fakeHistory = [
  {
    id: 1,
    character: 'Lionel Messi',
    avatar: messiImg,
    preview: 'Let me explain the offside rule...'
  },
  {
    id: 2,
    character: 'Stephen Curry',
    avatar: stephencurryImg,
    preview: 'It\'s all about finding your shot rhythm.'
  },
  {
    id: 3,
    character: 'Siya Kolisi',
    avatar: siyakolisiImg,
    preview: 'Teamwork is the heart of rugby.'
  },
  {
    id: 4,
    character: 'Vincent van Gogh',
    avatar: vangoghImg,
    preview: 'Imagine Newton\'s Law as a brushstroke...'
  },
  {
    id: 5,
    character: 'Leonardo DiCaprio',
    avatar: dicaprioImg,
    preview: 'Picture this scene: Newton\'s apple falls...'
  },
  {
    id: 6,
    character: 'Beethoven',
    avatar: beethovenImg,
    preview: 'A law of motion is like a symphony.'
  },
  {
    id: 7,
    character: 'Ninja',
    avatar: ninjaImg,
    preview: 'It\'s like building in Fortnite—timing is key!'
  },
  {
    id: 8,
    character: 'Tekkz',
    avatar: tekkzImg,
    preview: 'Think of Newton\'s Law as a FIFA strategy.'
  },
  {
    id: 9,
    character: 'MrBeast',
    avatar: mrbeastImg,
    preview: 'Let\'s break Newton\'s Law with a viral challenge!'
  }
];

const allCharacters = [
  { id: 'messi', name: 'Lionel Messi', description: 'Footballer', img: messiImg },
  { id: 'stephencurry', name: 'Stephen Curry', description: 'Basketballer', img: stephencurryImg },
  { id: 'siyakolisi', name: 'Siya Kolisi', description: 'Rugby Player', img: siyakolisiImg },
  { id: 'vangogh', name: 'Vincent van Gogh', description: 'Painter', img: vangoghImg },
  { id: 'dicaprio', name: 'Leonardo DiCaprio', description: 'Actor', img: dicaprioImg },
  { id: 'beethoven', name: 'Beethoven', description: 'Composer', img: beethovenImg },
  { id: 'ninja', name: 'Ninja', description: 'Fortnite Streamer', img: ninjaImg },
  { id: 'tekkz', name: 'Tekkz', description: 'FIFA Player', img: tekkzImg },
  { id: 'mrbeast', name: 'MrBeast', description: 'Civilization', img: mrbeastImg }
];

const CharacterPanel = ({ selectedCharacter, onSelect }) => {
  return (
    <div className="character-panel">
      <div className="panel-title">History</div>
      <div className="chat-history-list">
        {fakeHistory.map((item) => (
          <div key={item.id} className="chat-history-item">
            <img src={item.avatar} alt={item.character} className="chat-history-avatar" />
            <div className="chat-history-meta">
              <div className="chat-history-character">{item.character}</div>
              <div className="chat-history-preview">{item.preview}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="choose-character-label">Choose your Character</div>
      <div className="character-grid-3x3">
        {allCharacters.map((char) => (
          <div
            key={char.id}
            className={`character-card${selectedCharacter && selectedCharacter.id === char.id ? ' selected' : ''}`}
            onClick={() => onSelect(char)}
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
  );
};

export default CharacterPanel; 