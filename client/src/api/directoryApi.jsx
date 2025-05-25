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