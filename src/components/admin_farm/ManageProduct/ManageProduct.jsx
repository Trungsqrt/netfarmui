import React, { useEffect, useState } from 'react';
import Header from '../share/header/Header';
import Menu from './Menu';
import productAPI from '../../../apis/productAPI';
import Product from './Product';
import '../css/style.css';
import { Link } from 'react-router-dom';
const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getAPI();
            const data = response.data;
            setProducts(data);
            console.log(products);
        };
        fetchData();
    }, []);

    return (
        <div>
            <Header></Header>
            <div className="manageContainer">
                <Menu></Menu>
                <div className="manage_content">
                    <Link to="admin/addNewProduct" className="add_new_product_link">
                        <div className="add_new_product">
                            <a className="reset-anchor add_icon" style={{ cursor: 'pointer' }}>
                                <i class="fa-solid fa-plus"></i>
                            </a>
                            Thêm mặt hàng mới
                        </div>
                    </Link>
                    <table className="products_table">
                        <thead className="bg-light">
                            <tr className="text-center">
                                <th className="border-0" scope="col">
                                    {' '}
                                    <strong className="text-small text-uppercase">ID</strong>
                                </th>
                                <th className="border-0" scope="col">
                                    {' '}
                                    <strong className="text-small text-uppercase">Tên sản phẩm</strong>
                                </th>
                                <th className="border-0" scope="col">
                                    {' '}
                                    <strong className="text-small text-uppercase">Danh mục</strong>
                                </th>
                                <th className="border-0" scope="col">
                                    {' '}
                                    <strong className="text-small text-uppercase">Giá</strong>
                                </th>
                                <th className="border-0" scope="col">
                                    {' '}
                                    <strong className="text-small text-uppercase">Ảnh</strong>
                                </th>
                                <th className="border-0" scope="col">
                                    {' '}
                                    <strong className="text-small text-uppercase">Xóa</strong>
                                </th>
                                <th className="border-0" scope="col">
                                    {' '}
                                    <strong className="text-small text-uppercase">Sửa</strong>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products
                                ? products.map((product, index) => (
                                      <Product
                                          product={product}
                                          key={product.id}
                                          update={product.id}
                                          number={index}
                                      ></Product>
                                  ))
                                : ''}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;
