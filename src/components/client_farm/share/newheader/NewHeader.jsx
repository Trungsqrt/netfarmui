import React from 'react';
import { CloudFilled, MailFilled } from "@ant-design/icons";
import { Button, Image, Space } from "antd";
import logo from "../../../../assets/image/logonetfarm.png";
import "./header.css";

const NewHeader = () => {
  return (
    <div>
    <div id="main-navbar" className="navbar">
      <Image src={logo} style={{ height: "60px" }} />
      <div style={{ textAlign: "center", color: "black" }}>
        <CloudFilled
          style={{ color: "#00CCFF", fontSize: 40, paddingTop: 30 }}
        />
        <h4 style={{ color: "white" }}>Da Nang, 30°C</h4>
      </div>
      {/* <div
        style={{
          alignItems: "center",
          textAlign: "center",
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
          color: "black",
        }}
      >
        <MailFilled
          style={{ color: "#FFF", fontSize: 20, paddingRight: 10 }}
        />
        <p style={{ color: "#FFF", fontSize: 20 }}>needhelp@company.com</p>
      </div> */}
      <nav>
        <ul>
          <li>
            <a href="/home">Trang chủ</a>
          </li>
          <li>
            <a href="/home">Thông tin</a>
          </li>
          <li>
            <a href="/home">Mua hàng</a>
          </li>
          <li>
            <a href="/home">Nhận diện cây trồng</a>
          </li>
          <li>
            <Space wrap>
              <Button type="primary" shape="round" size="medium" danger>
                Đăng nhập
              </Button>
              <Button type="primary" shape="round" size="medium" danger>
                Đăng ký
              </Button>
            </Space>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  )
}

export default NewHeader