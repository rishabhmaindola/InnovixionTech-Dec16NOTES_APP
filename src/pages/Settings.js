import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';

function Settings() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const saveUsername = () => {
        localStorage.setItem('username', username);
        console.log(`Username saved: ${username}`);
        navigate('/');
        setUsername('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            saveUsername();
        }
    };

    return (
        <div className='settings-container'>
            <div className='settings'>
                <ul className='settings-list'>
                    <li>
                        <p>Username</p>
                        <input
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder='Enter your username'
                        />
                        <button
                            onClick={saveUsername}
                        >
                            Change
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Settings;
