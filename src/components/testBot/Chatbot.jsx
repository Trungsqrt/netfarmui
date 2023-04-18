// import React, { useState } from 'react';
// import './Chatbot.css';
// import $ from 'jquery';
// const parse = require('html-react-parser');

// const Chatbot = () => {
    //     const [messages, setMessages] = useState([]);
    //     //   const BOT_IMG = 'https://image.flaticon.com/icons/svg/327/327779.svg';
    //     //   const PERSON_IMG = 'https://image.flaticon.com/icons/svg/145/145867.svg';
    //     const BOT_NAME = 'ChatBot';
    //     const PERSON_NAME = 'You';
    // const baseURL = 'http://127.0.0.1:5000/get';
    
//     const handleSubmit = (event) => {
//         event.preventDefault();

//         const msgText = $('#textInput').val();
//         if (!msgText) return;

//         setMessages([...messages, { name: PERSON_NAME, side: 'right', text: msgText }]);
//         $('#textInput').val('');
//         botResponse(msgText);
//     };

//     const appendMessage = (name, side, text) => {
//         setMessages([...messages, { name, side, text }]);
//     };

//     const botResponse = (rawText) => {
//         $.get(`${baseURL}`, { msg: rawText }).done(function (data) {
//             const msgText = data;
//             appendMessage(BOT_NAME, 'left', msgText);
//         });
//     };

//     const formatDate = (date) => {
//         const h = '0' + date.getHours();
//         const m = '0' + date.getMinutes();

//         return `${h.slice(-2)}:${m.slice(-2)}`;
//     };

//     return (
//         <div className="bodyy">
//             <section className="msger">
//                 <header className="msger-header">
//                     <div className="msger-header-title">
//                         <i className="fas fa-bug"></i> Chatbot <i className="fas fa-bug"></i>
//                     </div>
//                 </header>

//                 <main className="msger-chat">
//                     {messages.map((message, index) => (
//                         <div key={index} className={`msg ${message.side}-msg`}>
//                             <div className="msg-img" style={{ backgroundImage: `url(${message.img})` }}></div>

//                             <div className="msg-bubble">
//                                 <div className="msg-info">
//                                     <div className="msg-info-name">{message.name}</div>
//                                     <div className="msg-info-time">{formatDate(new Date())}</div>
//                                 </div>
                                
//                                 {/* <div className="msg-text">{message.text}</div> */}
//                                 <div className="msg-text">{parse(String(message.text))}</div>
//                             </div>
//                         </div>
//                     ))}
//                 </main>

//                 <form className="msger-inputarea" onSubmit={handleSubmit}>
//                     <input type="text" className="msger-input" id="textInput" placeholder="Enter your message..." />
//                     <button type="submit" className="msger-send-btn">
//                         Send
//                     </button>
//                 </form>
//             </section>
//         </div>
//     );
// };

// export default Chatbot;

import React, { useState } from 'react';
import './Chatbot.css';
import $ from "jquery"
const parse = require('html-react-parser')
// import botImg from 'https://image.flaticon.com/icons/svg/327/327779.svg';
// import personImg from 'https://image.flaticon.com/icons/svg/145/145867.svg';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const baseURL = 'http://127.0.0.1:5000/get';


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
        $.get(`${baseURL}`, { msg: rawText }).done(function (data) {
            const msgText = data;
            appendMessage("ChatBot", 'left', msgText);
        });
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

                                <div className="msg-text">{parse(String(msg.text))}</div>
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