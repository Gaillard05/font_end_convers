// frontend/src/App.js

import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import ChatRoom from './components/ChatRoom';
import './App.css';

const App = () => {
    const [username, setUsername] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    // Vérifier s'il y a un utilisateur déjà connecté
    const storedUsername = localStorage.getItem('username');

    // Déconnecter l'utilisateur actuel s'il y en a un
    if (storedUsername && storedUsername !== username) {
        localStorage.removeItem('username');
        setLoggedIn(false);
    }

    const handleLogin = (name) => {
        setUsername(name);
        setLoggedIn(true);
        localStorage.setItem('username', name);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        localStorage.removeItem('username');
    };

    return (
        <div className="App">
            <h1>Convers</h1>
            {loggedIn ? (
                <ChatRoom username={username} onLogout={handleLogout} />
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
