import Vue from "vue";
import axios from "axios";

Vue.prototype.$CancelToken = () => axios.CancelToken;

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem("token"))
      config.headers["Authorization"] =
        "Bearer " + sessionStorage.getItem("token");
    return config;
  },

  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    console.log(error);
    console.log(error.code);
    console.log(error.request);
    console.log(error.response);
    console.log(error.errorMessage);
    try {
      if (error.response && error.response.status === 401)
        router.push("/logout");
      else if (error.response && error.response.status === 404)
        return Promise.reject({
          errorMessage: "can't find the resource you are searching for!",
        });
      else if (error.code === "ECONNABORTED")
        return Promise.reject({
          errorMessage: "Your connection is weak! try again",
        });
      else if (axios.isCancel(error)) return;
      else
        return Promise.reject({
          errorMessage: error.response.data.message || error,
        });
    } catch {
      return Promise.reject({
        errorMessage: "something is wrong! try refreshing this page",
      });
    }
  }
);

export default axiosInstance;
