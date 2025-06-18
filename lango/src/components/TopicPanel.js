import React from 'react';
import './TopicPanel.css';

const topics = [
  'Science',
  'Medicine',
  'Technology',
  'History',
  'Philosophy'
];

const TopicPanel = ({ selectedCharacter, selectedTopic, onSelect, topics }) => {
  return (
    <div className="topic-panel">
      <div className="panel-title">Topics</div>
      {!selectedCharacter ? null : (
        <div className="topic-list">
          {topics.map((topic) => (
            <button
              key={topic}
              className={`topic-btn${selectedTopic === topic ? ' selected' : ''}`}
              onClick={() => onSelect(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicPanel; 