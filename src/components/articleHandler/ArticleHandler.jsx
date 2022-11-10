import './app.css';
import React, { useRef, useState, useEffect } from 'react';
import styles from './ArticleHandler.module.css';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import parse from 'html-react-parser';
import convertHtmlToReact from '@hedgedoc/html-to-react';
import Header from '../admin_farm/share/header/Header';
import { useDatasContext } from '../../hooks';

const url = 'https://localhost:44303/api/Article';

function ArticleHandler() {
    // Get data from context
    const { datas, setDatas } = useDatasContext();

    const editorRef = useRef();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('tintuc');
    const [isPublic, setIsPublic] = useState(true);
    const [thumbnail, setThumbnail] = useState('');

    const onClickHandler = () => {
        const postNew = {
            title: title,
            aCategoryName: category,
            status: isPublic,
            content: editorRef.current.getContent(),
            cmtStatus: true,
            datePost: new Date().toISOString(),
            dateUpdate: null,
            imageURL: thumbnail,
        };
        try {
            axios.post(url, postNew);
            alert('Đăng thành công!');
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    };

    // useEffect(() => {
    //     console.log(datas.articles);
    // }, [datas]);

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
                                onChange={(e) => setIsPublic(Boolean(e.target.value))}
                                value={isPublic}
                            >
                                <option value="1">Công khai</option>
                                <option value="0">Không</option>
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
