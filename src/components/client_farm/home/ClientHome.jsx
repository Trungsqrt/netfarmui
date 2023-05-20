import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../share/header/Header';
import Footer from '../share/footer/Footer';
import Slide from '../share/slide/Slider';
import About from '../share/about/About';
import News from '../share/newsSection/News';
import './ClientHome.css';
const ClientHome = () => {
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (currentUser?.roleName == 'Expert' || currentUser?.roleName == 'Admin') {
            navigate('/adminHome');
        }
    }, []);

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
