import React, { useState, useEffect } from 'react';
import './AdminPage.module.css';
import Header from '../admin_farm/share/header/Header';
import Footer from '../admin_farm/share/footer/Footer';
import Menuleft from '../admin_farm/share/menu/Menuleft';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function AdminPage() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [render, setRender] = useState(true); //true is render User, false is render Posts
    useEffect(() => {
        async function getData() {
            const Dataset = await axios.get(
                // "https://jsonplaceholder.typicode.com/users"
                'https://localhost:44303/api/Users',
            );

            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    name: item.fullName,
                    phone: item.phone,
                    cccd: item.identifyCard,
                };
                setData((prevData) => [...prevData, value]);
            });
        }

        getData();
    }, []);

    const UserHandler = () => {
        setRender(true);
        async function getData() {
            setData([]);
            const Dataset = await axios.get('https://localhost:44303/api/Users');

            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    name: item.fullName,
                    phone: item.phone,
                    cccd: item.identifyCard,
                };
                setData((prevData) => [...prevData, value]);
            });
        }

        getData();
    };

    const PostHandler = () => {
        setRender(false);
        async function getData() {
            setData([]);
            const Dataset = await axios.get('https://localhost:44303/api/Article');

            Dataset.data.forEach((item) => {
                const value = {
                    id: item.id,
                    title: item.title,
                    datePost: item.datePost,
                    dateUpdate: item.dateUpdate,
                };
                setData((prevData) => [...prevData, value]);
            });
        }

        getData();
    };

    return (
        <div>
            <div>
                <Header></Header>
                <div classNam="main">
                    <div className="comlumn-left">
                        <Menuleft></Menuleft>
                    </div>
                    <div className="comlumn-right">
                    </div>
                    <div className="footer">
                        <Footer></Footer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
