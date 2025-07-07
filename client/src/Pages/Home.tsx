import React from 'react';
import { Flex, Layout } from 'antd';
import { Body, Footer, Header } from '../Components';

const layoutStyle = {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
  backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply')`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

const App: React.FC = () => (
  <Flex gap="middle" wrap>
    <Layout style={layoutStyle}>
      <Header backgroundColor="transparent"/>
      <Body />
      <Footer backgroundColor='transparent'/>
    </Layout>
  </Flex>
);

export default App;