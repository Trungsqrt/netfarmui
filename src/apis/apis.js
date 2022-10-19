import axiosClient from "./config";

// API endpoints
const API_URL = "https://634923a80b382d796c7e7f52.mockapi.io/api/article";

const productApis = {
    // [GET]
    get: async () => {
        const result = await axiosClient.get("/");
        return result.data;
    },
    
// [PATCH]
    patch: (id, data) => {
        axiosClient.patch(`/${id}`, data, {
            headers: {
                "x-access-token": "token-value",
            },
        });
    },

 // [DELETE]
    delete: (id) => {
        axiosClient.delete(`/${id}`, {
            headers: {
                "x-access-token": "token-value",
            },
        });
    },
};

export { API_URL, productApis };
