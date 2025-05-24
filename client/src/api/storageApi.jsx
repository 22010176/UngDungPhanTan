import axios from "axios";

const storageService = 'http://localhost:5001/Storage'

export async function GetFileList() {
  const token = localStorage.getItem('token')
  const res = await axios.get(storageService, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

