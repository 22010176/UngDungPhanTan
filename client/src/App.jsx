import { BrowserRouter, Route, Routes } from 'react-router';
axios.get('http://localhost:3000/api')

import MainLayout from "./layouts/MainLayout";
import Component from "./pages/AccountManagement";
import ChangePasswordForm from "./pages/ChangePasswordForm";
import FileManager from "./pages/FileManager";
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import axios from 'axios';


function App() {
  console.log(import.meta.env)
  return (
    // <></>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="file-manager/*" element={<FileManager />} />
          <Route path="account-management" element={<Component />} />
        </Route>
        <Route path="change-password" element={<ChangePasswordForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
