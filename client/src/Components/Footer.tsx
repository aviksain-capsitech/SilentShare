import React from 'react';
import { Col, Layout, Row, Space } from 'antd';
import { FacebookFilled, GithubFilled, InstagramFilled, TwitterCircleFilled, YoutubeFilled } from '@ant-design/icons';

const { Footer } = Layout;

function Footerr({
  backgroundColor
}: { backgroundColor: string }) {
  return (
    <>
      <Footer style={{
        textAlign: 'center',
        color: 'white',
        backgroundColor: backgroundColor,
      }}>
        <Row>
          <Col span={8}>© 2025 Silent Share, Inc. All rights reserved.</Col>
          <Col span={8} offset={8}>
            <Space>
              <FacebookFilled />
              <InstagramFilled />
              <TwitterCircleFilled />
              <GithubFilled />
              <YoutubeFilled />
            </Space>
          </Col>
        </Row>
      </Footer>
    </>
  )
}

export default Footerr