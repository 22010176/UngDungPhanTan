import axios from "axios"

const directoryService = 'http://localhost:5001/Directory'

export async function CreateFolder(path = "") {
  if (path == '') return
  const token = localStorage.getItem('token')
  const res = await axios.post(directoryService, { path }, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  return res.data
}

export async function DeleteFolder(path = "") {
  if (path == '') return

  console.log(path)

  const token = localStorage.getItem('token')
  const res = await axios.delete(directoryService, {
    params: { path },
    headers: { Authorization: `Bearer ${token}`, }
  })

  return res.data
}