import './app.css';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './ArticleHandler.module.css';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import convertHtmlToReact from '@hedgedoc/html-to-react';
import Header from '../admin_farm/share/header/Header';
import { useDatasContext } from '../../hooks';
import articleAPI from '../../apis/articleAPI';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isEmpty';
import validator from 'validator';

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
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [validationMsg, setValidationMsg] = useState({});
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
        setUser(currentUser.roleName);
        if (idArticle) {
            fillCurrentDataArticle();
        }
    }, []);

    const validateAll = () => {
        const msg = {};
        if (isEmpty(title, { ignore_whitespace: true })) {
            msg.title = 'Không được bỏ trống';
        }
        if (isEmpty(thumbnail, { ignore_whitespace: true })) {
            msg.thumbnail = 'Không được bỏ trống';
        }
        if (isEmpty(editorRef.current.getContent(), { ignore_whitespace: true })) {
            msg.content = 'Không được bỏ trống';
        }
        const options = {
            min: 50,
            max: 120,
        };
        const options2 = {
            min: 120,
        };
        if (validator.isLength(title, options)) {
        } else {
            msg.title = 'Tiêu đề phải từ 50 đến 120 kí tự';
        }
        if (validator.isLength(editorRef.current.getContent(), options2)) {
        } else {
            msg.content = 'Nội dung phải từ 120 kí tự';
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };

    const onClickHandler = (e) => {
        e.preventDefault();
        const isValid = validateAll();
        if (!isValid) return;

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
            navigate('/ArticleHandler');
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    };

    return (
        <div>
            {(user === 'Expert' || user === 'Admin') && (
                <>
                    <Header />
                    <div className={styles.container}>
                        <div className={styles.label}>Đăng bài</div>
                        <div className={styles.textContainer}>
                            <p>Tiêu đề</p>
                            <p className={styles.error}>{validationMsg.title}</p>
                            <input
                                value={title}
                                placeholder="Nhập tiêu đề..."
                                className={styles.input}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                min={3}
                                // onInvalid={(F) => F.target.setCustomValidity('Tiêu đề tối thiểu 3 kí tự')}
                                // onInput={(F) => F.target.setCustomValidity('')}
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
                            <p className={styles.error}>{validationMsg.content}</p>

                            <Editor
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                init={{
                                    selector: 'textarea',
                                    plugins: [
                                        'image',
                                        'code',
                                        'table',
                                        'link',
                                        'media',
                                        'codesample',
                                        'advlist',
                                        'lists',
                                    ],
                                    toolbar:
                                        'image | media | link | undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help',
                                    menubar: false,
                                    branding: false,
                                    init_instance_callback: function (editor) {
                                        var freeTiny = document.querySelector('.tox .tox-notification--in');
                                        freeTiny.style.display = 'none';
                                    },
                                    content_style: 'p{font-size: 12pt;} body{margin: 16px 16px;}',
                                    audio_template_callback: function (data) {
                                        return (
                                            '<audio controls>' +
                                            '\n<source src="' +
                                            data.source +
                                            '"' +
                                            (data.sourcemime ? ' type="' + data.sourcemime + '"' : '') +
                                            ' />\n' +
                                            (data.altsource
                                                ? '<source src="' +
                                                  data.altsource +
                                                  '"' +
                                                  (data.altsourcemime ? ' type="' + data.altsourcemime + '"' : '') +
                                                  ' />\n'
                                                : '') +
                                            '</audio>'
                                        );
                                    },

                                    media_url_resolver: function (data, resolve /*, reject*/) {
                                        if (data.url.indexOf('YOUR_SPECIAL_VIDEO_URL') !== -1) {
                                            var embedHtml =
                                                '<iframe src="' + data.url + '" width="200" height="100" ></iframe>';
                                            resolve({ html: embedHtml });
                                        } else {
                                            resolve({ html: '' });
                                        }
                                    },
                                }}
                                initialValue={currentContent}
                            />
                            <br />
                            <p>Ảnh đại diện</p>
                            <p className={styles.error}>{validationMsg.thumbnail}</p>
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
                </>
            )}
            {!(user === 'Expert' || user === 'Admin') && navigate('/')}
        </div>
    );
}

export default ArticleHandler;
