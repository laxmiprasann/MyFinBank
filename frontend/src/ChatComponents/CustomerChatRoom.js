import React, { useState, useEffect } from 'react';
import CustomerSidebar from '../UserComponents/CustomerDashboard';
import './ChatRoom.css';

const CustomerChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [userProfile, setUserProfile] = useState({});

    // Function to fetch user profile details
    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:3000/accounts/profile', {
                headers: {
                    authorization: localStorage.getItem('token'), // Send token in headers
                },
            });
            const data = await response.json();
            setUserProfile(data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    // Function to fetch messages
    const fetchMessages = async () => {
        try {
            const response = await fetch('http://localhost:3000/messages', {
                headers: {
                    authorization: localStorage.getItem('token'), // Send token in headers
                },
            });
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    // Function to send message
    const sendMessage = async () => {
        try {
            await fetch('http://localhost:3000/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token'), // Send token in headers
                },
                body: JSON.stringify({ user: userProfile.email,role:userProfile.Role, message }), // Use userProfile.email as user
            });

            // Clear the message input after sending
            setMessage('');
            // Fetch messages to update the list
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        // Fetch user profile details on component mount
        fetchUserProfile();
        // Fetch messages on component mount
        fetchMessages();
        // Poll for new messages every 2 seconds
        const interval = setInterval(() => {
            fetchMessages();
        }, 2000);

        return () => clearInterval(interval);
    }, []); // Run only once on mount

    return (
        <div className='chat-room'>
        <div className="chat-container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <CustomerSidebar /> {/* Display the sidebar */}
                </div>
                <div className="col-md-9">
                    <div>
                        <h2 className='chatheading'>Support</h2>
                        <div className='user-profile'>
                            <p><strong>Email:</strong> {userProfile.email}</p>
                            <p><strong>Full Name:</strong> {userProfile.FullName}</p>
                            <p><strong>Role:</strong> {userProfile.Role}</p>
                            {/* Add other user profile details here */}
                        </div>
                        <ul className='chatul'>
                            {messages.map((message) => (
                                <li className='chatli' key={message._id}>
                                    <strong>{message.user},{message.role}:</strong> {message.message}
                                </li>
                            ))}
                        </ul>
                        <div>
                            <input type="text" className='inputchat' placeholder="Type your message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                            <button className='chatbtn' onClick={sendMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CustomerChatRoom;
