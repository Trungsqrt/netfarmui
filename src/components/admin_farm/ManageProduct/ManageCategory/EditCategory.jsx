import React from 'react';
import Header from '../../share/header/Header';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/style.css';

function EditCategory(props) {
    const [display, setDisplay] = useState('');
    const [categorySlug, setCategorySlug] = useState('');
    const { id } = useParams();
    const url = `https://localhost:44303/api/Categories/${id}`;
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            setDisplay(response.data.display);
            setCategorySlug(response.data.categorySlug);
        };
        fetchData();
    }, [id]);

    const onClickHandler = () => {
        try {
            const data = {
                categoryId: id,
                display: display,
                categorySlug: categorySlug,
            };
            if (data.display === '' || data.categorySlug === '') {
                alert('Không được để trống');
            } else {
                axios.put(url, data);
                alert('chỉnh sửa thành công!');
                window.location.reload();
            }
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    };
    return (
        <div>
            <Header></Header>
            <div className="addProduct_container">
                <div className="products_table_container">
                    <div className="addProduct_title">Nhập thông tin danh mục</div>
                    <ul className="addProduct_list">
                        <li className="addProduct_row">
                            <div className="product_properties">Tên danh mục</div>
                            <input
                                className="product_input"
                                type={Text}
                                value={display}
                                placeholder="Nhập tên sản phẩm..."
                                name="display"
                                onChange={(e) => setDisplay(e.target.value)}
                                required
                            ></input>
                        </li>
                        <li className="addProduct_row">
                            <div className="product_properties">Slug</div>
                            <input
                                className="product_input"
                                value={categorySlug}
                                placeholder="Nhập Slug"
                                name="categorySlug"
                                onChange={(e) => setCategorySlug(e.target.value)}
                                required
                            ></input>
                        </li>
                    </ul>
                    <div className="addProduct_btn_line">
                        <button className="add_new_product" onClick={onClickHandler}>
                            Cập nhập
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCategory;
