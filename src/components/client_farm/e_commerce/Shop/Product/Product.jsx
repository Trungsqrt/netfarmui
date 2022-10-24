import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../css/style.css';
Product.propTypes = {
    products: PropTypes.array,
};

Product.defaultProps = {
    products: [],
};
function Product(props) {
    const { product } = props;
    return (
        <div className="product_item">
            <div className="product_box">
                <Link className="link_product" to={`product/detail/${product.id}`}>
                    <img src={product.image1} alt="" className="product_img" />
                    <h6 className="product_name">{product.name}</h6>
                    <h3 className="product_price">{product.price}</h3>
                </Link>
                <button className="Add_btn">Thêm vào giỏ hàng</button>
                <button className="Add_btn">Mua ngay</button>
            </div>
        </div>
    );
}

export default Product;
