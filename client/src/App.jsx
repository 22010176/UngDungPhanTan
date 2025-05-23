import axios from "axios"
import UserAccountManagement from "./pages/UserAccountManagement";
import PersonalAccountManagement from "./pages/PersonalAccountManagement";
import FileManager from "./pages/FileManager";

function App() {
  axios.get('http://localhost:3000/api')
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  return (
    <FileManager />
  )
}

export default App
