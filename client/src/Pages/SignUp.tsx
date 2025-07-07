import { Form, Input, Button, Checkbox, Typography, Card } from 'antd';
import { NavLink } from 'react-router';

const { Title } = Typography;

const Login = () => {

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    form.resetFields();
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#DCDEDD',
    }}>
      <Card style={{ width: 350, padding: 24 }}>
        <Title level={3} style={{ textAlign: 'center' }}>Sign Up</Title>
        <Form
          form={form}
          name="signup_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              placeholder="Full Name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="remember">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            Already have an account ? <NavLink to="/login">Login</NavLink>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
            <a href="/forgot-password">Forgot password?</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
