import React from 'react';
import Products from './Products/Products';
import Category from './Category/Category';
import Header from '../../share/header/Header';
const Shop = () => {
    return (
        <div>
            <Header></Header>
            <div className="shop">
                <div className="shop_block">
                    <div className="shop_block_text">SHOP</div>
                    <div className="shop_block_text_sm">NetFarm</div>
                </div>
                <div className="shop_content">
                    <Category></Category>
                    <Products></Products>
                </div>
            </div>
        </div>
    );
};

export default Shop;
