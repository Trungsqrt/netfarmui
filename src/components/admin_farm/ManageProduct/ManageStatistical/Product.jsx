import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Legend } from 'recharts';
import axios from 'axios';

const COLOR = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'fc46aa', '6dfc46'];
const renderColorfulLegendText = (value, entry) => {
    return <span style={{ color: '#596579', fontWeight: 500, padding: '10px' }}>{value}</span>;
};

const productUrl = 'https://localhost:44303/api/Products';
const categoryUrl = 'https://localhost:44303/api/Categories';
const data = [];

const Product = () => {
    useEffect(() => {
        const fetchData = async () => {
            const product = await axios.get(productUrl);
            const category = await axios.get(categoryUrl);
            const categorydata = category.data;
            for (var i = 0; i < categorydata.length; i++) {
                const value = product.data.filter((a) => a['category_ID'] === categorydata[i].categoryId).length;
                data.push({
                    name: categorydata[i].display,
                    value: value,
                    fill: COLOR[i],
                });
            }
        };
        fetchData();
    }, []);
    {
        return (
            <div>
                <div className="product_static">Thống kê sản phẩm theo danh mục</div>
                <PieChart width={460} height={250} onMouseEnter={this.onPieEnter} Legend={{ top: 0 }}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={0}
                        dataKey="value"
                    ></Pie>
                    <Legend
                    // // height={30}
                    // iconType="circle"
                    // // layout="vertical"
                    // // verticalAlign="middle"
                    // iconSize={10}
                    // padding={4}
                    // // margin="0 30px"
                    // formatter={renderColorfulLegendText}
                    />
                </PieChart>
            </div>
        );
    }
};

export default Product;
