import React, { useState, useEffect } from 'react';
import dssImage from '../../../../assets/image/pngwing.com.png';
import styles from '../dss/DSS.module.css';
import dssImageChat from '../../../../assets/image/chat.png';
function DSS() {
    const [loaicay, setLoaiCay] = useState([]);
    const [hoatdong, setHoatDong] = useState([]);

    useEffect(() => {}, []);

    const handlerChangeLoaiCay = () => {};
    const handlerChangeHoatDong = () => {};

    return (
        <div>
            <section className={styles.selectBox}>
                <select onChange={handlerChangeLoaiCay} className="select_section">
                    {loaicay
                        ? loaicay.map((item, index) => (
                              <option value={item.id} key={index}>
                                  {item.name}
                              </option>
                          ))
                        : ''}
                </select>
                <select onChange={handlerChangeHoatDong} className="select_section">
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
                <section className={styles.imageHuman}></section>

                <section className={styles.bubble}>
                    <div className={styles.text}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum consectetur repellat nihil
                        aperiam voluptate maxime iusto, deleniti nemo quas asperiores incidunt nulla eum, aliquam
                        voluptatum quod provident vero debitis ullam?
                    </div>
                    <img src={dssImageChat} className={styles.chat}></img>
                </section>
                <section className={styles.chart}></section>
            </section>
        </div>
    );
}

export default DSS;
