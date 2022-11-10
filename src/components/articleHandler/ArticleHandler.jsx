import './app.css';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ArticleHandler.module.css';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import convertHtmlToReact from '@hedgedoc/html-to-react';
import Header from '../admin_farm/share/header/Header';
import { useDatasContext } from '../../hooks';
import articleAPI from '../../apis/articleAPI';
const parse = require('html-react-parser');

const url = 'https://localhost:44303/api/Article';

function ArticleHandler() {
    // Get data from context
    const { id } = useParams();
    const idArticle = id;

    const { datas, setDatas } = useDatasContext();

    const editorRef = useRef();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('tintuc');
    const [isPublic, setIsPublic] = useState(true);
    const [thumbnail, setThumbnail] = useState('');
    const [currentContent, setCurrentContent] = useState('');

    const fillCurrentDataArticle = async () => {
        const res = await articleAPI.getDetail(idArticle);
        const response = res.data;
        setTitle(response.title);
        setCategory(response.aCategoryName);
        setIsPublic(response.status);
        setThumbnail(response.imageURL);
        setCurrentContent(response.content);
    };

    useEffect(() => {
        if (idArticle) {
            fillCurrentDataArticle();
        }
    }, []);

    const onClickHandler = () => {
        let postNew = {};
        if (idArticle) {
            postNew = {
                id: idArticle,
                title: title,
                aCategoryName: category,
                status: Boolean(isPublic),
                content: editorRef.current.getContent(),
                cmtStatus: true,
                datePost: new Date().toISOString(),
                dateUpdate: new Date().toISOString(),
                imageURL: thumbnail,
            };
        } else {
            postNew = {
                title: title,
                aCategoryName: category,
                status: Boolean(isPublic),
                content: editorRef.current.getContent(),
                cmtStatus: true,
                datePost: new Date().toISOString(),
                dateUpdate: new Date().toISOString(),
                imageURL: thumbnail,
            };
        }

        try {
            if (idArticle) {
                axios.put(url + `/${idArticle}`, postNew);
            } else {
                axios.post(url, postNew);
            }
            alert('Đăng thành công!');
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles.label}>Đăng bài</div>
                <div className={styles.textContainer}>
                    <p>Tiêu đề</p>
                    <input
                        value={title}
                        placeholder="Nhập tiêu đề..."
                        className={styles.input}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        min={3}
                    ></input>
                    <div className={styles.comboboxContainer}>
                        <div>
                            <p>Danh mục</p>
                            <select
                                name="category"
                                id="category"
                                className={styles.combobox}
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="tintuc">Tin tức</option>
                                <option value="chinhsach">Chính sách</option>
                                <option value="huongdan">Hướng dẫn</option>
                            </select>
                        </div>
                        <button type="button" onClick={onClickHandler} className={styles.button}>
                            Đăng
                        </button>
                        <div>
                            <p>Công khai</p>
                            <select
                                name="category"
                                id="category"
                                className={styles.combobox}
                                onChange={(e) => setIsPublic(e.target.value)}
                                value={isPublic}
                            >
                                <option value="1">Công khai</option>
                                <option value="">Thông báo</option>
                            </select>
                        </div>
                    </div>
                    <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                            plugins: ['image', 'code', 'table', 'link', 'media', 'codesample', 'advlist', 'lists'],
                            toolbar:
                                'image | link | undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help',
                            menubar: false,
                            branding: false,
                            init_instance_callback: function (editor) {
                                var freeTiny = document.querySelector('.tox .tox-notification--in');
                                freeTiny.style.display = 'none';
                            },
                        }}
                        initialValue={currentContent}
                    />
                    <br />
                    <p>Ảnh đại diện</p>
                    <input
                        value={thumbnail}
                        placeholder="Nhập đường dẫn ảnh..."
                        className={styles.input}
                        onChange={(e) => setThumbnail(e.target.value)}
                        required
                        min={3}
                    ></input>
                </div>
            </div>
        </div>
    );
}

export default ArticleHandler;
