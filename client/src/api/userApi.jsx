import axios from "axios";

const accountService = import.meta.env.VITE_USER_SERVICE_URL;

export async function GetUser() {
  const res = await axios.get(accountService);
  return res.data;
}
/*
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "matKhau": "string",
  "password": "string"
}

*/
export async function CreateUser({ firstName, lastName, email, password }) {
  const res = await axios.post(accountService, { firstName, lastName, email, password });
  return res.data;
}

export async function UpdateUser({ firstName, lastName, email, matKhau }) {
  const res = await axios.put(accountService, { firstName, lastName, email, matKhau });
  return res.data;
}

export async function DeleteUser() {
  const res = await axios.delete(accountService);
  return res.data;
}


