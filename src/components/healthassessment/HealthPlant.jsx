import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleTranslator } from '@translate-tools/core/translators/GoogleTranslator';

import image from '../../assets/image/add-photo-icon-19.jpg';

import { Row, Col, Table, Card, Form } from 'react-bootstrap';
import { getPlantHealth } from '../../apis/plant-id';
// import 'bootstrap/dist/css/bootstrap.css';
import { default as StaffHeader } from '../admin_farm/share/header/Header';
import { default as FarmerHeader } from '../client_farm/share/header/Header';

function HealthPlant() {
    const [base64Image, setBase64Image] = useState([]);
    const [file, setFile] = useState();
    const [result, setResult] = useState();
    const [handle, sethandle] = useState('Tải lên hình ảnh loại cây bạn cần tìm hiểu');
    const [isLoading, setIsLoading] = useState(true);
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [render, setRender] = useState(0);
    const [user, setUser] = useState();

    const [translateData, setTranslateData] = useState([]);
    const [rawData, setRawData] = useState([]);

    const translator = new GoogleTranslator();
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
        setRawData([]);
        (async () => {
            await getPlantHealth(base64Image).then((res) => setResult(res));
        })();
        setIsLoading(false);
    }, [base64Image]);

    const translate = async (text) => {
        const dataTranslated = await translator.translate(text, 'en', 'vi');
        return dataTranslated;
    };

    useEffect(() => {
        if (result !== undefined) {
            const clonedDiseases = result?.diseases?.slice(0, 3) || [];

            const run = async (disease) => {
                const detail = disease?.disease_details;

                const description = detail?.description;
                const local_name = detail?.local_name;
                const biological = detail?.treatment.biological.slice();
                const chemical = detail?.treatment.chemical.slice();
                const prevention = detail?.treatment.prevention.slice();
                const url = detail?.url;
                const image = disease.similar_images[0]?.url;

                const translatedDescription = await translate(description);
                const translatedLocal_name = await translate(local_name);

                const translatedBiological = await Promise.all(
                    biological.map(async (item) => {
                        const translatedItem = await translate(item);
                        return translatedItem;
                    }),
                );

                const translatedChemical = await Promise.all(
                    chemical.map(async (item) => {
                        const translatedItem = await translate(item);
                        return translatedItem;
                    }),
                );

                const translatedPrevention = await Promise.all(
                    prevention.map(async (item) => {
                        const translatedItem = await translate(item);
                        return translatedItem;
                    }),
                );

                return {
                    description: translatedDescription,
                    name: translatedLocal_name,
                    biological: translatedBiological,
                    chemical: translatedChemical,
                    prevention: translatedPrevention,
                    url: url,
                    image: image,
                    isHealth: result.is_healthy,
                    isDiseases: result.diseases !== null,
                };
            };

            const promises = clonedDiseases.map((disease) => run(disease));
            Promise.all(promises).then((dataTranslated) => {
                setRawData((prev) => [...prev, dataTranslated]);
            });
        }
    }, [result]);

    useEffect(() => {
        console.log(rawData);
        if (rawData.length > 0) {
            setTranslateData([...rawData[0]]);
        }
    }, [rawData]);

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
                    {translateData?.map((data, index) => (
                        <Row bg={'Light'} className="justify-content-center mb-0">
                            <Col md="20" lg="7">
                                <Card className="shadow-0 border rounded-3 mt-2 mb-3">
                                    <Card.Body>
                                        <Row>
                                            <Col md="12" lg="4" className="mb-4 mb-lg-0">
                                                <Card.Img src={data?.image} fluid className="w-100" />
                                            </Col>
                                            <Col md="8" className="text-center">
                                                <h5>Loại bệnh : {data?.name} </h5>
                                                <p style={{ textAlign: 'left' }}>{data?.description}</p>
                                                <h5>Giải pháp</h5>
                                                <Table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                    <tbody>
                                                        <tr>
                                                            <td class="col-2" style={{ textAlign: 'left' }}>
                                                                <strong>Giải pháp sinh học</strong>
                                                            </td>

                                                            <td class="text-wrap col-10" style={{ textAlign: 'left' }}>
                                                                {data?.biological &&
                                                                    data?.biological?.map((treatment) => (
                                                                        <>
                                                                            <p>{treatment}</p>
                                                                        </>
                                                                    ))}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="col-2" style={{ textAlign: 'left' }}>
                                                                <strong>Giải pháp hóa học</strong>
                                                            </td>
                                                            <td class="text-wrap col-10" style={{ textAlign: 'left' }}>
                                                                {data?.chemical &&
                                                                    data?.chemical?.map((treatment) => (
                                                                        <>
                                                                            <p style={{ width: '18rem' }}>
                                                                                {treatment}
                                                                            </p>
                                                                        </>
                                                                    ))}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="col-2" style={{ textAlign: 'left' }}>
                                                                <strong>Giải pháp phòng ngừa</strong>
                                                            </td>
                                                            <td class="text-wrap col-10" style={{ textAlign: 'left' }}>
                                                                {data?.prevention &&
                                                                    data?.prevention?.map((treatment) => (
                                                                        <>
                                                                            <p>{treatment}</p>
                                                                        </>
                                                                    ))}
                                                            </td>
                                                        </tr>
                                                        <span>Nhấn vào </span>
                                                        <a href={data.url}>đây</a>
                                                        <span> để xem thêm </span>
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ))}
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
