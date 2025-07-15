import { Form, Input, Button, Typography, Card } from "antd";
import { NavLink, useNavigate } from "react-router";
import type { SignUpType } from "../Types/User";
import { message } from "antd";
import { useSignUpMutation } from "../TanstackApiService/User";

const { Title } = Typography;

const SignUp = () => {
  const { mutate: signUp, isPending } = useSignUpMutation();

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const onFinish = async (values: SignUpType) => {
    messageApi.open({
      type: "loading",
      content: "Do not Refresh the page",
      duration: 3,
    });

    setTimeout(async () => {
      signUp(values, {
        onSuccess: (data) => {
          form.resetFields();

          messageApi.open({
            type: "success",
            content: data?.data?.message,
            duration: 3,
          });

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        },
        onError: (err: any) => {
          messageApi.open({
            type: "error",
            content: err?.response?.data.message,
            duration: 3,
          });
        },
      });
    }, 5000);
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: 350,
            padding: 24,
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            Sign Up
          </Title>
          <Form
            form={form}
            name="signup_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            disabled={isPending}
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {isPending ? "Loading" : "Sign Up"}
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              Already have an account ?{" "}
              <NavLink
                style={
                  isPending ? { cursor: "not-allowed" } : { cursor: "pointer" }
                }
                to="/login"
                onClick={(e) => {
                  if (isPending) {
                    e.preventDefault(); // Stop navigation
                  }
                }}
              >
                Login
              </NavLink>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
