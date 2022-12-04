import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
const orderUrl = 'https://localhost:44303/api/Order';
const data = [];
const fetchData = async () => {
    var i = 0;
    const order = await axios.get(orderUrl);
    const cancel = order.data.filter((item) => item['cancel']);
    data.push({
        name: 'Đã hủy',
        value: Number(((cancel.length / order.data.length) * 100).toFixed(2)),
    });
    const finish = order.data.filter((item) => item['finish'] && !item['cancel']);
    data.push({
        name: 'Đã giao',
        value: Number(((finish.length / order.data.length) * 100).toFixed(2)),
    });
    const dangGiao = order.data.filter((item) => item['delivery'] && !item['finish'] && !item['cancel']);
    data.push({
        name: 'Đang giao hàng',
        value: Number(((dangGiao.length / order.data.length) * 100).toFixed(2)),
    });

    const daXacNhan = order.data.filter((item) => !item['delivery'] && item['status'] && !item['cancel']);
    data.push({
        name: 'Đã xác nhận',
        value: Number(((daXacNhan.length / order.data.length) * 100).toFixed(2)),
    });

    const chuaXacNhan = order.data.filter((item) => !item['status'] && !item['cancel']);
    data.push({
        name: 'Chưa xác nhận',
        value: Number(((chuaXacNhan.length / order.data.length) * 100).toFixed(2)),
    });
};
fetchData();
class OrderStatistic extends React.Component {
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
                <div className="product_static">Thống kê đơn hàng</div>
                <PieChart width={600} height={250}>
                    <Pie
                        data={data}
                        color="#000000"
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
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
export default OrderStatistic;
