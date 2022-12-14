import React, { useEffect, useState } from 'react';
import styles from './DSS.module.css';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

const TemperatureChart = () => {
    const weatherAPIURL =
        'https://api.weatherbit.io/v2.0/forecast/daily?&lat=16.0678&lon=108.2208&days=16&key=7d03912562a54245a4a9cc2cf0074bb3';

    const [dataWeather, setDataWeather] = useState([]);
    const [cityName, setCityName] = useState('');

    //set temporary data
    const [tempData, setTempData] = useState([]);
    const getData = async () => {
        const res = await axios.get(weatherAPIURL);
        setDataWeather(res.data.data);
        setCityName(res.data.city_name);
        console.log(res.data.data[0].weather.description);
    };
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const list = [];
        const weather10days = dataWeather.slice(0, 10);
        weather10days.forEach((item) => {
            const temp = {};
            temp.Ngày = item.datetime;
            temp.Nhiệt_độ = item.temp;
            temp.Lượng_mưa = item.precip;
            list.push(temp);
        });
        setTempData(list);
    }, [dataWeather]);

    return (
        <div className="App">
            <ComposedChart width={730} height={250} data={tempData}>
                <XAxis dataKey="Ngày" />
                <YAxis yAxisId={1} orientation="right" label={{ value: 'Lượng mưa mm', angle: -90 }} />
                <YAxis yAxisId={2} label={{ value: 'Nhiệt độ ', angle: -90 }} />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar yAxisId={1} dataKey="Lượng_mưa" barSize={40} fill="#413ea0" label="Lượng mưa" />
                <Line yAxisId={2} type="monotone" dataKey="Nhiệt_độ" stroke="#ff0000" />
            </ComposedChart>
        </div>
    );
};

export default TemperatureChart;
