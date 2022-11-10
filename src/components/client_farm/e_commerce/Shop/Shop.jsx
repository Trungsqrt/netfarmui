import React, { useEffect, useState } from 'react';
import Header from '../../share/header/Header';
import Product from './Product/Product';
import productAPI from '../../../../apis/productAPI';
import axios from 'axios';
import '../css/style.css';
const Shop = () => {
    const categoryUrl = 'https://localhost:44303/api/Categories';
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const productsPerPage = 8;
    const pagesVisited = pageNumber * productsPerPage;
    const displayProducts = products.slice(pagesVisited, pagesVisited + productsPerPage).map(products);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getAPI();
            const data = response.data;
            setProducts(data);
        };
        fetchData();
    }, []);

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
            const response = await productAPI.getAPI();
            const filterList = response.data.filter((item) => item['category_ID'] === Number(id));
            setProducts(filterList);
        };
        fetchData();
    }
    return (
        <div>
            <Header></Header>
            <div className="shop">
                <div className="shop_block">
                    <div className="shop_block_text">SHOP</div>
                    <div className="shop_block_text_sm">NetFarm</div>
                </div>
                <div className="shop_content">
                    {/* <div className="product_category">
                        <ul className="product_category_list">
                            {category
                                ? category.map((item, index) => (
                                      <li
                                          className="product_category_item"
                                          onClick={() => FilterList(item.categoryId)}
                                          key={index}
                                      >
                                          <img className="product_category_img" src={item.categorySlug}></img>
                                          <div className="product_category_title">{item.display}</div>
                                      </li>
                                  ))
                                : ''}
                        </ul>
                    </div> */}
                    <div className="product_row">
                        <div className="list_product">
                            {products
                                ? products.map((item, index) => (
                                      <Product product={item} key={item.id} update={item.id} number={index}></Product>
                                  ))
                                : ''}
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
