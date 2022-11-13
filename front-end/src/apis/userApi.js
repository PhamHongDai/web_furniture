import axios from "./axios";

const UserApi = {
    getUsers: () => {
        const url = "/user/getUsers";
        return axios.post(url);
    },
    deleteUserById : (userId) => {
        const url = "/user/delete";
        return axios.post(url, userId);
    }
};

export default UserApi;
