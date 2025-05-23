import axios from "axios";

const storageService = 'http://localhost:5001/Storage'

export async function GetFileList(path = "") {
  const token = localStorage.getItem('token')
  const res = await axios.get([storageService, path].join('/'), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export async function UploadFile(file, path = ".") {
  const data = new FormData();
  data.append('file', file);
  data.append('path', path || ".");
  console.log(Object.fromEntries(data))

  const token = localStorage.getItem('token')
  const res = await axios.post(storageService, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return res.data
}

export async function DeleteFile(path) {
  const data = new FormData();
  data.append('path', 'path')

  const token = localStorage.getItem('token')
  const res = await axios.delete(storageService, {
    params: { path },
    headers: { Authorization: `Bearer ${token}`, }
  })
  return res.data
}