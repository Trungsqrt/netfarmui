import React, { useEffect, useState } from 'react';
import image from '../../assets/image/add-photo-icon-19.jpg';

import { Row, Col, Table, Card, Form } from 'react-bootstrap';
import { getPlantHealth } from '../../apis/plant-id';
// import 'bootstrap/dist/css/bootstrap.css';
import { default as StaffHeader } from '../admin_farm/share/header/Header';
import { default as FarmerHeader } from '../client_farm/share/header/Header';

function HealthPlant() {
    const [base64Image, setBase64Image] = useState([]);
    const [file, setFile] = useState(image);
    const [result, setResult] = useState();
    const [handle, sethandle] = useState('Tải lên hình ảnh loại cây bạn cần tìm hiểu');
    const [isLoading, setIsLoading] = useState(true);
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
            await getPlantHealth(base64Image).then((res) => setResult(res));
        })();
        setIsLoading(false);
    }, [base64Image]);
    console.log(result);

    return (
        <div>
            {user === 'Admin' || user === 'Expert' ? <StaffHeader /> : <FarmerHeader />}
            <div style={{ backgroundColor: '#c3d3d8', overflow: 'auto', height: '100vh' }}>
                <div>
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
                    {result && result['diseases'] && !result['is_healthy'] ? (
                        result['diseases'].slice(0, 3).map((data) => (
                            <Row bg={'Light'} className="justify-content-center mb-0">
                                <Col md="20" lg="7">
                                    <Card className="shadow-0 border rounded-3 mt-2 mb-3">
                                        <Card.Body>
                                            <Row>
                                                <Col md="12" lg="4" className="mb-4 mb-lg-0">
                                                    <Card.Img
                                                        src={data.similar_images[0].url}
                                                        fluid
                                                        className="w-100"
                                                    />
                                                </Col>
                                                <Col md="8" className="text-center">
                                                    <h5>Loại bệnh : {data.name} </h5>
                                                    <p>{data.disease_details.description}</p>
                                                    <h5>Giải pháp</h5>
                                                    <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                        <tbody>
                                                            <tr>
                                                                <td class="col-2">
                                                                    <strong>Giải pháp sinh học</strong>
                                                                </td>

                                                                <td class="text-wrap col-10">
                                                                    {data.disease_details.treatment.biological &&
                                                                        data.disease_details.treatment.biological.map(
                                                                            (treatment) => (
                                                                                <>
                                                                                    <p>- {treatment}</p>
                                                                                </>
                                                                            ),
                                                                        )}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="col-2">
                                                                    <strong>Giải pháp hóa học</strong>
                                                                </td>
                                                                <td class="text-wrap col-10">
                                                                    {data.disease_details.treatment.chemical != null &&
                                                                        data.disease_details.treatment.chemical.map(
                                                                            (treatment) => (
                                                                                <>
                                                                                    <p style={{ width: '18rem' }}>
                                                                                        - {treatment}
                                                                                    </p>
                                                                                </>
                                                                            ),
                                                                        )}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="col-2">
                                                                    <strong>Giải pháp phòng ngừa</strong>
                                                                </td>
                                                                <td class="text-wrap col-10">
                                                                    {data.disease_details.treatment.prevention !=
                                                                        null &&
                                                                        data.disease_details.treatment.prevention.map(
                                                                            (treatment) => (
                                                                                <>
                                                                                    <p>- {treatment}</p>
                                                                                </>
                                                                            ),
                                                                        )}
                                                                </td>
                                                            </tr>
                                                            <span>Nhấn vào </span>
                                                            <a href={data.disease_details.url}>đây</a>
                                                            <span> để xem thêm </span>
                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <p>Cây khỏe mạnh</p>
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

export default HealthPlant;