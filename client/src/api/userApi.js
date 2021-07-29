import axios from 'axios';

const userUrl = 'http://localhost:4000/account';

export const signupNewUser = (user) => axios.post(`${userUrl}/signup`, user);
export  const signinExistingUser = (user) => axios.post(`${userUrl}/signin`, user);