import { Button, Col, Flex, Layout, message, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router";
import { SyncOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSendMessageMutation } from "../TanstackApiService/Message";

const { Title } = Typography;
const { Content } = Layout;

const layoutStyle = {
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
};

function SendMessagePage() {
  const { username } = useParams();
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: sendMessage, isPending } = useSendMessageMutation();

  const fetchQuestions = async () => {
    const res: any = await axios.get("https://opentdb.com/api.php?amount=3");
    if (res) setQuestions(res.data.results);
    messageApi.open({
      type: "success",
      content: "Questions Fetch Successfully",
      duration: 3,
    });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const sendMessageToUser = async () => {
    if (content.trim() === "") {
      messageApi.open({
        type: "error",
        content: "Content is required",
        duration: 3,
      });
      return;
    }

    if (!username) {
      messageApi.open({
        type: "error",
        content: "Invalid Username",
        duration: 3,
      });
      return;
    }

    sendMessage(
      { username, content },
      {
        onSuccess: (res: any) => {
          console.log(res);
          messageApi.open({
            type: "success",
            content: res?.data.message || "Message send Successfully",
            duration: 3,
          });

          console.log(res);
          setContent("");
        },
        onError: (err: any) => {
          messageApi.open({
            type: "error",
            content: err?.response?.data.message || "Something went wrong",
            duration: 3,
          });
        },
      }
    );
  };

  return (
    <>
      {contextHolder}
      <Layout style={layoutStyle}>
        <Content style={{ padding: "2%", width: "auto" }}>
          <Flex justify="center" align="center">
            <Title level={2}>Share Your Thoughts to {username}</Title>
          </Flex>
          <div>
            <Row>
              <Col offset={6} span={22} style={{ marginBottom: "4px" }}>
                Content:
              </Col>
              <Col offset={6} span={22}>
                <TextArea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ width: "60%", resize: "none" }}
                  rows={4}
                />
              </Col>
              <Col style={{ marginTop: "10px" }} offset={6} span={22}>
                <Button
                  color="primary"
                  variant="solid"
                  onClick={sendMessageToUser}
                >
                  Send
                </Button>
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: "2%" }} offset={6} span={22}>
                <Button
                  color="primary"
                  variant="solid"
                  onClick={() => fetchQuestions()}
                >
                  <SyncOutlined /> {"  "} Suggest Messages
                </Button>
              </Col>
              {Array.isArray(questions) &&
                questions.map((qus: any, index: number) => (
                  <Col
                    key={index}
                    style={{ marginTop: "2%" }}
                    offset={6}
                    span={12}
                  >
                    <Button
                      type="dashed"
                      style={{ width: "auto" }}
                      block
                      onClick={() => {
                        setContent(qus.question);
                      }}
                    >
                      {qus.question}
                    </Button>
                  </Col>
                ))}
            </Row>
            <Row>
              <Col style={{ marginTop: "5%" }} offset={11} span={22}>
                <Button
                  color="primary"
                  variant="solid"
                  onClick={() => {
                    navigate("/signup");
                  }}
                  disabled={isPending}
                >
                  Get Your Own Dashboard{" "}
                </Button>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default SendMessagePage;
