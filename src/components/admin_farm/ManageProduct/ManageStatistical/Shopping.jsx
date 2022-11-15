import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineShopping } from 'react-icons/ai';
import { AiOutlineTeam } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import axios from 'axios';

function Shopping() {
    const orderUrl = 'https://localhost:44303/api/Order';
    const orderItemUrl = 'https://localhost:44303/api/OrderDetail';
    const productUrl = 'https://localhost:44303/api/Products';
    const UserUrl = 'https://localhost:44303/api/Users';
    const feedbackurl = 'https://localhost:44303/api/Feedbacks';

    const [totalUser, setTotalUser] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalFeedback, setTotalFeedback] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const order = await axios.get(orderUrl);
            setTotalOrder(order.data.length);
            const user = await axios.get(UserUrl);
            setTotalUser(user.data.length);
            const feedback = await axios.get(feedbackurl);
            setTotalFeedback(feedback.data.length);
            const product = await axios.get(productUrl);
            setTotalProduct(product.data.length);
        };
        fetchData();
    }, []);
    return (
        <Section>
            <div className="shopping ">
                <div className="design ">
                    <div className="logo_shopping img1">
                        <AiOutlineShoppingCart />
                    </div>
                </div>
                <div className="total_shopping ">
                    <h6>ĐƠN HÀNG</h6>
                </div>
                <div className="number ">
                    <h6>{totalOrder}</h6>
                    <AiFillCaretUp className="svg1" />
                    <span className="t1">146 </span>
                </div>
            </div>
            <div className="shopping ">
                <div className="design ">
                    <div className="logo_shopping img2">
                        <AiOutlineShoppingCart />
                    </div>
                </div>
                <div className="total_shopping ">
                    <h6>SẢN PHẨM</h6>
                </div>
                <div className="number ">
                    <h6>{totalProduct}</h6>
                    <AiFillCaretUp className="svg1" />
                    <span className="t1">67 </span>
                </div>
            </div>
            <div className="shopping ">
                <div className="design ">
                    <div className="logo_shopping img3">
                        <AiOutlineTeam />
                    </div>
                </div>
                <div className="total_shopping ">
                    <h6>NGƯỜI DÙNG</h6>
                </div>
                <div className="number ">
                    <h6>{totalUser}</h6>
                    <AiFillCaretUp className="svg1" />
                    <span className="t1">324 </span>
                </div>
            </div>
            <div className="shopping ">
                <div className="design ">
                    <div className="logo_shopping img4">
                        <AiOutlineShopping />
                    </div>
                </div>
                <div className="total_shopping ">
                    <h6>PHẢN HỒI</h6>
                </div>
                <div className="number ">
                    <h6>{totalFeedback}</h6>
                    <AiFillCaretUp className="svg1" />
                    <span className="t1">48 </span>
                </div>
            </div>
        </Section>
    );
}

export default Shopping;
const Section = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    .shopping {
        padding: 0.5rem 0;
        border-radius: 1rem;
        color: black;
        background-color: #f8f9fe;
        justify-content: space-evenly;
        align-items: center;
        gap: 0.5rem;
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
            gap: 0.5rem;
            justify-content: center;
            .img1 {
                background-color: #668dff;
            }
            .img2 {
                background-color: #ffb2c3;
            }
            .img3 {
                background-color: #ffdd00;
            }
            .img4 {
                background-color: #030303;
            }
            .logo_shopping {
                border-radius: 0.3rem;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.8rem;
                svg {
                    font-size: 1rem;
                    color: white;
                }
            }
        }
        .total_shopping {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            justify-content: space-evenly;
            margin-top: 10px;
            h6 {
                color: grey;
                font-size: 12px;
            }
        }
        .number {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            justify-content: space-evenly;
            margin-top: 10px;
            .svg1 {
                color: green;
                font-size: 12px;
            }
            .t1 {
                color: green;
                font-size: 12px;
            }
            h6 {
                color: black;
                font-size: 12px;
            }
        }
    }
`;
