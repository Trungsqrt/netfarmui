import React, { useEffect, useState } from 'react';
import Header from '../share/header/Header';
import { useNavigate, Link } from 'react-router-dom';
import productAPI from '../../../apis/productAPI';
import axios from 'axios';
import '../css/style.css';
import Order from './ManageOrder/Order';
const ManageProduct = () => {
    const categoryUrl = 'https://localhost:44303/api/Categories';
    const orderUrl = 'https://localhost:44303/api/Order';
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [render, setRender] = useState(1);
    const [products, setProducts] = useState([]);
    const [text, setText] = useState('Xác nhận đơn hàng');
    const currentTab = localStorage.getItem('currentTab');
    useEffect(() => {
        if (currentTab) {
            if (Number(currentTab) === 3) {
                OrderHandler();
            } else if (Number(currentTab) === 2) {
                CategoryHandler();
            }
            setRender(currentTab);
        } else {
            const fetchData = async () => {
                const response = await productAPI.getAPI();
                const dataset = response.data;
                setProducts(dataset);
                setData(dataset);
            };
            fetchData();
        }
    }, []);
    // phần này lấy dữ liệu về sản phẩm

    const ProductHandler = () => {
        setRender(1);
        localStorage.setItem('currentTab', 1);
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
        localStorage.setItem('currentTab', 2);
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
            CategoryHandler();
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

    function handleApproveOrder(e) {
        const orderId = e.target.name;
        const fetchData = async () => {
            const response = await axios.get(orderUrl);
            const dataset = response.data;
            const filter = dataset.filter((item) => item['id'] === orderId);
            const order = filter[0];
            order.status = true;
            try {
                const putUrl = `${orderUrl}/${orderId}`;
                axios.put(putUrl, order);
                localStorage.setItem('currentTab', 3);
                window.location.reload();
                OrderHandler();
            } catch (err) {
                alert('Có lỗi, xin vui lòng thử lại!');
            }
        };
        fetchData();
        // window.location.reload();
    }

    function handlerDetaiOrder(e) {
        const orderId = e.target.value;
        setRender(4);
        const fetchData = async () => {
            setData([]);
            const response = await axios.get(orderUrl);
            const dataset = response.data;
            const filter = dataset.filter((item) => item['id'] === orderId);
            setData(filter);
        };
        fetchData();
    }

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
                                              <tr className="text_center" key={index}>
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
                            <Link to="/manageProduct/addNewCategory" className="add_new_product_link">
                                <div className="add_new_product">
                                    <p className="reset-anchor add_icon" style={{ cursor: 'pointer' }}>
                                        <i className="fa-solid fa-plus"></i>
                                    </p>
                                    Thêm danh mục mới
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
                                              <tr className="text_center" key={index}>
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
                                              <tr className="text_center" key={index}>
                                                  <td className="text_center">{item.id}</td>
                                                  <td className="text_center">{item.name}</td>
                                                  <td className="text_center">{item.address}</td>
                                                  <td className="text_center">{item.phone}</td>
                                                  <td className="text_center">{item.total}</td>
                                                  <td className="text_center">
                                                      <Link to={`/manage/OrderDetail/${item.id}`}>
                                                          <button value={item.id}>Chi tiết đơn hàng</button>
                                                      </Link>
                                                  </td>
                                                  <td className="text_center">
                                                      <button onClick={handleApproveOrder} value={text} name={item.id}>
                                                          {item.status ? 'Đã xác nhận' : 'Xác nhận đơn hàng'}
                                                      </button>
                                                  </td>
                                              </tr>
                                          ))
                                        : ''}
                                </tbody>
                            </table>
                        </section>
                    )}
                    {render == 4 &&
                        (data
                            ? data.map((item, index) => (
                                  <Order order={item} key={item.id} update={item.id} number={index}></Order>
                              ))
                            : '')}
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;
