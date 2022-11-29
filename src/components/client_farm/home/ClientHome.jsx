import React from 'react';
import Header from '../share/header/Header';
import Footer from '../share/footer/Footer';
import Slide from '../share/slide/Slider';
import About from '../share/about/About';
import News from '../share/newsSection/News';
import './ClientHome.css';
const ClientHome = () => {
    const user = localStorage.getItem('user');
    return (
        <div>
            <Header></Header>
            <div className="Home_container">
                <Slide></Slide>
                <About></About>
                <div className="news">
                    <News></News>
                </div>
            </div>
        </div>
    );
};

export default ClientHome;
