import React from 'react';
import './HistoryPanel.css';

const HistoryPanel = ({ history }) => {
  return (
    <div className="history-panel">
      <div className="history-title">History</div>
      <div className="history-list">
        {history.map(item => (
          <div key={item.id} className="history-entry">
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel; 