import axiosClient from './config';

const articleAPI = {
    getAPI: () => {
        const url = '/Articles';
        return axiosClient.get(url);
    },

    getCategory: (query) => {
        const url = `/Articles/category${query}`;
        return axiosClient.get(url);
    },

    getDetail: (id) => {
        const url = `/Articles/${id}`;
        return axiosClient.get(url);
    },

    getPagination: (query) => {
        const url = `/Articles/pagination${query}`;

        return axiosClient.get(url);
    },
};

export default articleAPI;
