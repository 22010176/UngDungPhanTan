import axios from "axios";

const authService = import.meta.env.VITE_AUTH_SERVICE_URL;
// const authService = 'http://localhost:5000/auth';

export function InvalidTokenAction() {
  localStorage.clear();
  window.location.href = '/';
}

export async function Login({ mail, password }) {
  const res = await axios.post(authService + `/login?mail=${mail}&password=${password}`);
  return res.data;
}

export async function ValidateToken() {
  return await axios.get(authService + `/validate`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.data);
}


