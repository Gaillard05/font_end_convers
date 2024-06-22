import React from 'react';
import '../MessageList.css';

const MessageList = ({ messages }) => {
    return (
        <div className="message-list">
            {messages.map((msg, index) => (
                <div className={`message ${msg.sent ? 'sent' : 'received'}`} key={index}>
                    <div className="message-header">
                        <i className="fa fa-user-circle-o user-icon" aria-hidden="true"></i>
                        <span className="username">{msg.username} :</span>
                    </div>
                    <div className="message-content">
                        <p>{msg.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;