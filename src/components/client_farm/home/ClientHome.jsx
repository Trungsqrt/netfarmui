import React from 'react';
import Header from '../share/header/Header';
import Footer from '../share/footer/Footer';
import Slide from '../share/slide/Slider';
import About from '../share/about/About';
import News from '../share/newsSection/News';
import './ClientHome.css';
const ClientHome = () => {
    return (
        <div>
            <Header></Header>
            <Slide></Slide>
            <About></About>
            <div className="news">
                <News></News>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ClientHome;
