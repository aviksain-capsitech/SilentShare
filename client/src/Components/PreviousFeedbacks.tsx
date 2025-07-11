import React, { useEffect, useState } from 'react';
import {
    Divider,
    Drawer,
    List,
    Modal,
    Typography,
    Image
} from 'antd';

const formatDate = (input: string) => {
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

type feedbackType = {
    name: string
    feedback: string
    image: string
}

function previousFeedbacks({
    showPreviousFeedbacks,
    setShowPreviousFeedbacks
}: {
    showPreviousFeedbacks: boolean,
    setShowPreviousFeedbacks: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const [feedbacks, setFeedbacks] = useState<any>([]);
    const [showModel, setShowModel] = useState<boolean>(false);
    const [selectedFeedback, setSelectedFeedback] = useState<any>(false);


    useEffect(() => {
        const feedbackArray: any[] = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                try {
                    const item = JSON.parse(localStorage.getItem(key)!);
                    feedbackArray.push(item);
                } catch (error) {
                    console.warn(`Invalid JSON at key ${key}`, error);
                }
            }
        }

        console.log(feedbackArray)

        const arr: any[] = [];
        feedbackArray.forEach((e) => {
            arr.push({
                name: e.name,
                feedback: e.feedback,
                image: e.screenshot?.[0]?.thumbUrl || e.screenshot,
                gender: e.gender,
                issueDate: e.issueDate,
                feedbackSection: e.feedbackSection,
                feedbackType: e.feedbackType,
                usagePeriod: e.usagePeriod
            });
        });

        setFeedbacks(arr);
    }, [showPreviousFeedbacks])

    return (
        <>
            <Drawer
                title={`Previous Feedbacks`}
                placement="bottom"
                size="large"
                onClose={() => { setShowPreviousFeedbacks(false) }}
                open={showPreviousFeedbacks}
            >
                <Divider orientation="left"> Silent Share</Divider>
                <Modal
                    title="Basic Modal"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={showModel}
                    onOk={() => { }}
                    onCancel={() => { setShowModel(false) }}
                >
                    <b>Name: </b>{selectedFeedback.name}<br/>
                    <b>Feedback: </b>{selectedFeedback.feedback}<br/>
                    <b>IssueDate: </b>{formatDate(selectedFeedback.issueDate)}<br/>
                    <b>FeedbackType: </b>{selectedFeedback.feedbackType}<br/>
                    <b>UsagePeriod: </b>{formatDate(selectedFeedback.usagePeriod?.[0])}-{formatDate(selectedFeedback.usagePeriod?.[1])}<br/>
                    <b>Image: </b><Image
                        width={200}
                        src={selectedFeedback.image}
                    />
                </Modal>
                <List
                    bordered
                    dataSource={feedbacks}
                    renderItem={(item: feedbackType) => (
                        <List.Item onClick={() => { setShowModel(true); setSelectedFeedback(item) }} >
                            <Typography.Text mark>[{item?.name}]</Typography.Text> {item?.feedback}
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    )
}

export default previousFeedbacks