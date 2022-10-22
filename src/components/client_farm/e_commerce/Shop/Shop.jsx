import React from 'react';
import Products from './Products/Products';
import Category from './Category/Category';
import Header from '../../share/header/Header';
const Shop = () => {
    return (
        <div>
            <Header></Header>
            <div className="shop">
                <Category></Category>
                <Products></Products>
            </div>
        </div>
    );
};

export default Shop;
