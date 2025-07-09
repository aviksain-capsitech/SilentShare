import { Button, Card, Col, Layout, Pagination, Row, Switch, Flex, Typography, message, Input, Popconfirm, Modal, Space, Table, Tag } from "antd";
import { Footer, Header } from "../Components"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteMessageApi, getMessagesApi } from "../Apis/message";
import { ToggleIsAcceptingApi } from "../Apis/user";
import { toggleUser as toggleUserRedux } from "../Redux/Slices/authSlice";
import { deleteMessage as deleteMessageRedux, saveMessages as saveMessagesRedux } from "../Redux/Slices/messageSlice";
import { SyncOutlined } from "@ant-design/icons";
import type { TableProps } from 'antd';


const { Title } = Typography;
const { Content } = Layout;

const formatDate = (input: string) => {
  const date = new Date(input);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh'
};

function Dashboard() {

  const user = useSelector((state: any) => state.auth?.userData);
  const toggleUser = useSelector((state: any) => state.auth?.userData?.IsAccepting);
  const messages = useSelector((state: any) => state.message?.messages);

  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [showModel, setShowModel] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const fetchMessages = async () => {
    const res = await getMessagesApi();
    console.log(res.data);
    dispatch(saveMessagesRedux(res.data));
  }

  useEffect(() => {
    fetchMessages();
  }, [dispatch]);

  // Modals functions
  const confirmModal = async () => {
    await deleteMessageApi(selectedMessage.id);
    dispatch(deleteMessageRedux(selectedMessage.id));

    messageApi.open({
      type: "success",
      content: "Message Deleted Successfully",
      duration: 3
    });

    setShowModel(false);

  }

  const cancelModal = async () => {
    setShowModel(false);
    setSelectedMessage(null);
  }



  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];


  return (
    <>
      {contextHolder}
      <Layout style={layoutStyle}>
        <Header backgroundColor="#001529" />
        <Content style={{ backgroundColor: "#001529", color: "white", padding: "2%", width: "auto" }}>
          <div>
            <Row>
              <Col offset={2}>
                <Title style={{ color: "white" }} level={1}>Hi!!👋👋👋 {user?.username}</Title>
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
                  style={{ background: "transparent", color: "white", width: "auto" }}
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
                <Button color="primary" variant="solid" onClick={() => fetchMessages()}>
                  <SyncOutlined /> {"  "} Refresh
                </Button>
              </Col>
            </Row>
          </div>

          {/* <div style={{ marginTop: "10px", color: "#FFF" }}>
            <Row>
              <Modal
                closable={false}
                open={showModel}
                okText="Delete"
                cancelText="Close"
                onOk={confirmModal}
                okButtonProps={{
                  style: { backgroundColor: 'red', borderColor: 'red', color: 'white' },
                }}
                onCancel={cancelModal}
                centered
                style={{ backgroundColor: "#31597F" }}
              >
                <p><b>Message:</b> {selectedMessage?.content}</p>
                <p><b>Date:</b> {formatDate(selectedMessage?.updatedAt)}</p>
              </Modal>

              {Array.isArray(messages) && messages.map((msg: any) => (
                <Col key={msg.id} offset={2} style={{ color: "white" }}>
                  <Card style={{ marginTop: "7%", width: 300, backgroundColor: "#31597f", color: "#FFF", border: "none",  }}
                    onClick={() => {
                      setSelectedMessage(msg);
                      setShowModel(true);
                    }}
                    hoverable
                  >
                    <Flex justify="space-around">
                      <div>
                        <p><b>Message: </b>{msg?.content.slice(0,120)}...</p>
                        <p><b>Date : </b>{formatDate(msg?.updatedAt)}</p>
                      </div>
                    </Flex>
                  </Card>
                </Col>
              ))}
            </Row>
          </div> */}

          <Row style={{marginTop: "1%"}}>
            <Col offset={2} span={20}>
            <Table<DataType> style={{backgroundColor: "#001529"}} columns={columns} dataSource={data} />
            </Col>
            
          </Row>

          


        </Content>
        <Footer backgroundColor="#001529" />
      </Layout>
    </>
  )
}

export default Dashboard