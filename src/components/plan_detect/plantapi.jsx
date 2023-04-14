import React, { useEffect, useState } from 'react';
import image from '../../assets/image/add-photo-icon-19.jpg';
import { Row, Col, Table, Card, Form } from 'react-bootstrap';
import { getPlant } from '../../apis/plant-id';
// import 'bootstrap/dist/css/bootstrap.css';
import styles from './plantapi.module.css';
import { default as StaffHeader } from '../admin_farm/share/header/Header';
import { default as FarmerHeader } from '../client_farm/share/header/Header';

function MyComponent() {
    const [base64Image, setBase64Image] = useState([]);
    const [file, setFile] = useState(image);
    const [result, setResult] = useState();
    const [handle, sethandle] = useState('Tải lên hình ảnh loại cây bạn cần tìm hiểu');

    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [render, setRender] = useState(0);
    const [user, setUser] = useState('');

    useEffect(() => {
        if (currentUser) setUser(currentUser.roleName);
    }, []);

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
    }, [base64Image]);
    console.log(result);
    return (
        <div>
            {user === 'Admin' || user === 'Expert' ? <StaffHeader /> : <FarmerHeader />}
            <div style={{ backgroundColor: '#c3d3d8', overflow: 'auto', height: '100vh' }}>
                <div>
                    <Row style={{ justifyContent: 'center' }}>
                        <Card style={{ alignContent: 'center' }}>
                            <Card.Img variant="top" src={file} style={{ width: '16.5rem', height: '15rem' }} />
                            <Card.Body>
                                <Card.Text>{handle}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row className={styles['justify-content-md-center']}>
                        <Form.Group
                            style={{ width: '18rem' }}
                            controlId="formFile"
                            className={`${styles['d-flex']} ${styles['justify-content-center']}`}
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
                            <Row
                                bg={'Light'}
                                className={`${styles['justify-content-center']} ${styles['mb-0']} ${styles['d-flex']}`}
                                style={{ paddingBottom: '5%' }}
                            >
                                <Col md="15" xl="10">
                                    <Card
                                        className={`${styles['shadow-0']} ${styles['border']} ${styles['rounded-3']} ${styles['mt-2']} ${styles['mb-3']}`}
                                        style={{ backgroundColor: 'white' }}
                                    >
                                        <Card.Body>
                                            <Row>
                                                <Col
                                                    md="12"
                                                    lg="3"
                                                    className={`${styles['mb-4']} ${styles['mb-lg-0']}`}
                                                    style={{ display: 'flex', justifyContent: 'center' }}
                                                >
                                                    <Card.Img
                                                        src={data.similar_images[0].url}
                                                        fluid
                                                        // className={`${styles['w-100']}`}
                                                        style={{ width: '40%' }}
                                                    />
                                                </Col>
                                                <Col md="8" style={{ textAlign: 'center' }}>
                                                    <h4>Tên khoa học : {data.plant_details.scientific_name} </h4>
                                                    <span>---</span>
                                                    {data.plant_details.common_names &&
                                                        data.plant_details.common_names.map((name) => (
                                                            <>
                                                                <span
                                                                    className={`${styles['text-danger']}`}
                                                                    style={{ fontSize: '20px' }}
                                                                >
                                                                    {' '}
                                                                    {name}
                                                                </span>
                                                                <span> -</span>
                                                            </>
                                                        ))}
                                                    <span>--</span>
                                                    <Row
                                                        style={{
                                                            display: 'flex !important',
                                                            justifyContent: 'space-around',
                                                        }}
                                                    >
                                                        <Col
                                                            md="6"
                                                            style={{ display: 'flex', justifyContent: 'center' }}
                                                        >
                                                            <Table striped="columns">
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody
                                                                    style={{
                                                                        border: '1px solid #D3D3D3',
                                                                        borderRadius: '50px',
                                                                    }}
                                                                >
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
                                                        <Col
                                                            md="6"
                                                            style={{ display: 'flex', justifyContent: 'center' }}
                                                        >
                                                            <Table striped="columns">
                                                                <thead>
                                                                    <tr>
                                                                        <th></th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody
                                                                    style={{
                                                                        border: '1px solid #D3D3D3',
                                                                        borderRadius: '50px',
                                                                    }}
                                                                >
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
                                                    <br />
                                                    <ReadMore>{data.plant_details.wiki_description.value}</ReadMore>
                                                    <span>Nhấn vào </span>
                                                    <a href={data.plant_details.url} target="_blank">
                                                        <strong>ĐÂY</strong>
                                                    </a>
                                                    <span> để xem thêm </span>
                                                    <br />
                                                    <br />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        ))}
                    {!result && (
                        <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</h3>
                    )}
                </div>
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
