import axios from "axios";

export const indexApi = async (apiUrl, config) => {
    try {
        const res = await axios.get(apiUrl, config);
        console.log(res.data);
        const data = await res.data;
        return data;
    } catch (err) {
        err.response
            ? console.error(err.response.data)
            : console.error("Errore connessione");
    }
};

export const showApi = async (apiUrl, config) => {
    try {
        const res = await axios.get(apiUrl, config);
        console.log(res.data);
        const data = await res.data;
        return data;
    } catch (err) {
        err.response
            ? console.error(err.response.data)
            : console.error("Errore connessione");
    }
};

export const storeApi = async (apiUrl, config) => {
    try {
        const res = await axios.post(apiUrl, config);
        console.log(res.data);
        const data = await res.data;
        return data;
    } catch (err) {
        err.response
            ? console.error(err.response.data)
            : console.error("Errore connessione");
    }
};

export const destroyApi = async (apiUrl, config) => {
    try {
        const res = await axios.delete(apiUrl, config);
        console.log(res.data);
        const data = await res.data;
        return data;
    } catch (err) {
        err.response
            ? console.error(err.response.data)
            : console.error("Errore connessione");
    }
};
