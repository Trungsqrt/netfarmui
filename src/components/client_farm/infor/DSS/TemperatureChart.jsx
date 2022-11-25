import React from 'react';
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
const TemperatureChart = () => {
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

    return (
        <div className="App">
            <ComposedChart width={730} height={250} data={data}>
                <XAxis dataKey="Ngày" />
                <YAxis yAxisId={1} orientation="right" label={{ value: 'Lượng mưa mm', angle: -90 }} />
                <YAxis yAxisId={2} label={{ value: 'Nhiệt độ (oC)', angle: -90 }} />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar yAxisId={1} dataKey="LuongMua" barSize={40} fill="#413ea0" />
                <Line yAxisId={2} type="monotone" dataKey="NhietDo" stroke="#ff0000" />
            </ComposedChart>
        </div>
    );
};

export default TemperatureChart;
