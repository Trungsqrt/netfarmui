import React from 'react';
import Header from '../share/header/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/style.css';
import styles from './AddProduct.module.css';
import { uploadCloudinary } from './UploadCloudinary';
import { useParams } from 'react-router-dom';

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
    const [cost, setCost] = useState('');

    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [fileItem, setFileItem] = useState([]);
    const [done, setDone] = useState(false);
    const [newImages, setNewImages] = useState([]);

    const prop = useParams();
    const idProduct = prop.id;

    const handleFileChange = (event) => {
        setFiles([...event.target.files]);
    };

    const handleDelete = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        try {
            let arr = [];
            setLoading(true);

            for (let i = 0; i < files.length; i++) {
                const dt = await uploadCloudinary(files[i]);
                arr.push(dt);
            }

            setFileItem(arr);

            return 1;
        } catch (error) {
            return 2;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(categoryUrl);
            setCatList(response.data);
        };

        const fetchCurrentData = async () => {
            const { data } = await axios.get(`https://localhost:44303/api/Products/${idProduct}`);
            setName(data.name);
            setUnit(data.unit);
            setPlaceProduce(data.placeProduce);
            setPrice(data.price);
            setCost(data.cost);
            setInventory(data.cost);
            setDescription(data.description);
            setCategory(data.category_ID);
            setNewImages([]);
        };

        fetchData();
        if (idProduct) {
            fetchCurrentData();
            const postProduct = {
                name: name,
                unit: unit,
                placeProduce: placeProduce,
                price: price,
                cost: cost,
                inventoryNumber: invetory,
                description: description,
                category_ID: category,
            };
            console.log(postProduct);
        }
    }, []);

    const onClickHandler = async () => {
        console.log(fileItem.length);
        if (
            name === '' ||
            files[0] === '' ||
            unit === '' ||
            price === '' ||
            cost === '' ||
            invetory === ''
            // ||             newImages.length === 0
        ) {
            alert('Bạn phải nhập đầy đủ thông tin !!');
            return;
        }
        // don't remove it
        const re = await handleUpload();
    };

    useEffect(() => {
        fileItem.forEach((item) => {
            setNewImages((prev) => [...prev, item.url]);
        });
        console.log('fileItem: ', fileItem);
    }, [fileItem]);

    useEffect(() => {
        console.log(files);
    }, [files]);

    useEffect(() => {
        if (newImages.length === files.length && newImages.length > 0) {
            setLoading(false);
            setDone(true);
        }
    }, [newImages]);

    useEffect(() => {
        if (done === true) {
            const postProduct = {
                name: name,
                unit: unit,
                placeProduce: placeProduce,
                price: price,
                cost: cost,
                inventoryNumber: invetory,
                description: description,
                category_ID: category,
                images: newImages,
            };
            try {
                if (idProduct) {
                    axios.put(`${url}/${idProduct}`, postProduct);
                    alert('Đăng thành công!');
                    window.location.reload();
                } else {
                    axios.post(url, postProduct);
                    alert('Đăng thành công!');
                    window.location.reload();
                }
            } catch (err) {
                alert('Có lỗi xảy ra khi tạo sản phẩm, xin vui lòng thử lại!');
            }
        } else {
            // alert('Có lỗi xảy ra!');
        }
    }, [done]);

    return (
        <div>
            <Header></Header>
            <div className="addProduct_container ">
                <div className="products_table_container">
                    <div className="addProduct_title">Nhập thông tin sản phẩm</div>
                    <ul className="addProduct_list">
                        <li className="addProduct_row">
                            <div className="product_properties">Tên sản phẩm</div>
                            <input
                                className="product_input"
                                value={name}
                                placeholder="Nhập tên sản phẩm..."
                                onChange={(e) => setName(e.target.value)}
                                required
                            ></input>
                        </li>
                        <li className="addProduct_row">
                            <div className="product_properties">Danh mục</div>
                            <div className="product_input product_input_select " style={{ marginLeft: 'unset' }}>
                                <select
                                    name="category"
                                    id="category"
                                    className={'product_input'}
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
                                value={price}
                                placeholder="Nhập giá sản phẩm"
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                type="number"
                            ></input>
                        </li>
                        <li className="addProduct_row">
                            <div className="product_properties">Đơn vị tính</div>
                            <input
                                className="product_input"
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
                                value={placeProduce}
                                placeholder="Nhập nơi sản xuất ..."
                                onChange={(e) => setPlaceProduce(e.target.value)}
                            ></input>
                        </li>
                        <li className="addProduct_row">
                            <div className="product_properties">Số lượng tồn kho</div>
                            <input
                                className="product_input"
                                value={invetory}
                                placeholder="Nhập số lượng sản phẩm có sẵn ..."
                                onChange={(e) => setInventory(e.target.value)}
                                required
                                type="number"
                            ></input>
                        </li>
                        <li className="addProduct_row">
                            <div className="product_properties">Chi phí</div>
                            <input
                                className="product_input"
                                value={cost}
                                placeholder="Nhập chi phí gốc của sản phẩm ..."
                                onChange={(e) => setCost(e.target.value)}
                                required
                                type="number"
                            ></input>
                        </li>

                        <li className="addProduct_row">
                            <div className="product_properties">Mô tả</div>
                            <input
                                className="product_input"
                                value={description}
                                placeholder="Nhập số lượng sản phẩm có sẵn ..."
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></input>
                        </li>
                        <li className="addProduct_row">
                            <div className="product_properties">Ảnh sản phẩm</div>
                            <div className="uploadFile">
                                <div>
                                    {/* <label htmlFor="fileupload" className={styles.customFileUpload}>
                                        <i className="fa fa-cloud-upload"></i> Custom Upload
                                    </label> */}
                                    {/* <input
                                        className="product_input"
                                        id="fileupload"
                                        type="file"
                                        // value={currentImage}
                                        // onChange={(e) => setCurrentImage(e.target.files[0])}
                                        required
                                    /> */}
                                    <div>
                                        <h4 styles={{}}>Upload Images</h4>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            multiple={true}
                                            style={{ padding: '12px' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </li>
                        <div className={styles.imageSection}>
                            <div className={styles.box1}>Các ảnh</div>
                            <div className={styles.box2}>
                                {files.map((file, index) => (
                                    <div key={index} className={styles.wrap}>
                                        <div className={styles.fileItems}>
                                            <p className={styles.fileItem}>{file.name}</p>
                                            <button onClick={() => handleDelete(index)} className={styles.deleteBtn}>
                                                x
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ul>
                    <div className="addProduct_btn_line">
                        <button className="add_new_product" onClick={onClickHandler} disabled={loading}>
                            {loading ? 'Đang tải ảnh' : 'Xác nhận'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
