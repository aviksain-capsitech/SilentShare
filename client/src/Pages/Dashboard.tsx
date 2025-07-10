import { Button, Col, Layout, Row, Switch, Typography, message } from "antd";
import { DashboardTable, Footer, Header } from "../Components"
import { useDispatch, useSelector } from "react-redux";
import { ToggleIsAcceptingApi } from "../Apis/user";
import { toggleUser as toggleUserRedux } from "../Redux/Slices/authSlice";
import { SyncOutlined } from "@ant-design/icons";



const { Title } = Typography;
const { Content } = Layout;


const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh'
};

function Dashboard() {
  const user = useSelector((state: any) => state.auth?.userData);
  const toggleUser = useSelector((state: any) => state.auth?.userData?.IsAccepting);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();


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
                <Switch
                  checked={toggleUser}
                  onClick={async () => {
                    const res = await ToggleIsAcceptingApi();

                    if (res) {
                      dispatch(toggleUserRedux());
                      console.log(toggleUser);
                      messageApi.open({
                        type: 'success',
                        content: toggleUser
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
                /> Accepting Messages

              </Col>
            </Row>
            <Row>
              <Col offset={2} span={8} style={{ marginTop: "1%" }}>
                <Button
                  type="dashed"
                  style={{ background: "transparent", width: "auto" }}
                  block
                  onClick={async () => {
                    await navigator.clipboard.writeText(`http://localhost:5173/u/${user?.username}`);
                    messageApi.open({
                      type: 'success',
                      content: "Copied to Clipboard",
                      duration: 3,
                    });
                  }}
                >
                  {`http://localhost:5173/u/${user?.username}`}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col offset={2} span={8} style={{ marginTop: "1%" }}>
                <Button color="primary" variant="solid">
                  <SyncOutlined /> {"  "} Refresh
                </Button>
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

export default Dashboard