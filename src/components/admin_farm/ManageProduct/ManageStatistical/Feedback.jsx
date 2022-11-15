import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
const feedbackurl = 'https://localhost:44303/api/Feedbacks';
const orderItemUrl = 'https://localhost:44303/api/OrderDetail';
const data = [];
const fetchData = async () => {
    var i = 0;
    const products = await axios.get(orderItemUrl);
    const feedbacks = await axios.get(feedbackurl);
    const numberoffeedback = products.data.filter((a) => a['feedback']);
    data.push({
        name: 'Đã Đánh giá',
        value: (numberoffeedback.length / products.data.length) * 100,
    });
    data.push({
        name: 'Chưa đánh giá',
        value: ((products.data.length - numberoffeedback.length) / products.data.length) * 100,
    });
};
fetchData();
class FeedbackStatistic extends React.Component {
    COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042', '#AF19FF'];

    CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: '#ffff',
                        padding: '5px',
                        border: '1px solid #cccc',
                    }}
                >
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }
        return null;
    };
    render() {
        return (
            <div>
                <div className="product_static">Tỉ lệ đánh giá sản phẩm</div>
                <PieChart width={540} height={250}>
                    <Pie
                        data={data}
                        color="#000000"
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<this.CustomTooltip />} />
                    <Legend />
                </PieChart>
            </div>
        );
    }
}
export default FeedbackStatistic;
