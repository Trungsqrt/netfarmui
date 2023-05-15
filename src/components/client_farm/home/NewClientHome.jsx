import { Avatar, Button, Card, Col, Divider, Image, Layout, Pagination, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { articleAPI } from '../../../apis';
import phong from '../../../assets/avatar/phong.png';
import quyen from '../../../assets/avatar/quyen.png';
import thinh from '../../../assets/avatar/thinh.jpg';
import trung from '../../../assets/avatar/trung.jpg';
import tuanNe from '../../../assets/avatar/tuanne.jpg';
import ContentNew from '../share/newcontent/ContentNew';
import NewHeader from '../share/newheader/NewHeader';
import SliderShow from '../share/slidershow/SliderShow';
const NewClientHome = () => {
    const [articles, setArticles] = useState([]);
    const [minValue, setMinValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const numEachPage = 5;
    // lấy dữ liệu toàn bộ cáo bài đăng
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getAPI();

            const data = response.data.reverse().splice(0, 4);
            setArticles(data);
        };
        fetchData();
    }, []);

    function getText(html) {
        var divContainer = document.createElement('div');
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || '';
    }
    return (
        <Layout>
            <NewHeader></NewHeader>
            <SliderShow></SliderShow>
            <ContentNew></ContentNew>
            <Layout>
                <Paragraph
                    style={{
                        padding: '0',
                        margin: '60px ',
                        height: 'auto',
                        textAlign: 'center',
                    }}
                >
                    <Row style={{ textAlign: 'center' }} align={'middle'}>
                        <Col span={16}>
                            <Image
                                src="https://hdll.vn/FileUpload/Images/hoptacxa.jpg"
                                style={{ borderRadius: '18px' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Card
                                title="GIỚI THIỆU"
                                extra={
                                    <Button type="primary" shape="round">
                                        Đọc thêm
                                    </Button>
                                }
                                style={{
                                    height: '100%',
                                    borderRadius: '18px',
                                    textAlign: 'start',
                                }}
                            >
                                <p style={{ fontSize: 16 }}>
                                    Hợp tác xã nông nghiệp Bình Dương được thành lập năm 2016, với 45 thành viên tham
                                    gia. Thời gian đầu, các thành viên của hợp tác xã chỉ trồng các giống tiêu truyền
                                    thống. Cùng với giá cả bấp bênh, dịch bệnh, cách canh tác tiêu lạc hậu nên đa số
                                    nông dân chỉ đủ thu hồi vốn, thời điểm giá tiêu giảm mạnh, có hộ còn lỗ vốn...
                                </p>
                            </Card>
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Row>
                        <Col>
                            <h1>Tin tức trong ngày</h1>
                        </Col>
                    </Row>
                    <Card>
                        {articles &&
                            articles.length > 0 &&
                            articles.slice(minValue, maxValue).map((value) => (
                                <>
                                    <Link to={`/detail/${value.id}`} className="news_link">
                                        <Card style={{ padding: '0 60px' }}>
                                            <Row style={{ textAlign: 'start', alignItems: 'center' }}>
                                                <Col span={12}>
                                                    <Image
                                                        src={value.imageURL}
                                                        style={{ height: '50%', padding: '0 20px' }}
                                                    ></Image>
                                                </Col>
                                                <Col span={12} style={{ textAlign: 'start' }}>
                                                    <h4>{value.title}</h4>
                                                    <p
                                                        style={{
                                                            WebkitLineClamp: 10,
                                                            WebkitBoxOrient: 'vertical',
                                                            margin: '30px 0',
                                                            fontSize: '16px',
                                                            lineHeight: '22px',
                                                            display: '-webkit-box',
                                                            height: '16px * 1.3 * 3',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {getText(value.content)}
                                                    </p>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Link>
                                    <br />
                                </>
                            ))}
                        <Pagination
                            style={{ justifyContent: 'end', textAlign: 'center' }}
                            defaultCurrent={1}
                            defaultPageSize={numEachPage} //default size of page
                            onChange={(value) => {
                                setMinValue((value - 1) * numEachPage);
                                setMaxValue(value * numEachPage);
                            }}
                            total={articles.length + 5} //total number of card data available
                        />
                    </Card>
                    <Divider></Divider>
                    <Card style={{ padding: '0' }}>
                        <div>
                            <Row>
                                <Col
                                    style={{
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        width: '100%',
                                    }}
                                >
                                    <h1>MEET OUR TEAM</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col
                                    style={{
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        display: 'flex',
                                        width: '100%',
                                    }}
                                >
                                    <p>
                                        A wonderful serenity has taken possession of my entire soul, like these sweet
                                        mornings of spring which I enjoy with my whole heart.
                                    </p>
                                </Col>
                            </Row>
                        </div>
                        <Divider></Divider>
                        <Row
                            style={{
                                textAlign: 'start',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Col span={6}>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <Avatar
                                        src={quyen}
                                        style={{
                                            verticalAlign: 'middle',
                                            justifyContent: 'center',
                                            display: 'flex',
                                        }}
                                        size={260}
                                        gap={1}
                                    ></Avatar>
                                </div>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <h3>Bảo Quyên </h3>
                                    <h4>(Trùm cuối)</h4>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <Avatar
                                        src={thinh}
                                        style={{
                                            verticalAlign: 'middle',
                                            justifyContent: 'center',
                                            display: 'flex',
                                        }}
                                        size={260}
                                        gap={1}
                                    ></Avatar>
                                </div>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <h3>Ngọc Thịnh </h3>
                                    <h4>(Trùm server)</h4>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <Avatar
                                        src={trung}
                                        style={{
                                            verticalAlign: 'middle',
                                            justifyContent: 'center',
                                            display: 'flex',
                                        }}
                                        size={260}
                                        gap={1}
                                    ></Avatar>
                                </div>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <h3>Quang Trung </h3>
                                    <h4>(FE support)</h4>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <Avatar
                                        src={phong}
                                        style={{
                                            verticalAlign: 'middle',
                                            justifyContent: 'center',
                                            display: 'flex',
                                        }}
                                        size={260}
                                        gap={1}
                                    ></Avatar>
                                </div>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <h3>Phong </h3>
                                    <h4>(Master)</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row
                            style={{
                                textAlign: 'start',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Col span={6}>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <Avatar
                                        src={tuanNe}
                                        style={{
                                            verticalAlign: 'middle',
                                            justifyContent: 'center',
                                            display: 'flex',
                                        }}
                                        size={260}
                                        gap={1}
                                    ></Avatar>
                                </div>
                                <div style={{ justifyContent: 'center', display: 'flex' }}>
                                    <h3>Tuấn Nguyễn</h3>
                                    <h4>(FE)</h4>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Paragraph>
            </Layout>
        </Layout>
    );
};

export default NewClientHome;
