import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

ListCart.propTypes = {
    listCart: PropTypes.array,
    onDeleteCart: PropTypes.func,
    onUpdateCount: PropTypes.func,
};

ListCart.defaultProps = {
    listCart: [],
    onDeleteCart: null,
    onUpdateCount: null,
};

function ListCart(props) {
    // const { listCart, onDeleteCart, onUpdateCount } = props
    // const handlerChangeText = (e) => {
    //     console.log(e.target.value)
    // }
    // const handlerDelete = (getUser, getProduct) => {
    //     if (!onDeleteCart){
    //         return
    //     }
    //     onDeleteCart(getUser, getProduct)
    // }
    // const handlerDown = (getIdUser, getIdProduct, getCount) => {
    //     if (!onUpdateCount) {
    //         return;
    //     }
    //     if (getCount === 1) {
    //         return;
    //     }
    //     //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
    //     const updateCount = parseInt(getCount) - 1;
    //     onUpdateCount(getIdUser, getIdProduct, updateCount);
    // };
    // const handlerUp = (getIdUser, getIdProduct, getCount) => {
    //     if (!onUpdateCount) {
    //         return;
    //     }
    //     //Trước khi trả dữ liệu về component cha thì phải thay đổi biến count
    //     const updateCount = parseInt(getCount) + 1
    //     onUpdateCount(getIdUser, getIdProduct, updateCount)
    // }

    return (
        <div className="table-responsive mb-4">
            <table className="listcart_table">
                <thead className="bg-light">
                    <tr className="text-center">
                        <th className="border-0" scope="col">
                            {' '}
                            <strong className="text-small text-uppercase">Ảnh</strong>
                        </th>
                        <th className="border-0" scope="col">
                            {' '}
                            <strong className="text-small text-uppercase">Sản Phẩm</strong>
                        </th>
                        <th className="border-0" scope="col">
                            {' '}
                            <strong className="text-small text-uppercase">Giá</strong>
                        </th>
                        <th className="border-0" scope="col">
                            {' '}
                            <strong className="text-small text-uppercase">Số Lượng</strong>
                        </th>
                        <th className="border-0" scope="col">
                            {' '}
                            <strong className="text-small text-uppercase">Thành tiền</strong>
                        </th>
                        <th className="border-0" scope="col">
                            {' '}
                            <strong className="text-small text-uppercase">Xóa</strong>
                        </th>
                        <th className="border-0" scope="col">
                            {' '}
                            <strong className="text-small text-uppercase">Chọn</strong>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        <tr className="text-center">
                            <td className="td_content">
                                <div className="">
                                    <Link className="" to={`/shop/product/detail/1`}>
                                        <img src="http://loremflickr.com/640/480" alt="..." width="70" />
                                    </Link>
                                </div>
                            </td>
                            <td className="td_content">
                                <div className="">
                                    <Link className="reset-anchor h6 animsition-link" to={`/shop/product/detail/1`}>
                                        tên sp
                                    </Link>
                                </div>
                            </td>

                            <td className="td_content">
                                <p className="mb-0 small">$giá</p>
                            </td>
                            <td className="td_content">
                                <div className="">
                                    <button
                                        className="dec-btn p-0"
                                        style={{ cursor: 'pointer' }}
                                        // onClick={() => handlerDown(value.idUser, value.idProduct, value.count)}
                                    >
                                        <i className="fas fa-caret-left"></i>
                                    </button>
                                    <input
                                        className="quantity_box"
                                        type="text"
                                        // value={value.count}
                                        // onChange={handlerChangeText}
                                    />
                                    <button
                                        className="inc-btn p-0"
                                        style={{ cursor: 'pointer' }}
                                        // onClick={() => handlerUp(value.idUser, value.idProduct, value.count)}
                                    >
                                        <i className="fas fa-caret-right"></i>
                                    </button>
                                </div>
                            </td>
                            <td className="td_content">
                                <p className="mb-0 small">$ value.priceProduct * value.count</p>
                            </td>
                            <td className="td_content">
                                <a className="reset-anchor remove_cart" style={{ cursor: 'pointer' }}>
                                    <i className="fas fa-trash-alt small text-muted"></i>
                                </a>
                            </td>
                            <td className="td_content">
                                <input type="checkbox" />
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
export default ListCart;
