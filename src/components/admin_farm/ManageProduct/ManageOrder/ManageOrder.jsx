import React, { useEffect, useState, useMemo } from 'react';
import '../../css/style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../../share/Pagination/Pagination';

let PageSize = 10;

const ManageOrder = () => {
    const orderUrl = 'https://localhost:44303/api/Order';
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [text, setText] = useState('Đã xác nhận');
    const [currentData, setCurrentData] = useState([]);
    const [currentTab, setCurrentTab] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(orderUrl);
            const dataset = response.data;
            dataset.sort((a, b) => new Date(b['createAt']) - new Date(a['createAt']));
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            setCurrentData(dataset.slice(firstPageIndex, lastPageIndex));
            setData(dataset);

            const btnStatus = document.getElementById('btn_status');
        };
        fetchData();
    }, []);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurrentData(data.slice(firstPageIndex, lastPageIndex));
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    const OrderHandler = () => {
        const fetchData = async () => {
            const response = await axios.get(orderUrl);
            const dataset = response.data;
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            setCurrentData(dataset.slice(firstPageIndex, lastPageIndex));
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
        window.location.reload();
    }

    function HanderFilter(value) {
        if (value === 'all') window.location.reload();
        if (value === 'choxacnhan') {
            const fetchData = async () => {
                const response = await axios.get(orderUrl);
                const data = response.data;
                const filter = data.filter((item) => !item[`status`] && !item[`cancel`]);
                setData(filter);
                setCurrentData(filter);
                setCurrentTab(2);
            };
            fetchData();
        } else if (value === 'daxacnhan') {
            const fetchData = async () => {
                const response = await axios.get(orderUrl);
                const data = response.data;
                const filter = data.filter((item) => item[`status`] && !item[`cancel`] && !item[`delivery`]);
                setData(filter);
                setCurrentData(filter);
                setCurrentTab(3);
            };
            fetchData();
        } else if (value === 'danggiao') {
            const fetchData = async () => {
                const response = await axios.get(orderUrl);
                const data = response.data;
                const filter = data.filter((item) => item[`delivery`] && !item[`finish`]);
                setData(filter);
                setCurrentData(filter);
                setCurrentTab(4);
            };
            fetchData();
        } else if (value === 'dagiao') {
            const fetchData = async () => {
                const response = await axios.get(orderUrl);
                const data = response.data;
                const filter = data.filter((item) => item[`finish`]);
                setData(filter);
                setCurrentData(filter);
                setCurrentTab(5);
            };
            fetchData();
        } else if (value === 'dahuy') {
            const fetchData = async () => {
                const response = await axios.get(orderUrl);
                const data = response.data;
                const filter = data.filter((item) => item[`cancel`]);
                setData(filter);
                setCurrentData(filter);
                setCurrentTab(6);
            };
            fetchData();
        }
    }

    return (
        <section>
            <div className="OrderList_category">
                <ul className="OrderList_type">
                    <li
                        className={currentTab === 1 ? 'OrderList_item_active' : 'OrderList_item'}
                        onClick={() => HanderFilter('all')}
                        value="all"
                    >
                        Tất cả
                    </li>
                    <li
                        className={currentTab === 2 ? 'OrderList_item_active' : 'OrderList_item'}
                        onClick={() => HanderFilter('choxacnhan')}
                        value="status"
                    >
                        Chờ xác nhận
                    </li>
                    <li
                        className={currentTab === 3 ? 'OrderList_item_active' : 'OrderList_item'}
                        onClick={() => HanderFilter('daxacnhan')}
                        value="delivery"
                    >
                        Đã xác nhận
                    </li>
                    <li
                        className={currentTab === 4 ? 'OrderList_item_active' : 'OrderList_item'}
                        onClick={() => HanderFilter('danggiao')}
                        value="finish"
                    >
                        Đang giao
                    </li>
                    <li
                        className={currentTab === 5 ? 'OrderList_item_active' : 'OrderList_item'}
                        onClick={() => HanderFilter('dagiao')}
                        value="finish"
                    >
                        Đã giao
                    </li>
                    <li
                        className={currentTab === 6 ? 'OrderList_item_active' : 'OrderList_item'}
                        onClick={() => HanderFilter('dahuy')}
                        value="cancel"
                    >
                        Đã hủy
                    </li>
                </ul>
            </div>
            <div className="products_table_container">
                <div className="products_table_title">Danh sách đơn hàng</div>
                <br />
                <br />
                <table className="products_table">
                    <thead className="bg-light">
                        <tr className="text-center">
                            {/* <th className="border-0" scope="col">
                                <strong className="text-small text-uppercase">ID</strong>
                            </th> */}
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
                                <strong className="text-small text-uppercase">Duyệt đơn</strong>
                            </th>
                            <th className="border-0" scope="col">
                                <strong className="text-small text-uppercase">Chi tiết</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData
                            ? currentData.map((item, index) => (
                                  <tr className="text_center" key={index}>
                                      {/* <td className="text_center">{item.id}</td> */}
                                      <td className="text_center">{item.name}</td>
                                      <td className="text_center">{item.address}</td>
                                      <td className="text_center">{item.phone}</td>
                                      <td className="text_center">{item.total}</td>

                                      <td className="text_center">
                                          <button
                                              onClick={handleApproveOrder}
                                              value={item.status}
                                              name={item.id}
                                              className={item.status || item.cancel ? 'hiden_btn' : ''}
                                          >
                                              {item.status ? 'Đã xác nhận' : 'Xác nhận đơn hàng'}
                                          </button>
                                          <div className={item.status || item.cancel ? '' : 'hiden_btn'}>
                                              {item.cancel
                                                  ? 'Đã hủy'
                                                  : item.finish
                                                  ? 'Đã nhận hàng'
                                                  : item.delivery
                                                  ? 'Đang giao hàng'
                                                  : 'Đã xác nhận- chờ giao hàng'}
                                          </div>
                                      </td>
                                      <td className="text_center">
                                          <Link to={`/manage/OrderDetail/${item.id}`}>
                                              <button value={item.id}>Chi tiết đơn hàng</button>
                                          </Link>
                                      </td>
                                  </tr>
                              ))
                            : ''}
                    </tbody>
                </table>
                <div className="pagination_line">
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={data.length}
                        pageSize={PageSize}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </section>
    );
};

export default ManageOrder;
