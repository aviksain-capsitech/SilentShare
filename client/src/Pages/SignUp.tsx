import { Form, Input, Button, Typography, Card } from 'antd';
import { NavLink, useNavigate } from 'react-router';
import { SignUpApi } from '../Apis/user';
import type { SignUpType } from '../Types/User';
import { message } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

const SignUp = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const onFinish = async (values: SignUpType) => {
    setLoading(true);

    messageApi.open({
      type: "warning",
      content: "Do not Refresh the page",
      duration: 3
    });

    setTimeout(async () => {
      console.log('Received values of form: ', values);

      const res: any = await SignUpApi(values);
      console.log(res);

      if (res) {
        form.resetFields();
        messageApi.open({
          type: 'success',
          content: res.message,
          duration: 5,
        });

        setTimeout(() => {
          navigate("/login");
          form.resetFields();
        }, 5000);
      }

      setLoading(false);
    }, 5000);
  };

  return (

    <>
      {contextHolder}
      <div style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Card style={{ width: 350, padding: 24, backgroundColor: "transparent", border: "none" }}>
          <Title level={3} style={{ textAlign: 'center' }}>Sign Up</Title>
          <Form
            form={form}
            name="signup_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input
                placeholder="Username"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input
                placeholder="Email"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                placeholder="Password"
                disabled={loading}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                {loading ? "Loading" : "Sign Up"}
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              Already have an account ? <NavLink style={loading ? { cursor: "not-allowed" } : { cursor: "pointer" }} to="/login" onClick={(e) => {
                if (loading) {
                  e.preventDefault(); // Stop navigation
                }
              }}>Login</NavLink>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>


  );
};

export default SignUp;
