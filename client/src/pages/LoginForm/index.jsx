import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { Login } from '@/api/authApi';
import withContext from '@/hoc/withContext';
import withNoAuth from '@/hoc/withNoAuth';

import { Context, initialValues, reducer } from './context';

const Page = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    console.log(values)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = await Login({ mail: values.mail, password: values.password })
      console.log(result)
      localStorage.setItem("token", result.token)
      message.success('Đăng nhập thành công!');

      setTimeout(function () {
        navigate("/file-manager")
      }, 2000)

    } catch (error) {
      message.error('Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserOutlined className="text-2xl text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Đăng nhập</h1>
          <p className="text-gray-500 mt-2">Chào mừng bạn quay trở lại</p>
        </div>

        <Form name="login" onFinish={onFinish} layout="vertical" size="large" initialValues={{ remember: true }}>
          <Form.Item name="mail" label="Email" rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            // { type: 'email', message: 'Email không hợp lệ!' }
          ]}>
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Nhập email của bạn" className="h-12" />
          </Form.Item>

          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập mật khẩu"
              className="h-12"
            />
          </Form.Item>

          <Form.Item>
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-lg font-medium text-base" type="primary" htmlType="submit" loading={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <span className="text-gray-600">Chưa có tài khoản? </span>
          <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Đăng ký ngay
          </Link>
        </div>
      </Card>
    </div>
  );
};

const LoginForm = withNoAuth(withContext(Page, Context, initialValues, reducer))
export default LoginForm;