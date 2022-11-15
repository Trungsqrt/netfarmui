import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ManageCategory = () => {
    const categoryUrl = 'https://localhost:44303/api/Categories';
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setData([]);
            const response = await axios.get(categoryUrl);
            const dataset = response.data;
            setData(dataset);
            console.log(data);
        };
        fetchData();
    }, []);
    const handleDeleteCategory = (index) => {
        async function deleteHandler() {
            await axios.delete(`${categoryUrl}/${index}`);
            CategoryHandler();
        }
        deleteHandler();
    };

    const CategoryHandler = () => {
        const fetchData = async () => {
            setData([]);
            const response = await axios.get(categoryUrl);
            const dataset = response.data;
            setData(dataset);
            console.log(data);
        };
        fetchData();
    };
    return (
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
    );
};

export default ManageCategory;
