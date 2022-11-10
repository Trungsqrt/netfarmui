import React from 'react';
import Header from '../../share/header/Header';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/style.css';

function EditCategory(props) {
    const [detail, setDetail] = useState({});
    const { id } = useParams();
    const url = `https://localhost:44303/api/Categories/${id}`;
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url);
            setDetail(response.data);
            console.log(response.data);
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setDetail({ ...detail, [name]: value });
        console.log(detail);
    };

    const onClickHandler = () => {
        try {
            console.log('test', detail);
            axios.put(url, detail);
            alert('chỉnh sửa thành công!');
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    };
    return (
        <div>
            <Header></Header>
            <div className="addProduct_container">
                <div className="addProduct_title">Nhập thông tin danh mục</div>
                <ul className="addProduct_list">
                    <li className="addProduct_row">
                        <div className="product_properties">Tên danh mục</div>
                        <input
                            className="product_input"
                            type={Text}
                            defaultValue={detail.display}
                            placeholder="Nhập tên sản phẩm..."
                            name="display"
                            onChange={handleChange}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Slug</div>
                        <input
                            className="product_input"
                            defaultValue={detail.categorySlug}
                            placeholder="Nhập Slug"
                            name="categorySlug"
                            onChange={handleChange}
                            required
                        ></input>
                    </li>
                </ul>
                <button className="addProduct_btn" onClick={onClickHandler}>
                    Cập nhập
                </button>
            </div>
        </div>
    );
}

export default EditCategory;
