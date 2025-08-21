// src/pages/Anam/MessagingPanel.js
import React, { useState } from 'react';
import "../../css/anam/messaging.css";
import Navbar from '../navbar';
import Footer from '../footer';

const dummyMessages = [
  { id: 1, sender: 'John', content: 'Hi there!', time: '10:15 AM' },
  { id: 2, sender: 'Sarah', content: 'Hello! How can I help you?', time: '10:16 AM' },
];

const MessagingPanel = () => {
  const [messages] = useState(dummyMessages);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="messaging-panel">
        <h2 className="panel-title">Messaging Panel</h2>
        <div className="chat-container">
          {messages.length === 0 ? (
            <div className="empty-state">No messages yet.</div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="chat-message">
                <div className="message-header">
                  <span className="sender">{msg.sender}</span>
                  <span className="timestamp">{msg.time}</span>
                </div>
                <div className="message-content">{msg.content}</div>
                <div className="message-actions">
                  <button className="btn report">Report</button>
                  <button className="btn block">Block</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingPanel;
