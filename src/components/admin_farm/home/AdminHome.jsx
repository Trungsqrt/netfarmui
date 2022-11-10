import React from 'react';
import Header from '../share/header/Header';
import Slide from '../share/slide/Slider';
import About from '../share/about/About';
import News from '../share/newsSection/News';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const ClientHome = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    useEffect(() => {
        setUser(currentUser.roleName);
    }, []);
    return (
        <div>
            {(user === 'Expert' || user === 'Admin') && (
                <>
                    <Header></Header>
                    <Slide></Slide>
                    <About></About>
                    <div className="news">
                        <News></News>
                    </div>
                </>
            )}
            {!(user === 'Expert' || user === 'Admin') && navigate('/')}
        </div>
    );
};

export default ClientHome;
