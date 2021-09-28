import axios from "axios";
import env from 'react-dotenv';

const ghApi = axios.create({
	baseURL: 'https://api.github.com/',
})

ghApi.interceptors.request.use(async config => {
	if (env.REACT_APP_GHTOKEN) ghApi.defaults.headers.authorization = `Bearer ${env.REACT_APP_GHTOKEN}`;

  return config;
});

export default ghApi;