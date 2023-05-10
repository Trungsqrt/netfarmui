import { Carousel, Image } from "antd";
import React from "react";

const height = 460;
const SliderShow = () => {
  const contentStyle = {
    color: "#fff",
    width: "100%",
    height: height,
    display: "block",
  };

  return (
    <>
      <Carousel autoplay>
        <div style={contentStyle}>
          <Image
            width={`100%`}
            height={height}
            src="https://s3.ap-southeast-1.amazonaws.com/we-xpats.com/articles/images/AdobeStock_243525780.jpeg"
          ></Image>
        </div>
        <div style={contentStyle}>
          <Image
            width={`100%`}
            height={height}
            src="https://media.vneconomy.vn/images/upload/2021/04/20/55fnc3b4ng-nghie1bb87p-thc3b4ng-minh1-1604989305810604890581-crop-1604989310824614604916.jpg"
          ></Image>
        </div>
        <div style={contentStyle}>
          <Image
            width={`100%`}
            height={height}
            src="https://digital.fpt.com.vn/wp-content/uploads/2020/07/36.banner.jpg"
          ></Image>
        </div>
        <div style={contentStyle}>
          <Image
            width={`100%`}
            height={height}
            src="https://media.tapchitaichinh.vn/images/upload/tranhuyentrang/2018_07_30/06exzd_NSZO.jpg"
          ></Image>
        </div>
      </Carousel>
    </>
  );
};

export default SliderShow;
