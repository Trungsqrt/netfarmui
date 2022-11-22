import React from 'react';
import './About.css';
const About = () => {
    return (
        <div>
            <section className="about">
                <div className="containner">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://bom.so/yIP6Dg" alt="hop-tac-xa" className="about-img" />
                        </div>
                        <div className="col-md-6">
                            <div className="about-content">
                                <h3 className="Gioithieu">Giới thiệu</h3>
                                <div className="short-cont">
                                    <p>
                                        Hợp tác xã nông nghiệp Bình Dương được thành lập năm 2016, với 45 thành viên
                                        tham gia. Thời gian đầu, các thành viên của hợp tác xã chỉ trồng các giống tiêu
                                        truyền thống. Cùng với giá cả bấp bênh, dịch bệnh, cách canh tác tiêu lạc hậu
                                        nên đa số nông dân chỉ đủ thu hồi vốn, thời điểm giá tiêu giảm mạnh, có hộ còn
                                        lỗ vốn...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
