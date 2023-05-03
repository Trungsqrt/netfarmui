import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/style.css';
function Product(props) {
    const { product, index } = props;
    const navigate = useNavigate();

    function truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    }

    return (
        <div className="product_item" key={index}>
            <div className="product_box">
                <div className="product_yt">Yêu thích</div>
                <Link className="link_product" to={`/shop/product/detail/${product.id}`}>
                    <img src={product.images[0].url} alt="" className="product_img" />
                    <h6 className="product_name">{product.name}</h6>
                    <h3 className="product_price">{product.price} Đ</h3>
                </Link>
                <div className="product_start list-inline">
                    <ul className="list-inline mb-2">
                        <li className="list-inline-start m-0">
                            <i className="fas fa-star small text-warning"></i>
                        </li>
                        <li className="list-inline-start m-0">
                            <i className="fas fa-star small text-warning"></i>
                        </li>
                        <li className="list-inline-start m-0">
                            <i className="fas fa-star small text-warning"></i>
                        </li>
                        <li className="list-inline-start m-0">
                            <i className="fas fa-star small text-warning"></i>
                        </li>
                        <li className="list-inline-start m-0">
                            <i className="fas fa-star small text-warning"></i>
                        </li>
                    </ul>
                    <div className="list-inline">
                        <i className="fa-solid fa-location-dot product_location_icon"></i>
                        <div className="product_location">{truncateString(product.placeProduce, 10)}</div>
                    </div>
                </div>
                {/* <button className="Add_btn">Xem thêm</button> */}
            </div>
        </div>
    );
}

export default Product;
