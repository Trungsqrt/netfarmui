import axiosClient from './config';

const articleAPI = {
    getAPI: () => {
        // const url = '/Articles';
        const url = '/Article';
        return axiosClient.get(url);
    },

    getCategory: (query) => {
        // const url = `/Articles/category${query}`;
        const url = `/Article${query}`;
        return axiosClient.get(url);
    },

    getDetail: (id) => {
        // const url = `/Articles/${id}`;
        const url = `/Article/${id}`;
        return axiosClient.get(url);
    },

    getPagination: (query) => {
        // const url = `/Articles/pagination${query}`;
        const url = `/Article/pagination${query}`;

        return axiosClient.get(url);
    },
};

export default articleAPI;
