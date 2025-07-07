import { Button, Card, Col, Input, Layout, Pagination, Row, Typography } from "antd";
import { Footer, Header } from "../Components"
import TextArea from "antd/es/input/TextArea";

const { Title } = Typography;
const { Content } = Layout;

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh'
};

function Dashboard() {
  return (
    <>
      <Layout style={layoutStyle}>
        <Header backgroundColor="#001529" />
        <Content  style={{ backgroundColor: "#001529", color: "white", padding: "2%", width: "auto" }}>
          <div>
            <Row>
              <Col offset={2}>
                <Title style={{ color: "white" }} level={1}>Hi!!👋👋👋 Anonymous</Title>
              </Col>
            </Row>
            <Row>
              <Col offset={2} span={22} style={{ marginBottom: "4px" }}>Title:</Col>
              <Col offset={2} span={22}>
                <Input style={{ backgroundColor: "Transparent", color: "#FFF", width: "60%", marginBottom: "4px", resize: "none" }} />
              </Col>
            </Row>
            <Row>
              <Col offset={2} span={22} style={{ marginBottom: "4px" }}>Content:</Col>
              <Col offset={2} span={22}>
                <TextArea style={{ backgroundColor: "Transparent", color: "#FFF", width: "60%", resize: "none" }} rows={4} />
              </Col>
            </Row>
            <Row>
              <Col style={{ marginTop: "10px" }} offset={2} span={22}>
                <Button color="primary" variant="solid">Post</Button>
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: "10px", color: "#FFF" }}>
            <Row>
              <Col offset={2}>
                <Card title="Card title" variant="borderless" style={{ marginTop: "4%", width: 300, backgroundColor: "#31597f", color: "#FFF" }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col offset={2} style={{ color: "white" }}>
                <Card title="Card title" variant="borderless" style={{ marginTop: "4%", width: 300, backgroundColor: "#31597f", color: "#FFF"  }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
              <Col offset={2}>
                <Card title="Card title" variant="borderless" style={{ marginTop: "4%", width: 300, backgroundColor: "#31597f", color: "#FFF"  }}>
                  <p>Card content</p>
                  <p>Card content</p>
                  <p>Card content</p>
                </Card>
              </Col>
            </Row>
          </div>

          <div style={{ marginTop: "2%" }}>
            <Pagination align="center" defaultCurrent={1} total={50} style={{backgroundColor: "Transparent", color: "#FFF"}} />
          </div>
        </Content>
        <Footer backgroundColor="#001529" />
      </Layout>
    </>
  )
}

export default Dashboard