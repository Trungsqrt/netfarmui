import React, { useEffect, useState, useMemo } from 'react';
import '../../css/style.css';
import { Link } from 'react-router-dom';
import Pagination from '../../share/Pagination/Pagination';
import productAPI from '../../../../apis/productAPI';
import axios from 'axios';

let PageSize = 6;
const Manage = () => {
    const categoryUrl = 'https://localhost:44303/api/Categories';
    const [firstData, setFirstData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getAPI();
            const dataset = response.data;
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            setFirstData(dataset.slice(firstPageIndex, lastPageIndex));
            setData(dataset);
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

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setFirstData(data.slice(firstPageIndex, lastPageIndex));
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
    // phần này lấy dữ liệu về sản phẩm
    const ProductHandler = () => {
        const fetchData = async () => {
            setData([]);
            const response = await productAPI.getAPI();
            const dataset = response.data;
            setData(dataset);
        };
        fetchData();
        currentTableData();
    };

    const handleDeleteProduct = (index) => {
        async function deleteHandler() {
            await productAPI.delete(index);
            ProductHandler();
        }
        deleteHandler();
    };

    function FilterList(id) {
        const fetchData = async () => {
            setCurrentTab(id);
            const response = await productAPI.getAPI();
            if (id !== 0) {
                const filterList = response.data.filter((item) => item['category_ID'] === Number(id));
                setData(filterList);
                setFirstData(filterList);
            } else {
                const firstPageIndex = (currentPage - 1) * PageSize;
                const lastPageIndex = firstPageIndex + PageSize;
                setFirstData(response.data.slice(firstPageIndex, lastPageIndex));
                setData(response.data);
            }
        };
        fetchData();
    }
    return (
        <div>
            {' '}
            <div className="product_category_ad">
                <ul className="product_category_list">
                    <li
                        className={currentTab === 0 ? 'product_category_item_active_ad' : 'product_category_item_ad'}
                        onClick={() => FilterList(0)}
                    >
                        {/* <img className="product_category_img" src="https://bom.so/hhjDCB"></img> */}
                        <div className="product_category_title">Tất cả</div>
                    </li>
                    {category
                        ? category.map((item, index) => (
                              <li
                                  className={
                                      currentTab === item.categoryId
                                          ? 'product_category_item_active_ad'
                                          : 'product_category_item_ad'
                                  }
                                  onClick={() => FilterList(item.categoryId)}
                                  key={index}
                              >
                                  <div className="product_category_title">{item.display}</div>
                              </li>
                          ))
                        : ''}
                </ul>
            </div>
            <div className="products_table_container">
                <div className="products_table_title">Danh sách sản phẩm</div>
                <Link to="admin/addNewProduct" className="add_new_product_link">
                    <div className="add_new_product">
                        {/* <p className="reset-anchor add_icon" style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-plus"></i>
                    </p> */}
                        Thêm sản phẩm mới
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
                        {firstData
                            ? firstData.map((product, index) => (
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
        </div>
    );
};

export default Manage;
