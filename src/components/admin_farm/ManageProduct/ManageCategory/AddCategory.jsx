import React from 'react';
import Header from '../../share/header/Header';
import { useState } from 'react';
import axios from 'axios';
import '../../css/style.css';
const url = 'https://localhost:44303/api/Categories';

const AddCategory = () => {
    const [display, setDisplay] = useState('');
    const [categorySlug, setCategorySlug] = useState('');

    const onClickHandler = (e) => {
        e.preventDefault();
        const postCategory = {
            display: display,
            categorySlug: categorySlug,
        };
        if (postCategory.display === '' || postCategory.categorySlug === '') {
            alert('Không được để trống');
        } else {
            try {
                axios.post(url, postCategory);
                alert('Thêm danh mục thành công!');
                window.location.reload();
            } catch (err) {
                alert('Có lỗi, xin vui lòng thử lại!');
            }
        }
    };
    return (
        <div>
            <Header></Header>
            <div className="addProduct_container">
                <div className="products_table_container">
                    <form>
                        <div className="addProduct_title">Nhập thông tin danh mục </div>
                        <ul className="addProduct_list">
                            <li className="addProduct_row">
                                <div className="product_properties">Tên danh mục</div>
                                <input
                                    className="product_input"
                                    type={Text}
                                    value={display}
                                    placeholder="Nhập tên danh mục..."
                                    onChange={(e) => setDisplay(e.target.value)}
                                    onInvalid={(e) => e.target.setCustomValidity('Vui lòng không để trống')}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                ></input>
                            </li>
                            <li className="addProduct_row">
                                <div className="product_properties">Slug</div>
                                <input
                                    className="product_input"
                                    type={Text}
                                    value={categorySlug}
                                    placeholder="Nhập slug..."
                                    onChange={(e) => setCategorySlug(e.target.value)}
                                    onInvalid={(e) => e.target.setCustomValidity('Vui lòng không để trống')}
                                    onInput={(e) => e.target.setCustomValidity('')}
                                ></input>
                            </li>
                        </ul>
                        <div className="addProduct_btn_line">
                            <button type="submit" className="add_new_product" onClick={onClickHandler}>
                                Thêm mới
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
