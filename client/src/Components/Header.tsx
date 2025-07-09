import { Button, Col, Flex, Layout, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LogoutApi } from '../Apis/user';
import { deleteUserData } from '../Redux/Slices/authSlice';

const { Header } = Layout;

function Navbar({
  backgroundColor
}: { backgroundColor: string }) {

  const userStatus = useSelector((state: any) => state.auth?.status);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
              {
                userStatus ? (
                  <>
                    <Button color="primary" variant="solid" onClick={async () => {
                      await LogoutApi();
                      dispatch(deleteUserData());
                      navigate('/');
                    }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="primary" variant="text" onClick={() => {
                      navigate("/login")
                    }}>
                      Login
                    </Button>
                    <Button color="primary" variant="solid" onClick={() => {
                      navigate("/signup")
                    }}>
                      Signup
                    </Button>
                  </>
                )
              }
            </Flex>
          </Col>
        </Row>
      </Header>
    </>
  )
}

export default Navbar;