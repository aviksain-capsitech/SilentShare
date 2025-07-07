import { Card, Col, Flex, Layout, Pagination, Row } from 'antd';
import { Header, Footer } from '../Components';
import Title from 'antd/es/typography/Title';

const { Content, Sider } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#FFF',
  backgroundColor: "#001529",
  paddingTop: '3%'
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#001529',
  paddingTop: '3%'
};

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
  
};

const Profile: React.FC = () => (
  <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Header backgroundColor='#001529' />
      <Layout>
        <Sider width="25%" style={siderStyle}>
          <div>
            <Title level={3} style={{ color: "#FFF" }}>Hi👋👋 UserName</Title>
            <Title level={5} style={{ color: "#FFF" }}>Email</Title>
            <Title level={5} style={{ color: "#FFF" }}>Account Creation Date</Title>
            <Title level={5} style={{ color: "#FFF" }}>Account Id</Title>
          </div>
        </Sider>
        <Content style={contentStyle}>
          <Row>
            <Col offset={2}>
              <Card title="Card title" variant="borderless" style={{ marginTop: "4%", width: 300, backgroundColor: "#31597f", color: "#FFF" }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col offset={2} style={{ color: "white" }}>
              <Card title="Card title" variant="borderless" style={{ marginTop: "4%", width: 300, backgroundColor: "#31597f", color: "#FFF" }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
            <Col offset={2}>
              <Card title="Card title" variant="borderless" style={{ marginTop: "4%", width: 300, backgroundColor: "#31597f", color: "#FFF" }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Col>
          </Row>
          <div style={{ marginTop: "2%" }}>
            <Pagination align="center" defaultCurrent={1} total={50} style={{backgroundColor: "Transparent", color: "#FFF"}} />
          </div>
        </Content>
      </Layout>
      <Footer backgroundColor='#001529' />
    </Layout>
  </Flex>
);

export default Profile;