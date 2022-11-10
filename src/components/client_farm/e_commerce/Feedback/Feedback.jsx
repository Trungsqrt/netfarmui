import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
const Feedback = (props) => {
    const { product, index } = props;
    const navigate = useNavigate();

    function FeedBackProduct(e) {
        const id = e.target.value;
        navigate(`/feedback/${id}`);
    }
    return (
        <div className="feedback_container" key={index}>
            <div className="feedbackrow feedback_header">
                <ul className="inline_list">
                    <li className="header_item text-br">
                        <div className="small-text ">Yêu thích</div>
                    </li>
                    <li className="header_item text-br">Xem sản phẩm</li>
                </ul>
                <ul className="inline_list">
                    <li className="header_item">Giao hàng thành công</li>
                    <li className="header_item">Đã giao</li>
                </ul>
            </div>
            <div className="feedbackrow feedback_product">
                <img className="feedback_product_img" src={product.image}></img>
                <div className="feedback_product_content">
                    <div className="feedback_product_name">{product.productName}</div>
                    <div className="feedback_product_quantity">x {product.quantity}</div>
                </div>
                <div className="feedback_product_price">{product.price}Đ</div>
            </div>
            <div className="feedback_product_footer">
                <div className="feedback_product_total">
                    Tổng tiền: {Number(product.quantity) * Number(product.price)}
                </div>
                <div className="feedback_btn_row">
                    <button className="btn btn_feedback" value={product.id} onClick={FeedBackProduct}>
                        Đánh Giá
                    </button>
                    <button className="btn btn_rebuy">Mua lại</button>
                </div>
            </div>
        </div>
    );
};
export default Feedback;
