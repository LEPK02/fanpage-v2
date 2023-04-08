/*
Use Axios to intercept requests and response
- Handle 401 Unauthorized on interceptor response
- _retry flag prevents infinite loop if request fails and sends 401 again
*/
import axiosInstance from "./api";
import TokenService from "./token.service";
import { refreshToken } from "../slices/auth";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["x-access-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/signin" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post("/auth/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;

            refreshToken(accessToken);
            TokenService.updateLocalAccessToken(accessToken);

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;