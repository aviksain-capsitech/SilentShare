import { Button, Col, Flex, Layout, Row } from 'antd';

const { Header } = Layout;

function Navbar({
  backgroundColor
}: { backgroundColor: string }) {
  return (
    <>
      <Header style={{
        textAlign: 'center',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: backgroundColor,
      }}>
        <Row>
          <Col span={4} style={{ color: 'white' }}>Silent Share</Col>
          <Col span={16}></Col>
          <Col span={4}>
            <Flex gap="small" style={{ marginTop: '12px' }} wrap>
              <Button color="primary" variant="text">
                Login
              </Button>
              <Button color="primary" variant="solid">
                SignUp
              </Button>
            </Flex>
          </Col>
        </Row>
      </Header>
    </>
  )
}

export default Navbar;