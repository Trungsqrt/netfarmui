import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Piechart = (props) => {
    const { dataChart } = props;
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            const iii = payload;
            console.log('i0', iii[0]);
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: '#ffff',
                        padding: '5px',
                        border: '1px solid #cccc',
                    }}
                >
                    <label>{`${payload[0].payload.payload.name} : ${(payload[0].value * 100).toFixed(2)}%`}</label>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart_demo">
            <PieChart width={400} height={400}>
                <Pie
                    data={dataChart.datasets[0].data}
                    dataKey="value"
                    nameKey={(value, index) => dataChart.labels[index]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                >
                    {dataChart.datasets[0].data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={dataChart.datasets[0].backgroundColor[index]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
        </div>
    );
};
export default Piechart;
