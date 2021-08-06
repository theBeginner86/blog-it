import axios from 'axios';

const userUrl = 'http://localhost:4000/account';
const blogUrl = 'http://localhost:4000/blog';

export const signupNewUser = (user) => axios.post(`${userUrl}/signup`, user);
export  const signinExistingUser = (user) => axios.post(`${userUrl}/signin`, user);

export const getUserDetails = (token) => axios({
    method: "GET",
    url: `${userUrl}/verify/user`,
    headers: {
        Authorization: `BEARER ${token}`,
    },
});

export const getAllBlogs = () => axios({
    method: "GET",
    url: `${blogUrl}/display/all`
});

export const getUserBlogs = (userid, token) => axios({
    method: "GET",
    url: `${blogUrl}/display/user=${userid}`,
    headers: {
        Authorization: `BEARER ${token}`,
    },
});

export const composeBlog = (blogDetails, token) => axios.post(`${blogUrl}/compose`, blogDetails, 
    {
        headers: {
            Authorization: `BEARER ${token}`,
        }
    }
);

