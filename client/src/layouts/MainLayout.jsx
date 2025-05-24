import { Input, Layout } from 'antd';
import { Link, Outlet } from 'react-router';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function MainLayout() {
  return (
    <Layout className="h-screen bg-gray-50">
      <Header className="shadow-sm border-b flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">File Manager</h1>
        <nav className="text-white flex space-x-6">
          <Link to="/file-manager" style={{ color: "#ffffff" }}>Storage</Link>
          <Link to="/account-management" style={{ color: "#ffffff" }}>Account</Link>
        </nav>
      </Header>
      <Outlet />
    </Layout>
  );
}

export default MainLayout;