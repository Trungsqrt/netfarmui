import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import image from '../../assets/image/add-photo-icon-19.jpg';
import { Row, Col, Table, Card, Form } from 'react-bootstrap';
import { getPlant } from '../../apis/plant-id';
// import 'bootstrap/dist/css/bootstrap.css';
import noImage from '../../assets/image/noImage.png';
import styles from './plantapi.module.css';
import NewHeader from '../client_farm/share/newheader/NewHeader';

function MyComponent() {
    const [base64Image, setBase64Image] = useState([]);
    const [file, setFile] = useState(image);
    const [result, setResult] = useState();
    const [handle, sethandle] = useState('Tải lên hình ảnh loại cây bạn cần tìm hiểu');
    const [isLoading, setIsLoading] = useState(true);
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [render, setRender] = useState(0);
    const [user, setUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) setUser(currentUser.roleName);
    }, []);

    useEffect(() => {
        if (user !== 'Farmer') {
            if (user !== undefined) navigate('/*');
        }
    }, [user]);

    function handleChange(e) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
        const file = e.target.files[0];
        if (file && allowedTypes.includes(file.type)) {
            console.log(file);
            setFile(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64ContentArray = reader.result.split(',');
                setBase64Image([base64ContentArray[1].toString()]);
            };
            sethandle(' ');
        } else {
            sethandle('Chỉ cho phép tải ảnh định dạng JPG, PNG, SVG');
        }
    }
    useEffect(() => {
        (async () => {
            await getPlant(base64Image).then((res) => setResult(res));
        })();
        setIsLoading(false);
        console.log(base64Image);
    }, [base64Image]);
    console.log(result);

    return (
        <div>
            <Layout style={{ display: 'block', marginBottom: '100px' }}>
                <NewHeader></NewHeader>
            </Layout>
            <div style={{ backgroundColor: '#EEEEEE', overflow: 'auto', height: '100vh' }}>
                <Row className="justify-content-center">
                    <Card className="align-content-center" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={file} style={{ width: '16.5rem', height: '15rem' }} />
                        <Card.Body>
                            <Card.Text>{handle}</Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className="justify-content-md-center">
                    <Form.Group
                        style={{ width: '18rem' }}
                        controlId="formFile"
                        className="d-flex justify-content-center"
                    >
                        <Form.Control type="file" id="upload" style={{ display: 'none' }} onChange={handleChange} />
                        <label
                            htmlFor="upload"
                            style={{
                                display: 'inline-block',
                                backgroundColor: 'green',
                                color: 'black',
                                padding: '0.5rem',
                                fontFamily: 'sans-serif',
                                borderRadius: '1rem',
                                cursor: 'pointer',
                                marginTop: '1rem',
                            }}
                        >
                            Tải ảnh lên
                        </label>
                    </Form.Group>
                </Row>
                {result &&
                    result['suggestions'] &&
                    result['suggestions'].slice(0, 3).map((data) => (
                        <Row bg={'Light'} className="justify-content-center mb-0">
                            <Col md="15" lg="7">
                                <Card className="shadow-0 border rounded-3 mt-2 mb-3">
                                    <Card.Body>
                                        <Row>
                                            {data.similar_images ? (
                                                <Col md="12" lg="4" className="mb-4 mb-lg-0">
                                                    <Card.Img
                                                        src={data.similar_images[0].url}
                                                        fluid
                                                        className="w-100"
                                                    />
                                                </Col>
                                            ) : (
                                                <Col md="12" lg="4" className="mb-4 mb-lg-0">
                                                    <Card.Img src={noImage} fluid className="w-100" />
                                                </Col>
                                            )}
                                            <Col md="8" className="text-center">
                                                <h5>Tên khoa học : {data.plant_details.scientific_name} </h5>
                                                <span>---</span>
                                                {data.plant_details.common_names &&
                                                    data.plant_details.common_names.map((name) => (
                                                        <>
                                                            <span className="text-danger"> {name}</span>
                                                            <span> -</span>
                                                        </>
                                                    ))}
                                                <span>--</span>
                                                <Row>
                                                    <Col md="6">
                                                        <Table striped="columns">
                                                            <tbody>
                                                                <tr>
                                                                    <td>Chi</td>
                                                                    <td>{data.plant_details.taxonomy.genus}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Họ</td>
                                                                    <td>{data.plant_details.taxonomy.family}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Bộ</td>
                                                                    <td>{data.plant_details.taxonomy.order}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                    <Col md="6">
                                                        <Table striped="columns">
                                                            <tbody>
                                                                <tr>
                                                                    <td>Lớp</td>
                                                                    <td>{data.plant_details.taxonomy.class}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Ngành</td>
                                                                    <td>{data.plant_details.taxonomy.phylum}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Giới</td>
                                                                    <td>{data.plant_details.taxonomy.kingdom}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Col>
                                                </Row>

                                                {data.plant_details.wiki_description &&
                                                    data.plant_details.wiki_description.value && (
                                                        <ReadMore>{data.plant_details.wiki_description.value}</ReadMore>
                                                    )}
                                                <span>Nhấn vào </span>
                                                <a href={data.plant_details.url}>đây</a>
                                                <span> để xem thêm </span>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ))}
            </div>
        </div>
    );
}

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <span>
            <p className="text">
                {isReadMore ? text.slice(0, 200) : text}
                <span
                    onClick={toggleReadMore}
                    className="read-or-hide"
                    style={{ color: 'blue', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    {isReadMore ? ' ...ĐỌC THÊM' : ' ẨN BỚT'}
                </span>
            </p>
        </span>
    );
};

export default MyComponent;
