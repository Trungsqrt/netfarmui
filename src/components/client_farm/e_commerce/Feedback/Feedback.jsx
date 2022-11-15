import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Feedback = (props) => {
    const cartUrl = 'https://localhost:44303/api/Carts';
    const { product, index } = props;
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.userId;

    function FeedBackProduct(e) {
        const id = e.target.value;
        navigate(`/feedback/${id}`);
    }

    function RebuyProduct(e) {
        const checkedList = [product.productId];
        const postCart = {
            name: product.productName,
            quantity: product.quantity,
            price: product.price,
            image: product.image,
            userId: userId,
            productId: product.productId,
        };
        const fetchData = async () => {
            const response = await axios.get(cartUrl);
            const data = response.data;
            const filter = data.filter((item) => item['userId'] === userId);
            const filter2 = filter.filter((item) => item['productId'] === product.productId);
            if (filter2.length === 0) {
                AddNewProductToCart(postCart);
            } else {
                const putCart = filter2[0];
                putCart.quantity = filter2[0].quantity + postCart.quantity;
                UpdateProductToCart(putCart);
            }
        };
        fetchData();
        localStorage.setItem('checked', checkedList);
        navigate('/shop/cart');
        window.location.reload();
    }
    function AddNewProductToCart(postCart) {
        try {
            axios.post(cartUrl, postCart);
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
    }

    function UpdateProductToCart(cart) {
        try {
            axios.put(`${cartUrl}/${cart.id}`, cart);
        } catch (err) {
            alert('Có lỗi, xin vui lòng thử lại!');
        }
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
                    <button className="btn btn_rebuy" value={product.id} onClick={RebuyProduct}>
                        Mua lại
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Feedback;
