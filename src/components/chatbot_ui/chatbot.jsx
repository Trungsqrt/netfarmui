import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import { Box, Button, Card, CardContent, Grid, TextField } from '@mui/material';
import Form from 'react-bootstrap';
import Message from './message';
import axios from 'axios';

function Chatbot() {
    const messagesListRef = React.createRef();
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const baseURL = 'http://127.0.0.1:5000/get';

    const sendMessage = (content) => {
        // add the message to the state
        setMessages([
            ...messages,
            {
                content: content,
                isCustomer: true,
            },
        ]);
        axios.get(`${baseURL}?msg=${content}`).then((res) => {
            console.log(res.data);
            setMessages((prev) => [
                ...prev,
                {
                    content: res.data,
                    isCustomer: false,
                },
            ]);
        });
        // TODO: post the request to Back4app
    };

    useEffect(() => {
        setMessages((prev) => [
            ...prev,
            {
                content: 'Hi, welcome to ChatBot! Go ahead and send me a message.',
                isCustomer: false,
            },
        ]);
    }, []);
    useEffect(() => {
        if (messagesListRef.current && messages) {
            messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
        }
    }, [messagesListRef, messages]);
    const handleSubmit = (event) => {
        event.preventDefault();

        sendMessage(messageInput);
        setMessageInput('');
    };

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ color: 'success.main' }}>
            <Card sx={{ maxWidth: 420 }} className="bg-info">
                <CardContent>
                    <Box
                        ref={messagesListRef}
                        sx={{
                            height: 420,
                            overflow: 'scroll',
                            overflowX: 'hidden',
                        }}
                    >
                        <Box sx={{ m: 1, mr: 2 }}>
                            {messages.map((message, index) => (
                                <Message
                                    key={index}
                                    content={message.content}
                                    image={message.image}
                                    isCustomer={message.isCustomer}
                                    choices={message.choices}
                                    handleChoice={sendMessage}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            mt: 2,
                            display: 'flex',
                            flexFlow: 'row',
                            gap: 1,
                        }}
                    >
                        <TextField
                            variant="outlined"
                            size="small"
                            value={messageInput}
                            onChange={(event) => setMessageInput(event.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" onClick={handleSubmit} type="submit">
                            Send
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Chatbot;
