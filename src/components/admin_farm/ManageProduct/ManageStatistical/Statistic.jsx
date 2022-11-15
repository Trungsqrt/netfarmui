import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { AiFillTag } from 'react-icons/ai';
import { AiFillExperiment } from 'react-icons/ai';
import { AiFillDollarCircle } from 'react-icons/ai';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { AiOutlineArrowDown } from 'react-icons/ai';
import axios from 'axios';

function Statistic() {
    const orderUrl = 'https://localhost:44303/api/Order';
    const orderItemUrl = 'https://localhost:44303/api/OrderDetail';
    const UserUrl = 'https://localhost:44303/api/Users';
    const [revenue, setRevenue] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [profit, setProfit] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const order = await axios.get(orderUrl);
            const finishOrder = order.data.filter((item) => item['finish']);
            var sum = 0;
            for (var i = 0; i < finishOrder.length; i++) {
                sum += finishOrder[i].total;
            }
            setRevenue(sum);
            setExpenses(sum * 0.73);
            setProfit(sum * 0.27);
        };
        fetchData();
    }, []);

    return (
        <Section>
            <div className="analytic color1">
                <div className="design">
                    <div className="logo_statistic">
                        <AiFillTag />
                    </div>
                    <div className="content">
                        <h5>{revenue} Đ</h5>
                    </div>
                </div>
                <div className="total">
                    <h6>TỔNG DOANH THU</h6>
                    <span className="t1">+18%</span>
                    <AiOutlineArrowUp className="svg1" />
                </div>
            </div>
            <div className="analytic color2">
                <div className="design">
                    <div className="logo_statistic">
                        <AiFillExperiment />
                    </div>
                    <div className="content">
                        <h5>{expenses} Đ</h5>
                    </div>
                </div>
                <div className="total">
                    <h6>TỔNG CHI PHÍ</h6>
                    <span className="t2">-9%</span>
                    <AiOutlineArrowDown className="svg2" />
                </div>
            </div>
            <div className="analytic color3">
                <div className="design">
                    <div className="logo_statistic">
                        <AiFillDollarCircle />
                    </div>
                    <div className="content">
                        <h5>{profit} Đ</h5>
                    </div>
                </div>
                <div className="total">
                    <h6>TỔNG LỢI NHUẬN</h6>
                    <span className="t1">+24%</span>
                    <AiOutlineArrowUp className="svg1" />
                </div>
            </div>
        </Section>
    );
}

export default Statistic;
const Section = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    .color1 {
        background-color: #eef4ff;
    }
    .color2 {
        background-color: #fdf4f5;
    }
    .color3 {
        background-color: #fffce4;
    }
    .analytic {
        padding: 1rem;
        border-radius: 1rem;
        color: black;
        justify-content: space-evenly;
        align-items: center;
        gap: 1rem;
        transition: 0.5s ease-in-out;
        &:hover {
            background-color: #d4e0ff;
            color: black;
            svg {
                color: black;
            }
        }
        .design {
            display: flex;
            align-items: center;
            gap: 1rem;
            .logo_statistic {
                background-color: white;
                border-radius: 1rem;
                border: 1px solid black;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1.5rem;
                svg {
                    font-size: 1.5rem;
                }
            }
        }
        .total {
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: space-evenly;
            margin-top: 20px;
            .svg1 {
                color: green;
            }
            .svg2 {
                color: red;
            }
            .t1 {
                color: green;
            }
            .t2 {
                color: red;
            }
            h6 {
                color: grey;
            }
        }
    }
`;
