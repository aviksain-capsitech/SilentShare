import { Button, Col, Flex, Layout, Popconfirm, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteUserData } from '../Redux/Slices/authSlice';
import { useLogoutMutation } from '../TanstackApiService/User';

const { Header } = Layout;

function Navbar() {

  const userStatus = useSelector((state: any) => state.auth?.status);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {mutate} = useLogoutMutation();

  return (
    <>
      <Header style={{
        textAlign: 'center',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        color: "black",
        backgroundColor: '#F5F5F5'
      }}>
        <Row>
          <Col span={4}>Silent Share</Col>
          <Col span={16}></Col>
          <Col span={4}>
            <Flex gap="small" style={{ marginTop: '12px' }} wrap>
              {
                userStatus ? (
                  <>
                    <Popconfirm
                      title="LogOut"
                      description="LogOut this Account ?"
                      onConfirm={async () => {
                        
                        mutate();
                        dispatch(deleteUserData());
                        navigate('/');
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button color="primary" variant="solid" >
                        Logout
                      </Button>
                    </Popconfirm>

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