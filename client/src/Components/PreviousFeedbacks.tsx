import React, { useEffect, useState } from "react";
import { Divider, Drawer, List, Modal, Typography, Image, Avatar } from "antd";
import type { FeedbackFormType } from "../Types/Feedback";
import { useGetAllFeedbacksQuery } from "../TanstackApiService/Feedback";

const formatDate = (input: string) => {
  const date = new Date(input);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function previousFeedbacks({
  showPreviousFeedbacks,
  setShowPreviousFeedbacks,
}: {
  showPreviousFeedbacks: boolean;
  setShowPreviousFeedbacks: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [feedbacks, setFeedbacks] = useState<FeedbackFormType[]>([]);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackFormType>({
    name: "",
    content: "",
    issueDate: "",
    usagePeriod: [],
    feedbackType: "",
    appVersion: "",
    screenShot: "",
  });

  const { data, isLoading, isError } = useGetAllFeedbacksQuery(
    showPreviousFeedbacks
  );

  useEffect(() => {
    if (data) {
      setFeedbacks(data);
    }
  }, [data]);

  return (
    <>
      <Drawer
        title={`Previous Feedbacks`}
        placement="bottom"
        size="large"
        onClose={() => {
          setShowPreviousFeedbacks(false);
        }}
        open={showPreviousFeedbacks}
      >
        <Divider orientation="left"> Silent Share</Divider>
        <Modal
          open={showModel}
          onCancel={() => {
            setShowModel(false);

            if (showModel) {
              const timer = setTimeout(() => {
                setShowModel(false);
              }, 10000);

              return () => clearTimeout(timer);
            }
          }}
          centered
          footer={<></>}
        >
          <b>Name: </b>
          {selectedFeedback.name}
          <br />
          <b>Feedback: </b>
          {selectedFeedback.content}
          <br />
          <b>IssueDate: </b>
          {formatDate(selectedFeedback.issueDate)}
          <br />
          <b>FeedbackType: </b>
          {selectedFeedback.feedbackType}
          <br />
          <b>UsagePeriod: </b>
          {formatDate(selectedFeedback.usagePeriod?.[0])}-
          {formatDate(selectedFeedback.usagePeriod?.[1])}
          <br />
          <b>App Version: </b>
          {selectedFeedback.appVersion}
          <br />
          <b>Image: </b>
          <Image width={200} src={selectedFeedback.screenShot} />
        </Modal>
        <List
          itemLayout="horizontal"
          dataSource={feedbacks}
          renderItem={(item, index) => (
            <List.Item
              onClick={() => {
                setShowModel(true);
                setSelectedFeedback(item);
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<Typography.Title level={5}>{item.name}</Typography.Title>}
                description={item?.content}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
}

export default previousFeedbacks;
