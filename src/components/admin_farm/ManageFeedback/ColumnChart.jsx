import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ColumnChart = ({ data }) => {
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];
    return (
        <div className="chart_container">
            <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" label={{ value: 'Sao', position: 'insideBottomRight', offset: -10 }} />
                <YAxis tickCount={4} label={{ value: 'Số lượng', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="value" fill="#3eb30e" />
            </BarChart>
        </div>
    );
};

export default ColumnChart;
