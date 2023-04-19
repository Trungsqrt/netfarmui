import axiosClient from './config';

const articleAPI = {
  getAPI: () => {
    const url = '/Article';
    return axiosClient.get(url);
  },

  getCategory: (query) => {
    const url = `/Article${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/Article/${id}`;
    return axiosClient.get(url);
  },

  getPagination: (query) => {
    const url = `/Article/pagination${query}`;

    return axiosClient.get(url);
  },
};

export default articleAPI;
