import axios from "axios";

let api_base_url = "/api/";

const ApiExecute = async (url, method = "GET", params = {}) => {
    let headers = {
        Accept: "application/json",
    };

    if (params?.data) {
        headers["Content-Type"] = "multipart/form-data"
    }
    if (!params?.nosecure){
        let token = sessionStorage.getItem("_token");
        headers["Authorization"]=`Bearer ${token}`
    }

    let instance = axios.create({
        baseURL: api_base_url,
        timeout: 5*1000, // 1 second,
        headers,
    });

    let req_params = {
        url,
        method,
    };

    if (params?.data) {
        req_params.data = params.data;
    }
    try {
        const res = await instance.request(req_params);
        return {
            status: true,
            data: res?.data
        }
    } catch (err) {
        console.log('Error:', err);
        return {
            status: false,
            error: err?.response?.data
        }
    }
};

export default ApiExecute;
