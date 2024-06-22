import React, { useState } from 'react';
import '../LoginForm.css';

const LoginForm = ({ onLogin }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '') {
            alert('Please enter your name.');
            return;
        }
        onLogin(name);
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default LoginForm;
