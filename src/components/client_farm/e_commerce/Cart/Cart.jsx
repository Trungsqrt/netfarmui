import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../share/header/Header';
import ListCart from './ListCart';
const Shop = () => {
    return (
        <div>
            <Header></Header>
            <div className="shop">
                <div className="shop_block">
                    <div className="shop_block_text">CART</div>
                    <div className="shop_block_text_sm">NetFarm</div>
                </div>
                <div className="cart_content">
                    <div className="shopping_cart">
                        <div className="section_title">SHOPPING CART</div>
                        <div className="shopping_cart_table">
                            <ListCart></ListCart>
                        </div>
                        <div className="shopping_cart_btns">
                            <Link to="/shop">
                                <button className="shopping_cart_btn">
                                    <i class="fa-solid fa-arrow-left shopping_cart_btn_icon"></i>
                                    Continue Shopping
                                </button>
                            </Link>
                            <button className="shopping_cart_btn">
                                Checkout
                                <i class="fa-solid fa-arrow-right shopping_cart_btn_icon"></i>
                            </button>
                        </div>
                    </div>
                    <div className="cart_total">
                        <div className="section_title">CART TOTAL</div>
                        <div className="total">
                            Total
                            <div className="total_value">$0</div>
                        </div>
                        <form>
                            <div className="form_group">
                                <input className="form-control" type="text" placeholder="Enter your coupon" />
                                <button className="coupon_btn" type="submit">
                                    {' '}
                                    <i className="fas fa-gift mr-2"></i>Apply coupon
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
