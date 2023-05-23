import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Radio.css';
import _ from 'lodash';
import { Button, Card, Col, Divider, Image, Rate, Row, Select, Space, Spin } from 'antd';
import TextArea from 'rc-textarea';
import Piechart from './Piechart';
const Demo = () => {
    const productUrl = 'https://localhost:44303/api/Products';
    const postUrl = 'http://127.0.0.1:8000/feedback/analyze/';
    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState([]);
    const [data, setData] = useState({
        feedback: {
            contents: '',
            star: 0,
            productId: 0,
            userId: 0,
            sentiment: '',
            userName: '',
        },
        predictions: [[0, 0, 0]],
        preprocessedText: '',
    });
    const [content, setContent] = useState('');
    const [check, setCheck] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;
    const [items, setItem] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const productResponse = await axios.get(productUrl);
            setProductList(productResponse.data);
            setItem(
                productResponse.data.map((e) => ({
                    value: e.id,
                    label: e.name,
                })),
            );
        };
        fetchData();
    }, []);

    const productSelected = async (e) => {
        let tmp = productList.filter((k) => {
            return k.id === e;
        });
        setProduct(tmp);
    };
    const senHandler = async () => {
        if (product.length === 0) {
            alert('Bạn phải chọn sản phẩm');
            return;
        }
        if (content === '') {
            alert('Bạn phải nhập nội dung phản hồi');
            return;
        }
        const fb = {
            contents: content,
            userId: userId,
            productId: product[0].id,
            star: value,
            sentiment: '',
            userName: '',
        };
        setCheck(true);
        const fb_respone = await axios.post(postUrl, fb);
        setData(fb_respone.data);
    };
    const [value, setValue] = useState(5);
    const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
    const dataChart = {
        labels: ['Tích cực', 'Tiêu cực', 'Trung tính'],
        datasets: [
            {
                data: [
                    { name: 'Tiêu cực', value: data.predictions[0][0] },
                    { name: 'Tích cực', value: data.predictions[0][1] },
                    { name: 'Trung tính', value: data.predictions[0][2] },
                ],
                backgroundColor: ['#f93e3e', '#49cc90', '#61affe'],
                hoverBackgroundColor: ['#FFCE56', '#FF6384', '#36A2EB'],
            },
        ],

        plugins: {
            labels: {
                render: 'percentage',
                fontColor: ['green', 'white', 'red'],
                precision: 2,
            },
        },
        text: '23%',
    };
    return (
        <>
            <Card style={{ height: '100%' }}>
                <Row>
                    <Col span={24}>
                        <h2>Phân tích sắc thái phản hồi của người tiêu dùng</h2>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row>
                    <Col span={12}>
                        {' '}
                        <div className="SelectRadio_title_demo">Chọn một sản phẩm để đánh giá</div>
                        <Select
                            options={items}
                            placement="bottomLeft"
                            style={{ width: '80%' }}
                            onChange={productSelected}
                        />
                        {product.length>0 && (
                            <>
                                <br></br>
                                <div className="SelectRadio_title_demo"> Bình luận sản phẩm</div>

                                <br></br>
                                <TextArea
                                    name="content"
                                    id=""
                                    cols="75"
                                    rows="10"
                                    className=""
                                    placeholder="Hãy chia sẽ những điều bạn thích về sản phẩm này cho những người mua khác nhé"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></TextArea>
                                <br></br>
                                <Button type="primary" onClick={senHandler}>
                                    Đăng
                                </Button>
                            </>
                        )}
                    </Col>
                    <Col span={9}>
                        {product.length>0 ? (
                            <>
                                <Image width={400} height={400} src={product[0]?.images[0]?.url} style={{ padding: '40px 0' }} />
                                <Space>
                                    <b>Đánh giá</b>
                                    <Rate tooltips={desc} onChange={setValue} value={value} />
                                    {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                                </Space>
                            </>
                        ) : (
                            <></>
                        )}
                    </Col>
                </Row>

                <br></br>
                {check ? (
                    <>
                        <Row>
                            <Col span={12}>
                                <h4>Dữ liệu tiền xử lý :</h4>
                            </Col>
                            <Col span={12}>
                                <h4>Dữ liệu đã xử lý :</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <TextArea style={{ width: '80%', height: '120px' }} value={data.feedback.contents} />
                            </Col>
                            <Col span={12}>
                                <TextArea style={{ width: '80%', height: '120px' }} value={data.preprocessedText} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4>Số liệu phân tích :</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                {data.predictions[0][0] !== 0 ? (
                                    // <Doughnut data={dataChart} height={60} />
                                    <Piechart dataChart={dataChart}></Piechart>
                                ) : (
                                    <Card style={{ height: '120px' }}>
                                        <Spin
                                            tip="Loading"
                                            size="large"
                                            style={{ justifyContent: 'center', display: 'flex', padding: '20px' }}
                                        >
                                            <div></div>
                                        </Spin>
                                    </Card>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="SelectRadio_title_demo">Kết quả:</Col>
                            <Col className="SelectRadio_title_demo">
                                {data.feedback.sentiment === 'Positive'
                                    ? 'Tích cực'
                                    : data.feedback.sentiment === 'Negative'
                                    ? 'Tiêu cực'
                                    : 'Trung Tính'}
                            </Col>
                        </Row>
                    </>
                ) : (
                    <></>
                )}
            </Card>
        </>
    );
};

export default Demo;
