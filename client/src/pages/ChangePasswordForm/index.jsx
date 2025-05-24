import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Space } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import withContext from '@/hoc/withContext';
import { Context, initialValues, reducer } from './context';

const Page = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    // Giả lập API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      message.success('Đổi mật khẩu thành công!');
      form.resetFields();
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Vui lòng nhập mật khẩu mới!'));
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
    if (value !== form.getFieldValue('newPassword')) {
      return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
    }
    return Promise.resolve();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md shadow-lg"
        title={
          <div className="text-center py-3">
            <LockOutlined className="text-2xl text-blue-600 mb-2" />
            <h2 className="text-xl font-semibold text-gray-800">Đổi mật khẩu</h2>
          </div>
        }>
        <Form form={form} name="changePassword" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }
            ]}>
            <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Nhập mật khẩu hiện tại" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>

          <Form.Item name="newPassword" label="Mật khẩu mới" rules={[{ validator: validatePassword }]}>
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item name="confirmPassword" label="Xác nhận mật khẩu mới" rules={[{ validator: validateConfirmPassword }]}>
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Nhập lại mật khẩu mới"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item className="mb-4">
            <Space direction="vertical" className="w-full" size="middle">
              <Button
                type="primary" htmlType="submit" loading={loading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-lg font-medium">
                {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
              </Button>

              <Button type="default" className="w-full h-10 rounded-lg" onClick={() => navigate("/account-management")}>
                Hủy bỏ
              </Button>
            </Space>
          </Form.Item>
        </Form>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Lưu ý: Mật khẩu mới phải có ít nhất 6 ký tự</p>
        </div>
      </Card>
    </div>
  );
};

const ChangePasswordForm = withContext(Page, Context, initialValues, reducer);
export default ChangePasswordForm;