import React, { useEffect, useState, useMemo } from 'react';
import Header from '../../share/header/Header';
import Footer from '../../share/footer/Footer';
import Menuleft from '../../share/menu/Menuleft';
import Article from '../../article/Article';
import articleAPI from '../../../../apis/articleAPI';
import { default as StaffHeader } from '../../../admin_farm/share/header/Header';
import { default as FarmerHeader } from '../../../client_farm/share/header/Header';
import Pagination from '../../../admin_farm/share/Pagination/Pagination';

import '../InforPage.css';
// import '../../e_commerce/css/style.css';
import './Policy.css';
let PageSize = 3;

const InforPage = () => {
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [user, setUser] = useState(currentUser.roleName);
    // lấy dữ liệu toàn bộ các bài đăng
    const [articles, setArticles] = useState([]);
    const [policyItems, setPolicyItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getAPI();
            const data = response.data;
            const filterPolicy = data.filter((item) => item['aCategoryName'] === 'chinhsach');
            setArticles(filterPolicy);
            // // lấy các bài đăng thuộc category chính sách
            // trường hợp có nhiều bài thì lấy 3 nếu ko đúng bằng đồ dài của số bài đăng
        };
        fetchData();
    }, []);

    useEffect(() => {
        // // lấy các bài đăng thuộc category chính sách
        // trường hợp có nhiều bài thì lấy 3 nếu ko đúng bằng đồ dài của số bài đăng
        const filterManual = articles.filter((item) => item['aCategoryName'] === 'chinhsach');
        setPolicyItems(filterManual);
    }, [articles]);

    useEffect(() => {
        const firstPageIndex = (currentPage - 1) * PageSize; //(1 - 1) * 8 = 0
        const lastPageIndex = firstPageIndex + PageSize; // 0 + 8
        setCurrentData(policyItems.slice(firstPageIndex, lastPageIndex)); //(0,8)
    }, [policyItems]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurrentData(articles.slice(firstPageIndex, lastPageIndex));
        return articles.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <div>
            {/* {(user === 'Admin' || user === 'Expert') && <StaffHeader />}
            {!(user === 'Admin' || user === 'Expert') && <FarmerHeader />} */}
            <div className="infor_main">
                {/* <div className="menu">
                    <Menuleft></Menuleft>
                </div> */}
                <div className="infor_container">
                    <div className="row">
                        <div className="section_title">Chính sách nhà nước</div>
                        <div>
                            <div className="listarticle">
                                {currentData
                                    ? currentData.map((item, index) => (
                                          <Article
                                              article={item}
                                              key={item.id}
                                              update={item.id}
                                              number={index}
                                          ></Article>
                                      ))
                                    : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pagination_line1">
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={articles.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default InforPage;
