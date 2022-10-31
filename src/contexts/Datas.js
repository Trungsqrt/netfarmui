import axios from 'axios';
import { API_URL, articleAPI, productAPI } from '../apis';
import { useState, useEffect, createContext } from 'react';

// Context
const DatasContext = createContext();

// Provider
function DatasContextProvider({ children }) {
    const [datas, setDatas] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const articles = await articleAPI.getAPI();
            const products = await productAPI.getAPI();

            const formatDatas = {
                articles: articles.data,
                products: products.data,
            };

            setDatas(formatDatas);

            // Để cập nhật giá trị dữ liệu dùng chung (datas)
            // setDatas((prevDatas) => ({
            //     ...prevDatas,
            //     userInfo: {
            //         username: '',
            //         userid: '',
            //     },
            // }));
        };

        fetchData();
    }, []);

    const payload = { datas: datas, setDatas: setDatas };

    return <DatasContext.Provider value={payload}>{children}</DatasContext.Provider>;
}

export { DatasContext, DatasContextProvider };
