import axios from "axios";

// export const authAPI = axios.create({
//     baseURL: 'http://auth-service:4000',
//     timeout: 5000
// });

// export const userAPI = axios.create({
//     baseURL: 'http://user-service:5000',
//     timeout: 5000
// });

// Client-Side Example for Auth API
export const authAPI = axios.create({
    baseURL: 'http://auth-service/80',  // API Gateway routes to Auth Service
  });
  
  // Client-Side Example for User API
  export const userAPI = axios.create({
    baseURL: 'http://user-service/80',  // API Gateway routes to User Service
  });
  