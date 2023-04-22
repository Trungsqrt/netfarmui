import React, { useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Radio.css';
import Positive from '../../../assets/image/thumbup.png';
import Nev from '../../../assets/image/thumbdown.png';
import Neu from '../../../assets/image/neutral.png';
import { useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import Pagination from '../share/Pagination/Pagination';

import _ from 'lodash';
let PageSize = 3;

const Ad = (props) => {
    const { feedback, index } = props;
    const feedbackRadioUrl = `http://127.0.0.1:8000/feedback/radio/productID/${feedback.productId}`;
    const fbListUrl = `http://127.0.0.1:8000/feedback/get/product/${feedback.productId}`;
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [feedbackRadio, setFeedbackRadio] = useState({});
    const [currentFb, setCurentFb] = useState([]);
    const [fbList, setFbList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [popupData, setPopupData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const radioResponse = await axios.get(feedbackRadioUrl);
            setFeedbackRadio({
                positive: (radioResponse.data.positive * 100).toFixed(2),
                negative: (radioResponse.data.negative * 100).toFixed(2),
                neutral: (radioResponse.data.neutral * 100).toFixed(2),
            });

            console.log((radioResponse.data.positive * 100).toFixed(2));

            const fblistRespone = await axios.get(fbListUrl);
            setFbList(fblistRespone.data);

            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;

            if (fblistRespone.data.length > 2) {
                setCurentFb(fblistRespone.data.slice(0, 3));
            }
        };
        fetchData();
    }, []);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurentFb(fbList.slice(firstPageIndex, lastPageIndex));
        return fbList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    let image;
    if (feedback.sentiment === 'Positive') image = Positive;
    else if (feedback.sentiment === 'Negative') image = Nev;
    else image = Neu;
    function openPopup() {
        setPopupData(feedback);
        setIsPopupOpen(true);
        const overlay = document.querySelector('.overlay');
        overlay.classList.add('overlayActive');
    }

    function closePopup() {
        setIsPopupOpen(false);
        const overlay = document.querySelector('.overlay');
        overlay.classList.remove('overlayActive');
    }

    function viewAll() {
        const fetchData = async () => {
            const response = await axios.get(fbListUrl);
            const dataset = response.data;
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            setCurentFb(dataset.slice(firstPageIndex, lastPageIndex));
            setFbList(dataset);
        };
        fetchData();
    }
    return (
        <div className="fbs_item hov_Scale" key={index}>
            <div className="fbs_box">
                <div className="overlay"></div>

                <Link className="link_fb" to={``}>
                    <img src={image} alt="" className="fb_img" />
                    <h6 className="pr_name">{feedback.productName}</h6>
                    <div>
                        <img src={feedback.productImg} alt="" className="product_img" />
                    </div>
                    <h6 className="fb_name">{feedback.userName}:</h6>
                    <h3 className="fb_content">{feedback.contents}</h3>
                </Link>
                <button className="viewPopup" onClick={openPopup}>
                    Xem chi tiết
                </button>
                {isPopupOpen && (
                    <div>
                        <Popup
                            content={
                                <div className="popup_product">
                                    <div className="popup_product_header">{popupData.productName}</div>
                                    <div className="popup_product_content">
                                        <img className="popup_product_img" src={popupData.productImg} alt="" />
                                        <div className="popup_product_description">
                                            <div>Đơn vị tính: {popupData.productUnit}</div>
                                            <div>Nơi sản xuất: {popupData.productpPaceProduce}</div>
                                            <div>Giá: {popupData.productPrice}</div>
                                            <div className="popup_product_des">{popupData.productDescription}</div>
                                        </div>
                                    </div>
                                    <div className="popup_product_feedback">
                                        <div className="popup_product_feedback_title">Tỉ lệ phản hồi:</div>
                                        <div className="popup_product_feedback_radio">
                                            <div className="green">Tích cực: {feedbackRadio.positive} %</div>
                                            <div className="red">Tiêu cực: {feedbackRadio.negative} %</div>
                                            <div className="blue">Trung tính: {feedbackRadio.neutral} %</div>
                                        </div>
                                    </div>
                                    <div className="">
                                        {currentFb
                                            ? currentFb.map((item, index) => (
                                                  <div className="popup_product_feedback_content">
                                                      <div className="popup_product_fb_item display_flex">
                                                          <div className="popup_product_fb_item_icon">
                                                              <i class="fa-regular fa-user"></i>
                                                          </div>
                                                          <div className="popup_product_fb_item_content">
                                                              <div className="display_flex">
                                                                  <div className="fb_user_name">{item.userName}</div>
                                                                  <div className="">
                                                                      <ul className="fb_star">
                                                                          {_.times(item.star, (i) => (
                                                                              <li className="star_item" key={i}>
                                                                                  <i className="fas fa-star small text-warning"></i>
                                                                              </li>
                                                                          ))}
                                                                      </ul>
                                                                  </div>
                                                              </div>
                                                              <div>{item.contents}</div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              ))
                                            : ''}
                                        <div className="pagination_line paginationfb ">
                                            <Pagination
                                                className="pagination-bar"
                                                currentPage={currentPage}
                                                totalCount={fbList.length}
                                                pageSize={PageSize}
                                                onPageChange={(page) => setCurrentPage(page)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            closePopup={closePopup}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ad;
