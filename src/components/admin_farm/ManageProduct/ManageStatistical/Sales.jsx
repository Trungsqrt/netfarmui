import styled from 'styled-components';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { AiOutlineCaretDown } from 'react-icons/ai';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
function Sales() {
    const orderUrl = 'https://localhost:44303/api/Order';
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const order = await axios.get(orderUrl);
            const orderInThisMonth = order.data.filter((a) => new Date(a['createAt']).getMonth() === month);
            const lastmonth = month === 0 ? 11 : month - 1;
            const orderInLastMonth = order.data.filter((a) => new Date(a['createAt']).getMonth() === lastmonth);
            var datalist = [];
            for (var i = 0; i < 31; i++) {
                var thisMonth = 0,
                    lastMonth = 0;
                for (var k = 0; k < orderInThisMonth.length; k++) {
                    if (Number(new Date(orderInThisMonth[k].createAt).getDate()) === i)
                        thisMonth += orderInThisMonth[k].total;
                }
                for (var k = 0; k < orderInLastMonth.length; k++) {
                    if (Number(new Date(orderInLastMonth[k].createAt).getDate()) === i)
                        lastMonth += orderInLastMonth[k].total;
                }
                datalist.push({
                    date: i,
                    thisMonth: thisMonth,
                    lastMonth: lastMonth,
                });
            }
            setData(datalist);
        };
        fetchData();
    }, []);

    return (
        <Section>
            <div className="sales">
                <div className="sales__details">
                    <div>
                        <h4>Thống kê doanh thu</h4>
                    </div>
                </div>
                <div className="sales__graph">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorview" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="30%" stopColor="#668DFF" stopOpacity={0.4} />
                                    <stop offset="85%" stopColor="#D4E0FF" stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="colorview2" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="30%" stopColor="#48c008" stopOpacity={0.4} />
                                    <stop offset="85%" stopColor="#c1fca1" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                            <Tooltip cursor={false} />
                            <Area type="monotone" dataKey="lastMonth" stroke="#668DFF" fill="url(#colorview)" />
                            <Area type="monotone" dataKey="thisMonth" stroke="#48c008" fill="url(#colorview2)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Section>
    );
}

export default Sales;
// const data = [
//     {
//         data2: 2000,
//         data1: 2400,
//     },
//     {
//         data2: 4000,
//         data1: 1398,
//     },
//     {
//         data2: 5000,
//         data1: 12800,
//     },
//     {
//         data2: 8780,
//         data1: 3908,
//     },
//     {
//         data2: 9890,
//         data1: 4800,
//     },
//     {
//         data2: 11390,
//         data1: 3800,
//     },
//     {
//         data2: 3490,
//         data1: 4300,
//     },
// ];
const Section = styled.section`
    .sales {
        color: black;
        width: 100%;
        .sales__details {
            display: flex;
            justify-content: space-between;
            margin: 1rem 0;
            div {
                display: flex;
                gap: 1rem;
                button {
                    border-radius: 0.5rem;
                    padding: 0.4rem 1rem;
                    border: none;
                    cursor: pointer;
                    background-color: #eef4ff;
                    color: black;
                    svg {
                        font-size: 0.6rem;
                    }
                }
            }
        }
        .sales__graph {
            height: 10rem;
            width: 100%;
            .recharts-default-tooltip {
                background-color: black !important;
                border-color: black !important;
                color: white !important;
            }
        }
    }
`;
