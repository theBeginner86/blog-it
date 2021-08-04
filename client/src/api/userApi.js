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
