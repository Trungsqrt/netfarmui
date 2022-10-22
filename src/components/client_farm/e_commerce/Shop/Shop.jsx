import React from 'react';
import Products from './Products/Products';
import Category from './Category/Category';
const Shop = () => {
    return (
        <div className="shop">
            <Category></Category>
            <Products></Products>
        </div>
    );
};

export default Shop;
