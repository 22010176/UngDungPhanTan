import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Input, Layout, Row, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import withContext from '@/hoc/withContext';
import { Context, initialValues, reducer } from './context';
import withAuth from '@/hoc/withAuth';

const { Header, Content } = Layout;

function Page() {
  const [userInfo,] = useState({
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    phone: '+84 123 456 789',
    address: 'Ha Noi, Viet Nam',
    avatar: null
  });

  const navigate = useNavigate()
  const [editing,] = useState(false);
  const [formData, setFormData] = useState(userInfo);
  const totalStorage = 100; // GB
  const usedStorage = 68.5; // GB

  return (
    <Content className="p-6 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-5">
        {/* Profile Card */}
        <Card title={<Space><UserOutlined />Personal Information</Space>}>
          <Row gutter={24}>
            <Col span={6}>
              <div className="text-center">
                <Avatar size={120} src={userInfo.avatar} icon={<UserOutlined />} />
              </div>
            </Col>

            <Col span={18}>
              <div className="space-y-4">
                <Row gutter={16}>
                  <Col span={12}>
                    <label className="block text-sm font-medium mb-2">Fullname</label>
                    {/* <Space.Compact> */}
                    <Input
                      placeholder='firstname'
                      value={editing ? formData.name : userInfo.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!editing}
                    />
                    {/* </Space.Compact> */}
                  </Col>
                  <Col span={12}>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      value={editing ? formData.email : userInfo.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!editing} />
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <label className="block text-sm font-medium mb-2">Create at</label>
                    <p>{new Date().toLocaleDateString()}</p>
                  </Col>
                  <Col span={12}>
                    <label className="block text-sm font-medium mb-2">Quota</label>
                    <p className="text-sm">{usedStorage} GB / {totalStorage} GB</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Danger Zone */}
        <Card title="Danger Area" className="border-red-200">
          <Space>
            <Button danger onClick={() => {
              localStorage.clear()
              navigate('/')
            }}>Logout</Button>
            <Button danger>Delete account</Button>
          </Space>
          <p className="text-sm text-gray-500 mt-2">
            Hành động này không thể hoàn tác
          </p>
        </Card>
      </div>
    </Content>
  );
}

const AccountManagement = withAuth(withContext(Page, Context, initialValues, reducer))
export default AccountManagement;