import { useState, useEffect } from 'react';
import styles from './StandardMgmt.module.css';
import isEmpty from 'validator/lib/isEmpty';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../admin_farm/share/header/Header';
// import { number } from 'react-admin';

function StandardMgmt() {
    const url = 'https://localhost:44303/api/Standard';

    const navigate = useNavigate();

    const [validationMsg, setValidationMsg] = useState({});

    const [sdName, setSdName] = useState('');
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [minhumidity, setMinhumidity] = useState('');
    const [maxhumidity, setMaxhumidity] = useState('');
    const [wind, setWind] = useState('');
    const [maxRain, setMaxRain] = useState('');
    const [season, setSeason] = useState('');

    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);

    const prop = useParams();
    const idEdit = prop.id;

    useEffect(() => {
        setUser(currentUser.roleName);
        if (idEdit) {
            fillCurrentData();
        }
    }, []);

    const fillCurrentData = async () => {
        const res = await axios.get(`${url}/${idEdit}`);
        const response = res.data;
        setSdName(String(response.standardName));
        setMinTemp(String(response.minTemp));
        setMaxTemp(String(response.maxTemp));
        setMinhumidity(String(response.minHumidity));
        setMaxhumidity(String(response.maxHumidity));
        setWind(String(response.wind));
        setMaxRain(String(response.maxRain));
        setSeason(String(response.season));
    };

    const validateAll = () => {
        const msg = {};
        if (isEmpty(sdName)) {
            msg.sdName = 'Hãy nhập tên của chuẩn cây trồng';
        }
        if (isEmpty(minTemp)) {
            msg.minTemp = 'Hãy nhập nhiệt thấp nhất ';
        }
        if (isEmpty(maxTemp)) {
            msg.maxTemp = 'Hãy nhập nhiệt cao nhất';
        }
        if (isEmpty(minhumidity)) {
            msg.minhumidity = 'Hãy nhập độ ẩm tối thiểu';
        }
        if (isEmpty(maxhumidity)) {
            msg.maxhumidity = 'Hãy nhập độ ẩm tối đa';
        }
        if (isEmpty(wind)) {
            msg.wind = 'Hãy nhập sức gió';
        }
        if (isEmpty(maxRain)) {
            msg.maxRain = 'Hãy nhập lượng mưa';
        }
        if (isEmpty(season)) {
            msg.season = 'Hãy nhập tháng, ví dụ 4,5,10,11';
        }

        setValidationMsg(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    //#endregion

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateAll();

        if (!isValid) return;

        const newStandard = {
            id: idEdit ? idEdit : '123456',
            standardName: sdName.replace(/ +(?= )/g, '').trim(),
            minTemp: minTemp,
            maxTemp: maxTemp,
            minhumidity: minhumidity,
            maxhumidity: maxhumidity,
            wind: wind,
            maxRain: maxRain,
            season: season.replace(/ /g, ''),
        };

        try {
            if (idEdit) {
                axios.put(url + `/${idEdit}`, newStandard);
            } else {
                axios.post(url, newStandard);
            }
            alert('Đăng thành công!');
            navigate('/standardmanagement');
            window.location.reload();
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    };

    return (
        <div>
            {user === 'Expert' && (
                <>
                    <Header />
                    <div className={styles.container}>
                        <form autoComplete="off">
                            <div className={styles.inputContainer}>
                                <input
                                    id="sdName"
                                    type="text"
                                    name="sdName"
                                    placeholder="Hãy nhập tên của chuẩn cây trồng"
                                    className={styles.inputField}
                                    value={sdName}
                                    onChange={(e) => setSdName(e.target.value)}
                                />
                                <p className={styles.error}>{validationMsg.sdName}</p>
                            </div>{' '}
                            <div className={styles.inputContainer}>
                                <input
                                    id="minTemp"
                                    type="number"
                                    name="minTemp"
                                    placeholder="Hãy nhập nhiệt độ thấp nhất"
                                    className={styles.inputField}
                                    value={minTemp}
                                    onChange={(e) => setMinTemp(e.target.value)}
                                />

                                <p className={styles.error}>{validationMsg.minTemp}</p>
                            </div>{' '}
                            <div className={styles.inputContainer}>
                                <input
                                    id="maxTemp"
                                    type="number"
                                    name="maxTemp"
                                    placeholder="Hãy nhập nhiệt cao nhất"
                                    className={styles.inputField}
                                    value={maxTemp}
                                    onChange={(e) => setMaxTemp(e.target.value)}
                                />

                                <p className={styles.error}>{validationMsg.maxTemp}</p>
                            </div>{' '}
                            <div className={styles.inputContainer}>
                                <input
                                    id="minhumidity"
                                    type="number"
                                    name="minhumidity"
                                    placeholder="Hãy nhập độ ẩm tối thiểu"
                                    className={styles.inputField}
                                    value={minhumidity}
                                    onChange={(e) => setMinhumidity(e.target.value)}
                                />

                                <p className={styles.error}>{validationMsg.minhumidity}</p>
                            </div>{' '}
                            <div className={styles.inputContainer}>
                                <input
                                    id="maxhumidity"
                                    type="number"
                                    name="maxhumidity"
                                    placeholder="Hãy nhập độ ẩm tối đa"
                                    className={styles.inputField}
                                    value={maxhumidity}
                                    onChange={(e) => setMaxhumidity(e.target.value)}
                                />

                                <p className={styles.error}>{validationMsg.maxhumidity}</p>
                            </div>{' '}
                            <div className={styles.inputContainer}>
                                <input
                                    id="wind"
                                    type="number"
                                    name="wind"
                                    placeholder="Hãy nhập sức gió"
                                    className={styles.inputField}
                                    value={wind}
                                    onChange={(e) => setWind(e.target.value)}
                                />

                                <p className={styles.error}>{validationMsg.wind}</p>
                            </div>{' '}
                            <div className={styles.inputContainer}>
                                <input
                                    id="maxRain"
                                    type="number"
                                    name="maxRain"
                                    placeholder="Hãy nhập độ lượng mưa"
                                    className={styles.inputField}
                                    value={maxRain}
                                    onChange={(e) => setMaxRain(e.target.value)}
                                />
                                <p className={styles.error}>{validationMsg.maxRain}</p>
                            </div>{' '}
                            <div className={styles.inputContainer}>
                                <input
                                    id="season"
                                    type="text"
                                    name="season"
                                    placeholder="Hãy nhập tháng, ví dụ 4,5,10,11"
                                    className={styles.inputField}
                                    value={season}
                                    onChange={(e) => setSeason(e.target.value)}
                                />
                                <p className={styles.error}>{validationMsg.season}</p>
                            </div>
                            <button
                                type="submit"
                                className="btnSubmit"
                                onClick={handleSubmit}
                                style={{ marginTop: '10px' }}
                            >
                                Xác nhận
                            </button>
                        </form>
                    </div>
                </>
            )}
            {user === 'Admin' && navigate('/AdminHome')}
            {user === 'Farmer' && navigate('/')}
        </div>
    );
}

export default StandardMgmt;
