import axiosClient from './config';

const resource = 'Products';

const productAPI = {
    getAPI: () => {
        const url = '/Products';
        return axiosClient.get(url);
    },
    delete: (id) => {
        const url = `/Products/${id}`;
        // const url = '/Article';
        return axiosClient.delete(url);
    },

    getAll: async () => {
        const result = await axiosClient.get(`/${resource}`);
        // const result = await axiosClient.get(`/Products`);
        return result.data;
    },

    getDetail: (id) => {
        const url = `/Products/${id}`;
        return axiosClient.get(url);
    },

    patch: (id, data) => {
        axiosClient.patch(`/${id}`, data, {
            headers: {
                'x-access-token': 'token-value',
            },
        });
    },

    // delete: (id) => {
    //     axiosClient.delete(`/${id}`, {
    //         headers: {
    //             'x-access-token': 'token-value',
    //         },
    //     });
    // },
};

export default productAPI;
