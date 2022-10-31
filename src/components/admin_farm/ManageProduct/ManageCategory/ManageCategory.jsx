import React, { useEffect, useState } from 'react';
import Header from '../share/header/Header';
import axios from 'axios';
import '../css/style.css';
import { Link } from 'react-router-dom';
const ManageProduct = () => {
    const categoryUrl = 'https://localhost:44303/api/Categories';
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getAPI();
            const data = response.data;
            setProducts(data);
            console.log(products);
        };
        fetchData();
    }, []);

    const ProductHandler = () => {
        const fetchData = async () => {
            const response = await productAPI.getAPI();
            const data = response.data;
            setProducts(data);
            console.log(products);
        };
        fetchData();
    };

    const handleDeleteProduct = (index) => {
        async function deleteHandler() {
            await productAPI.delete(index);
            ProductHandler();
        }
        deleteHandler();
    };

    return (
        <div>
            <Header></Header>
            <div className="manageContainer">
                <Menu></Menu>
                <div className="manage_content">
                    <Link to="admin/addNewProduct" className="add_new_product_link">
                        <div className="add_new_product">
                            <a className="reset-anchor add_icon" style={{ cursor: 'pointer' }}>
                                <i className="fa-solid fa-plus"></i>
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
                                    <strong className="text-small text-uppercase">Mô tả</strong>
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
                                      <tr className="text_center">
                                          <td className="text_center">{product.id}</td>
                                          <td className="text_center">{product.name}</td>
                                          <td className="text_center">{product.category_ID}</td>
                                          <td className="text_center">{product.price}</td>
                                          <td className="text_center">
                                              <img src={product.image1} alt="" width="100px" />
                                          </td>
                                          <td className="text_center">{product.description}</td>
                                          <td className="text_center">
                                              <a
                                                  className="reset-anchor remove_cart"
                                                  style={{ cursor: 'pointer' }}
                                                  onClick={() => handleDeleteProduct(product.id)}
                                              >
                                                  <i className="fas fa-trash-alt small text-muted"></i>
                                              </a>
                                          </td>
                                          <td className="text_center">
                                              <Link to={`/product/edit/${product.id}`}>
                                                  <a className="reset-anchor " style={{ cursor: 'pointer' }}>
                                                      <i className="fa-solid fa-pen-to-square"></i>
                                                  </a>
                                              </Link>
                                          </td>
                                      </tr>
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
