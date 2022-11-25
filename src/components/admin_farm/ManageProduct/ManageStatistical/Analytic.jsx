import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
// const data = [
//     { data: 4500 },
//     {
//         data: 5000,
//     },
//     {
//         data: 4700,
//     },
//     {
//         data: 4400,
//     },
//     {
//         data: 4800,
//     },
//     {
//         data: 5300,
//     },
//     {
//         data: 5800,
//     },
//     {
//         data: 6000,
//     },
//     {
//         data: 6300,
//     },
//     {
//         data: 6580,
//     },
//     {
//         data: 6780,
//     },
//     {
//         data: 6680,
//     },
//     {
//         data: 6500,
//     },
//     {
//         data: 6300,
//     },
//     {
//         data: 5900,
//     },
//     {
//         data: 5700,
//     },
//     {
//         data: 5500,
//     },
//     {
//         data: 5300,
//     },
//     {
//         data: 5100,
//     },
//     {
//         data: 5090,
//     },
//     {
//         data: 5300,
//     },
//     {
//         data: 5800,
//     },
//     {
//         data: 6000,
//     },
//     {
//         data: 6300,
//     },
//     {
//         data: 6780,
//     },
//     {
//         data: 6500,
//     },
//     {
//         data: 6300,
//     },
//     {
//         data: 6500,
//     },
//     {
//         data: 6700,
//     },
//     {
//         data: 7000,
//     },
//     {
//         data: 7300,
//     },
//     {
//         data: 7500,
//     },
//     {
//         data: 7700,
//     },
//     {
//         data: 8090,
//     },
//     {
//         data: 8190,
//     },
//     {
//         data: 7990,
//     },

//     {
//         data: 7700,
//     },
//     {
//         data: 7500,
//     },
//     {
//         data: 7300,
//     },
//     {
//         data: 7000,
//     },
//     {
//         data: 6700,
//     },
//     {
//         data: 6500,
//     },
//     {
//         data: 6300,
//     },
//     {
//         data: 6500,
//     },
//     {
//         data: 6780,
//     },
//     {
//         data: 6300,
//     },
//     {
//         data: 6000,
//     },
//     {
//         data: 5800,
//     },

//     {
//         data: 5490,
//     },
//     {
//         data: 6000,
//     },
//     {
//         data: 8000,
//     },
// ];
function Analytic() {
    const OrderUrl = 'https://localhost:44303/api/Order';
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(OrderUrl);
            const dataset = response.data;
            dataset.sort((a, b) => new Date(b['createAt']) - new Date(a['createAt']));
            var datalist = [];
            var i = 0;
            var item = dataset[0].total;
            for (var k = 1; k < dataset.length; k++) {
                if (
                    Number(new Date(dataset[k].createAt).getDate()) ===
                    Number(new Date(dataset[k - 1].createAt).getDate())
                ) {
                    item += dataset[k].total;
                } else {
                    datalist.push({ data: item });
                    item = dataset[k].total;
                }
            }
            setData(datalist);
        };
        fetchData();
    }, []);

    return (
        <Section>
            <div className="analytics">
                <div className="analytics__details">
                    <div>
                        <h4>Doanh số bán hàng</h4>
                    </div>
                </div>
                <div className="analytics__graph">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        >
                            <Tooltip cursor={false} />
                            <Area
                                animationBegin={800}
                                animationDuration={2000}
                                type="monotone"
                                dataKey="data"
                                stroke="#ffc107"
                                fill="#ffeaa7"
                                strokeWidth={4}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Section>
    );
}

export default Analytic;
const Section = styled.section`
    .analytics {
        color: black;
        width: 100%;
        .analytics__details {
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
                }
            }
        }
        .analytics__graph {
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
