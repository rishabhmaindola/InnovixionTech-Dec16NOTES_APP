import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { IoSettings } from "react-icons/io5";
import './Master.css';

function Master() {
    const [username, setUsername] = useState(localStorage.getItem('username') || null);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'username') {
                setUsername(event.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    return (
        <div className='master-container'>
            {username === null ? (
                <h2>Notepad</h2>
            ) : (
                <h2>{username}'s Notepad</h2>
            )}
            <div className='master-help'>
                <motion.a
                    className='toolbar-button'
                    whileHover={{ rotate: 180 }}
                    onHoverStart={e => { }}
                    onHoverEnd={e => { }}
                    href='/settings'
                >
                    <IoSettings />
                </motion.a>
            </div>
        </div>
    )
}

export default Master