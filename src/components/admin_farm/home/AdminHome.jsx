import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../css/style.css';
import { Avatar, Button, Card, Col, Divider, Image, Layout, Pagination, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import NewHeader from '../../client_farm/share/newheader/NewHeader';
import SliderShow from '../../client_farm/share/slidershow/SliderShow';
import ContentNew from '../../client_farm/share/newcontent/ContentNew';
import phong from '../../../assets/avatar/phong.png';
import quyen from '../../../assets/avatar/quyen.png';
import thinh from '../../../assets/avatar/thinh.jpg';
import trung from '../../../assets/avatar/trung.jpg';
import tuanNe from '../../../assets/avatar/tuanne.jpg';
import { articleAPI } from '../../../apis';
import Title from 'antd/es/typography/Title';

const AdminHome = () => {
    const [articles, setArticles] = useState([]);
    const [minValue, setMinValue] = useState();
    const [maxValue, setMaxValue] = useState();
    const numEachPage = 5;
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    useEffect(() => {
        const fetchData = async () => {
            const response = await articleAPI.getAPI();

            const data = response.data.reverse().splice(0, 4);
            setArticles(data);
        };
        fetchData();
        setUser(currentUser.roleName);
    }, []);
    function getText(html) {
        var divContainer = document.createElement('div');
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || '';
    }
    return (
        <>
            {(user === 'Expert' || user === 'Admin') && (

                <Layout>
                <NewHeader></NewHeader>
                <SliderShow></SliderShow>
                <ContentNew></ContentNew>
                <Layout>
                <Paragraph
                    style={{
                        padding: '0',
                        margin: '30px',
                        height: 'auto',
                        textAlign: 'center',
                    }}
                >
                    <Row style={{ justifyContent: 'center', display: 'flex' }}>
                        <Col span={13}>
                            <Card
                                hoverable
                                bodyStyle={{ padding: '0px' }}
                                type="inner"
                                style={{
                                    height: '100%',
                                    boxSizing: 'border-box',
                                    padding: '0',
                                    width: '100%',
                                }}
                                cover={
                                    <Image
                                        src="https://hdll.vn/FileUpload/Images/hoptacxa.jpg"
                                        style={{
                                            height: '100%',
                                        }}
                                    />
                                }
                            ></Card>
                        </Col>
                        <Col span={8} offset={1}>
                            <Card
                                bodyStyle={{ padding: '0px 15px' }}
                                hoverable
                                // type="inner"
                                title={
                                    <Title
                                        level={2}
                                        style={{
                                            height: '100%',
                                            boxSizing: 'border-box',
                                            paddingTop: '10px',
                                            width: '100%',
                                        }}
                                    >
                                        GIỚI THIỆU
                                    </Title>
                                }
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
                                <p style={{ fontSize: 25, textAlign: 'justify' }}>
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
                                        <Card style={{ padding: '0 0px' }}>
                                            <Row style={{ textAlign: 'start', alignItems: 'center' }}>
                                                <Col span={9} offset={1}>
                                                    <Card
                                                        hoverable
                                                        bodyStyle={{ padding: '0px' }}
                                                        type="inner"
                                                        style={{
                                                            height: '100%',
                                                            boxSizing: 'border-box',
                                                            padding: '0',
                                                            width: '100%',
                                                        }}
                                                        cover={
                                                            <Image
                                                                src={value.imageURL}
                                                                style={{ height: '100%' }}
                                                            ></Image>
                                                        }
                                                    ></Card>
                                                </Col>
                                                <Col offset={1} span={13} style={{ textAlign: 'start' }}>
                                                    <h4 style={{ fontSize: 32 }}>{value.title}</h4>
                                                    <p
                                                        style={{
                                                            WebkitLineClamp: 6,
                                                            WebkitBoxOrient: 'vertical',
                                                            margin: '30px 0',
                                                            fontSize: '22px',
                                                            // lineHeight: '26px',
                                                            display: '-webkit-box',
                                                            height: '16px * 1.3 * 2',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            textAlign: 'justify',
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
                            total={articles.length} //total number of card data available
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
            )}
            {!(user === 'Expert' || user === 'Admin') && navigate('/')}
        </>
    );
};

export default AdminHome;
