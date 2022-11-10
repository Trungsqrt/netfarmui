import React from 'react';
import Header from '../share/header/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
const url = 'https://localhost:44303/api/Products';
const categoryUrl = 'https://localhost:44303/api/Categories';
const AddProduct = () => {
    const [catList, setCatList] = useState([]);
    const [category, setCategory] = useState('1');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('');
    const [placeProduce, setPlaceProduce] = useState('');
    const [invetory, setInventory] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl1, setimgUrl1] = useState('');
    const [imgUrl2, setimgUrl2] = useState('');
    const [imgUrl3, setimgUrl3] = useState('');
    const [imgUrl4, setimgUrl4] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(categoryUrl);
            setCatList(response.data);
        };
        fetchData();
    }, []);

    const onClickHandler = () => {
        const postProduct = {
            name: name,
            image1: imgUrl1,
            image2: imgUrl2,
            image3: imgUrl3,
            image4: imgUrl4,
            unit: unit,
            category: category,
            placeProduce: placeProduce,
            price: price,
            discount: 0,
            inventoryNumber: invetory,
            description: description,
            category_ID: category,
        };
        try {
            axios.post(url, postProduct);
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
                            value={name}
                            placeholder="Nhập tên sản phẩm..."
                            onChange={(e) => setName(e.target.value)}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Danh mục</div>
                        <div className="product_input product_input_select ">
                            <select
                                name="category"
                                id="category"
                                className={'combobox'}
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                {' '}
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
                            type={Number}
                            value={price}
                            placeholder="Nhập gia sản phẩm"
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Đơn vị tính</div>
                        <input
                            className="product_input"
                            type={Text}
                            value={unit}
                            placeholder="Nhập đơn vị tính ..."
                            onChange={(e) => setUnit(e.target.value)}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Nơi sản xuất</div>
                        <input
                            className="product_input"
                            type={Text}
                            value={placeProduce}
                            placeholder="Nhập nơi sản xuất ..."
                            onChange={(e) => setPlaceProduce(e.target.value)}
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Số lượng tồn kho</div>
                        <input
                            className="product_input"
                            type={Number}
                            value={invetory}
                            placeholder="Nhập số lượng sản phẩm có sẵn ..."
                            onChange={(e) => setInventory(e.target.value)}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Mô tả</div>
                        <input
                            className="product_input"
                            type={Number}
                            value={description}
                            placeholder="Nhập số lượng sản phẩm có sẵn ..."
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 1</div>
                        <input
                            className="product_input"
                            type={Text}
                            value={imgUrl1}
                            placeholder="Nhập đường dẫn ảnh sản phẩm..."
                            onChange={(e) => setimgUrl1(e.target.value)}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 2</div>
                        <input
                            className="product_input"
                            type={URL}
                            value={imgUrl2}
                            placeholder="Nhập đường dẫn ảnh sản phẩm..."
                            onChange={(e) => setimgUrl2(e.target.value)}
                            required
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 3</div>
                        <input
                            className="product_input"
                            type={URL}
                            value={imgUrl3}
                            placeholder="Nhập đường dẫn ảnh sản phẩm..."
                            onChange={(e) => setimgUrl3(e.target.value)}
                        ></input>
                    </li>
                    <li className="addProduct_row">
                        <div className="product_properties">Link ảnh 4</div>
                        <input
                            className="product_input"
                            type={URL}
                            value={imgUrl4}
                            placeholder="Nhập đường dẫn ảnh sản phẩm..."
                            onChange={(e) => setimgUrl4(e.target.value)}
                            required
                        ></input>
                    </li>
                </ul>
                <button className="addProduct_btn" onClick={onClickHandler}>
                    Thêm mới
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
