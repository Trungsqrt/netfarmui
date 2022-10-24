import React from 'react';
import axios from 'axios';
import productAPI from '../../../apis/productAPI';
const Product = (props) => {
    const { product } = props;
    const productUrl = 'https://6351413b3e9fa1244e59b320.mockapi.io';
    const handleDeleteProduct = (index) => {
        async function deleteHandler() {
            await productAPI.delete(index);
        }
        deleteHandler();
    };
    return (
        <tr className="text_center">
            <td>
                <div>{product.id}</div>
            </td>
            <td>
                <div>{product.name}</div>
            </td>
            <td>
                <div>{product.category}</div>
            </td>
            <td>
                <div>{product.price}</div>
            </td>
            <td>
                <img src={product.img1} alt="" width="100px" />
            </td>
            <td>
                <a
                    className="reset-anchor remove_cart"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDeleteProduct(product.id)}
                >
                    <i className="fas fa-trash-alt small text-muted"></i>
                </a>
            </td>
            <td>
                <a className="reset-anchor remove_cart" style={{ cursor: 'pointer' }}>
                    <i class="fa-solid fa-pen-to-square"></i>
                </a>
            </td>
        </tr>
    );
};

export default Product;
