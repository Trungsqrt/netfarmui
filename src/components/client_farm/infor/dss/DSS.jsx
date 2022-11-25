import React, { useState, useEffect } from 'react';
import dssImage from '../../../../assets/image/pngwing.com.png';
import styles from '../DSS/DSS.module.css';
import dssImageChat from '../../../../assets/image/chat.png';
import TemperatureChart from './TemperatureChart';
import axios from 'axios';
function DSS() {
    const [loaicay, setLoaiCay] = useState([]);
    const [hoatdong, setHoatDong] = useState([]);
    const standardURL = 'https://localhost:44303/api/Standard';
    const stagesURL = 'https://localhost:44303/api/Stages';
    const putWeatherUrl = 'https://localhost:44303/api/APIWether';
    const resultUrl = 'https://localhost:44303/api/APIResult';
    const weatherAPIURL =
        'https://api.weatherbit.io/v2.0/forecast/daily?&lat=16.0678&lon=108.2208&days=16&key=3431f287a3ad4d50982153699eaba830&fbclid=IwAR0HiTim5nm7jJz5n-meANrhZ-DnJIbiHljJGclaV2Wea0dnpS7ghJ2tr8c';

    const [dataWeather, setDataWeather] = useState([]);
    const [cityName, setCityName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [message, setMessage] = useState(
        'Xin chào bạn! Cảm ơn đã lựa chọn Netfarm DSS để đồng hành cũng với vụ mùa của bạn  . Mời bạn chọn chuyên mục tư vấn ở phía trên. Chúc bạn một ngày tốt lành !!',
    );
    //set temporary data
    const getData = async () => {
        const res = await axios.get(weatherAPIURL);
        setDataWeather(res.data.data);
        const value = res.data.data;
        console.log(value);
        for (var i = 0; i < 8; i++) {
            const obj = {
                id: i,
                description: value[i].weather.description,
                dateTime: value[i].datetime,
                minTemp: value[i].min_temp,
                maxTemp: value[i].max_temp,
                humidity: value[i].rh,
                wind: value[i].wind_spd,
                rain: value[i].precip,
            };
            try {
                axios.put(`${putWeatherUrl}/${i}`, obj);
            } catch (err) {
                alert('Có lỗi vui lòng thử lại');
            }
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
                console.log(res);
                setMessage(res);
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

                <div className={styles.bubble}>
                    <div className={styles.text}>{message}</div>
                    <img src={dssImageChat} className={styles.chat}></img>

                    <div className={styles.chart}>
                        <TemperatureChart />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DSS;
