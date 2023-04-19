import React, { useEffect, useState, useMemo } from 'react';
import Header from '../../share/header/Header';
import Product from './Product/Product';
import productAPI from '../../../../apis/productAPI';
import axios from 'axios';
import Pagination from '../../../admin_farm/share/Pagination/Pagination.js';
import '../css/style.css';
import { useNavigate } from 'react-router-dom';
let PageSize = 8;

const Shop = () => {
    const categoryUrl = 'https://localhost:44303/api/Categories';
    const [products, setProducts] = useState([]); //all raw data
    const [category, setCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);

    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = localStorage.getItem('user');
        if (getUser) {
            const currentUser = JSON.parse(getUser);
            setUser(currentUser.roleName ? currentUser.roleName : '');
        }

        const fetchData = async () => {
            //fetch raw data
            const response = await productAPI.getAPI();
            const data = response.data;
            setProducts(data);

            const firstPageIndex = (currentPage - 1) * PageSize; //(1 - 1) * 8 = 0
            const lastPageIndex = firstPageIndex + PageSize; // 0 + 8
            setCurrentData(data.slice(firstPageIndex, lastPageIndex)); //(0,8)
        };
        fetchData();
    }, []);

    // useEffect(() => {
    //     if (user != 'Farmer') {
    //         navigate('/AdminHome');
    //     }
    // }, [user]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurrentData(products.slice(firstPageIndex, lastPageIndex));
        return products.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(categoryUrl);
            const data = response.data;
            setCategory(data);
        };
        fetchData();
    }, []);

    function FilterList(id) {
        const fetchData = async () => {
            setCurrentTab(id);
            const response = await productAPI.getAPI();
            if (id !== 0) {
                const filterList = response.data.filter((item) => item['category_ID'] === Number(id));
                setProducts(filterList);
                setCurrentData(filterList);
            } else {
                const firstPageIndex = (currentPage - 1) * PageSize;
                const lastPageIndex = firstPageIndex + PageSize;
                setCurrentData(response.data.slice(firstPageIndex, lastPageIndex));
                setProducts(response.data);
            }
        };
        fetchData();
    }

    function handlerSelected(e) {
        const value = e.target.value;
        const data = products;
        if (value === '1') {
            data.sort((a, b) => a['price'] - b['price']);
        } else {
            data.sort((a, b) => b['price'] - a['price']);
        }
        setProducts(data);
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurrentData(data.slice(firstPageIndex, lastPageIndex));
        console.log(data);
    }
    return (
        <div>
            <Header></Header>
            {user === 'Farmer' || user === '' ? (
                <div className="shop">
                    <div className="shop_block">
                        <div className="shop_block_text">SHOP</div>
                        <div className="shop_block_text_sm">NetFarm</div>
                    </div>
                    <div className="shop_content">
                        <div className="product_category">
                            <ul className="product_category_list">
                                <li
                                    className={
                                        currentTab === 0 ? 'product_category_item_active' : 'product_category_item'
                                    }
                                    onClick={() => FilterList(0)}
                                >
                                    <img
                                        className="product_category_img"
                                        src="https://inkythuatso.com/uploads/thumbnails/800/2022/01/nong-dan-vector-inkythuatso-03-10-22-22.jpg"
                                    ></img>
                                    <div className="product_category_title">Tất cả</div>
                                </li>
                                {category
                                    ? category.map((item, index) => (
                                          <li
                                              className={
                                                  currentTab === item.categoryId
                                                      ? 'product_category_item_active'
                                                      : 'product_category_item'
                                              }
                                              onClick={() => FilterList(item.categoryId)}
                                              key={index}
                                          >
                                              <img className="product_category_img" src={item.categorySlug}></img>
                                              <div className="product_category_title">{item.display}</div>
                                          </li>
                                      ))
                                    : ''}
                            </ul>
                        </div>
                        <div className="sort_row">
                            <div className="sort_text">Sắp xếp theo:</div>
                            <select onChange={handlerSelected} className="sort_select">
                                <option disabled selected>
                                    Giá
                                </option>
                                <option value="1">Giá: Thấp đến cao</option>
                                <option value="2">Giá: Cao đến thấp</option>
                            </select>
                        </div>

                        <div className="product_row">
                            <div className="list_product">
                                {currentData
                                    ? currentData.map((item, index) => (
                                          <Product
                                              product={item}
                                              key={item.id}
                                              update={item.id}
                                              number={index}
                                          ></Product>
                                      ))
                                    : ''}
                            </div>
                            <div></div>
                        </div>
                        <div className="pagination_line">
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={products.length}
                                pageSize={PageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                navigate('/AdminHome')
            )}
        </div>
    );
};

export default Shop;
