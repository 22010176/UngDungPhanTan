import React, { useState } from 'react';
import { Form, Input, Button, Card, Checkbox, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { Link } from 'react-router';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      message.success('Đăng ký thành công!');
      console.log('Register values:', values);
      form.resetFields();
    } catch (error) {
      message.error('Đăng ký thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    message.info(`Đăng ký bằng ${provider}...`);
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Vui lòng nhập mật khẩu!'));
    }
    if (value.length < 6) {
      return Promise.reject(new Error('Mật khẩu phải có ít nhất 6 ký tự!'));
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Vui lòng xác nhận mật khẩu!'));
    }
    if (value !== form.getFieldValue('password')) {
      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
    }
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserOutlined className="text-2xl text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Đăng ký tài khoản</h1>
          <p className="text-gray-500 mt-2">Tạo tài khoản mới để bắt đầu</p>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="firstName"
              label="Họ"
              rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Nhập họ"
                className="h-11"
              />
            </Form.Item>

            <Form.Item
              name="lastName"
              label="Tên"
              rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Nhập tên"
                className="h-11"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Nhập email của bạn"
              className="h-11"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ validator: validatePassword }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
              className="h-11"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            rules={[{ validator: validateConfirmPassword }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập lại mật khẩu"
              className="h-11"
            />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              { validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Vui lòng đồng ý với điều khoản!')) }
            ]}
          >
            <Checkbox>
              Tôi đồng ý với{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Điều khoản sử dụng
              </a>{' '}
              và{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Chính sách bảo mật
              </a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full h-12 bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 rounded-lg font-medium text-base">
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <span className="text-gray-600">Đã có tài khoản? </span>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Đăng nhập ngay
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;