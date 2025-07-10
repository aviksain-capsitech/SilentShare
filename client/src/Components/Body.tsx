import React, { useState } from 'react';
import { Button, Carousel, Drawer, Flex, Layout, Splitter, Typography } from 'antd';
import { Col, Row } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const { Content } = Layout;
const { Title } = Typography;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  height: '100%',
  width: 'auto',
};

const carouseltStyle: React.CSSProperties = {
  height: '160px',
  color: '#000000',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'transparent',
};

const Desc: React.FC<Readonly<React.ReactNode>> = (children) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {children}
    </Typography.Title>
  </Flex>
);



function Body() {

  const user = useSelector((state: any) => state.auth?.status);
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(false);


  return (
    <>
      <Content style={contentStyle}>

        {
          user ? (<></>) : (<><Splitter style={{ marginTop: "2%", height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <Splitter.Panel defaultSize="40%" min="20%" max="70%">
              <Flex justify='center' align='center'><Button type='primary' onClick={() => {
                navigate("/login")
              }}>Login</Button></Flex>

            </Splitter.Panel>
            <Splitter.Panel>
              <Button type='primary' onClick={() => {
                navigate("/signup")
              }}>Sign Up</Button>
            </Splitter.Panel>
          </Splitter></>)
        }

        <Button type="primary" style={{ marginTop: "2%" }} onClick={() => {
          setShowSideBar(true);
        }}>
          Get Info
        </Button>

        <Drawer
          title="Silent Share Info"
          closable={{ 'aria-label': 'Close Button' }}
          onClose={() => {
            setShowSideBar(false);
          }}
          open={showSideBar}
          size='large'
        >
          <div>
            <Row>
              <Col offset={6} span={12}>
                <Title level={1} >Say What You Really Feel.</Title>
              </Col>
            </Row>

            <Row>
              <Col offset={6} span={12}>
                <p>Drop a message into the void—or read what others have shared. 100% anonymous, always.</p>
              </Col>
            </Row>

            <Row>
              <Col offset={6} span={12}>

              </Col>
            </Row>

            <Row>
              <Col span={12} offset={6}>
                <Flex gap="small" style={{ marginTop: '12px' }} justify='center' wrap>
                  {
                    user ? (
                      <>
                        <Button
                          color="primary"
                          variant="solid"
                          onClick={() => {
                            navigate("/dashboard")
                          }}
                        >
                          Go to Dashboard
                        </Button>
                      </>) : (
                      <>

                      </>
                    )
                  }
                </Flex>
              </Col>
            </Row>

          </div>
        </Drawer>

        <Carousel style={{ marginTop: "2%" }} autoplay>
          <div>
            <h2 style={carouseltStyle}>If you could live in any fictional universe, which one would it be?</h2>
          </div>
          <div>
            <h2 style={carouseltStyle}>What’s the craziest thing you've ever done?</h2>
          </div>
          <div>
            <h2 style={carouseltStyle}>What’s one goal you’ve always wanted to achieve?</h2>
          </div>
          <div>
            <h2 style={carouseltStyle}>If you were an emoji, which one would you be?</h2>
          </div>
          <div>
            <h2 style={carouseltStyle}>What’s something you think everyone pretends to like but actually doesn’t?</h2>
          </div>
        </Carousel>

      </Content>
    </>
  )
}

export default Body