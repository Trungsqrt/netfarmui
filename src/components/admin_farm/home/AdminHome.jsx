import React from 'react';
import Header from '../share/header/Header';
import Slide from '../share/slide/Slider';
import About from '../share/about/About';
import News from '../share/newsSection/News';
const ClientHome = () => {
    return (
        <div>
            <Header></Header>
            <Slide></Slide>
            <About></About>
            <div className="news">
                <News></News>
            </div>
        </div>
    );
};

export default ClientHome;
