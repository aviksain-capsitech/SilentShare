import { Form, Input, Button, Typography, Card, message } from 'antd';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { LoginApi } from '../Apis/user';

const { Title } = Typography;

const Login = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setLoading(true);

    messageApi.open({
      type: "loading",
      content: "Do not Refresh the page",
      duration: 3
    });

    setTimeout(async () => {
      console.log('Received values of form: ', values);

      const res: any = await LoginApi(values);
      console.log(res);

      if (res) {
        form.resetFields();
        messageApi.open({
          type: 'success',
          content: res.message,
          duration: 3,
        });

        setTimeout(() => {
          navigate("/dashboard");
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
          <Title level={3} style={{ textAlign: 'center' }}>Login</Title>
          <Form
            form={form}
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
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
                {loading ? "Loading" : "Login"}
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              Don't have an account ? <NavLink style={loading ? { cursor: "not-allowed" } : { cursor: "pointer" }} to="/signup" onClick={(e) => {
                if (loading) {
                  e.preventDefault(); // Stop navigation
                }
              }}>Sign Up</NavLink>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>

  );
};

export default Login;
