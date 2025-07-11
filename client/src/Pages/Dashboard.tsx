import { Button, Col, Layout, Popover, Row, Space, Switch, Typography, message } from "antd";
import { DashboardTable, Footer, Header } from "../Components"
import { useDispatch, useSelector } from "react-redux";
import { ToggleIsAcceptingApi } from "../Apis/user";
import { toggleUser as toggleUserRedux } from "../Redux/Slices/authSlice";
import { SyncOutlined } from "@ant-design/icons";
import { getMessagesApi } from "../Apis/message";
import { saveMessages as saveMessageRedux } from "../Redux/Slices/messageSlice";
import { useNavigate } from "react-router";

const { Title } = Typography;
const { Content } = Layout;

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh'
};

function Dashboard() {
  const user = useSelector((state: any) => state.auth?.userData);
  const isAccepting = useSelector((state: any) => state.auth?.userData?.isAccepting);

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <>
      {contextHolder}
      <Layout style={layoutStyle}>
        <Header />
        <Content style={{ backgroundColor: "white", color: "black", padding: "2%", width: "auto" }}>
          <div>
            <Row>
              <Col offset={2}>
                <Title level={1}>Hi!!👋👋👋 {user?.username}</Title>
              </Col>
            </Row>
            <Row>
              <Col offset={2}>
                <Space size={8}>
                  <Switch
                    checked={isAccepting}
                    onClick={async () => {
                      const res = await ToggleIsAcceptingApi();

                      if (res) {
                        dispatch(toggleUserRedux());

                        messageApi.open({
                          type: 'success',
                          content: !isAccepting
                            ? "You are now Accepting Messages"
                            : "You are not Accepting Messages",
                          duration: 3,
                        });

                      } else {
                        messageApi.open({
                          type: 'error',
                          content: "Failed to toggle Accepting Messages",
                          duration: 3,
                        });
                      }
                    }}
                  />
                  <p>{isAccepting ? "Accepting Messages" : "Not Accepting Messages"}</p>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col offset={2} span={8} style={{ marginTop: "1%" }}>
              <Popover content="" title="Click To Copy">
                <Button
                  type="dashed"
                  style={{ background: "transparent", width: "auto" }}
                  block
                  onClick={async () => {
                    await navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/u/${user?.username}`);
                    messageApi.open({
                      type: 'success',
                      content: "Copied to Clipboard",
                      duration: 3,
                    });
                  }}
                >
                  {`${import.meta.env.VITE_FRONTEND_URL}/u/${user?.username}`}
                </Button>
                </Popover>
              </Col>
            </Row>
            <Row>
              <Col offset={2} span={8} style={{ marginTop: "1%" }}>
                <Space>
                  <Button color="primary" variant="solid" onClick={async () => {
                    const queryParams = new URLSearchParams("?page=1&pageSize=10");
                    const res = await getMessagesApi({ queryParams });
                    dispatch(saveMessageRedux(res.items));
                  }}>
                    <SyncOutlined /> {"  "} Refresh
                  </Button>

                  <Button color="primary" variant="solid" onClick={async () => { navigate('/feedback') }}>
                    Give FeedBack
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>

          <Row style={{ marginTop: "1%" }}>
            <Col offset={2} span={20}>
              <DashboardTable />
            </Col>
          </Row>
        </Content>
        <Footer />
      </Layout>
    </>
  )
}

export default Dashboard;