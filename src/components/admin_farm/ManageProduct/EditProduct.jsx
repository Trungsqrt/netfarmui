import React from 'react';
import Header from '../share/header/Header';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import productAPI from '../../../apis/productAPI';
import axios from 'axios';
import '../css/style.css';
const url = 'https://localhost:44303/api/Products';
const categoryUrl = 'https://localhost:44303/api/Categories';

function EditProduct(props) {
    const [detail, setDetail] = useState({});
    const { id } = useParams();
    const [catList, setCatList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(categoryUrl);
            setCatList(response.data);
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getDetail(id);
            console.log(response.data);
            setDetail(response.data);
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        console.log(e.target.name);
        console.log(e.target.value);
        setDetail({ ...detail, [name]: value });
    };

    const onClickHandler = () => {
        try {
            console.log('test', detail);
            const putUrl = `${url}/${id}`;
            axios.put(putUrl, detail);
            alert('Đăng thành công!');
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    };

    return (
        <div>
            <Header></Header>
            <div className="addProduct_container">
                <div className="addProduct_title">Nhập thông tin sản phẩm</div>
                <ul className="addProduct_list">
                    <li className="addProduct_row">
                        <div className="product_properties">Tên sản phẩm</div>
                        <input
                            className="product_input"
                            type={Text}
                            defaultValue={detail.name}
                            placeholder="Nhập tên sản phẩm..."
                            name="name"
                            onChange={handleChange}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Danh mục</div>
                        <div className="product_input product_input_select ">
                            <select
                                id="category"
                                className={'combobox'}
                                onChange={handleChange}
                                name="category_ID"
                                value={detail.category_ID}
                            >
                                {catList
                                    ? catList.map((cat, index) => (
                                          <option value={cat.categoryId} key={index}>
                                              {cat.display}
                                          </option>
                                      ))
                                    : ''}
                            </select>
                        </div>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Giá</div>
                        <input
                            className="product_input"
                            defaultValue={detail.price}
                            placeholder="Nhập gia sản phẩm"
                            name="price"
                            onChange={handleChange}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Đơn vị tính</div>
                        <input
                            className="product_input"
                            type={Text}
                            defaultValue={detail.unit}
                            placeholder="Nhập đơn vị tính ..."
                            name="unit"
                            onChange={handleChange}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Nơi sản xuất</div>
                        <input
                            className="product_input"
                            type={Text}
                            defaultValue={detail.placeProduce}
                            placeholder="Nhập nơi sản xuất ..."
                            onChange={handleChange}
                            name="placeProduce"
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Số lượng tồn kho</div>
                        <input
                            className="product_input"
                            type={Number}
                            defaultValue={detail.inventoryNumber}
                            placeholder="Nhập số lượng sản phẩm có sẵn ..."
                            onChange={handleChange}
                            name="inventoryNumber"
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Mô tả</div>
                        <input
                            className="product_input"
                            type={Text}
                            defaultValue={detail.description}
                            placeholder="Nhập mô tả sản phẩm..."
                            onChange={handleChange}
                            name="description"
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 1</div>
                        <input
                            className="product_input"
                            type={Text}
                            defaultValue={detail.image1}
                            placeholder="Nhập đường dẫn ảnh sản phẩm..."
                            onChange={handleChange}
                            name="image1"
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 2</div>
                        <input
                            className="product_input"
                            type={URL}
                            defaultValue={detail.image2}
                            placeholder="Nhập đường dẫn ảnh sản phẩm..."
                            onChange={handleChange}
                            name="image2"
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 3</div>
                        <input
                            className="product_input"
                            type={URL}
                            defaultValue={detail.image3}
                            placeholder="Nhập đường dẫn ảnh sản phẩm..."
                            onChange={handleChange}
                            name="image2"
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 4</div>
                        <input
                            className="product_input"
                            type={URL}
                            defaultValue={detail.image4}
                            placeholder="Nhập đường dẫn ảnh sản phẩm..."
                            onChange={handleChange}
                            name="image4"
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

export default EditProduct;
