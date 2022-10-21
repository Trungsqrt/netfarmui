import axiosClient from './config';

const resource = 'Products';

const productApis = {
    getAll: async () => {
        const result = await axiosClient.get(`/${resource}`);
        // const result = await axiosClient.get(`/Products`);
        return result.data;
    },

    getById: async (id) => {
        const result = await axiosClient.get(`/${resource}/${id}`);
        // const result = await axiosClient.get(`/Products/1`);
        return result.data;
    },

    patch: (id, data) => {
        axiosClient.patch(`/${id}`, data, {
            headers: {
                'x-access-token': 'token-value',
            },
        });
    },

    delete: (id) => {
        axiosClient.delete(`/${id}`, {
            headers: {
                'x-access-token': 'token-value',
            },
        });
    },
};

export { API_URL, productApis };
