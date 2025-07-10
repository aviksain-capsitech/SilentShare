import { Flex, Layout, Watermark } from 'antd';
import { Body, Footer, Header } from '../Components';

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
};

export const Home = () => {

  return (
    <>
      <Watermark content="Silent Share">
        <Flex gap="middle" wrap>
          <Layout style={layoutStyle}>
            <Header />
            <Body />
            <Footer />
          </Layout>
        </Flex>
      </Watermark>
    </>
  )
}

export default Home;



