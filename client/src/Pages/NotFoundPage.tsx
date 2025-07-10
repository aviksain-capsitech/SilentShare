import React from 'react';
import { Button, Flex, Result, Watermark } from 'antd';
import { useNavigate } from 'react-router';

const NotFoundPage: React.FC = () => {

    const navigate = useNavigate();

    return (
        <Watermark content="Silent Share">
            <Flex style={{ height: "100vh" }} justify='center' align='center'>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                        <Button 
                            type="primary" 
                            onClick={() => navigate("/")}
                        >
                            Back Home
                        </Button>
                    }
                />
            </Flex>
        </Watermark>
    )

};

export default NotFoundPage;