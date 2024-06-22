import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../ChatRoom.css';

const ChatRoom = ({ username, onLogout }) => {
    const [messages, setMessages] = useState([]);
    const [userList, setUserList] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:9005');
        
        ws.current.onopen = () => {
            console.log('Connected to WebSocket');
            ws.current.send(JSON.stringify({ type: 'login', username }));
        };

        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            handleMessage(message);
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [username]);

    const handleMessage = (message) => {
        const { type, content, username: msgUsername, userList } = message;
        switch (type) {
            case 'message':
                setMessages(prevMessages => [...prevMessages, { username: msgUsername, content }]);
                break;
            case 'userList':
                setUserList(userList);
                break;
            default:
                console.log('Unsupported message type');
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (messageInput.trim() === '') {
            alert('Please enter a message.');
            return;
        }
        try {
            const response = await fetch('http://localhost:9005/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, content: messageInput }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setMessageInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <div className="chat-room">
            <div className="chat-header">
                <h2>Welcome, {username}!</h2>
                <button className="button logout-button" onClick={onLogout}>Logout</button>
            </div>
            <div className="chat-body">
                <div className="inbox_people">
                    <h3>Users online</h3>
                    <div className="inbox_chat">
                        <ul>
                            {userList.map((user, index) => (
                                <li key={index} className="chat_list">
                                    <i className="fa fa-user-circle-o user-icon" aria-hidden="true"></i>
                                    <span className="user-name">{user}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mesgs">
                    <MessageList messages={messages} />
                    <form className="type_msg message-form" onSubmit={handleSendMessage}>
                        <div className="input_msg_write">
                            <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Enter your message"
                                className="message-input"
                            />
                            <button className="msg_send_btn button send-button" type="submit">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
