import { AxiosRequestConfig } from "axios";
// axios.post();
export default {
  post: (url: string, data?: any, config?: AxiosRequestConfig) => {
    return Promise.resolve({ data: "mocked response" });
  },
};
