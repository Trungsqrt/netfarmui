import React, { useState, useEffect } from 'react';
import dssImage from '../../../../assets/image/pngwing.com.png';
import styles from '../DSS/DSS.module.css';
import TemperatureChart from './TemperatureChart';
import axios from 'axios';
import TempChat from '../../../chatbot_ui/chatbot';
const parse = require('html-react-parser');
function DSS() {
    const [loaicay, setLoaiCay] = useState([]);
    const [hoatdong, setHoatDong] = useState([]);
    const standardURL = 'https://localhost:44303/api/Standard';
    const stagesURL = 'https://localhost:44303/api/Stages';
    const putWeatherUrl = 'https://localhost:44303/api/APIWether';
    const resultUrl = 'https://localhost:44303/api/APIResult';
    const weatherAPIURL =
        'https://api.weatherbit.io/v2.0/forecast/daily?&lat=16.0678&lon=108.2208&days=5&key=c0cea0e19d244952b70dc7d5fec68df4';

    const [dataWeather, setDataWeather] = useState([]);
    const [cityName, setCityName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [message, setMessage] = useState(
        'Xin chào bạn! Cảm ơn đã lựa chọn Netfarm DSS để đồng hành cũng với vụ mùa của bạn  . Mời bạn chọn chuyên mục tư vấn ở phía trên. Chúc bạn một ngày tốt lành !!',
    );
    const [iconState, setIconState] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [tempt, setTempt] = useState('');
    //set temporary data
    const getData = async () => {
        const res = await axios.get(weatherAPIURL);
        const value = res.data.data;
        setDataWeather(res.data.data);
        setLocation(res.data.city_name);
        setDescription(value[0].weather.description);
        setTempt(value[0].temp);
        setIconState(value[0].weather.icon);
        for (let i = 0; i < 8; ) {
            const postData = async () => {
                const obj = {
                    id: i,
                    description: value[i].weather.description,
                    dateTime: new Date(value[i].datetime).toISOString(),
                    minTemp: value[i].min_temp,
                    maxTemp: value[i].max_temp,
                    humidity: value[i].rh,
                    wind: value[i].wind_spd,
                    rain: value[i].precip,
                };

                await axios.put(`${putWeatherUrl}/${i}`, obj);
                // await axios.post(`${putWeatherUrl}`, obj);
                // await axios.delete(`${putWeatherUrl}/${i}`);
            };
            postData();
            i += 1;
        }
    };
    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(standardURL);
            const templist = [];
            res.data.forEach((item) => {
                templist.push(item.standardName);
            });
            setLoaiCay(templist);

            // lấy stage
            const res2 = await axios.get(stagesURL);
            const temp2 = [];
            res2.data.forEach((element) => {
                temp2.push(element.stageName);
            });
            setHoatDong(temp2);
        };
        getData();
    }, []);

    const handlerChangeLoaiCay = (e) => {
        setSelectedType(e.target.value);
    };
    const handlerChangeHoatDong = (e) => {
        setSelectedAction(e.target.value);
    };

    function handlerSubmit() {
        if (selectedType === '' || selectedAction === '') {
            alert('Bạn phải chọn đầy đủ thông tin');
        } else {
            const getData = async () => {
                const res = await axios.get(`${resultUrl}/${selectedType}/${selectedAction}`);
                console.log(res.data);
                setMessage(res.data.result);
            };
            getData();
        }
    }

    return (
        <div>
            <section className={styles.selectBox}>
                <div className={styles.dsstitle}>Đối tượng tư vấn: </div>
                <select onChange={handlerChangeLoaiCay} className={styles.selectElement}>
                    <option selected disabled>
                        Loại cây
                    </option>
                    {loaicay
                        ? loaicay.map((item, index) => (
                              <option value={item} key={index}>
                                  {item}
                              </option>
                          ))
                        : ''}
                </select>
                <select onChange={handlerChangeHoatDong} className={styles.selectElement}>
                    <option selected disabled>
                        Hoạt động
                    </option>
                    {hoatdong
                        ? hoatdong.map((item, index) => (
                              <option value={item} key={index}>
                                  {item}
                              </option>
                          ))
                        : ''}
                </select>
                <button className={styles.ConfirmBtn} onClick={handlerSubmit}>
                    Xác nhận
                </button>
            </section>

            <section className={styles.container}>
                <div className={styles.imageHuman}></div>

                <div className={styles.columnRight}>
                    <div className={styles.boxMessage}>
                        <div className={styles.messageContent}>{parse(String(message))}</div>
                    </div>
                    <div className={styles.chartContainer}>
                        <div className={styles.today}>
                            <div className={styles.title}>hôm nay</div>
                            <div className={styles.todayWeather}>
                                <div className={styles.todayLocation}>{location}</div>
                                <div className={styles.todayTempt}>{tempt} °C</div>
                                <div className={styles.todayDesc}>{description}</div>
                                <div className={styles.todayIcon}>
                                    <img
                                        src={`http://openweathermap.org/img/wn/${iconState}@2x.png`}
                                        alt=""
                                        className={styles.iconWeather}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.title}>Thời tiết tuần tới</div>
                            <TemperatureChart />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DSS;
