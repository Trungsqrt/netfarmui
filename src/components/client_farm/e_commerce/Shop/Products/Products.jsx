import React, { useEffect, useState } from 'react';
import productAPI from '../../../../../apis/productAPI';
import Product from '../Product/Product';
import '../../css/style.css';
function Products(props) {
    const [products, setProducts] = useState([]);

    // lấy dữ liệu toàn bộ cáo bài đăng
    useEffect(() => {
        const fetchData = async () => {
            const response = await productAPI.getAPI();
            const data = response.data;
            setProducts(data);
            console.log(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="product_row">
                <div>
                    <div className="list_product">
                        {products
                            ? products.map((item, index) => (
                                  <Product product={item} key={item.id} update={item.id} number={index}></Product>
                              ))
                            : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
