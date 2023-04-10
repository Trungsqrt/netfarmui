import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const useCallAPI = (url) => {
    const [data, setData] = useState();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        const callApi = async () => {
            setLoading(true);

            try {
                const data = await axios.get(url);
                setData(data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        };
        callApi();
    }, [url]);

    return { data, loading,error };
};
