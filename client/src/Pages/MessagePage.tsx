import React from 'react';
import { Button, Col, Flex, Input, Layout, Row, Typography } from 'antd';
import { Header, Footer } from '../Components';
import TextArea from 'antd/es/input/TextArea';

const { Content } = Layout;
const { Title } = Typography;


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#001529',
};

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh'
};

const MessagePage: React.FC = () => (
  <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Header backgroundColor="#001529" />
      <Content style={contentStyle}>
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
      </Content>
      <Footer backgroundColor='#001529' />
    </Layout>
  </Flex>
);

export default MessagePage;