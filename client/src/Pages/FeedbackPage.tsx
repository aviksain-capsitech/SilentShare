import React, { useState } from 'react';
import {
  Button,
  Flex,
  Space,
  Watermark,
} from 'antd';
import { FeedBackForm, PreviousFeedbacks } from '../Components';


const FormDisabledDemo: React.FC = () => {

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showPreviousFeedbacks, setShowPreviousFeedbacks] = useState(false);

  return (
    <>
      <Watermark content={"Silent Share"}>
        <div style={{ height: "100vh", width: "100vw" }}>
          <Flex justify="center" align="center" style={{ height: '100%' }}>
            <Space size={8}>
              <Button type="primary" onClick={() => { setShowPreviousFeedbacks(true) }}>
                Show Previous Feedbacks
              </Button>
              <Button type="primary" onClick={() => setShowFeedbackForm(true)}>
                Open FeedBack Form
              </Button>
            </Space>
          </Flex>
        </div>
      </Watermark>
      <FeedBackForm showFeedbackForm={showFeedbackForm} setShowFeedbackForm={setShowFeedbackForm} />
      <PreviousFeedbacks showPreviousFeedbacks={showPreviousFeedbacks} setShowPreviousFeedbacks={setShowPreviousFeedbacks} />

    </>
  );
};

export default () => <FormDisabledDemo />;