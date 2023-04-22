import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Radio.css';
import Ad from './Ad';
const Feedback = () => {
    const fbUrl = 'http://127.0.0.1:8000/feedback/getAll/';
    const productUrl = 'https://localhost:44303/api/Products';
    const [feedbacks, setFeedback] = useState([]);
    const [currentFB, setCurrentFB] = useState([]);

    useEffect(() => {
        let feedbacksData = [];
        const fetchData = async () => {
            const fbs = await axios.get(fbUrl);
            feedbacksData = fbs.data;
            setFeedback(feedbacksData);
        };
        fetchData();

        const interval = setInterval(async () => {
            var fb = [];
            const randomIndexes = [];
            while (randomIndexes.length < 3) {
                const randomIndex = Math.floor(Math.random() * feedbacksData.length);
                if (!randomIndexes.includes(randomIndex)) {
                    randomIndexes.push(randomIndex);
                    fb.push(feedbacksData[randomIndex]);
                }
            }
            var currentfblist = [];
            for (var i = 0; i < 3; i++) {
                const response = await axios.get(`${productUrl}/${fb[i].productId}`);
                const responsefb = {
                    contents: fb[i].contents,
                    star: fb[i].star,
                    productId: fb[i].productId,
                    userId: fb[i].userId,
                    sentiment: fb[i].sentiment,
                    userName: fb[i].userName,
                    productName: response.data.name,
                    productImg: response.data.images[0].url,
                    productUnit: response.data.unit,
                    productpPaceProduce: response.data.placeProduce,
                    productPrice: response.data.price,
                    productDescription: response.data.description,
                };
                currentfblist.push(responsefb);
            }
            // console.log('fb', fb);
            setCurrentFB(currentfblist);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="Fb_container">
            <div className="list_fbs">
                {currentFB
                    ? currentFB.map((item, index) => <Ad feedback={item} key={item.id} number={index}></Ad>)
                    : ''}
            </div>
        </div>
    );
};

export default Feedback;
