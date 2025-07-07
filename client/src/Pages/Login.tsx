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
      background: '#101828',
    }}>
      <Card style={{ width: 350, padding: 24, backgroundColor: "transparent", color: 'white', border: "none" }}>
        <Title level={3} style={{ color: 'white', textAlign: 'center' }}>Login</Title>
        <Form
          form={form}
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label={<span style={{ color: 'white' }}>Email</span>}
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input
              style={{
                color: 'white',
                backgroundColor: "#1C2433",
                border: "none"
              }}
              placeholder="Email"
            />
          </Form.Item>


          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
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
              Log in
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            Don't have an account ? <NavLink to="/signup">Sign Up</NavLink>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
            <NavLink to="/forgot-password">Forgot password?</NavLink>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
