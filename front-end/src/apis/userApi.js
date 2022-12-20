import axios from "./axios";

const UserApi = {
    getUsers: () => {
        const url = "/user/getUsers";
        return axios.post(url);
    },
};

export default UserApi;
