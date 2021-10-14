/* eslint-disable @typescript-eslint/no-empty-function */
import axios from "axios";
axios.defaults.withCredentials = true;

class Api {
  constructor() {}
  private base = "http://localhost:3000";

  get(path: string, params: any = {}) {
    return axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "get",
      url: `${this.base}${path}`,
      params,
    });
  }
  put(path: string, data: any) {
    return axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "put",
      url: `${this.base}${path}`,
      data,
    });
  }
  patch(path: string, data: any) {
    return axios({
      method: "PATCH",
      url: `${this.base}${path}`,
      data,
    });
  }

  post(path: string, data: any) {
    return axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      url: `${this.base}${path}`,
      data,
    });
  }

  delete(path: string, data: any) {
    return axios({
      headers: {
        "Content-Type": "application/json",
      },
      method: "delete",
      url: `${this.base}${path}`,
      data,
    });
  }
}
export const api = new Api();
