import React from 'react';
import { Button, Flex, Layout, message, Typography } from 'antd';
import { Col, Row } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  color: 'white',
  backgroundColor: 'transparent',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',

};

function Body() {

  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info('Hello, Ant Design!');
  };


  return (
    <>
      {contextHolder}
      <Content style={contentStyle}>
        <div>
          <Row>
            <Col offset={6} span={12}>
              <Button style={{ marginBottom: '3%', background: 'transparent', color: 'white' }} color="primary" shape="round" variant="dashed">
                We invest in the world’s potential <ArrowRightOutlined />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col offset={6} span={12}>
              <Title level={1} style={{ color: "white" }}>Say What You Really Feel.</Title>
            </Col>
          </Row>
          <Row>
            <Col offset={6} span={12}>
              <p>Drop a message into the void—or read what others have shared. 100% anonymous, always.</p>
            </Col>
          </Row>
          <Row>
            <Col span={12} offset={6}>
              <Flex gap="small" style={{ marginTop: '12px' }} justify='center' wrap>
                <Button color="primary" variant="text" onClick={info}>
                  Login
                </Button>
                <Button color="primary" variant="solid">
                  SignUp
                </Button>
              </Flex>
            </Col>
          </Row>
        </div>
      </Content>
    </>
  )
}

export default Body