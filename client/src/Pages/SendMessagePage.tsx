import { Button, Col, Flex, Layout, message, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router";
import { SyncOutlined } from "@ant-design/icons";
import { sendMessageApi } from "../Apis/message";
import { useState } from "react";

const { Title } = Typography;
const { Content } = Layout;

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh'
};

function SendMessagePage() {
  const { username } = useParams();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const sendMessageToUser = async () => {
    try {
      if (content.trim() === "") {
        messageApi.open({
          type: 'error',
          content: "Content is required",
          duration: 3,
        });
      }
      
      if (username === undefined) return;

      const res = await sendMessageApi({ username, content });

      if (res) {
        messageApi.open({
          type: 'success',
          content: res.message,
          duration: 3,
        });

        console.log(res);
        setContent("");
      }


    } catch (error) {
      console.log("Send Message to User :: " + error);
    }
  }

  return (
    <>
      {contextHolder}
      <Layout style={layoutStyle}>
        <Content style={{ backgroundColor: "#001529", color: "white", padding: "2%", width: "auto" }}>
          <Flex justify="center" align="center">
            <Title style={{ color: "white" }} level={2}>Share Your Thoughts to {username}</Title>
          </Flex>
          <div>

            <Row>

              <Col offset={6} span={22} style={{ marginBottom: "4px" }}>Content:</Col>
              <Col offset={6} span={22}>
                <TextArea value={content} onChange={(e) => setContent(e.target.value)} style={{ backgroundColor: "Transparent", color: "#FFF", width: "60%", resize: "none" }} rows={4} />
              </Col>
              <Col style={{ marginTop: "10px" }} offset={6} span={22}>
                <Button color="primary" variant="solid" onClick={sendMessageToUser}>Send</Button>
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: "2%" }} offset={6} span={22}>
                <Button color="primary" variant="solid">
                  <SyncOutlined /> {"  "} Suggest Messages
                </Button>
              </Col>
              <Col style={{ marginTop: "2%" }} offset={6} span={12}>
                <Button type="dashed" style={{ background: "transparent", color: "white" }} block>
                  Suggested Question 1
                </Button>
              </Col>
              <Col style={{ marginTop: "2%" }} offset={6} span={12}>
                <Button type="dashed" style={{ background: "transparent", color: "white" }} block>
                  Suggested Question 2
                </Button>
              </Col>
              <Col style={{ marginTop: "2%" }} offset={6} span={12}>
                <Button type="dashed" style={{ background: "transparent", color: "white" }} block>
                  Suggested Question 3
                </Button>
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: "5%" }} offset={11} span={22}>
                <Button color="primary" variant="solid" onClick={() => { navigate('/signup') }}>Get Your Own Dashboard </Button>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </>
  )
}

export default SendMessagePage