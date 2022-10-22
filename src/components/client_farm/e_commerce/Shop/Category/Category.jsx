import React from 'react';
import '../../css/style.css';
const Category = () => {
    return (
        <div>
            <div className="product_category">
                <ul className="product_category_list">
                    <li className="product_category_item first_title">Nguyên liệu sản xuất</li>
                    <li className="product_category_item">
                        <div className="product_category_title">Hạt giống</div>
                        <div className="product_category_detail">Lúa</div>
                        <div className="product_category_detail">Rau củ</div>
                        <div className="product_category_detail">Ngô</div>
                    </li>
                    <li className="product_category_item">
                        Cây giống
                        <div className="product_category_detail">Bưởi da xanh</div>
                        <div className="product_category_detail">Vải</div>
                    </li>
                    <li className="product_category_item">
                        Phân bón
                        <div className="product_category_detail">NPK</div>
                        <div className="product_category_detail">Lân</div>
                        <div className="product_category_detail">Đạm</div>
                    </li>
                    <li className="product_category_item">
                        Thức ăn chăn nuôi
                        <div className="product_category_detail">Bột cá</div>
                        <div className="product_category_detail">Thức ăn cho lợn</div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Category;
