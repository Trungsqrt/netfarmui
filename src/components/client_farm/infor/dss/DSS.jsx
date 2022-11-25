import React, { useState, useEffect } from 'react';
import dssImage from '../../../../assets/image/pngwing.com.png';
import styles from '../DSS/DSS.module.css';
import dssImageChat from '../../../../assets/image/chat.png';
import TemperatureChart from './TemperatureChart';
function DSS() {
    const [loaicay, setLoaiCay] = useState([]);
    const [hoatdong, setHoatDong] = useState([]);

    useEffect(() => {}, []);

    const handlerChangeLoaiCay = () => {};
    const handlerChangeHoatDong = () => {};

    return (
        <div>
            <section className={styles.selectBox}>
                <div className={styles.dsstitle}>Đối tượng tư vấn: </div>
                <select onChange={handlerChangeLoaiCay} className={styles.selectElement}>
                    {loaicay
                        ? loaicay.map((item, index) => (
                              <option value={item.id} key={index}>
                                  {item.name}
                              </option>
                          ))
                        : ''}
                </select>
                <select onChange={handlerChangeHoatDong} className={styles.selectElement}>
                    {hoatdong
                        ? hoatdong.map((item, index) => (
                              <option value={item.id} key={index}>
                                  {item.name}
                              </option>
                          ))
                        : ''}
                </select>
            </section>

            <section className={styles.container}>
                <div className={styles.imageHuman}></div>

                <div className={styles.bubble}>
                    <div className={styles.text}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum consectetur repellat nihil
                        aperiam voluptate maxime iusto, deleniti nemo quas asperiores incidunt nulla eum, aliquam
                        voluptatum quod provident vero debitis ullam?
                    </div>
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
