import axios from "axios";
import { ElMessage } from "element-plus";
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (response) => response,
  function (error) {
    console.log(error.response);
    ElMessage.error(error.response.data.message);
    return Promise.reject(error);
  }
);
export { axios };
