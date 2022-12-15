import axios from "./axios";

const authApi = {
  signin: (user) => {
    const url = "/auth/signin";
    console.log(user);
    return axios.post(url, user);
  },
  signup: (user) => {
    const url = "/auth/signup";
    return axios.post(url, user);
  },
  isUserLoggedIn: () => {
    const url = "/auth/isUserLoggedIn";
    return axios.post(url);
  },
  sendOtpToEmail: (user) => {
    const url = "/auth/sendOtpToEmail";
    return axios.post(url, user);
  },
  verifyOtp: (user) => {
    const url = "/auth/verifyOtp";
    return axios.post(url, user);
  },
  updateUserInfo: (user) => {
    const url = "/user/updateUserInfo";
    return axios.post(url, user);
  },
  updateForgetPassword: (user) => {
    const url = "/auth/updateForgetPassword";
    return axios.post(url, user);
  }
};

export default authApi;
