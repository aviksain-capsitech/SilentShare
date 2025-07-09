import { Button, Card, Col, Layout, Pagination, Row, Switch, Flex, Typography } from "antd";
import { Footer, Header } from "../Components"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteMessageApi, getMessagesApi } from "../Apis/message";

const { Title } = Typography;
const { Content } = Layout;

const formatDate = (input: string) => {
  const date = new Date(input);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh'
};

function Dashboard() {

  const user = useSelector((state: any) => state.auth?.userData);
  const [messages, setMessages] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await getMessagesApi()
      setMessages(res.data);
    }

    fetchMessages();

  }, [messages, dispatch])

  return (
    <>
      <Layout style={layoutStyle}>
        <Header backgroundColor="#001529" />
        <Content style={{ backgroundColor: "#001529", color: "white", padding: "2%", width: "auto" }}>
          <div>
            <Row>
              <Col offset={2}>
                <Title style={{ color: "white" }} level={1}>Hi!!👋👋👋 {user?.username}</Title>
              </Col>
            </Row>
            <Row>
              <Col offset={2}>
                <Switch /> {"    "} Accepting Messages
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: "10px", color: "#FFF" }}>
            <Row>
              {Array.isArray(messages) && messages.map((msg: any) => (
                <Col key={msg.id} offset={2} style={{ color: "white" }}>
                  <Card style={{ marginTop: "7%", width: 300, backgroundColor: "#31597f", color: "#FFF" }}>
                    <Flex justify="space-around">
                      <div>
                        <p>{msg?.content}</p>
                        <p>{formatDate(msg?.updatedAt)}</p>
                      </div>
                      <Button type="primary" danger onClick={async () => {
                        await deleteMessageApi(msg.id);
                        dispatch(msg.id);
                      }}>
                        Delete
                      </Button>
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          <div style={{ marginTop: "2%" }}>
            <Pagination align="center" defaultCurrent={1} total={50} style={{ backgroundColor: "Transparent", color: "#FFF" }} />
          </div>
        </Content>
        <Footer backgroundColor="#001529" />
      </Layout>
    </>
  )
}

export default Dashboard