import React, { useState } from 'react';
import { Layout, Card, Form, Input, Button, Select, Upload, Avatar, message, Row, Col, Divider, Modal, Tabs, DatePicker, Switch } from 'antd';
import dayjs from 'dayjs';

const { Header, Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

// Icons using emoji
const UserIcon = () => <span style={{ fontSize: '16px' }}>👤</span>;
const EditIcon = () => <span style={{ fontSize: '16px' }}>✏️</span>;
const SaveIcon = () => <span style={{ fontSize: '16px' }}>💾</span>;
const CameraIcon = () => <span style={{ fontSize: '16px' }}>📷</span>;
const LockIcon = () => <span style={{ fontSize: '16px' }}>🔒</span>;
const SettingsIcon = () => <span style={{ fontSize: '16px' }}>⚙️</span>;
const EmailIcon = () => <span style={{ fontSize: '16px' }}>📧</span>;
const PhoneIcon = () => <span style={{ fontSize: '16px' }}>📱</span>;
const CalendarIcon = () => <span style={{ fontSize: '16px' }}>📅</span>;

const PersonalAccountManagement = () => {
  // Thông tin người dùng hiện tại
  const [userInfo, setUserInfo] = useState({
    id: 1,
    firstName: 'Nguyễn',
    lastName: 'Văn An',
    email: 'nguyenvanan@email.com',
    phone: '0901234567',
    gender: 'male',
    dateOfBirth: '1990-05-15',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    bio: 'Tôi là một lập trình viên với 5 năm kinh nghiệm trong phát triển web.',
    avatar: '/api/placeholder/120/120',
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);

  // Load form data when editing
  React.useEffect(() => {
    if (isEditing) {
      form.setFieldsValue({
        ...userInfo,
        dateOfBirth: userInfo.dateOfBirth ? dayjs(userInfo.dateOfBirth) : null
      });
    }
  }, [isEditing, userInfo, form]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Cancel editing - reset form
      form.resetFields();
    }
  };

  const handleSave = async (values) => {
    try {
      const updatedInfo = {
        ...userInfo,
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : userInfo.dateOfBirth
      };
      setUserInfo(updatedInfo);
      setIsEditing(false);
      message.success('Cập nhật thông tin thành công!');
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật thông tin!');
    }
  };

  const handleChangePassword = async (values) => {
    try {
      // Simulate password change
      message.success('Đổi mật khẩu thành công!');
      setIsChangePasswordVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra khi đổi mật khẩu!');
    }
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // Simulate avatar upload
      setUserInfo(prev => ({
        ...prev,
        avatar: '/api/placeholder/120/120'
      }));
      message.success('Cập nhật ảnh đại diện thành công!');
    }
  };

  const handleSettingsChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
    message.success('Cập nhật cài đặt thành công!');
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between h-full">
          <h1 className="text-xl font-semibold text-gray-800 m-0">
            <UserIcon /> Thông tin cá nhân
          </h1>
          <Button
            type={isEditing ? "default" : "primary"}
            icon={isEditing ? null : <EditIcon />}
            onClick={handleEditToggle}>
            {isEditing ? 'Hủy' : 'Chỉnh sửa'}
          </Button>
        </div>
      </Header>

      <Content className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            {/* Tab Thông tin cơ bản */}
            <TabPane tab={<span><UserIcon /> Thông tin cơ bản</span>} key="1">
              <Card>
                <Row gutter={24}>
                  {/* Avatar Section */}
                  <Col span={8} className="text-center">
                    <div className="mb-4">
                      <Avatar
                        size={120}
                        src={userInfo.avatar}
                        className="mb-4">
                        {userInfo.firstName.charAt(0)}
                      </Avatar>
                      {isEditing && (
                        <Upload
                          showUploadList={false}
                          onChange={handleAvatarChange}
                          beforeUpload={() => false}>
                          <Button icon={<CameraIcon />} size="small">
                            Đổi ảnh
                          </Button>
                        </Upload>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold mb-2">
                      {userInfo.firstName} {userInfo.lastName}
                    </h2>
                    <p className="text-gray-600">{userInfo.email}</p>
                  </Col>

                  {/* Form Section */}
                  <Col span={16}>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleSave}
                      disabled={!isEditing}>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="firstName"
                            label="Họ"
                            rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}>
                            <Input placeholder="Nhập họ" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="lastName"
                            label="Tên"
                            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                            <Input placeholder="Nhập tên" />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                              { required: true, message: 'Vui lòng nhập email!' },
                              { type: 'email', message: 'Email không hợp lệ!' }
                            ]}
                          >
                            <Input
                              prefix={<EmailIcon />}
                              placeholder="Nhập email"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="phone"
                            label="Số điện thoại"
                            rules={[
                              { required: true, message: 'Vui lòng nhập số điện thoại!' },
                              { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                            ]}
                          >
                            <Input
                              prefix={<PhoneIcon />}
                              placeholder="Nhập số điện thoại"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="gender"
                            label="Giới tính"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                          >
                            <Select placeholder="Chọn giới tính">
                              <Option value="male">Nam</Option>
                              <Option value="female">Nữ</Option>
                              <Option value="other">Khác</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="dateOfBirth"
                            label="Ngày sinh"
                          >
                            <DatePicker
                              placeholder="Chọn ngày sinh"
                              format="DD/MM/YYYY"
                              className="w-full"
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item
                        name="address"
                        label="Địa chỉ"
                      >
                        <Input placeholder="Nhập địa chỉ" />
                      </Form.Item>

                      <Form.Item
                        name="bio"
                        label="Giới thiệu bản thân"
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder="Viết vài dòng giới thiệu về bản thân..."
                          showCount
                          maxLength={500}
                        />
                      </Form.Item>

                      {isEditing && (
                        <Form.Item className="text-right mb-0">
                          <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveIcon />}
                            size="large"
                          >
                            Lưu thay đổi
                          </Button>
                        </Form.Item>
                      )}
                    </Form>
                  </Col>
                </Row>
              </Card>
            </TabPane>

            {/* Tab Bảo mật */}
            <TabPane tab={<span><LockIcon /> Bảo mật</span>} key="2">
              <Card title="Cài đặt bảo mật">
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Mật khẩu</h3>
                      <p className="text-gray-600 text-sm">
                        Thay đổi mật khẩu để bảo vệ tài khoản
                      </p>
                    </div>
                    <Button
                      onClick={() => setIsChangePasswordVisible(true)}
                      icon={<LockIcon />}
                    >
                      Đổi mật khẩu
                    </Button>
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Xác thực hai yếu tố</h3>
                      <p className="text-gray-600 text-sm">
                        Tăng cường bảo mật với xác thực hai yếu tố
                      </p>
                    </div>
                    <Switch
                      checked={userInfo.twoFactorAuth}
                      onChange={(checked) => handleSettingsChange('twoFactorAuth', checked)}
                    />
                  </div>
                </div>
              </Card>
            </TabPane>

            {/* Tab Thông báo */}
            <TabPane tab={<span><SettingsIcon /> Cài đặt</span>} key="3">
              <Card title="Cài đặt thông báo">
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Thông báo qua Email</h3>
                      <p className="text-gray-600 text-sm">
                        Nhận thông báo quan trọng qua email
                      </p>
                    </div>
                    <Switch
                      checked={userInfo.emailNotifications}
                      onChange={(checked) => handleSettingsChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Thông báo qua SMS</h3>
                      <p className="text-gray-600 text-sm">
                        Nhận thông báo khẩn cấp qua tin nhắn
                      </p>
                    </div>
                    <Switch
                      checked={userInfo.smsNotifications}
                      onChange={(checked) => handleSettingsChange('smsNotifications', checked)}
                    />
                  </div>
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </div>

        {/* Modal đổi mật khẩu */}
        <Modal
          title={<span><LockIcon /> Đổi mật khẩu</span>}
          open={isChangePasswordVisible}
          onCancel={() => {
            setIsChangePasswordVisible(false);
            passwordForm.resetFields();
          }}
          footer={null}
        >
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handleChangePassword}
            className="mt-4"
          >
            <Form.Item
              name="currentPassword"
              label="Mật khẩu hiện tại"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
            >
              <Input.Password placeholder="Nhập mật khẩu hiện tại" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu mới"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu mới" />
            </Form.Item>

            <Form.Item className="mb-0 text-right">
              <Button
                onClick={() => {
                  setIsChangePasswordVisible(false);
                  passwordForm.resetFields();
                }}
                className="mr-2"
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default PersonalAccountManagement;