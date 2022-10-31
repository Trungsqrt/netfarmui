import React, { useEffect, useState } from 'react';
import Header from '../share/header/Header';
import { useNavigate, Link } from 'react-router-dom';
import productAPI from '../../../apis/productAPI';
import axios from 'axios';
import '../css/style.css';
const ManageProduct = () => {
    const categoryUrl = 'https://localhost:44303/api/Categories';
    const orderUrl = 'https://localhost:44303/api/Order';
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [render, setRender] = useState(1);
    const [products, setProducts] = useState([]);

    console.log('loadPage');
    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getAPI();
            const dataset = response.data;
            setProducts(dataset);
            setData(dataset);
        };
        fetchData();
    }, []);
    console.log(render);
    // phần này lấy dữ liệu về sản phẩm

    const ProductHandler = () => {
        setRender(1);
        const fetchData = async () => {
            setData([]);
            const response = await productAPI.getAPI();
            const dataset = response.data;
            setProducts(dataset);
            setData(dataset);
            console.log(data);
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

    // Phần này lấy dữ liệu cho category
    const CategoryHandler = () => {
        setRender(2);
        const fetchData = async () => {
            setData([]);
            const response = await axios.get(categoryUrl);
            const dataset = response.data;
            setData(dataset);
            console.log(data);
        };
        fetchData();
    };

    const handleDeleteCategory = (index) => {
        async function deleteHandler() {
            await axios.delete(`${categoryUrl}/${index}`);
        }
        deleteHandler();
    };

    // Phần này lấy dữ liệu cho order
    const OrderHandler = () => {
        setRender(3);
        const fetchData = async () => {
            const response = await axios.get(orderUrl);
            const dataset = response.data;
            setData(dataset);
        };
        fetchData();
    };

    return (
        <div>
            <Header></Header>
            <div className="manageContainer">
                <div className="MenuProduct">
                    <div className="manageProduct_container">
                        <ul className="menulist">
                            <li className="MenuItem" onClick={ProductHandler}>
                                <p className="menu_link">MẶT HÀNG</p>
                            </li>
                            <li className="MenuItem" onClick={CategoryHandler}>
                                <p className="menu_link">DANH MỤC</p>
                            </li>
                            <li className="MenuItem" onClick={OrderHandler}>
                                <p className="menu_link">ĐƠN HÀNG</p>
                            </li>
                            <li className="MenuItem">
                                <p href="" className="menu_link">
                                    THỐNG KÊ
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="manage_content">
                    {render == 1 && (
                        <div>
                            <Link to="admin/addNewProduct" className="add_new_product_link">
                                <div className="add_new_product">
                                    <p className="reset-anchor add_icon" style={{ cursor: 'pointer' }}>
                                        <i className="fa-solid fa-plus"></i>
                                    </p>
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
                                    {data
                                        ? data.map((product, index) => (
                                              <tr className="text_center">
                                                  <td className="text_center">{product.id}</td>
                                                  <td className="text_center">{product.name}</td>
                                                  <td className="text_center">{product.category_ID}</td>
                                                  <td className="text_center">{product.price}</td>
                                                  <td className="text_center">
                                                      <img src={product.image1} alt="" width="100px" />
                                                  </td>
                                                  <td className="text_center">
                                                      <p
                                                          className="reset-anchor remove_cart"
                                                          style={{ cursor: 'pointer' }}
                                                          onClick={() => handleDeleteProduct(product.id)}
                                                      >
                                                          <i className="fas fa-trash-alt small text-muted"></i>
                                                      </p>
                                                  </td>
                                                  <td className="text_center">
                                                      <Link to={`/product/edit/${product.id}`}>
                                                          <p className="reset-anchor " style={{ cursor: 'pointer' }}>
                                                              <i className="fa-solid fa-pen-to-square"></i>
                                                          </p>
                                                      </Link>
                                                  </td>
                                              </tr>
                                          ))
                                        : ''}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {render == 2 && (
                        <section>
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
                                            <strong className="text-small text-uppercase">ID</strong>
                                        </th>
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">Tên Danh Mục</strong>
                                        </th>
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">Slug</strong>
                                        </th>
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">Xóa</strong>
                                        </th>
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">Sửa</strong>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data
                                        ? data.map((item, index) => (
                                              <tr className="text_center">
                                                  <td className="text_center">{item.categoryId}</td>
                                                  <td className="text_center">{item.display}</td>
                                                  <td className="text_center">{item.categorySlug}</td>
                                                  <td className="text_center">
                                                      <a
                                                          className="reset-anchor remove_cart"
                                                          style={{ cursor: 'pointer' }}
                                                          onClick={() => handleDeleteCategory(item.categoryId)}
                                                      >
                                                          <i className="fas fa-trash-alt small text-muted"></i>
                                                      </a>
                                                  </td>
                                                  <td className="text_center">
                                                      <Link to={`/category/edit/${item.categoryId}`}>
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
                        </section>
                    )}
                    {render == 3 && (
                        <section>
                            <table className="products_table">
                                <thead className="bg-light">
                                    <tr className="text-center">
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">ID</strong>
                                        </th>
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">Tên Khách Hàng</strong>
                                        </th>
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">Địa chỉ</strong>
                                        </th>
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">SĐT</strong>
                                        </th>
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">Số tiền</strong>
                                        </th>
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">Chi tiết</strong>
                                        </th>
                                        <th className="border-0" scope="col">
                                            <strong className="text-small text-uppercase">Duyệt đơn</strong>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data
                                        ? data.map((item, index) => (
                                              <tr className="text_center">
                                                  <td className="text_center">{item.id}</td>
                                                  <td className="text_center">{item.name}</td>
                                                  <td className="text_center">{item.address}</td>
                                                  <td className="text_center">{item.phone}</td>
                                                  <td className="text_center">{item.total}</td>
                                                  <td className="text_center">
                                                      <button>Chi tiết đơn hàng</button>
                                                  </td>
                                                  <td className="text_center">
                                                      <button>Xác nhận đơn hàng</button>
                                                  </td>
                                              </tr>
                                          ))
                                        : ''}
                                </tbody>
                            </table>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;
