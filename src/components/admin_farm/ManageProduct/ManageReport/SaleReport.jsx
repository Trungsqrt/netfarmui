import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import OrderStatistic from '../ManageStatistical/OrderStatic';
import '../../css/style.css';
import axios from 'axios';

const SaleReport = () => {
    const OrderUrl = 'https://localhost:44303/api/Order';
    const ProductUrl = 'https://localhost:44303/api/Products';
    const OrderDetailUrl = 'https://localhost:44303/api/OrderDetail';
    const [numberOrder, setnumberOrder] = useState(0);
    const [revenue, setrevenue] = useState(0);
    const [expenses, setexpenses] = useState(0);
    const [profit, setprofit] = useState(0);
    const [finishRevenue, setfinishRevenue] = useState(0);
    const [finishExpenses, setfinishExpenses] = useState(0);
    const [finishProfit, setfinishProfit] = useState(0);
    const [UnfinishRevenue, setUnfinishRevenue] = useState(0);
    const [UnfinishExpenses, setUnfinishExpenses] = useState(0);
    const [UnfinishProfit, setUnfinishProfit] = useState(0);
    const [CancelRevenue, setCancelRevenue] = useState(0);
    const [CancelExpenses, setCancelExpenses] = useState(0);
    const [CancelProfit, setCancelProfit] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const order = await axios.get(OrderUrl);
            const detailOrderRes = await axios.get(OrderDetailUrl);
            const ProductsRes = await axios.get(OrderDetailUrl);
            // lấy tất cả các đơn trong tháng hiện tại
            const Order = order.data.filter((item) => new Date(item['createAt']).getMonth() === new Date().getMonth());

            const Products = ProductsRes.data;
            setnumberOrder(Order.length);
            var sum = 0,
                cancelreve = 0,
                finishreven = 0,
                unfinishreven = 0;
            var cancel = [];
            var finish = [];
            var unfinish = [];
            var OrderIdInMonth = [];
            for (var i = 0; i < Order.length; i++) {
                sum += Order[i].total;
                OrderIdInMonth.push(Order[i].id);
                if (Order[i].cancel) {
                    cancelreve += Order[i].total;
                    cancel.push(Order[i].id);
                } else if (Order[i].finish) {
                    finishreven += Order[i].total;
                    finish.push(Order[i].id);
                } else {
                    unfinishreven += Order[i].total;
                    unfinish.push(Order[i].id);
                }
            }
            console.log(unfinish);
            setrevenue(sum);
            setfinishRevenue(finishreven);
            setCancelRevenue(cancelreve);
            setUnfinishRevenue(unfinishreven);
            const OrderDetail = detailOrderRes.data.filter((item) => OrderIdInMonth.includes(item.orderId));
            var allcost = 0,
                cancelcost = 0,
                finishcost = 0,
                unfinishcost = 0;
            for (var i = 0; i < OrderDetail.length; i++) {
                const productId = OrderDetail[i].productId;
                const quantity = OrderDetail[i].quantity;
                const ProductRes = await axios.get(`${ProductUrl}/${productId}`);
                const cost = ProductRes.data.discount;
                allcost += quantity * cost;
                if (cancel.includes(OrderDetail[i].orderId)) {
                    cancelcost += quantity * cost;
                } else if (finish.includes(OrderDetail[i].orderId)) {
                    finishcost += quantity * cost;
                } else {
                    unfinishcost += quantity * cost;
                }
            }
            setexpenses(allcost);
            setCancelExpenses(cancelcost);
            setfinishExpenses(finishcost);
            setUnfinishExpenses(unfinishcost);
            setprofit(revenue - expenses);
            setCancelProfit(CancelRevenue - CancelExpenses);
            setfinishProfit(finishRevenue - finishExpenses);
            setUnfinishProfit(UnfinishRevenue - UnfinishExpenses);
        };
        fetchData();
    }, []);

    function myFunction() {
        var dots = document.getElementById('dots');
        var moreText = document.getElementById('more');
        var btnText = document.getElementById('myBtn');

        if (dots.style.display === 'none') {
            dots.style.display = 'inline';
            btnText.innerHTML = 'Xem thêm';
            moreText.style.display = 'none';
        } else {
            dots.style.display = 'none';
            btnText.innerHTML = 'Thu gọn';
            moreText.style.display = 'inline';
        }
    }
    function generatePDF() {
        var breakpart = document.getElementById('break');
        breakpart.classList.remove('Report_section');
        breakpart.classList.add('Report_section_break');
        var doc = new JsPDF('p', 'mm', 'a4');
        html2canvas(document.querySelector('#demo')).then(function (canvas) {
            var imgData = canvas.toDataURL('image/png');
            var pageHeight = 245;
            var imgWidth = 180;
            var imgHeight = (canvas.height * imgWidth) / canvas.width;
            var heightLeft = imgHeight;
            var position = 15;
            doc.addImage(imgData, 'PNG', 15, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 35) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 15, position - 20, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            doc.save('MyReport.pdf');
            // doc.output('dataurlnewwindow');
        });
        breakpart.classList.remove('Report_section_break');
        breakpart.classList.add('Report_section');
    }
    return (
        <div className="content">
            <div id="demo" className="pagePDF">
                <div className="pdf_header">
                    <div className="pdf_header_left">
                        <div className="pdf_head_uppper">Công ty ....</div>
                    </div>
                    <div className="pdf_header_rigth">
                        <div className="pdf_head_uppper">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                        <div className="pdf_head_lower">Độc lập - Tự do - Hạnh phúc</div>
                        <div className="pdf_header_none">----------------------</div>
                    </div>
                </div>
                <div className="pdf_header pdf_header_height">
                    <div className="pdf_header_left">
                        <div className="pdf_header_none">Số .................</div>
                    </div>
                    <div className="pdf_header_rigth">
                        <div className="pdf_header_none">......Ngày ... Tháng ... Năm ...</div>
                    </div>
                </div>
                <div className="pdf_name">
                    <div className="pdf_name_title">BÁO CÁO DOANH THU</div>
                    <div className="pdf_name_content">
                        Kính
                        gửi:..........................................................................................
                    </div>
                    <div>
                        .........................................................................................................................
                    </div>
                </div>
                <div className="pdf_owner">
                    <div className="pdf_owner_title">
                        Tôi tên
                        là:...............................................................................................................................................................................
                    </div>
                    <div className="pdf_owner_title">
                        Ngày
                        :.....................................................................................................................................................................................
                    </div>
                    <div className="pdf_owner_title">
                        Chức
                        vụ:.................................................................................................................................................................................
                    </div>
                    <div className="pdf_owner_title">
                        Bộ
                        phận:.................................................................................................................................................................................
                    </div>
                    <div className="pdf_owner_bold">
                        Hôm nay, Ngày....... Tháng ........ Năm........Tôi lập báo cáo doanh thu của bộ phận bán hàng
                        thuộc Hợp tác xã NetFarm như sau:
                    </div>
                </div>
                <div>
                    <div className="Report_section">
                        <div className="report_title">1. Báo cáo tổng quát</div>
                        <div className="report_table">
                            <table>
                                {/* <tr>
                                    <th>Thông số</th>
                                    <th>Kết quả</th>
                                </tr> */}
                                <tr>
                                    <td className="table_object">Tổng đơn bán</td>
                                    <td>{numberOrder}</td>
                                </tr>
                                <tr>
                                    <td className="table_object">Tổng doanh thu </td>
                                    <td>{revenue}</td>
                                </tr>
                                <tr>
                                    <td className="table_object">Tổng chi phí</td>
                                    <td>{expenses}</td>
                                </tr>
                                <tr>
                                    <td className="table_object">Tổng lợi nhuận</td>
                                    <td>{profit}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="Report_section">
                        <div className="report_title">2. Hoạt động bán hàng online </div>
                        <div className="report_chart">
                            <OrderStatistic></OrderStatistic>
                        </div>
                    </div>
                </div>
                <span id="dots"></span>
                <span id="more">
                    <div>
                        <div className="Report_section" id="break">
                            <div className="report_title">Chi tiết đơn hàng</div>
                            <div className="report_table">
                                <table>
                                    <tr>
                                        <td className="table_object table_object_header" colSpan={2}>
                                            Tổng{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Doanh thu </td>
                                        <td>{revenue}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Chi phí</td>
                                        <td>{expenses}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Lợi nhuận</td>
                                        <td>{profit}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object table_object_header" colSpan={2}>
                                            Đơn thành công{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Doanh thu </td>
                                        <td>{finishRevenue}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Chi phí</td>
                                        <td>{finishExpenses}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Lợi nhuận</td>
                                        <td>{finishProfit}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object table_object_header" colSpan={2}>
                                            Đơn đang xử lý{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Doanh thu </td>
                                        <td>{UnfinishRevenue}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Chi phí</td>
                                        <td>{UnfinishExpenses}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Lợi nhuận</td>
                                        <td>{UnfinishProfit}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object table_object_header" colSpan={2}>
                                            Đơn thất bại / đã hủy{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Doanh thu </td>
                                        <td>{CancelRevenue}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Chi phí</td>
                                        <td>{CancelExpenses}</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Lợi nhuận</td>
                                        <td>{CancelProfit}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="Report_section">
                            <div className="report_title">3. Nhận xét đánh giá</div>
                            <div className="pdf_owner_title">
                                .................................................................................................................................................................................
                            </div>
                            <div className="pdf_owner_title">
                                .................................................................................................................................................................................
                            </div>
                            <div className="pdf_owner_title">
                                .................................................................................................................................................................................
                            </div>
                        </div>
                        <div className="Report_section">
                            <div className="report_title">4. Đề nghị, kiến nghị</div>
                            <div className="pdf_owner_title">
                                .................................................................................................................................................................................
                            </div>
                            <div className="pdf_owner_title">
                                .................................................................................................................................................................................
                            </div>
                            <div className="pdf_owner_title">
                                .................................................................................................................................................................................
                            </div>
                        </div>
                    </div>
                    <div className="pdf_header">
                        <div className="pdf_header_rigth">
                            <div className="pdf_head_uppper">QUẢN LÝ </div>
                            <div className="pdf_header_none">Ký ghi rõ họ tên</div>
                        </div>
                        <div className="pdf_header_rigth">
                            <div className="pdf_head_uppper">NGƯỜI LẬP BÁO CÁO</div>
                            <div className="pdf_header_none">Ký ghi rõ họ tên</div>
                        </div>
                    </div>
                </span>
            </div>

            <div class="flex">
                <button onClick={myFunction} id="myBtn" className="myBtn_btn">
                    Xem thêm
                </button>
                <button onClick={generatePDF} class="myBtn_btn">
                    Tải xuống
                </button>
            </div>
        </div>
    );
};

export default SaleReport;
