import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Radio.css';
import _ from 'lodash';
import { Button, Card, Col, Divider, Dropdown, Image, Rate, Row, Select, Space } from 'antd';
import TextArea from 'rc-textarea';
import { Bar, Doughnut } from 'react-chartjs-2';


const Demo = () => {

    const productUrl = 'https://localhost:44303/api/Products';
    const postUrl = 'http://127.0.0.1:8000/feedback/analyze/';
    const [productList, setProductList] = useState([]);
    const [product, setProduct] = useState();
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
            return k.id == e;
        });
        setProduct(tmp);
    };
    const senHandler = async () => {
        const fb = {
            contents: content,
            userId: userId,
            productId: product?.id,
            star: value,
            sentiment: '',
            userName: '',
        };
        const fb_respone = await axios.post(postUrl, fb);
        setData(fb_respone.data);
    };
    const [value, setValue] = useState(3);
    const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];
    const dataChart = {
        labels: ["Tích cực", "Tiêu cực", "Trung tính"],
        datasets: [
          {
            data: data.predictions,
            backgroundColor: [
                "rgb(195,233,151)",
              "rgb(236,107,109)",
              "rgb(122,231,125)",
            ],
            hoverBackgroundColor: ["#FFCE56","#FF6384", "#36A2EB", ]
          }
        ],
       
        plugins: {
          labels: {
            render: "percentage",
            fontColor: ["green", "white", "red"],
            precision: 2
          },
        },
         text: "23%",
      };
    return (
        <>
            {/* <div className="Demo_container">
                <div className="Demo_header">Phân tích sắc thái phản hồi của người tiêu dùng</div>
                <div className="Demo_request">
                    <div className="display_flex">
                        <div className="demo_title">Chọn sản phẩm :</div>
                        <select name="product" id="product" value={product} onChange={productSelected}>
                            <option disabled value="all">
                                Chọn sản phẩm
                            </option>{' '}
                            {productList
                                ? productList.map((product, index) => (
                                      <option value={product.id} key={index}>
                                          {product.name}
                                      </option>
                                  ))
                                : ''}
                        </select>
                    </div>
                    <div className="display_flex Demo_request demo_star">
                        <span className="demo_title">Chất lượng sản phẩm</span>
                        <div className="demo_list_star">
                            <div className="demo_star_quantity">
                                <button className="dec-btn p-0" style={{ cursor: 'pointer' }} onClick={downText}>
                                    <i className="fas fa-caret-left"></i>
                                </button>
                                <input
                                    className=""
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={star}
                                    onChange={onChangeText}
                                />
                                <button className="inc-btn p-0" style={{ cursor: 'pointer' }} onClick={upText}>
                                    <i className="fas fa-caret-right"></i>
                                </button>
                            </div>
                            <ul className="starline_demo">
                                {_.times(star, (i) => (
                                    <li className="li_star" key={i}>
                                        <i className="fas fa-star small text-warning"></i>
                                    </li>
                                ))}
                            </ul>
                            <div className="star_text">{text}</div>
                        </div>
                    </div>
                    <div className="">
                        <div className="demo_title"> Nhập phản hồi: </div>
                        <div className="feedback_content">
                            <textarea
                                name="content"
                                id=""
                                cols="50"
                                rows="10"
                                className="feedback_content"
                                placeholder="Hãy chia sẽ những điều bạn thích về sản phẩm này cho những người mua khác nhé"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="demo_btn">
                        <button onClick={senHandler} className="compete_btn">
                            Phản hồi
                        </button>
                    </div>
                </div>
                <div className="Demo_respone">
                    <div className="demo_title_respone">
                        <h6 className="demo_title"> Dữ liệu đầu vào:</h6>
                        <div className="demo_respone_data rext_respone">{data.feedback.contents}</div>
                    </div>
                    <div className="demo_title_respone">
                        <h6 className="demo_title">Dữ liệu sau khi tiền xử lý:</h6>
                        <div className="demo_respone_data rext_respone">{data.preprocessedText}</div>
                    </div>
                    <div className="display_flex sentiment_respone">
                        <div className="demo_title_respone display_flex">
                            <h6 className="sentiment_title">Tích cực:</h6>
                            <div className="demo_respone_data">{data.predictions[0][0]}</div>
                        </div>
                        <div className="demo_title_respone display_flex">
                            <h6 className="sentiment_title">Tiêu cực: </h6>
                            <div className="demo_respone_data">{data.predictions[0][1]}</div>
                        </div>
                        <div className="demo_title_respone display_flex">
                            <h6 className="sentiment_title">Trung tính: </h6>
                            <div className="demo_respone_data">{data.predictions[0][2]}</div>
                        </div>
                    </div>
                </div>
                <div className="demo_title_respone display_flex">
                    <h6 className="demo_sentiment_title">Kết quả: </h6>
                    <div className="demo_respone_data">{data.feedback.sentiment}</div>
                </div>
            </div> */}
            <Card style={{ height: 'auto' }}>
                <Row>
                    <Col span={24}>
                        <h2>Phân tích sắc thái phản hồi của người tiêu dùng</h2>
                    </Col>
                </Row>
                <Divider></Divider>
                <Row style={{ justifyContent: 'left' }}>
                    <Col>
                        <h4>Các bước thao tác của người dùng:</h4>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={3}>
                        {' '}
                        Chọn một sản phẩm để đánh giá
                        <Select
                            options={items}
                            placement="bottomLeft"
                            style={{ width: '80%' }}
                            onChange={productSelected}
                        />
                        {product && (
                            <>
                                <br></br>
                                Bình luận sản phẩm
                                <TextArea style={{ width: '80%', height: '120px' }} />
                                <br></br>
                                <Button type="primary"  onClick={senHandler}>Đăng</Button>
                            </>
                        )}
                    </Col>
                    <Col span={9}>
                        {product ? (
                            <>
                                <Image width={120} src={product[0]?.images[0]?.url} style={{}} />
                                <br></br>
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
                <Row>
                    <Col span={12}>
                        <h4>Dữ liệu tiền sử lý :</h4>
                    </Col>
                    <Col span={12}>
                        <h4>Dữ liệu đã xử lý :</h4>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <TextArea style={{ width: '80%', height: '120px' }} value={data.feedback.contents}/>
                    </Col>
                    <Col span={12}>
                        <TextArea style={{ width: '80%', height: '120px' }} value={data.preprocessedText}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>Số liệu phân tích :</h4>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Doughnut data={dataChart} height={60}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                            <h4>Kết quả</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {data.feedback.sentiment}
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default Demo;
