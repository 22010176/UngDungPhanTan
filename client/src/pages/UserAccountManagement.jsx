import React, { useState } from 'react';
import { Layout, Card, Table, Button, Modal, Form, Input, Select, Space, Tag, Avatar, Popconfirm, message, Row, Col, Statistic, DatePicker, Upload } from 'antd';

const { Header, Content } = Layout;
const { Option } = Select;

// Font Awesome Icons (using Unicode)
const UserIcon = () => <span style={{ fontSize: '16px' }}>👤</span>;
const EditIcon = () => <span style={{ fontSize: '16px' }}>✏️</span>;
const DeleteIcon = () => <span style={{ fontSize: '16px' }}>🗑️</span>;
const PlusIcon = () => <span style={{ fontSize: '16px' }}>➕</span>;
const SearchIcon = () => <span style={{ fontSize: '16px' }}>🔍</span>;
const UsersIcon = () => <span style={{ fontSize: '24px' }}>👥</span>;
const ActiveIcon = () => <span style={{ fontSize: '24px' }}>✅</span>;
const InactiveIcon = () => <span style={{ fontSize: '24px' }}>❌</span>;
const AdminIcon = () => <span style={{ fontSize: '24px' }}>👑</span>;

const UserAccountManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn An',
      email: 'nguyenvanan@email.com',
      phone: '0901234567',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-15',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      email: 'tranthibibinh@email.com',
      phone: '0902345678',
      role: 'user',
      status: 'active',
      createdAt: '2024-02-20',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Lê Minh Cường',
      email: 'leminhcuong@email.com',
      phone: '0903456789',
      role: 'moderator',
      status: 'inactive',
      createdAt: '2024-03-10',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      name: 'Phạm Thị Dung',
      email: 'phamthidung@email.com',
      phone: '0904567890',
      role: 'user',
      status: 'active',
      createdAt: '2024-03-25',
      avatar: '/api/placeholder/40/40'
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();

  // Statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;
  const adminUsers = users.filter(user => user.role === 'admin').length;

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchRole = filterRole === 'all' || user.role === filterRole;
    const matchStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const showModal = (user = null) => {
    setEditingUser(user);
    setIsModalVisible(true);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingUser) {
        // Update user
        setUsers(prev => prev.map(user =>
          user.id === editingUser.id ? { ...user, ...values } : user
        ));
        message.success('Cập nhật người dùng thành công!');
      } else {
        // Add new user
        const newUser = {
          id: Date.now(),
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
          avatar: '/api/placeholder/40/40'
        };
        setUsers(prev => [...prev, newUser]);
        message.success('Thêm người dùng thành công!');
      }
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
    } catch {
      message.error('Có lỗi xảy ra!');
    }
  };

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    message.success('Xóa người dùng thành công!');
  };

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(user =>
      user.id === id
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    message.success('Cập nhật trạng thái thành công!');
  };

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar, record) => (
        <Avatar src={avatar} size={40}>
          {record.name.charAt(0)}
        </Avatar>
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        const colors = {
          admin: 'red',
          moderator: 'orange',
          user: 'blue'
        };
        const labels = {
          admin: 'Quản trị viên',
          moderator: 'Điều hành viên',
          user: 'Người dùng'
        };
        return <Tag color={colors[role]}>{labels[role]}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Tag
          color={status === 'active' ? 'green' : 'red'}
          style={{ cursor: 'pointer' }}
          onClick={() => toggleStatus(record.id)}
        >
          {status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditIcon />}
            onClick={() => showModal(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              danger
              size="small"
              icon={<DeleteIcon />}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between h-full">
          <h1 className="text-xl font-semibold text-gray-800 m-0">
            <UserIcon /> Quản lý Tài khoản Người dùng
          </h1>
        </div>
      </Header>

      <Content className="p-6">
        {/* Statistics Cards */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số người dùng"
                value={totalUsers}
                prefix={<UsersIcon />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Đang hoạt động"
                value={activeUsers}
                prefix={<ActiveIcon />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Không hoạt động"
                value={inactiveUsers}
                prefix={<InactiveIcon />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Quản trị viên"
                value={adminUsers}
                prefix={<AdminIcon />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Content Card */}
        <Card>
          {/* Filters and Actions */}
          <div className="mb-4">
            <Row gutter={16} align="middle">
              <Col span={8}>
                <Input
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  prefix={<SearchIcon />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Col>
              <Col span={4}>
                <Select
                  placeholder="Lọc theo vai trò"
                  value={filterRole}
                  onChange={setFilterRole}
                  className="w-full"
                >
                  <Option value="all">Tất cả vai trò</Option>
                  <Option value="admin">Quản trị viên</Option>
                  <Option value="moderator">Điều hành viên</Option>
                  <Option value="user">Người dùng</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Select
                  placeholder="Lọc theo trạng thái"
                  value={filterStatus}
                  onChange={setFilterStatus}
                  className="w-full"
                >
                  <Option value="all">Tất cả trạng thái</Option>
                  <Option value="active">Hoạt động</Option>
                  <Option value="inactive">Không hoạt động</Option>
                </Select>
              </Col>
              <Col span={8} className="text-right">
                <Button
                  type="primary"
                  icon={<PlusIcon />}
                  onClick={() => showModal()}
                  size="middle"
                >
                  Thêm người dùng mới
                </Button>
              </Col>
            </Row>
          </div>

          {/* Users Table */}
          <Table
            columns={columns}
            dataSource={filteredUsers}
            rowKey="id"
            pagination={{
              total: filteredUsers.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} người dùng`,
            }}
            scroll={{ x: 1000 }}
          />
        </Card>

        {/* Add/Edit User Modal */}
        <Modal
          title={editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mt-4"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Họ tên"
                  rules={[
                    { required: true, message: 'Vui lòng nhập họ tên!' },
                    { min: 2, message: 'Họ tên phải có ít nhất 2 ký tự!' }
                  ]}
                >
                  <Input placeholder="Nhập họ tên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' }
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                  ]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Vai trò"
                  rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                >
                  <Select placeholder="Chọn vai trò">
                    <Option value="admin">Quản trị viên</Option>
                    <Option value="moderator">Điều hành viên</Option>
                    <Option value="user">Người dùng</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="active">Hoạt động</Option>
                <Option value="inactive">Không hoạt động</Option>
              </Select>
            </Form.Item>

            <Form.Item className="mb-0 text-right">
              <Space>
                <Button onClick={handleCancel}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                  {editingUser ? 'Cập nhật' : 'Thêm mới'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default UserAccountManagement;