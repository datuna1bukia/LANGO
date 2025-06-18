import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const characters = [
  { id: 'messi', name: 'Lionel Messi', description: 'Professional Football Player' },
  { id: 'einstein', name: 'Albert Einstein', description: 'Theoretical Physicist' },
  { id: 'shakespeare', name: 'William Shakespeare', description: 'Playwright and Poet' },
  { id: 'marie-curie', name: 'Marie Curie', description: 'Physicist and Chemist' },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Choose a Character to Chat With</h1>
      <div className="character-grid">
        {characters.map((character) => (
          <div
            key={character.id}
            className="character-card"
            onClick={() => navigate(`/chat/${character.id}`)}
          >
            <h2>{character.name}</h2>
            <p>{character.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home; 