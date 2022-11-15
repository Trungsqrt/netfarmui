import React from 'react';
import styled from 'styled-components';
import Statistic from './Statistic';
import Sales from './Sales';
import Analytic from './Analytic';
import Shopping from './Shopping';
import '../../css/style.css';
import Product from './Product';
import OrderStatistic from './OrderStatic';
import FeedbackStatistic from './Feedback';
function Dashboard() {
    return (
        <div>
            <div className="grid">
                <div className="grid_1">
                    <Statistic></Statistic>
                    <Sales></Sales>
                </div>
                <div className="grid_2">
                    <Analytic></Analytic>
                    <Shopping></Shopping>
                </div>
            </div>
            <div className="grid_3">
                <Product></Product>
                <FeedbackStatistic></FeedbackStatistic>
            </div>
            <div className="grid_3 ">
                <OrderStatistic></OrderStatistic>
            </div>
        </div>
    );
}

export default Dashboard;
