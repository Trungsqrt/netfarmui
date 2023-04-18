import React, { useState } from 'react';
import './Chatbot.css';
// import botImg from 'https://image.flaticon.com/icons/svg/327/327779.svg';
// import personImg from 'https://image.flaticon.com/icons/svg/145/145867.svg';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const msgText = event.target.textInput.value;
        if (!msgText) return;

        appendMessage('You', 'right', msgText);
        event.target.textInput.value = '';
        botResponse(msgText);
    };

    const appendMessage = (name, side, text) => {
        setMessages((prevMessages) => [...prevMessages, { name, side, text, time: formatDate(new Date()) }]);
    };

    const botResponse = (rawText) => {
        // Replace this with your actual bot response logic
        const msgText = 'This is a bot response.';
        appendMessage('ChatBot', 'left', msgText);
    };

    const formatDate = (date) => {
        const h = '0' + date.getHours();
        const m = '0' + date.getMinutes();
        return `${h.slice(-2)}:${m.slice(-2)}`;
    };

    return (
        <div className="bodyy">
            <section className="msger">
                <header className="msger-header">
                    <div className="msger-header-title">
                        <i className="fas fa-bug"></i> Chatbot <i className="fas fa-bug"></i>
                    </div>
                </header>

                <main className="msger-chat">
                    {messages.map((msg, index) => (
                        <div key={index} className={`msg ${msg.side}-msg`}>
                            <div
                                className="msg-img"
                                style={{
                                    backgroundImage: `url(${msg.img})`,
                                }}
                            ></div>

                            <div className="msg-bubble">
                                <div className="msg-info">
                                    <div className="msg-info-name">{msg.name}</div>
                                    <div className="msg-info-time">{msg.time}</div>
                                </div>

                                <div className="msg-text">{msg.text}</div>
                            </div>
                        </div>
                    ))}
                </main>

                <form className="msger-inputarea" onSubmit={handleSubmit}>
                    <input type="text" className="msger-input" name="textInput" placeholder="Enter your message..." />
                    <button type="submit" className="msger-send-btn">
                        Send
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Chatbot;
