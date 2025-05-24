import { EditOutlined, SaveOutlined, SearchOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Flex, Input, Layout, Progress, Row, Space, Upload, message } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const { Header, Content } = Layout;

export default function AccountManagement() {
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false);
  const totalStorage = 100; // GB
  const usedStorage = 68.5; // GB
  const storagePercent = (usedStorage / totalStorage) * 100;

  const [userInfo, setUserInfo] = useState({
    name: 'Nguyen Van A',
    email: 'nguyenvana@example.com',
    phone: '+84 123 456 789',
    address: 'Ha Noi, Viet Nam',
    avatar: null
  });

  const [formData, setFormData] = useState(userInfo);

  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    twoFactor: true,
    language: 'vi'
  });

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      message.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    setUserInfo(formData);
    setEditing(false);
    message.success('Thông tin đã được cập nhật');
  };

  const handleCancel = () => {
    setFormData(userInfo);
    setEditing(false);
  };

  const handleUpload = () => {
    message.success('Avatar đã được cập nhật');
    return false;
  };

  return (
    <Content className="p-6 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-5">
        {/* Profile Card */}
        <Card title={<Space><UserOutlined />Personal Information</Space>}>
          <Row gutter={24}>
            <Col span={6}>
              <div className="text-center">
                <Avatar size={120} src={userInfo.avatar} icon={<UserOutlined />} />
                <div className="mt-3">
                  <Upload beforeUpload={handleUpload} showUploadList={false}>
                    <Button icon={<UploadOutlined />} size="small">
                      Change picture
                    </Button>
                  </Upload>
                </div>
              </div>
            </Col>

            <Col span={18}>
              <div className="space-y-4">
                <Row gutter={16}>
                  <Col span={12}>
                    <label className="block text-sm font-medium mb-2">Fullname</label>
                    <Space.Compact>
                      <Input
                        placeholder='firstname'
                        value={editing ? formData.name : userInfo.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!editing}
                      />
                      <Input
                        placeholder='lastname'
                        value={editing ? formData.name : userInfo.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={!editing}
                      />
                    </Space.Compact>
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

              <Space className="mt-6">
                {editing ? <>
                  <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
                    Lưu
                  </Button>
                  <Button onClick={handleCancel}>
                    Hủy
                  </Button>
                </> : <>
                  <Button color='orange' variant='solid' icon={<EditOutlined />} onClick={() => setEditing(true)}>
                    Edit profile
                  </Button>
                  <Button color='red' variant='outlined' onClick={() => navigate("/change-password")}>
                    Change password
                  </Button>
                </>}
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Danger Zone */}
        <Card title="Danger Area" className="border-red-200">
          <Space>
            <Button danger>Logout</Button>
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