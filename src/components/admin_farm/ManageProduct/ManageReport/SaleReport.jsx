import React from 'react';
import ReactDOM from 'react-dom';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import OrderStatistic from '../ManageStatistical/OrderStatic';
import '../../css/style.css';

const SaleReport = () => {
    function myFunction() {
        var dots = document.getElementById('dots');
        console.log(dots);
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
            console.log(imgHeight);
            var position = 15;
            doc.addImage(imgData, 'PNG', 15, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 35) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 15, position - 20, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                console.log(heightLeft);
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
                                    <td>1995</td>
                                </tr>
                                <tr>
                                    <td className="table_object">Tổng doanh thu </td>
                                    <td>1992</td>
                                </tr>
                                <tr>
                                    <td className="table_object">Tổng chi phí</td>
                                    <td>1993</td>
                                </tr>
                                <tr>
                                    <td className="table_object">Tổng lợi nhuận</td>
                                    <td>1994</td>
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
                                        <td className="table_object table_object_header" colSpan={3}>
                                            Tổng{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Doanh thu </td>
                                        <td>1992</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Chi phí</td>
                                        <td>1993</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Lợi nhuận</td>
                                        <td>1994</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object table_object_header" colSpan={3}>
                                            Đơn thành công{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Doanh thu </td>
                                        <td>1992</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Chi phí</td>
                                        <td>1993</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Lợi nhuận</td>
                                        <td>1994</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object table_object_header" colSpan={3}>
                                            Đơn đang xử lý{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Doanh thu </td>
                                        <td>1992</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Chi phí</td>
                                        <td>1993</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Lợi nhuận</td>
                                        <td>1994</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object table_object_header" colSpan={3}>
                                            Đơn thất bại / đã hủy{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Doanh thu </td>
                                        <td>1992</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Chi phí</td>
                                        <td>1993</td>
                                    </tr>
                                    <tr>
                                        <td className="table_object">Lợi nhuận</td>
                                        <td>1994</td>
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
