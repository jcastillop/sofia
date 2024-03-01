import axios from 'axios';
import { getSession } from 'next-auth/react';

const spaxionApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL_RESTSERVER}/api`
});

spaxionApi.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session?.user.token) {
            config.headers['x-token'] = session?.user.token;
            config.headers['empresa'] = session?.user.empresa?._id;
            config.headers['aplicacion'] = session?.user.aplicacion?._id;
        }
        return config;
    },
    (error) => {
      // Handle request errors her
      console.log("error")
      console.log(error)
  
      return Promise.reject(error);
    }
);

// Response interceptor
spaxionApi.interceptors.response.use(
    (response) => {
        // Modify the response data here
        console.log("response", response)
        return response;
    },
    (error) => {
        // Handle response errors here
        console.log("response error", error)
        console.log(JSON.stringify(error))
        return Promise.reject(error);
    }
);


export default spaxionApi;


