import React, { useEffect, useState } from 'react';
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
        'https://api.weatherbit.io/v2.0/forecast/daily?&lat=16.0678&lon=108.2208&days=16&key=3431f287a3ad4d50982153699eaba830&fbclid=IwAR0HiTim5nm7jJz5n-meANrhZ-DnJIbiHljJGclaV2Wea0dnpS7ghJ2tr8c';

    const [dataWeather, setDataWeather] = useState([]);
    const [cityName, setCityName] = useState('');

    //set temporary data
    const [tempData, setTempData] = useState([]);
    const data = [
        { ngay: '00:00', NhietDo: -5, LuongMua: 0 },
        { ngay: '03:00', NhietDo: -2, LuongMua: 0 },
        { ngay: '06:00', NhietDo: -1, LuongMua: 0 },
        { ngay: '09:00', NhietDo: 0, LuongMua: 0 },
        { ngay: '12:00', NhietDo: 2, LuongMua: 3 },
        { ngay: '15:00', NhietDo: 4, LuongMua: 10 },
        { ngay: '18:00', NhietDo: 5, LuongMua: 3 },
        { ngay: '21:00', NhietDo: 3, LuongMua: 0 },
        { ngay: '00:00', NhietDo: 0, LuongMua: 0 },
    ];
    const getData = async () => {
        const res = await axios.get(weatherAPIURL);
        setDataWeather(res.data.data);
        setCityName(res.data.city_name);
    };
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        // const list = [];
        const weather10days = dataWeather.slice(0, 10);
        weather10days.forEach((item) => {
            const temp = {};
            temp.Ngày = item.datetime;
            temp.Nhiệt_độ = item.temp;
            temp.Lượng_mưa = item.precip;
            setTempData((prev) => [...prev, temp]);
        });
    }, [dataWeather]);

    return (
        <div className="App">
            <ComposedChart width={730} height={250} data={tempData}>
                <XAxis dataKey="Ngày" />
                <YAxis yAxisId={1} orientation="right" label={{ value: 'Lượng mưa mm', angle: -90 }} />
                <YAxis yAxisId={2} label={{ value: 'Nhiệt độ (oC)', angle: -90 }} />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar yAxisId={1} dataKey="Lượng_mưa" barSize={40} fill="#413ea0" />
                <Line yAxisId={2} type="monotone" dataKey="Nhiệt_độ" stroke="#ff0000" />
            </ComposedChart>
        </div>
    );
};

export default TemperatureChart;
