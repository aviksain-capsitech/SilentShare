
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    ColorPicker,
    DatePicker,
    Drawer,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Space,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const FeedBackForm = ({
    showFeedbackForm,
    setShowFeedbackForm
}: {
    showFeedbackForm: boolean,
    setShowFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const [form] = Form.useForm();

    useEffect(() => {
        const allLocalStorageData: Record<string, any> = {};

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                try {
                    allLocalStorageData[key] = JSON.parse(localStorage.getItem(key)!);
                } catch (error) {
                    console.warn(`Invalid JSON at key ${key}`, error);
                }
            }
        }

        console.log(allLocalStorageData);
    }, []);

    const onFinish = (values: any) => {
        localStorage.setItem(uuidv4(), JSON.stringify(values));

        const allLocalStorageData: Record<string, any> = {};

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                try {
                    allLocalStorageData[key] = JSON.parse(localStorage.getItem(key)!);
                } catch (error) {
                    console.warn(`Invalid JSON at key ${key}`, error);
                }
            }
        }

        form.resetFields()
    };

    return (
        <>
            <Drawer
                title={`Feedback Form`}
                placement="right"
                size="large"
                onClose={() => { setShowFeedbackForm(false); form.resetFields(); }}
                open={showFeedbackForm}
            >
                <Form
                    layout="horizontal"
                    onFinish={onFinish}
                    form={form}
                    onFinishFailed={(err) => console.log("Validation Failed:", err)}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name !' }]}
                    >
                        <Input placeholder="Enter Your Name" />
                    </Form.Item>

                    <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please Select your gender !' }]}>
                        <Radio.Group>
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                            <Radio value="other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Feedback Type" name="feedbackType" rules={[{ required: true, message: 'Please Select a Feedback type !' }]}>
                        <Select placeholder="Select a category">
                            <Select.Option value="bug">Bug Report</Select.Option>
                            <Select.Option value="suggestion">Feature Request</Select.Option>
                            <Select.Option value="ui">UI Issue</Select.Option>
                            <Select.Option value="performance">Performance</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Feedback Section" name="feedbackSection" rules={[{ required: true, message: 'Please select a section !' }]}>
                        <TreeSelect
                            placeholder="Select affected area"
                            treeData={[
                                {
                                    title: 'Dashboard',
                                    value: 'dashboard',
                                },
                                {
                                    title: 'Settings',
                                    value: 'settings',
                                    children: [
                                        { title: 'Profile', value: 'profile' },
                                        { title: 'Notifications', value: 'notifications' },
                                    ],
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label="Device Info" name="deviceInfo" rules={[{ required: true, message: 'Please Select a device !' }]}>
                        <Cascader
                            placeholder="Select OS and Browser"
                            options={[
                                {
                                    value: 'windows',
                                    label: 'Windows',
                                    children: [
                                        { value: 'chrome', label: 'Chrome' },
                                        { value: 'edge', label: 'Edge' },
                                        { value: 'brave', label: 'Brave' },
                                        { value: 'firefox', label: 'Firefox' },
                                    ],
                                },
                                {
                                    value: 'mac',
                                    label: 'MacOS',
                                    children: [
                                        { value: 'chrome', label: 'Chrome' },
                                        { value: 'edge', label: 'Edge' },
                                        { value: 'brave', label: 'Brave' },
                                        { value: 'firefox', label: 'Firefox' },
                                        { value: 'safari', label: 'Safari' },
                                    ],
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item label="Issue Date" name="issueDate" rules={[{ required: true, message: 'Please Select a date !' }]}>
                        <DatePicker placeholder="When did this happen?" />
                    </Form.Item>

                    <Form.Item label="Usage Period" name="usagePeriod" rules={[{ required: true, message: 'Please Select a Period !' }]}>
                        <RangePicker />
                    </Form.Item>

                    <Form.Item label="App Version Used" name="appVersion" rules={[{ required: true, message: 'Please Select a version !' }]}>
                        <InputNumber placeholder="e.g., 1.2.0" />
                    </Form.Item>

                    <Form.Item label="Your Feedback" name="feedback" rules={[{ required: true, message: 'Write a Feedback !' }]}>
                        <TextArea rows={4} placeholder="Describe your experience or issue..." />
                    </Form.Item>

                    <Form.Item label="Would you recommend us?" name="recommend" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        label="Screenshot or File"
                        name="screenshot"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload action="/upload.do" listType="picture-card">
                            <button type="button" style={{ border: 0, background: 'none' }}>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="Satisfaction" name="satisfaction">
                        <Slider min={1} max={10} />
                    </Form.Item>

                    <Form.Item label="Theme Color Used" name="themeColor">
                        <ColorPicker />
                    </Form.Item>

                    <Form.Item label="Overall Rating" name="rating">
                        <Rate />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={() => { form.resetFields() }}>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default FeedBackForm