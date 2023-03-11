import React, { useRef, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './StageDetail.module.css';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import convertHtmlToReact from '@hedgedoc/html-to-react';
import Header from '../../admin_farm/share/header/Header';
import isEmpty from 'validator/lib/isEmpty';
import isLength from 'validator/lib/isEmpty';
import validator from 'validator';
const parse = require('html-react-parser');

const StageDetail = () => {
    const StageDetailUrl = 'https://localhost:44303/api/StageDetail';
    const SDUrl = 'https://localhost:44303/api/Standard';
    const { id } = useParams();
    const idStageDetail = id;

    const editorRef = useRef();
    const [currentDescription, setCurrentDescription] = useState('');
    const [stageId, setStageId] = useState(1);
    const [standardId, setStandardId] = useState('');
    const [stageName, setStageName] = useState('');
    const [standardName, setStandardName] = useState('');

    const [listSD, setListSD] = useState([]);

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [validationMsg, setValidationMsg] = useState({});

    const fillCurrentDataStageDetail = async () => {
        const res = await axios.get(`${StageDetailUrl}/${idStageDetail}`);
        const response = res.data;
        setCurrentDescription(response.description);
        setStandardId(response.standardId);
    };

    useEffect(() => {
        setUser(currentUser.roleName);
        const getCurrentData = async () => {
            const { data } = await axios.get(SDUrl);
            data.forEach((item) => {
                const standardData = {
                    id: item.id,
                    standardName: item.standardName,
                };
                setListSD((prevData) => [...prevData, standardData]);
            });
        };
        if (idStageDetail) {
            fillCurrentDataStageDetail();
        }
        getCurrentData();
    }, []);

    useEffect(() => {
        setStandardId(listSD[0]?.id);
    }, [listSD]);

    useEffect(() => {
        console.log('st: ', stageId);
        console.log('sd: ', standardId);
    }, [standardId, stageId]);

    const validateAll = () => {
        const msg = {};
        if (isEmpty(currentDescription, { ignore_whitespace: true })) {
            msg.description = 'Không được bỏ trống';
        }
        if (isEmpty(stageId, { ignore_whitespace: true })) {
            msg.stageId = 'Không được bỏ trống';
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
        if (validator.isLength(currentDescription, options)) {
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
        // const isValid = validateAll();
        // if (!isValid) return;

        let postNew = {};
        if (idStageDetail) {
            postNew = {
                id: idStageDetail,
                description: editorRef.current.getContent(),
                stageId: stageId,
                stageName: stageName,
                standardId: standardId,
                standardName: standardName,
            };
        } else {
            postNew = {
                description: editorRef.current.getContent(),
                stageId: stageId,
                standardId: standardId,
            };
        }

        try {
            if (idStageDetail) {
                axios.put(StageDetailUrl + `/${idStageDetail}`, postNew);
            } else {
                axios.post(StageDetailUrl, postNew);
                console.log(postNew);
            }
            alert('Đăng thành công!');
            navigate('/stageDetailmanagement');
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
                        <div className={styles.label}>Chi Tiết Giai Đoạn Cây Trồng</div>
                        <div className={styles.textContainer}>
                            <div className={styles.comboboxContainer}>
                                <div>
                                    <p>Giai đoạn</p>
                                    <select
                                        name="standard"
                                        id="standard"
                                        className={styles.combobox}
                                        onChange={(e) => setStandardId(e.target.value)}
                                        value={standardId}
                                    >
                                        {listSD.map((item) => (
                                            <option value={item.id} key={item.id}>
                                                {item.standardName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button type="button" onClick={onClickHandler} className={styles.button}>
                                    Đăng
                                </button>
                                <div>
                                    <p>Loại cây</p>
                                    <select
                                        name="stage"
                                        id="stage"
                                        className={styles.combobox}
                                        onChange={(e) => setStageId(e.target.value)}
                                        value={stageId}
                                    >
                                        <option value={1}>Gieo Trồng</option>
                                        <option value={2}>Nảy mầm Cây con</option>
                                        <option value={3}>Chăm sóc thường xuyên</option>
                                        <option value={4}>Thu hoạch</option>
                                    </select>
                                </div>
                            </div>
                            <p className={styles.error}>{validationMsg.content}</p>

                            <Editor
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                init={{
                                    selector: 'textarea',
                                    plugins: ['advlist', 'lists'],
                                    toolbar:
                                        'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor',
                                    menubar: false,
                                    textcolor_map: [
                                        '000000',
                                        'Black',
                                        '993300',
                                        'Burnt orange',
                                        '333300',
                                        'Dark olive',
                                        '003300',
                                        'Dark green',
                                        '003366',
                                        'Dark azure',
                                        '000080',
                                        'Navy Blue',
                                        '333399',
                                        'Indigo',
                                        '333333',
                                        'Very dark gray',
                                        '800000',
                                        'Maroon',
                                        'FF6600',
                                        'Orange',
                                        '808000',
                                        'Olive',
                                        '008000',
                                        'Green',
                                        '008080',
                                        'Teal',
                                        '0000FF',
                                        'Blue',
                                        '666699',
                                        'Grayish blue',
                                        '808080',
                                        'Gray',
                                        'FF0000',
                                        'Red',
                                        'FF9900',
                                        'Amber',
                                        '99CC00',
                                        'Yellow green',
                                        '339966',
                                        'Sea green',
                                        '33CCCC',
                                        'Turquoise',
                                        '3366FF',
                                        'Royal blue',
                                        '800080',
                                        'Purple',
                                        '999999',
                                        'Medium gray',
                                        'FF00FF',
                                        'Magenta',
                                        'FFCC00',
                                        'Gold',
                                        'FFFF00',
                                        'Yellow',
                                        '00FF00',
                                        'Lime',
                                        '00FFFF',
                                        'Aqua',
                                        '00CCFF',
                                        'Sky blue',
                                        '993366',
                                        'Red violet',
                                        'FFFFFF',
                                        'White',
                                        'FF99CC',
                                        'Pink',
                                        'FFCC99',
                                        'Peach',
                                        'FFFF99',
                                        'Light yellow',
                                        'CCFFCC',
                                        'Pale green',
                                        'CCFFFF',
                                        'Pale cyan',
                                        '99CCFF',
                                        'Light sky blue',
                                        'CC99FF',
                                        'Plum',
                                    ],
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
                                initialValue={currentDescription}
                            />
                        </div>
                    </div>
                </>
            )}
            {!(user === 'Expert' || user === 'Admin') && navigate('/')}
        </div>
    );
};

export default StageDetail;
